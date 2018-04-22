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
        action: (client, args) => game.reset()
    });

    game.commandService.add('pos', {
        tip: 'Show your position',
        action: (client, input) => { client.console.add(`Position: ${client.player.x}, ${client.player.y}`)}
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

};