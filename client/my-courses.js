"use strict";

document.getElementById("homebutton").addEventListener("click", function() {window.location.href = `https://${window.location.hostname}`;});
document.getElementById("schedulebutton").addEventListener("click", function() {window.location.href = `https://${window.location.hostname}/client/schedule.html`;});
document.getElementById("resetbutton").addEventListener("click", function() {if("courses" in window.localStorage) {window.localStorage.removeItem("courses");}});

window.addEventListener("load", async function()
{
  if(!("courses" in window.localStorage))
  {
    window.localStorage.setItem("courses", JSON.stringify([]))
  }
  const data = JSON.parse(window.localStorage.getItem("courses"));
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
    document.getElementById("container").appendChild(newRow);
  }
});

