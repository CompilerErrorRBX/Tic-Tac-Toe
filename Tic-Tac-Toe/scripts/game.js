var Game = (function game() {
    function Game(options) {
        var defaults = {
            tiles: [],
            turn: 1,
            board: $('.board'),
            players: [],
            state: 'started',
        };
        options = $.extend(defaults, options);
        
        this.turn = options.turn;
        this.tiles = options.tiles;
        this.board = options.board;
        this.players = options.players;
        this.state = options.state;
    }
    
    Game.prototype = {
        new_game: (function() {
            var game = this;
            console.log('started a new game');
            game.state = 'started'; // Reset status.
            game.turn = 1; // Reset turn.
            game.board.html(''); // Clear board.
            for (var i = 0; i < 9; i++) {
                game.tiles[i] = new Tile({index: i});
                var tile = game.tiles[i];
                tile.render();
                game.track_tile(tile, i);
            }
            game.get_player_by_turn(1).leaderboard.find('.spinner').show();
            game.get_player_by_turn(2).leaderboard.find('.spinner').hide();
            game.get_player_by_current_turn().prompt_turn();
        }),
        play: (function(tile_index) {
            var game = this;
            var tile = game.tiles[tile_index];
            if (tile.state == 0) {
                tile.state = game.turn;
                tile.update();
                var previous_turn = game.turn;
                game.turn = (game.turn == 1) ? 2 : 1;
                game.players[0].leaderboard.find('.spinner').toggle();
                game.players[1].leaderboard.find('.spinner').toggle();
                var potential_winner = game.check_winner();
                if (potential_winner != 0) {
                    console.log('Winner! Game over.')
                    game.state = 'ended'
                    game.get_player_by_turn(potential_winner).add_win();
                    setTimeout((function() {
                        game.new_game();
                    }), 1500)
                } else if (game.is_board_full()) {
                    console.log('Draw! Game over.')
                    setTimeout((function() {
                        game.new_game();
                    }), 1500);
                } else {
                    game.get_player_by_current_turn().prompt_turn();
                }
            }
        }),
        track_tile: (function(tile, index) {
            var game = this;
            tile.view.click(function() {
                if (game.state != 'ended' && game.get_player_by_current_turn().class_name == "player")
                    game.play(index);
            });
        }),
        check_winner: (function() {
            var tiles = this.tiles;
            
            // Top left conditions
            if (tiles[0].state != 0 && ((tiles[0].state == tiles[1].state && tiles[1].state == tiles[2].state) // Left to Right
                || (tiles[0].state == tiles[3].state && tiles[3].state == tiles[6].state) // Top to Bottom
                || (tiles[0].state == tiles[4].state && tiles[4].state == tiles[8].state))) // Top Left to Bottom Right
                return tiles[0].state
                
            // Top middle conditions
            if (tiles[1].state != 0 && tiles[1].state == tiles[4].state && tiles[4].state == tiles[7].state) // Top Middle to Bottom Middle
                return tiles[1].state
                
             // Top right conditions
            if (tiles[2].state != 0 && ((tiles[2].state == tiles[5].state && tiles[5].state == tiles[8].state) // Top to Bottom
                || (tiles[2].state == tiles[4].state && tiles[4].state == tiles[6].state))) // Top Right to Bottom Left
                return tiles[2].state
                
            // Left middle conditions
            if (tiles[3].state != 0 && tiles[3].state == tiles[4].state && tiles[4].state == tiles[5].state) // Left Middle to Right Middle
                return tiles[3].state
                
            // Left middle conditions
            if (tiles[6].state != 0 && tiles[6].state == tiles[7].state && tiles[7].state == tiles[8].state) // Left Bottom to Right Bottom
                return tiles[6].state
                
            return 0; // Default condition
        }),
        is_board_full: (function() {
            for (var i = 0; i < this.tiles.length; i++) {
                if (this.tiles[i].state == 0)
                    return false;
            }
            return true;
        }),
        get_empty_tiles: (function() {
            var empty = [];
            for (var i = 0; i < this.tiles.length; i++) {
                if (this.tiles[i].state == 0)
                    empty.push(this.tiles[i]);
            }
            return empty;
        }),
        get_player_by_turn: (function(turn) {
            return (this.players[0].turn == turn-1) ? this.players[0] : this.players[1];
        }),
        get_player_by_current_turn: (function() {
            return this.get_player_by_turn(this.turn);
        }),
        switch_teams: (function() {
            var team1 = this.players[0].turn;
            this.players[0].turn = this.players[1].turn;
            this.players[1].turn = team1;
        }),
    }
    
    return Game;
})(); 

