"use strict";

//Add links to buttons: these lines find all buttons that link to a specific page and add that event listener
if(document.querySelector(".homebutton") !== null)
{
  document.querySelector(".homebutton").addEventListener("click", function() {window.location.href = "http://localhost:8000/home.html";});
}

if(document.getElementById("searchresults") !== null)
{
  document.getElementById("searchresults").addEventListener("click", function() {window.location.href = "http://localhost:8000/results.html";});
}