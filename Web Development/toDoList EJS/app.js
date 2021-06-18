const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Set placeholder for to do list item
var items = ["Add an item like this"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);


  res.render('list', {
    kindOfDay: day,
    newListItems: items
  });

});

// Post from form in list.ejs
app.post("/", function(req, res){
  item = req.body.newItem;

  items.push(item);

  res.redirect("/")

})


app.listen(3000, function() {
  console.log("Server running on port 3000");
});
