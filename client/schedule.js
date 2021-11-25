"use strict";

//Add links to buttons: these lines find all buttons that link to a specific page and add that event listener
document.getElementById("homebutton").addEventListener("click", function() {window.location.href = `https://${window.location.hostname}`;});
document.getElementById("searchresults").addEventListener("click", function() {window.location.href = `https://${window.location.hostname}/client/results.html`;});

window.addEventListener("load", async function()
{
  //TODO: edit URL so that the proper user is fetched
  //const response = await fetch(`https://${window.location.hostname}/getData/user`, {headers:{"accepts":"application/json"}});
  //const data = await response.json();
  const data = [{"class-name":"COMPSCI 326","school":"UMass","instructor":"Emery Berger","time":"TuTh 1:00-2:15"}];
  for(const index in data)
  {
    const currEntry = data[index];

  }
});