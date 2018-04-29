const fs = require('fs');
const path = require('path');
const dbPath = path.resolve(__dirname, '../../data/database.db');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(null, null, null, { dialect: 'sqlite', storage: dbPath});

const Player = require('../classes/Player');
const Item = require('../classes/Item');




class PlayerService {
    constructor(game) {
        this.game = game;

        this.dbModel = sequelize.define('player', {
            id: {type: Sequelize.INTEGER, primaryKey: true},
            name: Sequelize.STRING,
            password: Sequelize.STRING,
            x: Sequelize.INTEGER,
            y: Sequelize.INTEGER,
            hp: Sequelize.INTEGER,
            hpMax: Sequelize.INTEGER,
            inventory: Sequelize.STRING
        });
    }

    login(client, name, password, callback) {
        this.dbModel.find({where:{name, password}}).then((result) => {
            if(!result) return callback({success: false, message: 'Invalid credentials'});

            client.authenticated = true;
            const data = result.dataValues;
            const items = JSON.parse(data.inventory || '[]');
            data.inventory = items.map((i) => new Item(i));
            client.player = new Player(data);

            this.setPosition(client, client.player.x, client.player.y);
            this.game.setScene(client, 'play');

            callback({success: true, character: result.dataValues.id});
        });
    }

    save(client) {
        this.dbModel.update({
            x: client.player.x,
            y: client.player.y,
            hp: client.player.hp,
            hpMax: client.player.hpMax,
            inventory: JSON.stringify(client.player.inventory)
        }, {where: { id: client.player.id }});
    }

    setPosition(client, x, y) {
        client.player.x = x;
        client.player.y = y;
        client.player.room = this.game.roomService.get(x, y);
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

    search(client) {
        if(client.player.inventory.length) {
            client.console.add('You search your inventory and find:');
            this.game.inventoryService.search(client, client.player.inventory);
        } else {
            client.console.add(`Your inventory is empty.`);
        }
    }
}

module.exports = PlayerService;