const C = require('../constants');
const Item = require('../classes/Item');
const Blueprint = require('../classes/Blueprint');

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

    inventBlueprint(props) {
        if(!props.hasOwnProperty('name')) { console.log(`Itemservice.inventBlueprint: IGNORED blueprint ??? - missing name`); return; };
        if(!props.hasOwnProperty('items')) { console.log(`Itemservice.inventBlueprint: IGNORED blueprint ${props.name} - missing items array`); return; };

        const workingItem = new Blueprint(props);

        if(!this.game.state.blueprints.find((i) => i.name == workingItem.name)) {
            this.game.state.blueprints.push(workingItem);
            console.log(`ItemService.inventBlueprint: ${workingItem.name} invented.`);
        } else {
            console.log(`ItemService.inventBlueprint: ${workingItem.name} IGNORED: Already exists.`);
        }
    }

    forgetBlueprint(name) {
        // todo: find all instances in inventory and remove as well
        const found = this.game.state.blueprints.findIndex((i) => i.name == name);
        if(found) {
            this.game.state.blueprints.splice(found, 1);
            console.log(`ItemService.forgetBlueprint: ${name} forgotten.`);
        } else {
            console.log(`ItemService.forgetBlueprint: ${name} IGNORED: Could not find blueprint.`);
        }
    }

    createItem(container, containerType) {
        let base = this.game.state.items[range(0, this.game.state.items.length-1)];
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

    createBlueprint(container, containerType) {
        const bp = this.game.state.blueprints[range(0, this.game.state.blueprints.length-1)];
        this.game.save();
        return bp;
    }

    select(container, containerType) {
        let rnd = range(0, 100);
        let blueprint = rnd <= C.BLUEPRINT_CHANCE;
        if(blueprint) {
            return this.createBlueprint(container, containerType);
        } else {
            return this.createItem(container, containerType);
        }
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
    }

    drop(client, source, item) {
        client.player.room.inventory.push(item);
        client.player.inventory.splice(item, 1);
    }
}

module.exports = ItemService;