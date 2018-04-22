const C = require('../constants');
class CommandService {
    constructor(game) {
        this.game = game;
        this.commands = {};
    }

    add(command, obj) {
        if(this.commands.hasOwnProperty(obj)) {
            console.error(`ERROR: command ${command} is already bound`);
            process.exit();
        } else {
            this.commands[command] = obj;
        }
    }

    parse(client, text) {
        const data = text.trim();
        const parts = data.split(' ');
        const command = parts.shift().toLowerCase();
        const args = parts.join(' ');

        if(this.commands.hasOwnProperty(command)) {
            return this.commands[command].action(client, args);
        }
        
        for(let c in this.commands) {
            if(this.commands[c].alias && this.commands[c].alias.indexOf(command) > -1) {
                return this.commands[c].action(client, args);
            }
        }

        if(command.length) client.console.add(`${command} is not a valid command.`);

    }
}

module.exports = CommandService;