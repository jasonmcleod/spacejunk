const path = require('path');
const fs = require('fs');
const RoomService = require('./RoomService');
const ChatService = require('./ChatService');
const ItemService = require('./ItemService');
const PlayerService = require('./PlayerService');
const CommandService = require('./CommandService');
const InventoryService = require('./InventoryService');

const PlayScene = require('../scenes/PlayScene');
const LoginScene = require('../scenes/LoginScene');

const Room = require('../classes/Room');
const Item = require('../classes/Item');
const Blueprint = require('../classes/Blueprint');

const commands = require('../bootstrap/commands');
const items = require('../bootstrap/items');
const blueprints = require('../bootstrap/blueprints');
const attributes = require('../bootstrap/attributes');

const scenes = {
    play: PlayScene,
    login: LoginScene
};

class GameService {
    constructor() {

        this.roomService = new RoomService(this);
        this.chatService = new ChatService(this);
        this.itemService = new ItemService(this);
        this.playerService = new PlayerService(this);
        this.commandService = new CommandService(this);
        this.inventoryService = new InventoryService(this);

        this.state = {
            rooms:[],
            items: [],
            blueprints: [],
            attributes: {}
        };
        this.players = {};
        this.connections = [];
        this.attributes = {};
    }

    connect(client) {
        this.connections.push(client);
        this.setScene(client, 'login');
        console.log('client connected');
    }

    save() {
        const payload = JSON.stringify(this.state);
        fs.writeFileSync(path.resolve(__dirname, '../../data/data.json'), payload);
    }

    wipe() {
        fs.writeFileSync(path.resolve(__dirname, '../../data/data.json'), '');
        console.log('DESTROYED ALL GAME DATA');
    }

    load() {
        const contents = fs.readFileSync(path.resolve(__dirname, '../../data/data.json'), 'utf8');
        let data = false;
        try {
            data = JSON.parse(contents);
        } catch(err) { }
        if(data) {
            if(data.rooms) this.state.rooms = data.rooms.map(i => new Room(i));
            if(data.attributes) this.state.attributes = data.attributes;
            if(data.items) this.state.items = data.items.map(i => new Item(i));
            if(data.blueprints) this.state.blueprints = data.blueprints.map(i => new Blueprint(i));
            if(data.inventory) this.state.inventory = {};

            for(let i in data.inventory) {
                this.state.inventory[i] = data.inventory[i].map(i => new Item(i));
            }
        }
    }

    bootstrap() {
        this.load();

        blueprints.load(this);
        attributes.load(this);
        commands.load(this);
        items.load(this);

        this.save();

        const possibleVariants = this.itemService.calculateVariants();

        console.log('Possible item variants:', possibleVariants);
        console.log('Possible blueprints', this.state.blueprints.length);
    }

    setScene(client, scene) {
        client.scene = new scenes[scene](client, this);
    }
}

module.exports = GameService;