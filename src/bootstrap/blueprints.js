module.exports.load = function(game) {
    // invent blueprints
    game.itemService.inventBlueprint({ name: 'metal compass', items: ['enclosure', 'magnet', 'metal pin'] });
    game.itemService.inventBlueprint({ name: 'makeshift compass', items: ['bottle', 'magnet', 'metal pin', 'cork'] });
    game.itemService.inventBlueprint({ name: 'metal axe', items: ['metal bar', 'bolt', 'metal nut', 'blade'] });
    game.itemService.inventBlueprint({ name: 'makeshift axe', items: ['wood', 'wire', 'rock'] });
    game.itemService.inventBlueprint({ name: 'fishing pole', items: ['wood', 'wire', 'cork'] });

    // forget blueprints
    // game.itemService.forgetBlueprint('fishing pole');
};