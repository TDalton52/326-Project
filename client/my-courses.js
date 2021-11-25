"use strict";

document.getElementById("homebutton").addEventListener("click", function() {window.location.href = `https://${window.location.hostname}/client/home.html`;});
document.getElementById("resetbutton").addEventListener("click", function() {if("courses" in window.localStorage) {window.localStorage.removeItem("courses");}});

window.addEventListener("load", async function()
{
  //TODO: edit URL so that the proper user is fetched
  //const response = await fetch(`https://${window.location.hostname}/getData/user`, {headers:{"accepts":"application/json"}});
  //const data = await response.json();
  const data = [{"name":"COMPSCI 326","school":"UMass","instructor":"Emery Berger","time":"TuTh 1:00-2:15"}];
  for(const index in data)
  {
    if(!("courses" in window.localStorage))
    {
      window.localStorage.setItem("courses", JSON.stringify([]));
    }
    let courses = JSON.parse(window.localStorage.getItem("courses"));
    console.log(index);
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    for(const key in data[index])
    {
      courses.push(data[index]);
      const newElem = document.createElement("span");
      newElem.classList.add(key);
      newElem.innerText = data[index][key];
      newRow.appendChild(newElem);
    }
    document.getElementById("container").appendChild(newRow);
  }
});

