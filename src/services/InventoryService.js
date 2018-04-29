class InventoryService {
    constructor(game) {
        this.game = game;
    }

    take(client, input) {
        const found = this.game.itemService.searchFor(client.player.room.inventory, input);
        if(found!==false) {
            client.console.add(`You pick up ${client.player.room.inventory[found].fullName()}`);
            this.game.itemService.take(client, client.player.room.inventory, found);                
        } else {
            client.console.add(`Can't find that.`);
        }
    }

    drop(client, input) {
        const found = this.game.itemService.searchFor(client.player.inventory, input);
        if(found!==false) {
            client.console.add(`You drop ${client.player.inventory[found].fullName()}`);
            this.game.itemService.drop(client, client.player.inventory, found);                
        } else {
            client.console.add(`You don't have that.`);
        }
    }

    search(client, inventory) {
        inventory.forEach((item, i) => {
            if(item.base.type === 'blueprint') {
                client.console.add(`    ${i+1}: {cyan-fg}${item.fullName()}{/cyan-fg}`);
            } else {
                client.console.add(`    ${i+1}: ${item.fullName()}`);
            }
        });    
    }

}

module.exports = InventoryService;