const C = require('../constants');
class Console {
    constructor(client) {
        this.client = client;
    }

    debug(markup) {
        if(C.DEBUG) this.add(`{right}DEBUG: ${markup}{/right}`);
    }

    add(markup) {
        this.client.scene.console.setContent(this.client.scene.console.content + '\n' + markup);
        this.client.scene.console.setScrollPerc(100);
        this.client.screen.render();
    }
}

module.exports = Console;