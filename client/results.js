"use strict";

document.getElementById("homebutton").addEventListener("click", function() {window.location.href =window.location.href = `https://${window.location.hostname}`;});

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
      const newButtonContainer = document.createElement("span");
      newButtonContainer.classList.add("buttoncontainer");
      const newButton = document.createElement("button");
      newButton.innerText = "Add"
      newButton.addEventListener("click", async function()
      {
        const response = await fetch(`https://${window.location.hostname}/routeNameHere`, {
          method:"POST",
          body:JSON.stringify(data)
        });
        if(!response.ok)
        {
          console.log(response.error);
        }
      });
      newButtonContainer.appendChild(newButton);
      newRow.appendChild(newButtonContainer);
      document.getElementById("container").appendChild(newRow);
    }
  }
});