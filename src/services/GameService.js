const InventoryService = require('./InventoryService').InventoryService;
const RoomService = require('./RoomService').RoomService;
const CommandService = require('./CommandService').CommandService;
const PlayerService = require('./PlayerService').PlayerService;
const ChatService = require('./ChatService').ChatService;

const LoginScene = require('../scenes/LoginScene').LoginScene;
const PlayScene = require('../scenes/PlayScene').PlayScene;

const scenes = {
    login: LoginScene,
    play: PlayScene
};

class GameService {
    constructor() {
        this.inventoryService = new InventoryService(this);
        this.playerService = new PlayerService(this);
        this.roomService = new RoomService(this);
        this.commandService = new CommandService(this);
        this.chatService = new ChatService(this);
        this.players = {};
        this.connections = [];
    }

    connect(client) {
        this.connections.push(client);
        this.setScene(client, 'login');
        console.log('client connected');
    }

    save() {
        console.log('save');
    }   

    load() {
        console.log('load');
    }

    setScene(client, scene) {
        client.scene = new scenes[scene](client, this);
    }
}

module.exports.GameService = GameService;