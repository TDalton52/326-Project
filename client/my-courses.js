"use strict";

window.addEventListener("load", async function()
{
  //TODO: edit URL so that the proper user is fetched
  const response = await fetch(`http://localhost:3000/getData/user`, {headers:{"accepts":"application/json"}});
  const data = await response.json();
  console.log(JSON.stringify(data));
  for(let index in data)
  {
    console.log(JSON.stringify(data[index]));
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
})