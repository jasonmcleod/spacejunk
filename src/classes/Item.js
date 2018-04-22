class Item {
    constructor(props) {
        Object.assign(this, props);
    }

    fullName() {
        let out = '';
        if(this.attributes) {
            this.attributes.forEach((a) => {
                out+= this[a] + ' ';
            });           
        }
        out+= this.name;
    }
}

module.exports = Item;