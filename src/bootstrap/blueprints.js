module.exports.load = function(game) {
    // invent blueprints
    game.itemService.inventItem({ type: 'blueprint', name: 'metal compass', items: ['enclosure', 'magnet', 'metal pin'] });
    game.itemService.inventItem({ type: 'blueprint', name: 'makeshift compass', items: ['bottle', 'magnet', 'metal pin', 'cork'] });
    game.itemService.inventItem({ type: 'blueprint', name: 'metal axe', items: ['metal bar', 'bolt', 'metal nut', 'blade'] });
    game.itemService.inventItem({ type: 'blueprint', name: 'makeshift axe', items: ['wood', 'wire', 'rock'] });
    game.itemService.inventItem({ type: 'blueprint', name: 'fishing pole', items: ['wood', 'wire', 'cork'] });

    // forget blueprints
    // game.itemService.forgetItem('fishing pole');
};