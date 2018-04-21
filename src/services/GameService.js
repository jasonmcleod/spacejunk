const InventoryService = require('./InventoryService').InventoryService
const RoomService = require('./RoomService').RoomService

class GameService {
    constructor() {
        this._inventoryService = new InventoryService(this);
        this._roomService = new RoomService(this);
        this.players = {};
        this.connections = [];
    }

    connect(client) {
        this.connections.push(this.client);
        console.log('client connected');
    }

    save() {
        console.log('save');
    }   

    load() {
        console.log('load');
    }
}

module.exports.GameService = GameService;