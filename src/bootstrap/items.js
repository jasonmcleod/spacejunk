module.exports.load = function(game) {
    // invent items
    game.itemService.inventItem({ name: 'magnet', attributes: ['size'] });
    game.itemService.inventItem({ name: 'gear', attributes: ['size'] });
    game.itemService.inventItem({ name: 'wire', attributes: ['length', 'color'] });
    game.itemService.inventItem({ name: 'metal bar', attributes: ['length'] });
    game.itemService.inventItem({ name: 'sheet of paper', attributes: ['size'] });
    game.itemService.inventItem({ name: 'enclosure', attributes: ['size'] });
    game.itemService.inventItem({ name: 'spring', attributes: ['length'] });
    game.itemService.inventItem({ name: 'screw', attributes: ['length'] });
    game.itemService.inventItem({ name: 'bolt', attributes: ['length'] });
    game.itemService.inventItem({ name: 'washer', attributes: ['size'] });
    game.itemService.inventItem({ name: 'screen', attributes: ['size'] });
    game.itemService.inventItem({ name: 'circuit board', attributes: ['size'] });
    game.itemService.inventItem({ name: 'pencil', use: 'marking' });
    game.itemService.inventItem({ name: 'ink pen', use: 'marking', attributes: ['color'] });
    game.itemService.inventItem({ name: 'marker', use: 'marking', attributes: ['color'] });
    game.itemService.inventItem({ name: '12 volt battery' });
    game.itemService.inventItem({ name: '9 volt battery' });
    game.itemService.inventItem({ name: '1.5 volt battery' });    
    game.itemService.inventItem({ name: 'metal pin' });
    game.itemService.inventItem({ name: 'rock' });
    game.itemService.inventItem({ name: 'cork' });
    game.itemService.inventItem({ name: 'blade' });

    // forget items - useful for purging stuff out of data.json
    game.itemService.forgetItem('blade');
};