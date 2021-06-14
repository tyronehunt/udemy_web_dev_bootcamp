const express=require("express");
const https = require("https");

const app = express();

// The GET request from the end-users browser to our server at / will in turn create a GET request to openweathermap
app.get("/", function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=a651691c6e7a3c4f3df9582c6dad929f&units=metric"

  // GET request to openweathermap
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
      res.write("<h1>The temperature in London is " + temp + "C</h1>")
      res.write("<img src=" + imgUrl + ">")
      res.send()
      console.log(weatherDescription);
    })
  })
})


app.listen(3000, function() {
  console.log("server is running on port 3000.")
})
