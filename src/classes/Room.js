class Room {
    constructor(props) {
        Object.assign(this, props);
        this.inventory = props.inventory || [];
    }
}

module.exports = Room;