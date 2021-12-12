"use strict";

document.getElementById("homebutton").addEventListener("click", function() {window.location.href = `https://${window.location.hostname}`;});
document.getElementById("schedulebutton").addEventListener("click", function() {window.location.href = `https://${window.location.hostname}/client/schedule.html`;});
document.getElementById("logoutbutton").addEventListener("click", function() {
  fetch(`https://${window.location.hostname}/logout`, {method:"POST"});
  window.location.href = `https://${window.location.hostname}/client/schedule.html`;
});

window.addEventListener("load", async function()
{
  const response = await fetch(`https://${window.location.hostname}/myCourses`, {headers:{"accepts":"application/json"}});
  const data = await response.json();
  console.log(JSON.stringify(data));
  for(const index in data)
  {
    console.log(index);
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    for(const key in data[index])
    {
      const newElem = document.createElement("span");
      newElem.classList.add(key);
      newElem.innerText = data[index][key];
      newRow.appendChild(newElem);
    }
    const newButtonContainer = document.createElement("span");
    newButtonContainer.classList.add("buttoncontainer");
    const newButton = document.createElement("button");
    newButton.innerText = "Delete"
    newButton.classList.add("btn");
    newButton.classList.add("btn-primary")
    newButton.addEventListener("click", async function()
    {
      const response = await fetch(`https://${window.location.hostname}/deleteCourse`, {
        method:"POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body:JSON.stringify(data[index])
      });
      if(!response.ok)
      {
        console.log(response.error);
        return;
      }
      else
      {
        console.log("POST sent successfully!");
      }
    });
    newButtonContainer.appendChild(newButton);
    newRow.appendChild(newButtonContainer);
    document.getElementById("container").appendChild(newRow);
  }
});

