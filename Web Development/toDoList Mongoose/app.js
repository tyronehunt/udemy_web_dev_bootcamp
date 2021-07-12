const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// Connect to MongoDB database with mongoose
mongoose.connect("mongodb://localhost: 27017/todolistDB", {
  useNewUrlParser: true
});

// Create Mongoose Schema
const itemsSchema = {
  name: String
};
// Create Mongoose model
const Item = mongoose.model("Item", itemsSchema);

// Create default Items documents
const item1 = new Item({
  name: "Welcome to your to do List!"
})
const item2 = new Item({
  name: "Hit + button to add a new item."
})
const item3 = new Item({
  name: "<-- Hit this to delete an item."
})
const defaultItems = [item1, item2, item3]

// Create a schema which stores an array of itemsSchema
const listSchema = {
  name: String,
  items: [itemsSchema]
};

// Create mongoose model for listSchema
const List = mongoose.model("List", listSchema);


// ROOT get function
app.get("/", function(req, res) {

  const day = date.getDate();

  Item.find({}, function(err, foundItems) {

    if (foundItems.length === 0) {

      // Insert items into Items colleciton in DB (only if they don't yet exist)
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("saved default items to DB");
        }
      });
      res.redirect("/")
    } else {
      res.render('list', {
        listTitle: day,
        newListItems: foundItems
      });
    }
  });

})


// CREATE DYNAMIC ROUTE for MULTIPLE toDoLists
app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList){
    if (!err){
      if (!foundList){
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //Show an existing list
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  });

});


// Post from form in list.ejs
app.post("/", function(req, res) {

  // Post from list.ejs form post input name
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const day = date.getDate();

  // Create new item document in mongoDB
  const item = new Item({
    name: itemName
  });

  if (listName === day){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});


// Delete item from form in list.ejs
app.post("/delete", function(req, res) {

  // Post from list.ejs form post input name
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  const day = date.getDate();

  if (listName === day) {
    Item.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
      if (!err){
        res.redirect("/" + listName);
      }
    });
  }

});


// About get function
app.get("/about", function(req, res) {
  res.render("about");
});


app.listen(3000, function() {
  console.log("Server running on port 3000");
});
