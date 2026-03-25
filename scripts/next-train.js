var rootBoards = new WeakMap();
var rootListenerStates = new WeakMap();
var TICK_INTERVAL = 10 * 1000;
var renderPlugins = [];

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

function getWindowForElement(el){
    return el.ownerDocument ? el.ownerDocument.defaultView : window;
}

function Board(el){
    var that = this;
    that.element = el;
    that.renderPluginState = {};

    that.getRenderPluginState = function(pluginName){
        if(!that.renderPluginState[pluginName]){
            that.renderPluginState[pluginName] = {};
        }

        return that.renderPluginState[pluginName];
    };

    that.collectTrains = function(){
        that.allTrains = [];
        var trains = that.element.querySelectorAll('train');
        trains.forEach(function(trainElement){
            that.allTrains.push(new Train(trainElement));
        });
    };

    that.shouldPauseOnHover = function(){
        return false;
        var view = getWindowForElement(that.element);
        var value = view.getComputedStyle(that.element).getPropertyValue('--board-pause-on-hover').trim().toLowerCase();
        return value === 'true' || value === '1';
    };

    that.ensureNavigationControls = function(){
        if(!that.allTrains || that.allTrains.length <= 1){
            var existingPrev = that.element.querySelector('.board-nav.prev');
            var existingNext = that.element.querySelector('.board-nav.next');
            if(existingPrev) existingPrev.remove();
            if(existingNext) existingNext.remove();
            that.element.removeAttribute('data-board-has-navigation');
            return;
        }

        if(that.element.querySelector('.board-nav.prev')) {
            that.element.setAttribute('data-board-has-navigation', 'true');
            return;
        }

        var ownerDocument = that.element.ownerDocument;
        var prev = ownerDocument.createElement('button');
        prev.type = 'button';
        prev.className = 'board-nav prev';
        prev.setAttribute('aria-label', 'Previous train');
        prev.textContent = '‹';

        var next = ownerDocument.createElement('button');
        next.type = 'button';
        next.className = 'board-nav next';
        next.setAttribute('aria-label', 'Next train');
        next.textContent = '›';

        prev.addEventListener('click', function(event){
            event.stopPropagation();
            that.showPreviousTrain();
        });

        next.addEventListener('click', function(event){
            event.stopPropagation();
            that.showNextTrain();
        });

        that.element.appendChild(prev);
        that.element.appendChild(next);
        that.element.setAttribute('data-board-has-navigation', 'true');
    };

    that.showNextTrain = function(){
        that.collectTrains();
        renderPlugins.forEach(function(renderPlugin){
            if(typeof renderPlugin.next === 'function'){
                renderPlugin.next(that);
            }
        });
        that.resetTimer();
    };

    that.showPreviousTrain = function(){
        that.collectTrains();
        renderPlugins.forEach(function(renderPlugin){
            if(typeof renderPlugin.previous === 'function'){
                renderPlugin.previous(that);
            }
        });
        that.resetTimer();
    };

    that.render = function(){
        that.collectTrains();
        that.ensureNavigationControls();
        renderPlugins.forEach(function(renderPlugin){
            if(typeof renderPlugin.render === 'function'){
                renderPlugin.render(that);
            }
        });
    };

    that.pause = function(){
        if(!that.shouldPauseOnHover() || that.isPaused) return;
        that.isPaused = true;
        that.element.classList.add('board-paused');
        if(that.timerId){
            clearTimeout(that.timerId);
            that.timerId = null;
        }
    };

    that.resume = function(){
        if(!that.shouldPauseOnHover() || !that.isPaused) return;
        that.isPaused = false;
        that.element.classList.remove('board-paused');
        that.resetTimer();
    };

    that.tick = function(){
        that.timerId = null;
        if(that.isPaused) return;
        that.showNextTrain();
    };

    that.resetTimer = function(){
        if(that.timerId){
            clearTimeout(that.timerId);
        }
        that.timerId = setTimeout(that.tick, TICK_INTERVAL);
    };

    that.destroy = function(){
        if(that.timerId){
            clearTimeout(that.timerId);
            that.timerId = null;
        }

        that.element.removeEventListener('mouseenter', that.pause);
        that.element.removeEventListener('mouseleave', that.resume);
    };

    that.collectTrains();
    that.ensureNavigationControls();
    that.render();

    that.element.addEventListener('mouseenter', that.pause);
    that.element.addEventListener('mouseleave', that.resume);

    that.resetTimer();

    return that;
}

function Train(el){
    var that = this;
    that.element = el;
    that.setAttribute = function(attributeName, value){
        that.element.setAttribute(attributeName, value);
    };
    that.removeAttribute = function(attributeName){
        that.element.removeAttribute(attributeName);
    };
    return that;
}

