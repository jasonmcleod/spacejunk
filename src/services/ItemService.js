const C = require('../constants');
const Item = require('../classes/Item');

class ItemService {
    constructor(game) {
        this.game = game;
    }

    inventItem(props) {
        if(!props.hasOwnProperty('name')) { console.log(`Itemservice.inventItem: IGNORED item ??? - missing name`); return; };
        const workingItem = new Item(props);

        if(!this.game.state.items.find((i) => i.name == workingItem.name)) {
            this.game.state.items.push(workingItem);
            console.log(`ItemService.inventItem: ${workingItem.name} invented.`);
        } else {
            console.log(`ItemService.inventItem: ${workingItem.name} IGNORED: Already exists.`);
        }
    }
    
    forgetItem(name) {
        // todo: find all instances in inventory and remove as well
        const found = this.game.state.items.findIndex((i) => i.name == name);
        if(found) {
            this.game.state.items.splice(found, 1);
            console.log(`ItemService.forgetItem: ${name} forgotten.`);
        } else {
            console.log(`ItemService.forgetItem: ${name} IGNORED: Could not find item.`);
        }
    }

    createItem(container, containerType) {
        // randomize between items and blueprints
        // if blueprint - we need to generate the random items required to build it
        let base = this.game.state.items[range(0, this.game.state.items.length-1)];
        console.log('creating item', base);
        if(base.type === 'blurprint') {
            console.log('this is a blueprint, we need to generate the random items');
        }
        const item = {base};
        if(base.attributes) {
            base.attributes.forEach((attr, i) => {
                let pick = range(0, this.game.state.attributes[attr].length);
                item[attr] = this.game.state.attributes[attr][pick];
            });
        }

        this.game.save();

        return new Item(item);
    }

    calculateVariants() {
        let total = 0;
        this.game.state.items.forEach((i) => {
            if(i.attributes) {
                i.attributes.forEach((attr) => {                    
                    this.game.state.attributes[attr].forEach((value) => {                       
                        total++;
                    });                    
                });
            } else {
                total++;
            }
        });
        return total;
    }

    searchFor(source, search) {
        let index = false;
        if(search*1 != search) {
            for(let i in source) {
                if(search == source[i].fullName()) {
                    index = i;
                    continue;
                }
            }
        } else {
            if(search > source.length) {            
                return false;
            } else {
                index = search - 1;
            }
        }
        return index;
    }

    take(client, source, item) {    
        client.player.inventory.push(source[item]);
        source.splice(item, 1);
        this.game.save();
    }

    drop(client, source, item) {
        client.player.room.inventory.push(source[item]);
        client.player.inventory.splice(item, 1);
        this.game.save();
    }

    research(client, search) {
        const found = this.searchFor(client.player.inventory, search);
        const item = client.player.inventory[found];
        if(item) {
            if(item.base.type === 'blueprint') {
                console.log(item);
                client.console.add(`You begin to research the ${item.fullName()} blueprint`);
                client.console.add(`${item.description()}`);
                client.console.add(`The materials required to build the ${item.fullName()} include`);
                // for(let p = 0; p < item.items; p++) {
                //     client.console.add(`The materials required to build the ${item.fullName()} include`);
                // }
            } else {
                client.console.add(`You begin to research the ${item.fullName()}`);
            }
        } else {
            client.console.add(`Not in your inventory`);
        }
    }
}

module.exports = ItemService;