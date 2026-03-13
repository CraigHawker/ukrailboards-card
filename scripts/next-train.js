(function(){
    var boards = [];
    // Each plugin gets called for every board on each ticker cycle.
    var renderPlugins = [];

    // Register layout plugins once at startup.
    registerRenderPlugin(createSingleTrainRenderPlugin());
    registerRenderPlugin(createOverheadPlatformRenderPlugin());

    function registerRenderPlugin(renderPlugin){
        renderPlugins.push(renderPlugin);
    }

    function ensureNumberBetweenMaxAndMin(value, min, max){
        var parsed = parseInt(value, 10);
        if(isNaN(parsed)) return min;
        if(parsed < min) return min;
        if(parsed > max) return max;
        return parsed;
    }
    function Board(el){
        var that = this;
        that.element = el;
        // Plugin state is namespaced by plugin name so plugins stay isolated.
        that.renderPluginState = {};
        that.getRenderPluginState = function(pluginName){
            if(!that.renderPluginState[pluginName]){
                that.renderPluginState[pluginName] = {};
            }

            return that.renderPluginState[pluginName];
        }
        that.collectTrains = function(){
            that.allTrains = [];
            var trains = that.element.querySelectorAll('.train');
            trains.forEach(function(el){
                that.allTrains.push(new Train(el));
            });
        }
        that.render = function(){
            // Re-read trains each tick so plugins react to dynamic DOM/layout changes.
            that.collectTrains();
            renderPlugins.forEach(function(renderPlugin){
                renderPlugin.render(that);
            });
        }
        that.render();
        return that;
    }
    function Train(el){
        var that = this;
        that.element = el;
        that.setAttribute = function(attributeName, value){
            that.element.setAttribute(attributeName, value);
        }
        that.removeAttribute = function(attributeName){
            that.element.removeAttribute(attributeName);
        }
        return that;
    }
    function createOverheadPlatformRenderPlugin(){
        var pluginName = 'overhead-platform';

        function getPluginState(board){
            // Persist rotation index per board for this plugin only.
            var pluginState = board.getRenderPluginState(pluginName);

            if(typeof pluginState.trainIndex !== 'number'){
                pluginState.trainIndex = -1;
            }

            return pluginState;
        }

        function clearCurrentTrainState(train){
            train.removeAttribute('data-overhead-platform-train-state');
        }

        function setTrainStructure(board, pluginState){
            var overviewRow = pluginState.fixedRows - 1;

            board.element.setAttribute('data-overhead-platform-overview-row', overviewRow);
            board.element.setAttribute('data-overhead-platform-static-train-count', pluginState.staticTrainCount);

            board.allTrains.forEach(function(train, index){
                var role = 'rotating';

                if(index === 0){
                    role = 'next-train';
                } else if(index < pluginState.staticTrainCount){
                    role = 'static';
                }

                train.setAttribute('data-overhead-platform-train-role', role);
                clearCurrentTrainState(train);
            });
        }

        function populateTrains(board, pluginState){
            pluginState.fixedRows = ensureNumberBetweenMaxAndMin(board.element.getAttribute('data-overhead-platform-fixed-rows'), 3, 7);
            pluginState.baseStaticTrainCount = Math.max(1, pluginState.fixedRows - 2);
            pluginState.staticTrainCount = Math.min(pluginState.baseStaticTrainCount, board.allTrains.length);

            if((board.allTrains.length - pluginState.staticTrainCount) <= 1){
                pluginState.staticTrainCount = board.allTrains.length;
            }

            setTrainStructure(board, pluginState);

            pluginState.rotatingTrains = board.allTrains.slice(pluginState.staticTrainCount);
            console.log('Found', board.allTrains.length, 'trains on this board for overhead platform. Rotating', pluginState.rotatingTrains.length, 'train(s).');
        }

        function showNextTrain(board, pluginState){
            board.allTrains.forEach(function(train){
                clearCurrentTrainState(train);
            });

            if(pluginState.rotatingTrains.length === 0){
                return;
            }

            pluginState.trainIndex = (++pluginState.trainIndex) % pluginState.rotatingTrains.length;
            console.log('Showing overhead platform train index', pluginState.trainIndex);

            pluginState.rotatingTrains[pluginState.trainIndex].setAttribute('data-overhead-platform-train-state', 'current');
        }

        return {
            name: pluginName,
            render: function(board){
                // Calculate the overhead structure and then advance rotating services.
                var pluginState = getPluginState(board);

                populateTrains(board, pluginState);
                showNextTrain(board, pluginState);
            }
        };
    }
    function createSingleTrainRenderPlugin(){
        var pluginName = 'single-train';

        function getPluginState(board){
            // Persist rotation index per board for this plugin only.
            var pluginState = board.getRenderPluginState(pluginName);

            if(typeof pluginState.trainIndex !== 'number'){
                pluginState.trainIndex = -1;
            }

            return pluginState;
        }

        function clearCurrentTrainState(train){
            train.removeAttribute('data-single-train-state');
        }

        function showNextTrain(board, pluginState){
            board.allTrains.forEach(function(train){
                clearCurrentTrainState(train);
            });

            if(board.allTrains.length === 0){
                return;
            }

            pluginState.trainIndex = (++pluginState.trainIndex) % board.allTrains.length;
            console.log('Showing single train index', pluginState.trainIndex);

            board.allTrains[pluginState.trainIndex].setAttribute('data-single-train-state', 'current');
        }

        return {
            name: pluginName,
            render: function(board){
                // Show exactly one train and move to the next on each tick.
                var pluginState = getPluginState(board);

                showNextTrain(board, pluginState);
            }
        };
    }
    document.querySelectorAll('.board').forEach(function(el){
        var board = new Board(el);
        boards.push(board);
    });
    // Shared ticker: every plugin re-renders every board each cycle.
    window.setInterval(function(){
        boards.forEach(function(board){
            board.render();
        });
    }, 10 * 1000);
})();