function createOverheadPlatformRenderPlugin(){
    var pluginName = 'overhead-platform';

    function getPluginState(board){
        var pluginState = board.getRenderPluginState(pluginName);

        if(typeof pluginState.trainIndex !== 'number'){
            pluginState.trainIndex = 0;
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
    }

    function showCurrentTrain(board, pluginState){
        board.allTrains.forEach(function(train){
            clearCurrentTrainState(train);
        });

        if(!pluginState.rotatingTrains || pluginState.rotatingTrains.length === 0){
            return;
        }

        pluginState.trainIndex = ((pluginState.trainIndex % pluginState.rotatingTrains.length) + pluginState.rotatingTrains.length) % pluginState.rotatingTrains.length;
        pluginState.rotatingTrains[pluginState.trainIndex].setAttribute('data-overhead-platform-train-state', 'current');
    }

    function showNextTrain(board){
        var pluginState = getPluginState(board);
        populateTrains(board, pluginState);

        if(!pluginState.rotatingTrains || pluginState.rotatingTrains.length === 0){
            return;
        }

        pluginState.trainIndex = (pluginState.trainIndex + 1) % pluginState.rotatingTrains.length;
        showCurrentTrain(board, pluginState);
    }

    function showPreviousTrain(board){
        var pluginState = getPluginState(board);
        populateTrains(board, pluginState);

        if(!pluginState.rotatingTrains || pluginState.rotatingTrains.length === 0){
            return;
        }

        pluginState.trainIndex = (pluginState.trainIndex - 1 + pluginState.rotatingTrains.length) % pluginState.rotatingTrains.length;
        showCurrentTrain(board, pluginState);
    }

    return {
        name: pluginName,
        render: function(board){
            var pluginState = getPluginState(board);
            populateTrains(board, pluginState);
            showCurrentTrain(board, pluginState);
        },
        next: showNextTrain,
        previous: showPreviousTrain
    };
}

function createSingleTrainRenderPlugin(){
    var pluginName = 'single-train';

    function getPluginState(board){
        var pluginState = board.getRenderPluginState(pluginName);

        if(typeof pluginState.trainIndex !== 'number'){
            pluginState.trainIndex = 0;
        }

        return pluginState;
    }

    function clearCurrentTrainState(train){
        train.removeAttribute('data-single-train-state');
    }

    function showCurrentTrain(board, pluginState){
        board.allTrains.forEach(function(train){
            clearCurrentTrainState(train);
        });

        if(board.allTrains.length === 0){
            return;
        }

        pluginState.trainIndex = ((pluginState.trainIndex % board.allTrains.length) + board.allTrains.length) % board.allTrains.length;
        board.allTrains[pluginState.trainIndex].setAttribute('data-single-train-state', 'current');
    }

    function showNextTrain(board){
        var pluginState = getPluginState(board);
        if(board.allTrains.length === 0){
            return;
        }

        pluginState.trainIndex = (pluginState.trainIndex + 1) % board.allTrains.length;
        showCurrentTrain(board, pluginState);
    }

    function showPreviousTrain(board){
        var pluginState = getPluginState(board);
        if(board.allTrains.length === 0){
            return;
        }

        pluginState.trainIndex = (pluginState.trainIndex - 1 + board.allTrains.length) % board.allTrains.length;
        showCurrentTrain(board, pluginState);
    }

    return {
        name: pluginName,
        render: function(board){
            var pluginState = getPluginState(board);

            if(board.allTrains && board.allTrains.length > 1){
                board.element.setAttribute('data-single-train-animation', 'true');
            } else {
                board.element.removeAttribute('data-single-train-animation');
            }

            showCurrentTrain(board, pluginState);
        },
        next: showNextTrain,
        previous: showPreviousTrain
    };
}

function createBoards(root){
    var boards = [];
    root.querySelectorAll('.board').forEach(function(el){
        boards.push(new Board(el));
    });
    rootBoards.set(root, boards);
    return boards;
}

export function initializeRenderedBoards(root){
    var existingBoards = rootBoards.get(root);
    if(existingBoards && existingBoards.length > 0){
        existingBoards.forEach(function(board){
            if(board && typeof board.destroy === 'function'){
                board.destroy();
            }
        });
    }

    return createBoards(root);
}

export function registerDocumentBoards(doc){
    var targetDocument = doc || document;
    var state = rootListenerStates.get(targetDocument);

    if(!state){
        state = {
            listenersAttached: false,
            domReadyHandler: null,
            boardsRenderedHandler: null
        };
        rootListenerStates.set(targetDocument, state);
    }

    if(state.listenersAttached){
        return state;
    }

    state.domReadyHandler = function(){
        initializeRenderedBoards(targetDocument);
    };

    state.boardsRenderedHandler = function(){
        initializeRenderedBoards(targetDocument);
    };

    if(targetDocument.readyState === 'loading'){
        targetDocument.addEventListener('DOMContentLoaded', state.domReadyHandler, { once: true });
    } else {
        state.domReadyHandler();
    }

    targetDocument.addEventListener('boards:rendered', state.boardsRenderedHandler);
    state.listenersAttached = true;
    return state;
}