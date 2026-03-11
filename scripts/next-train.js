(function(){
    var boards = [];
    function Board(el){
        var that = this;
        that.element = el;
        that._trainIndex = -1;
        function populateTrains(){
            // Populate the board with the trains.
            that.trains = [];
            var count = 0;
            var trains = that.element.querySelectorAll('.train')
            trains.forEach(function(el){
                if(count++ < 1) return;
                var train = new Train(el);
                that.trains.push(train);
            });
            that.nextTrain();
        }
        that.nextTrain = function(){
            // Remove the "show" class from all trains on this board.
            that.trains.forEach(function(train){
                train.hide();
            });

            // Increment the train index, and if it exceeds the number of trains, reset it to 0.
            that._trainIndex = (++that._trainIndex) % that.trains.length;

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