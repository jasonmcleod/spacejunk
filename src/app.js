const port = process.env.PORT || 8001;

const GameService = new require('./services/GameService');
const telnet = require('telnet2');
const TelnetClient = require('./classes/TelnetClient');

const game = new GameService();

let telnetServer = telnet({ tty: true }, (client) => {
    game.connect(new TelnetClient(client));
});

game.bootstrap();

telnetServer.listen(port);

console.log(`Telnet server listening on ${port}...`);