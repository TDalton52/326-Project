"use strict";

document.getElementById("homebutton").addEventListener("click", function() {window.location.href =window.location.href = `https://${window.location.hostname}`;});
document.getElementById("schedulebutton").addEventListener("click", function() {window.location.href =window.location.href = `https://${window.location.hostname}/client/schedule.html`;});

window.addEventListener("load", function()
{
  for(let i = 0; i < window.localStorage.getItem("numresults"); i++)
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
      newButton.classList.add("btn");
      newButton.classList.add("btn-primary")
      newButton.addEventListener("click", async function()
      {
        const response = await fetch(`https://${window.location.hostname}/addCourse`, {
          method:"POST",
          headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body:JSON.stringify(data)
        });
        if(!response.ok)
        {
          console.log(response.error);
          return;
        }
      });
      newButtonContainer.appendChild(newButton);
      newRow.appendChild(newButtonContainer);
      document.getElementById("container").appendChild(newRow);
    }
  }
});