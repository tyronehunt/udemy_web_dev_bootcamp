// Initiate game sequence array
var gamePattern = [];

// Initiate user clicked array
var userClickedPattern = [];

// Initiate array of game button colours
var buttonColours = ["red", "blue", "green", "yellow"];


// Function to create the game sequence
function nextSequence() {
  // Generate random number between 0 and 3
  var randomNumber = Math.round(Math.random()*3);

  // Pick a colour based on the random number
  var randomChosenColour = buttonColours[randomNumber];

  // Append the randomly selected colour to the game sequence
  gamePattern.push(randomChosenColour);

  // Make selected element flash (using jQuery to select id=#blue for instance)
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play sound for button
  var audio = new Audio('sounds/' + randomChosenColour + '.mp3');
  audio.play();
};

// Detect when user clicks buttons and append to their selected sequence
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern)
});
