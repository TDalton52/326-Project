"use strict";

document.getElementById("homebutton").addEventListener("click", function() {window.location.href =window.location.href = `https://${window.location.hostname}`;});
document.getElementById("schedulebutton").addEventListener("click", function() {window.location.href =window.location.href = `https://${window.location.hostname}/client/schedule.html`;});

window.addEventListener("load", function()
{
  for(let i = 0 ; i < 10; i++)
  {
    if(i.toString() in window.localStorage)
    {
      const data = JSON.parse(window.localStorage.getItem(i.toString()));
      if(!("courses" in window.localStorage))
      {
        window.localStorage.setItem("courses", JSON.stringify([]))
      }
      const myCourses = JSON.parse(window.localStorage.getItem("courses"));
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
      newButton.addEventListener("click", function()
      {
        if(!(data in myCourses))
        {
          myCourses.push(data);
          console.log(JSON.stringify(myCourses));
          window.localStorage.setItem("courses", JSON.stringify(myCourses));
          console.log(window.localStorage.getItem("courses"));
        }
      });
      newButtonContainer.appendChild(newButton);
      newRow.appendChild(newButtonContainer);
      document.getElementById("container").appendChild(newRow);
    }
  }
});