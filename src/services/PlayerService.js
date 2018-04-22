const Player = require('../classes/Player').Player;

class PlayerService {
    constructor(game) {
        this._game = game;
    }

    login(client, username, password, callback) {
        callback({success: true});
        client.authenticated = true;
        client.player = new Player();
        this._game.setScene(client, 'play');
    }

    setPosition(client, x, y) {
        client.player.x = x;
        client.player.y = y;
    }

    parseMovement(client, input) {
        let x = 0;
        let y = 0;
        if(input === 'n' || input === 'north') y = -1;
        if(input === 's' || input === 'south') y = 1;
        if(input === 'w' || input === 'west') x = -1;
        if(input === 'e' || input === 'east') x = 1;
        
        const NS = y === 1 ? 'south' : y === 0 ? '' : 'north';
        const EW = x === 1 ? 'east' : x === 0 ? '' : 'west';

        this.setPosition(client, client.player.x + x, client.player.y + y)

        client.console.add(`You travel ${NS + EW}`);
        client.console.debug(`Position: ${client.player.x}, ${client.player.y}`);
    }
}

module.exports.PlayerService = PlayerService;