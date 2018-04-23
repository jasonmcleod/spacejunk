const util = require('util');
module.exports.load = (game) => {
    game.commandService.add('help', {
        alias: ['commands'],
        tip: 'lists all commands.',
        action: (client) => {
            for (let k in game.commandService.commands) {
                let command = `{green-fg}${k}{/green-fg}`;
                if(game.commandService.commands[k].alias) command += ' (alias: ' + game.commandService.commands[k].alias.join(', ') + ')';
                client.console.add(`${command}`);
                client.console.add(`     ${game.commandService.commands[k].tip}`)
            }
        }
    });

    // chat
    game.commandService.add('say', {
        tip: 'Send a message to all connected players.',
        action: (client, args) => game.chatService.send(client, args)
    });

    // admin / debug stuff
    game.commandService.add('save', {
        tip: 'Save state to disk',
        action: (client, args) => game.save()
    });

    game.commandService.add('load', {
        tip: 'Load state from disk',
        action: (client, args) => game.load()
    });

    game.commandService.add('wipe', {
        alias: ['reset'],
        tip: 'Load state from disk',
        action: (client, args) => game.wipe()
    });

    game.commandService.add('pos', {
        tip: 'Show your position',
        action: (client, input) => { client.console.add(`Position: ${client.player.x}, ${client.player.y}`)}
    });

    game.commandService.add('state', {
        tip: 'Dump state to console',
        action: (client, input) => { console.log(util.inspect(game.state, false, 100, true)); }
    });

    // movement
    game.commandService.add('go', {
        alias: ['move', 'head', 'travel', 'walk'],
        tip: 'Move in any direction (north | n, south | s, east | e, west | w)',
        action: (client, input) => game.playerService.parseMovement(client, input)
    });

    game.commandService.add('north', {
        alias: ['n'],
        tip: 'Move north',
        action: (client, input) => game.playerService.parseMovement(client, 'north')
    });

    game.commandService.add('south', {
        alias: ['s'],
        tip: 'Move south',
        action: (client, input) => game.playerService.parseMovement(client, 'south')
    });

    game.commandService.add('east', {
        alias: ['e'],
        tip: 'Move east',
        action: (client, input) => game.playerService.parseMovement(client, 'east')
    });

    game.commandService.add('west', {
        alias: ['w'],
        tip: 'Move west',
        action: (client, input) => game.playerService.parseMovement(client, 'west')
    });


    // room
    game.commandService.add('search', {
        alias: ['scan'],
        tip: 'Search the area',
        action: (client, input) => game.roomService.search(client)
    });

    game.commandService.add('take', {
        alias: ['get', 'grab'],
        tip: 'Take an item from the area',
        action: (client, input) => {
            const found = game.itemService.searchFor(client.player.room.inventory, input);
            console.log(found);
            if(found!==false) {
                client.console.add(`You pick up ${client.player.room.inventory[found].fullName()}`);
                game.itemService.take(client, client.player.room.inventory, found);                
            } else {
                client.console.add(`Can't find that.`);
            }
        }
    });

    game.commandService.add('drop', {
        alias: ['leave', 'throw'],
        tip: 'Drop an item from your inventory onto the ground',
        action: (client, input) => {
            const found = game.itemService.searchFor(client.player.inventory, input);
            console.log(found);
            if(found!==false) {
                client.console.add(`You drop ${client.player.inventory[found].fullName()}`);
                game.itemService.drop(client, client.player.inventory, found);                
            } else {
                client.console.add(`You don't have that.`);
            }
        }
    });

    game.commandService.add('bag', {
        alias: ['inventory'],
        tip: `Review what's in your inventory`,
        action: (client, input) => {
            if(client.player.inventory.length) {
                client.console.add(`You open your bag to find ${client.player.inventory.length} items:`);
                client.player.inventory.forEach((item, i) => {
                    client.console.add(`    ${i+1}: ${item.fullName()}`);
                });
            } else {
                client.console.add('You have nothing in your bag.');
            }
        }
    });

};