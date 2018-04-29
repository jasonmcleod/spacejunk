module.exports.load = function(game) {
    // invent items
    game.itemService.inventItem({ type:'item', name: 'magnet', attributes: ['size'] });
    // game.itemService.inventItem({ type:'item', name: 'gear', attributes: ['size'] });
    // game.itemService.inventItem({ type:'item', name: 'wire', attributes: ['length', 'color'] });
    // game.itemService.inventItem({ type:'item', name: 'metal bar', attributes: ['length'] });
    // game.itemService.inventItem({ type:'item', name: 'sheet of paper', attributes: ['size'] });
    // game.itemService.inventItem({ type:'item', name: 'enclosure', attributes: ['size'] });
    // game.itemService.inventItem({ type:'item', name: 'spring', attributes: ['length'] });
    // game.itemService.inventItem({ type:'item', name: 'screw', attributes: ['length'] });
    // game.itemService.inventItem({ type:'item', name: 'bolt', attributes: ['length'] });
    // game.itemService.inventItem({ type:'item', name: 'washer', attributes: ['size'] });
    // game.itemService.inventItem({ type:'item', name: 'screen', attributes: ['size'] });
    // game.itemService.inventItem({ type:'item', name: 'circuit board', attributes: ['size'] });
    // game.itemService.inventItem({ type:'item', name: 'pencil', use: 'marking' });
    game.itemService.inventItem({ type:'item', name: 'ink pen', use: 'marking', attributes: ['color'] });
    // game.itemService.inventItem({ type:'item', name: 'marker', use: 'marking', attributes: ['color'] });
    // game.itemService.inventItem({ type:'item', name: '12 volt battery' });
    // game.itemService.inventItem({ type:'item', name: '9 volt battery' });
    // game.itemService.inventItem({ type:'item', name: '1.5 volt battery' });    
    // game.itemService.inventItem({ type:'item', name: 'metal pin' });
    // game.itemService.inventItem({ type:'item', name: 'rock' });
    // game.itemService.inventItem({ type:'item', name: 'cork' });
    // game.itemService.inventItem({ type:'item', name: 'scrap metal' });


    // invent blueprints
    game.itemService.inventItem({
        type: 'blueprint',
        name: 'map',
        items: ['sheet of paper', 'ink pen'],
        description: 'A map lets you record the areas you have been before.',
    });

    game.itemService.inventItem({
        type: 'blueprint',
        name: 'metal compass',
        items: ['enclosure', 'magnet', 'metal pin'],
        description: 'A compass combined with a map will help you navigate the terrain.',
        skill: {
            engineering: 10,
        }
    });

    game.itemService.inventItem({
        type: 'blueprint',
        name: 'makeshift compass',
        items: ['bottle', 'magnet', 'metal pin', 'cork'],
        description: 'A makeshift compass combined with a map will help you navigate the terrain.',
    });

    game.itemService.inventItem({
        type: 'blueprint',
        name: 'metal axe',
        items: ['metal bar','bolt', 'metal nut', 'scrap metal'],
        description: 'An axe is useful for chopping wood and damaging things.',
    });

    game.itemService.inventItem({
        type: 'blueprint',
        name: 'fishing pole',
        items: ['wood', 'wire', 'cork'],
        description: 'Cast into open water and hope for the best.'
    });
    
    // forget items - useful for purging stuff out of data.json
    // game.itemService.forgetItem('blade');
};