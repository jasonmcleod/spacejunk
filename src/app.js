const GameService = new require('./services/GameService').GameService;
const telnet = require('telnet2');
const port = process.env.PORT || 8001;
const TelnetClient = require('./classes/TelnetClient');

const game = new GameService();

let telnetServer = telnet({ tty: true }, (client) => {
    game.connect(new TelnetClient(client));
});

telnetServer.listen(port);

console.log(`Telnet server listening on ${port}...`);