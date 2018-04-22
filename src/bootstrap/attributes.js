module.exports.load = function(game) {
    Object.assign(game.state.attributes, {
        length:  ['very short', 'short', 'long', 'very long'],
        size:    ['very small', 'small', 'large', 'very large'],
        quality: ['low quality', 'high quality'],
        color:   ['red', 'blue', 'green', 'yellow']
    });
}