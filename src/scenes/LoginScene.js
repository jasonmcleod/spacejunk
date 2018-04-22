const blessed = require('blessed');

class LoginScene {
    constructor(client, game) {

        this.client = client;
        this.game = game;

        this.username = false;
        this.password = false;

        this.build();
        this.createBindings();
    }

    build() {
        this.bg = blessed.box({
            parent: this.client.screen,
            mouse: true,
            keys: true,
            left: 0,
            top: 0,
            width: '100%',
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

        this.loginField = blessed.textbox({
            inputOnFocus: true,
            parent: this.client.screen,
            border: 'line',
            height: 'shrink',
            width: 'half',
            top: 20,
            left: 'center',
            label: ' {white-fg}Account name or e-mail address{/white-fg} ',
            border:'bg',
            tags: true,
            keys: true
        });

        this.passwordField = blessed.textbox({
            censor: true,
            inputOnFocus: true,            
            parent: this.client.screen,
            border: 'line',
            height: 'shrink',
            width: 'half',
            top: 25,
            left: 'center',
            label: ' {white-fg}Password{/white-fg} ',
            border:'bg',
            tags: true,
            hidden:true,
            keys: true
        });

        this.error = blessed.box({
            parent: this.client.screen,
            left: 'center',
            top: 30,
            width: 'half',
            height: 5,
            border:'ch',
            style: {
                bg: 'red'
            },
            tags:true,
            hidden:true,
            label: 'Login failed'
        });
    }

    createBindings() {

        this.loginField.on('submit', (value) => {
            this.username = value;
            this.passwordField.show();
            this.passwordField.focus();            
            this.client.screen.render();
        });

        this.passwordField.on('submit', (value) => {
            this.password = value;
            this.game.playerService.login(this.client, this.username, this.password, (state) => {
                if(!state.success) {
                    this.showError(state.message);
                }
            });
        });

        this.loginField.on('keypress', () => { this.clearError(); });
        this.passwordField.on('keypress', () => { this.clearError(); });

        this.loginField.focus();
        this.client.screen.render();
    }

    clearError() {
        this.error.hide();
    }

    showError(error) {
        this.error.setContent(`\n{center}${error}{/center}`);
        this.error.show();

        this.passwordField.hide();
        this.passwordField.clearValue();        

        this.loginField.focus();

        this.client.screen.render();
    }
}

module.exports = LoginScene;