
const API_Key = "hhrAFEu9VLmshYEoZq51oSTYBHUIp1XokeGjsnITfzcjZD0nqK";
var categoryRtn = "";
var scoreCounter = 0;
var guessCounter = 0;
var authorRtn = "";
var insertInst1 = "Click the Famous button if you think the quote is from someone famous or click the Movie button if you think it was a quote from a movie scene.";
var score = scoreCounter + " / " + guessCounter;

function callData() { 
$.ajax({
  url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
  type: 'POST',
  data: {},
  dataType:'json',
  success: function(data) { 
    let quoteRtn = data.quote;
    authorRtn = data.author;
    categoryRtn = data.category;
    let tweeter = document.getElementById('tweetButton');
    let tweeter2 = document.getElementById('tweetButtonImg');
    $("#quote").text("Quote: \"" + quoteRtn + "\""); 
    tweeter.setAttribute('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quoteRtn + '" ' + authorRtn));
    tweeter.setAttribute('target', '_blank');
    tweeter2.setAttribute('title', 'Tweets the below quote');  
    },
  error: function(err) { alert(err); },
  beforeSend: function(xhr) {
  xhr.setRequestHeader("X-Mashape-Authorization", API_Key);}
  }); }
    
// This code to be run after the page loads
$(document).ready(function() {
  const getStarted = document.getElementById("beginButton");
  const guessFamous = document.getElementById("famousButton");
  const guessMovie = document.getElementById("movieButton");
  const clickNextButton = document.getElementById("nextButton");
  const clickFinishButton = document.getElementById("finishButton");

  // ### --- Event Listeners --- ### //
  
  // Get Started button
  getStarted.addEventListener('click', function(){
    scoreCounter = 0;
    guessCounter = 0;
    score = scoreCounter + " / " + guessCounter;
    document.getElementById('scoreValue').innerHTML = score;
    callData();
    document.getElementById('famousButton').classList.remove("d-none");
    document.getElementById("movieButton").classList.remove("d-none");
    document.getElementById("nextButton").classList.add("d-none");
    document.getElementById("beginButton").classList.add("d-none");
    document.getElementById("insertText").innerHTML = insertInst1;
  });
  
  // Guess Famous Button
  guessFamous.addEventListener('click', function(){
    document.getElementById("famousButton").classList.add("d-none");
    document.getElementById("movieButton").classList.add("d-none");
    document.getElementById("nextButton").classList.remove("d-none");
    document.getElementById("finishButton").classList.remove("d-none");
    document.getElementById("finishButton").classList.remove("d-none");
    if(categoryRtn === "Famous") {
      scoreCounter += 1;
      guessCounter += 1;
      score = scoreCounter + " / " + guessCounter;
      document.getElementById("insertText").innerHTML = "Correct this was a quote by \"" + authorRtn + '"';
    } else {
      document.getElementById("insertText").innerHTML = "Incorrect, this was a quote said in the movie " + authorRtn;
      guessCounter += 1;
      score = scoreCounter + " / " + guessCounter;
    }
  });
 
  // Guess Movie Button
  guessMovie.addEventListener('click', function(){
    document.getElementById("famousButton").classList.add("d-none");
    document.getElementById("movieButton").classList.add("d-none");
    document.getElementById("nextButton").classList.remove("d-none");
    document.getElementById("finishButton").classList.remove("d-none");
    if(categoryRtn === "Movies") {
      scoreCounter += 1;
      guessCounter += 1;
      score = scoreCounter + " / " + guessCounter;
      document.getElementById("insertText").innerHTML = "Correct this was a quote in the movie \"" + authorRtn + '"';
    } else {
      document.getElementById("insertText").innerHTML = "Incorrect, this was said by the famous \"" + authorRtn + '"';
      guessCounter += 1;
      score = scoreCounter + " / " + guessCounter;
    }
  });

    // Clicking the Next Button
    clickNextButton.addEventListener('click', function(){
      document.getElementById("famousButton").classList.remove("d-none");
      document.getElementById("movieButton").classList.remove("d-none");
      document.getElementById("nextButton").classList.add("d-none");
      document.getElementById("finishButton").classList.add("d-none");
      document.getElementById('scoreValue').innerHTML = score;
      document.getElementById("insertText").innerHTML = insertInst1;
      callData();
    });

    // Clicking the Finish Button
    clickFinishButton.addEventListener('click', function(){
      document.getElementById("famousButton").classList.add("d-none");
      document.getElementById("movieButton").classList.add("d-none");
      document.getElementById("nextButton").classList.add("d-none");
      document.getElementById("finishButton").classList.add("d-none");
      document.getElementById("beginButton").classList.remove("d-none");
      document.getElementById('scoreValue').innerHTML = score;
      document.getElementById('quote').innerHTML = "Thank You for Playing!";
      document.getElementById("insertText").innerHTML = "Your final Score is " + score;
    });

});

