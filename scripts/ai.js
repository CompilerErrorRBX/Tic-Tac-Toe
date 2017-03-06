var AI = (function ai() {
    function AI(options) {
        var defaults = {
            skill_level: 0,
            leaderboard: null,
            wins: 0,
            game: null,
            turn: -1,
        };
        options = $.extend(defaults, options);
        
        this.skill_level = options.skill_level;
        this.leaderboard = options.leaderboard;
        this.wins = options.wins;
        this.game = options.game;
        this.turn = options.turn;
        this.class_name = "ai";

    }
    
    AI.prototype = {
        prompt_turn: (function() {
            var ai = this;
            setTimeout(function() {
                console.log('AI skill level: ' + ai.skill_level);
                var moves = ai.check_win_conditions();
                var empty_tiles = ai.game.get_empty_tiles();
                var random_tile = empty_tiles[Math.floor(Math.random() * empty_tiles.length)];
                if (moves[0] != -1 && ai.skill_level > 0) {
                    ai.game.play(moves[0]);
                    return;
                }
                if (moves[1] != -1 && ai.skill_level > 1) {
                    ai.game.play(moves[1]);
                    return;
                }
                ai.game.play(random_tile.index);
            }, Math.random()*1000)
        }),
        add_win: (function() {
           this.wins++;
           this.leaderboard.find('.wins').html(this.wins);
        }),
        check_win_conditions: (function() {
            var empty_tiles = this.game.get_empty_tiles();
            var winning_move = -1, 
                blocking_move = -1;

            for (var i = 0; i < empty_tiles.length; i++) {
                var tile = empty_tiles[i];
                this.game.tiles[tile.index].state = this.turn + 1;
                if (this.game.check_winner() != 0) {
                    winning_move = tile.index;
                }
                this.game.tiles[tile.index].state = this.turn == 0 ? 2 : 1;
                if (this.game.check_winner() != 0) {
                    blocking_move = tile.index;
                }
                this.game.tiles[tile.index].state = 0;
            }
            return [winning_move, blocking_move];
        })
    }
    
    return AI;
})(); 
 
