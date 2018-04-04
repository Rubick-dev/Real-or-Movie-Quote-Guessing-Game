
const API_Key = "hhrAFEu9VLmshYEoZq51oSTYBHUIp1XokeGjsnITfzcjZD0nqK"

function doIt() { 
$.ajax({
  url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
  type: 'POST',
  data: {},
  dataType:'json',
  success: function(data) { 
    let quoteRtn = data.quote;
    let authorRtn = data.author;
    var categoryRtn = data.category;
    console.log(quoteRtn + " " + data.author + " " + categoryRtn);   
    $("#lead").text("Quote: " + quoteRtn + "\""); 
    $("#author").text("- " + authorRtn);
       },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", API_Key);}
    }); }
    

$(document).ready(function() {
// When click on GetStarted button need to show the option buttons and display the first Quote.
  const getStarted = document.getElementById("btn");
  // Event Listners
  
  getStarted.addEventListener("click", function(){
    document.getElementById("btnFamous").classList.remove("d-none");
    document.getElementById("btnMovie").classList.remove("d-none");
    doIt();
  });




});

