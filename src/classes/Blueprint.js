class Blueprint {
    constructor(props) {
        Object.assign(this, props);
    }

    fullName() {
        return this.name;
    }
}

module.exports = Blueprint;