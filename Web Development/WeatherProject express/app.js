const express=require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// The GET request from the end-user's browser to our server at home '/'
// will send over the index.html file
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")

})

app.post("/", function(req, res) {

  // Catch the data submitted via the form post in index.html
  const query = req.body.cityName;
  const apiKey = "a651691c6e7a3c4f3df9582c6dad929f"
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&units=" + units

  // Send GET request to openweathermap with the form values
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      // Turn string into JSON
      const weatherData = JSON.parse(data);

      // Or fetch individual JSON parameters
      const temp = weatherData.main.temp;
      const weatherDescription = "The weather is currently: " + weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>" + weatherDescription +  "<p>")
      res.write("<h1>The temperature in " +  query + " is " + temp + "C</h1>")
      res.write("<img src=" + imgUrl + ">")
      res.send()
      console.log(weatherDescription);
    })
  })

})


app.listen(3000, function() {
  console.log("server is running on port 3000.")
})
