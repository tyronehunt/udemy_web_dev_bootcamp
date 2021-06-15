const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

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
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const list_id = "c7b586589d";
  const test_api_key = "cf6455253a9ac119881baba69ddaef4e-us6";
  const url = "https:/us6.api.mailchimp.com/3.0/lists/" + list_id;
  const options = {
    method: "POST",
    auth: "forgiggles:" + test_api_key
  };

  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

});


app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
