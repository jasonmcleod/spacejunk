class Player {
    constructor(props) {
        this.id = props.id;
        this.x = props.x;
        this.y = props.y;
        this.name = props.name;
        this.inventory = props.inventory || [];
    }
}

module.exports = Player;