const blessed = require('blessed');
const Console = require('./Console');

class TelnetClient {
    constructor(client) {
        this.connectionType = 'telnet';
        this.client = client;
        this.authenticated = false;
        this.console = new Console(this);

        this.screen = blessed.screen({
            smartCSR: true,
            input: this.client,
            output: this.client,
            terminal: 'xterm-256color',
            fullUnicode: true
        });

        this.screen.on('destroy', () => {
            if (this.client.writable) {
                this.client.destroy();
            }
        });

        this.screen.key('q', () => {
            this.client.destroy();
        });
               
        this.client.on('debug', (msg) => {
            console.error(msg);
        });
    
        this.client.on('term', (terminal) => {
            this.screen.terminal = terminal;
            this.screen.render();
        });

        this.client.on('size', (width, height) => {
            this.client.columns = width;
            this.client.rows = height;
            this.client.emit('resize');
        });

        this.client.on('close', () => {
            if (!this.screen.destroyed) {
                this.client.destroy();
            }
        });
    }

}

module.exports = TelnetClient;