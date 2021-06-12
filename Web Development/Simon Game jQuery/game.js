// Initiate game sequence array
var gamePattern = [];

// Initiate user clicked array
var userClickedPattern = [];

// Initiate array of game button colours
var buttonColours = ["red", "blue", "green", "yellow"];

// Variable to initiate game not started state
var started = false;

// Create a new variable called level and start at level 0.
var level = 0;

// Use jQuery to detect keypress. If first time, call nextSequence()
$(document).keypress(function() {
  if (!started) {
    // Update title to "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Detect when user clicks buttons and append to their selected sequence
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  console.log(userClickedPattern);

  // Check answer after user click, passing in index of the last answer in sequence
  checkAnswer(userClickedPattern.length-1);
});


// Function to check user answers
function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");

    // If most recent user answer is correct, check they have finished their sequence.
    if (userClickedPattern.length === gamePattern.length){

      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");

    playSound("wrong");

    //2. Add and remove css clas to body.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Update title index to game lost
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Restart Game
    startOver()
  }
}


// Function to create the game sequence
function nextSequence() {
  // Reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  // Increase the level by 1 every time nextSequence() is called
  level++;

  // Update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  // Generate random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);

  // Pick a colour based on the random number
  var randomChosenColour = buttonColours[randomNumber];

  // Append the randomly selected colour to the game sequence
  gamePattern.push(randomChosenColour);

  // Make selected element flash (using jQuery to select id=#blue for instance)
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play sound for button
  playSound(randomChosenColour);
}


// Function to play sound when buttons clicked
function playSound(name){
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}


// Function to animate button Press
function animatePress(currentColour){
  // Use jQuery to add pressed class to the button that gets clicked
  $("#" + currentColour).addClass("pressed");

  // Remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


// Function to restart game
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
