module.exports.load = function(game) {
    // invent items
    game.itemService.inventItem({ type:'item', name: 'magnet', attributes: ['size'] });
    game.itemService.inventItem({ type:'item', name: 'gear', attributes: ['size'] });
    game.itemService.inventItem({ type:'item', name: 'wire', attributes: ['length', 'color'] });
    game.itemService.inventItem({ type:'item', name: 'metal bar', attributes: ['length'] });
    game.itemService.inventItem({ type:'item', name: 'sheet of paper', attributes: ['size'] });
    game.itemService.inventItem({ type:'item', name: 'enclosure', attributes: ['size'] });
    game.itemService.inventItem({ type:'item', name: 'spring', attributes: ['length'] });
    game.itemService.inventItem({ type:'item', name: 'screw', attributes: ['length'] });
    game.itemService.inventItem({ type:'item', name: 'bolt', attributes: ['length'] });
    game.itemService.inventItem({ type:'item', name: 'washer', attributes: ['size'] });
    game.itemService.inventItem({ type:'item', name: 'screen', attributes: ['size'] });
    game.itemService.inventItem({ type:'item', name: 'circuit board', attributes: ['size'] });
    game.itemService.inventItem({ type:'item', name: 'pencil', use: 'marking' });
    game.itemService.inventItem({ type:'item', name: 'ink pen', use: 'marking', attributes: ['color'] });
    game.itemService.inventItem({ type:'item', name: 'marker', use: 'marking', attributes: ['color'] });
    game.itemService.inventItem({ type:'item', name: '12 volt battery' });
    game.itemService.inventItem({ type:'item', name: '9 volt battery' });
    game.itemService.inventItem({ type:'item', name: '1.5 volt battery' });    
    game.itemService.inventItem({ type:'item', name: 'metal pin' });
    game.itemService.inventItem({ type:'item', name: 'rock' });
    game.itemService.inventItem({ type:'item', name: 'cork' });
    game.itemService.inventItem({ type:'item', name: 'blade' });


    // invent blueprints
    game.itemService.inventItem({ type: 'blueprint', name: 'metal compass', items: ['enclosure', 'magnet', 'metal pin'] });
    game.itemService.inventItem({ type: 'blueprint', name: 'makeshift compass', items: ['bottle', 'magnet', 'metal pin', 'cork'] });
    game.itemService.inventItem({ type: 'blueprint', name: 'metal axe', items: ['metal bar', 'bolt', 'metal nut', 'blade'] });
    game.itemService.inventItem({ type: 'blueprint', name: 'makeshift axe', items: ['wood', 'wire', 'rock'] });
    game.itemService.inventItem({ type: 'blueprint', name: 'fishing pole', items: ['wood', 'wire', 'cork'] });
    

    // forget items - useful for purging stuff out of data.json
    // game.itemService.forgetItem('blade');
};