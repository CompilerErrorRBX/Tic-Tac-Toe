var Player = (function player() {
    function Player(options) {
        var defaults = {
            leaderboard: null,
            wins: 0,
            turn: -1,
        };
        options = $.extend(defaults, options);
        
        this.leaderboard = options.leaderboard;
        this.wins = options.wins;
        this.turn = options.turn;
        this.class_name = "player";
    }
    
    Player.prototype = {
        prompt_turn: (function() {
            
        }),
        add_win: (function() {
           this.wins++;
           this.leaderboard.find('.wins').html(this.wins);
        }),
    }
    
    return Player;
})(); 
