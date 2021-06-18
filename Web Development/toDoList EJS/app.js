const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

// Set placeholder for to do list item
const items = ["Add an item like this"];
const workItems = ["Add an item like this"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// ROOT get function
app.get("/", function(req, res) {

  const day = date.getDate();

  res.render('list', {
    listTitle: day,
    newListItems: items
  });
});

// WORK get function
app.get("/work", function(req, res){
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});


// About get function
app.get("/about", function(req, res){
  res.render("about");
});


// Post from form in list.ejs
app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work")
  } else {
    items.push(item);
    res.redirect("/")
  }
})


app.listen(3000, function() {
  console.log("Server running on port 3000");
});
