class ChatService {

    constructor(game) {
        this.game = game;
    }

    send(client, message) {
        this.game.connections.forEach((c) => {
            c.console.add(`{cyan-fg}${client.player.name} says{/cyan-fg} ${message}`);
        });
    }

}

module.exports = ChatService;