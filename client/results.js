"use strict";

//Add links to buttons: these lines find all buttons that link to a specific page and add that event listener
if(document.querySelector(".homebutton") !== null)
{
  document.querySelector(".homebutton").addEventListener("click", function() {window.location.href =window.location.href = `https://${window.location.hostname}/client/home.html`;});
}

window.addEventListener("load", function()
{
  for(let i = 0 ; i < 10; i++)
  {
    if(i.toString() in window.localStorage)
    {
      const data = JSON.parse(window.localStorage.getItem(i.toString()));
      console.log(JSON.stringify(data));
      const newRow = document.createElement("div");
      newRow.classList.add("row");
      for(const key in data)
      {
        const newElem = document.createElement("span");
        newElem.classList.add(key);
        newElem.innerText = data[key];
        newRow.appendChild(newElem);
      }
      document.getElementById("container").appendChild(newRow);
    }
  }
});