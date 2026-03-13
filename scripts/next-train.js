(function(){
    var boards = [];
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
        that._trainIndex = -1;
        that.fixedRows = ensureNumberBetweenMaxAndMin(that.element.getAttribute('data-table-fixed-rows'), 3, 7);
        that.baseStaticTrainCount = Math.max(1, that.fixedRows - 2);
        that.staticTrainCount = that.baseStaticTrainCount;

        function setTrainStructure(){
            var overviewSlot = that.fixedRows - 1;

            that.element.setAttribute('data-overview-slot', overviewSlot);
            that.element.setAttribute('data-static-train-count', that.staticTrainCount);

            that.allTrains.forEach(function(train, index){
                var role = 'rotating';

                // First train is the next service and includes calling data.
                if(index === 0){
                    role = 'next-train';
                } else if(index < that.staticTrainCount){
                    // Static services stay in fixed rows above the rotating overview row.
                    role = 'static';
                }

                train.setRole(role);
                train.clearRotationState();
            });
        }

        function populateTrains(){
            // Populate the board with the trains.
            that.allTrains = [];
            var trains = that.element.querySelectorAll('.train');
            trains.forEach(function(el){
                that.allTrains.push(new Train(el));
            });

            // Only rotate when there are at least 2 rotating candidates.
            that.staticTrainCount = Math.min(that.baseStaticTrainCount, that.allTrains.length);
            if((that.allTrains.length - that.staticTrainCount) <= 1){
                that.staticTrainCount = that.allTrains.length;
            }

            setTrainStructure();

            that.trains = that.allTrains.slice(that.staticTrainCount);
            console.log('Found', that.allTrains.length, 'trains on this board. Rotating', that.trains.length, 'train(s).');
            that.nextTrain();
        }
        that.nextTrain = function(){
            // Remove any previous rotation marker before showing the next train.
            that.allTrains.forEach(function(train){
                train.hide();
            });

            if(that.trains.length === 0){
                return;
            }

            // Increment the train index, and if it exceeds the number of trains, reset it to 0.
            that._trainIndex = (++that._trainIndex) % that.trains.length;
            console.log('Showing train index', that._trainIndex);

            // Mark the current rotating train as visible.
            that.trains[that._trainIndex].show();
        }
        populateTrains();
        return that;
    }
    function Train(el){
        var that = this;
        that.element = el;
        that.setRole = function(role){
            that.element.setAttribute('data-train-role', role);
        }
        that.clearRotationState = function(){
            that.element.removeAttribute('data-train-state');
        }
        that.hide = function(){
            that.clearRotationState();
        }
        that.show = function(){
            that.element.setAttribute('data-train-state', 'current');
        }
        return that;
    }
    document.querySelectorAll('.board').forEach(function(el){
        var board = new Board(el);
        boards.push(board);
    });
    window.setInterval(function(){
        boards.forEach(function(board){
            board.nextTrain();
        });
    }, 10 * 1000);
})();