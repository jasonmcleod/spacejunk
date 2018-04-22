const blessed = require('blessed');

class PlayScene {
    constructor(client, game) {

        this.client = client;
        this.game = game;

        this.username = false;
        this.password = false;

        this.build();
        this.createBindings();
    }

    build() {
        this.console = blessed.box({
            parent: this.client.screen,
            tags:true,
            left: 0,
            top: 0,
            width: '100%',
            height: '90%',
            style: {
                bg: 'grey',
                scrollbar: {
                    inverse: true
                }
            },
            scrollable: true,
            scrollbar: {
                ch: ' '
            }
        });

        this.commandField = blessed.textbox({
            inputOnFocus: true,
            parent: this.client.screen,
            border: 'line',
            height: '10%',
            width: '100%',
            bottom: 0,
            left: 0,
            border:'bg',
            tags: true,
            keys: true
        });
    }

    createBindings() {
        this.commandField.on('submit', (value) => {
            this.game.commandService.parse(this.client, value);
            this.commandField.clearValue();
            this.commandField.focus();
            this.client.screen.render();       
        });

        this.commandField.focus();
        this.client.screen.render();
    }

}

module.exports.PlayScene = PlayScene;