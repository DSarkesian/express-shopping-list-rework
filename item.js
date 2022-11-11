const db = require("./fakeDb");
// destructer
const {NotFoundError} = require("./expressError")
class Item{
  constructor(name,price){
    this.name = name;
    this.price = price;

    db.items.push(this)
  }

  static findAll(){
    return db.items
  }

  static find(name) {
    const foundItem = db.items.find(v => v.name === name);
    if (foundItem === undefined) throw new NotFoundError();
    return foundItem;
  }

  static remove(name){
    console.log(db.items)
    let foundIndex = db.items.findIndex(item => item.name === name);
    console.log(db.items.name)
    if (foundIndex === -1) throw new NotFoundError();
    db.items.splice(foundIndex,1);

  }

  static update(name,data){
    const foundItem = Item.find(name);
    if (foundItem === undefined) throw new NotFoundError();

    foundItem.name = data.name;
    foundItem.price = data.price;

    return foundItem;
  }
}
module.exports = Item;
