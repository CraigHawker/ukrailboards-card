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
        that.fixedRows = ensureNumberBetweenMaxAndMin(that.element.getAttribute('data-fixed-rows'), 3, 7);
        that.staticTrainCount = Math.max(1, that.fixedRows - 2);

        function applyLayout(){
            var overviewRow = that.fixedRows - 1;
            var gridRows = Math.max(2, overviewRow);

            that.element.style.setProperty('--overview-row', overviewRow);
            that.element.style.setProperty('--grid-rows', gridRows);

            that.allTrains.forEach(function(train, index){
                train.element.classList.remove('pinned');
                train.element.style.removeProperty('--board-row');

                // The first train is always rendered as the primary row with calling data.
                if(index === 0) return;

                // If it does not change then it is pinned.
                if(index < that.staticTrainCount){
                    train.element.classList.add('pinned');
                    train.element.style.setProperty('--board-row', (index + 1));
                }
            });
        }

        function populateTrains(){
            // Populate the board with the trains.
            that.allTrains = [];
            var trains = that.element.querySelectorAll('.train');
            trains.forEach(function(el){
                that.allTrains.push(new Train(el));
            });

            applyLayout();

            that.trains = that.allTrains.slice(that.staticTrainCount);
            console.log('Found', that.allTrains.length, 'trains on this board. Rotating', that.trains.length, 'train(s).');
            that.nextTrain();
        }
        that.nextTrain = function(){
            // Remove the "show" class from all trains on this board.
            that.allTrains.forEach(function(train){
                train.hide();
            });

            if(that.trains.length === 0){
                return;
            }

            // Increment the train index, and if it exceeds the number of trains, reset it to 0.
            that._trainIndex = (++that._trainIndex) % that.trains.length;
            console.log('Showing train index', that._trainIndex);

            // Add the "show" class to the current train.
            that.trains[that._trainIndex].show();
        }
        populateTrains();
        return that;
    }
    function Train(el){
        var that = this;
        that.element = el;
        that.hide = function(){
            that.element.classList.remove('show');
        }
        that.show = function(){
            that.element.classList.add('show');
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