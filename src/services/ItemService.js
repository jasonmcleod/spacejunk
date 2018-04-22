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
        let base = this.game.state.baseItems[range(0, this.game.state.baseItems.length-1)];
        const item = {base};
        base.attributes.forEach((attr, i) => {
            let pick = range(0, variance[attr].length);
            item[attr] = variance[attr][pick];
        });

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
}

module.exports = ItemService;