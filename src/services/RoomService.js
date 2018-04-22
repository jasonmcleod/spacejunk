class RoomService {
    constructor(game) {
        this.game = game;
    }

    get(x, y) {
        let room;

        // search for this room
        let roomIndex = this.game.state.rooms.findIndex((r) => r.x == x && r.y == y);

        // if the room is not there, create it
        if(roomIndex <= -1) {
            this.game.state.rooms.push(new Room({x, y}));
            room = this.game.state.rooms[this.game.state.rooms.length - 1];

            let total = C.ALWAYS_FIND_ITEMS ? C.ITEM_COUNT : range(0, C.ITEM_COUNT);
    
            for(let r = 0; r < total; r++) {
                room.items.push(itemService.select(room, C.CONTAINER_TYPE_ROOM));
            }
            dataService.save();
        } else {
            room = this.game.state.rooms[roomIndex];
        }

        // return the results of the find, or creation
        return room;
    }

    search(inv, item) {}
}

module.exports = RoomService;