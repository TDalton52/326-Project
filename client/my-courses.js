"use strict";

window.addEventListener("load", async function()
{
  //TODO: edit URL so that the proper user is fetched
  //const response = await fetch(`http://localhost:3000/getData/user`, {headers:{"accepts":"application/json"}});
  //const data = await response.json();
  const data = [{"class-name":"COMPSCI 326","school":"UMass","instructor":"Emery Berger","time":"1:00 - 2:15"}];
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
})