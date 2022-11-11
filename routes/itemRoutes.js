/** Item in a shopping cart. */

const express = require("express");
const { find } = require("../item");

const Item = require("../item");

const router = express.Router();


router.get("/", function (req, res) {
  return res.json({items:Item.findAll()});
});

router.get("/:name", function (req, res){
  let foundItem = Item.find(req.params.name)
  return res.json({item: foundItem})
})

router.post("/", function (req,res){
  let newItem = new Item(req.body.name,req.body.price)
  return res.json({item:newItem});
})

router.patch("/:name",function (req,res){

  let updatedItem = Item.update(req.params.name,req.body);
  console.log(updatedItem)
  return res.json({item:updatedItem})
})

router.delete("/:name", function (req, res){
  Item.remove(req.params.name);
  return res.json({message:"Deleted"})

})
module.exports = router;
