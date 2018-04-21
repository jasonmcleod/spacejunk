class InventoryService {
    constructor(game) {
        this._game = game;
    }

    add(inv, item) {}

    remove(inv, item) {}

    swap(from, to, item) {}

    testIt() {
        console.log(this._gameService)
    }
}

module.exports.InventoryService = InventoryService;