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

window.addEventListener("load", function()
{
  for(let i = 0 ; i < 10; i++)
  {
    if(i.toString() in window.localStorage)
    {
      console.log("made it here");
      const data = JSON.parse(window.localStorage.getItem(i.toString()));
      console.log(JSON.stringify(data));
      const newRow = document.createElement("div");
      for(const key in data)
      {
        console.log(key);
        console.log(data[key]);
        const newElem = document.createElement("span");
        newElem.classList.add(key);
        newElem.innerText = data[key];
        newRow.appendChild(newElem);
      }
      document.getElementById("container").appendChild(newRow);
    }
  }
});