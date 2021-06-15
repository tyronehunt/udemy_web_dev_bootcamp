const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

// Enable public static resources
app.use(express.static("public"));

// Enable bodyParser library for form post requests
app.use(bodyParser.urlencoded({extended: true}));


// Fetch html page for rendering
app.get("/", function(req, res) {
   res.sendFile(__dirname + "/signup.html")
});


// Post data from form
app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  console.log(firstName, lastName, email)
});


app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
