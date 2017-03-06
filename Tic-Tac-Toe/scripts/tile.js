var Tile = (function tile() {
    function Tile(options) {
        var defaults = {
            state: 0,
            board: $('.board'),
            index: -1,
        };
        options = $.extend(defaults, options);
        
        this.state = options.state;
        this.board = options.board;
        this.index = options.index;
    }
    
    Tile.prototype = {
        render: (function() {
            var tile_ui = $('<div class="tile"></div>').appendTo(this.board);
            this.view = tile_ui;
        }),
        update: (function() {
            this.view.html(this.state == 1 ? 'X' : 'O');
        }),
    }
    
    return Tile;
})(); 
