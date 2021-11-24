"use strict";

//Add links to buttons: these lines find all buttons that link to a specific page and add that event listener
if(document.querySelector(".homebutton") !== null)
{
  document.querySelector(".homebutton").addEventListener("click", function() {window.location.href = "http://localhost:8000/home.html";});
}

if(document.getElementById("searchresults") !== null)
{
  document.getElementById("searchresults").addEventListener("click", async function() {
    window.location.href = await "https://${window.location.hostname}/results.html";
  });
}

document.getElementById("searchbutton").addEventListener("click", async function() 
{
  localStorage.clear();
  const response = await fetch("http://localhost:3000/getScores", {headers:{"accepts":"application/json"}});
  const data = await response.json();
  console.log(JSON.stringify(data));
  const input = document.getElementById("search").value;
  const select1 = document.getElementById("colleges");
  const select2 = document.getElementById("type");
  const school = select1.options[select1.selectedIndex].value;
  const searchType = select2.options[select2.selectedIndex].value;
  for(let index in data)
  {
    console.log(JSON.stringify(data[index]));
    if(searchType === "keyword")
    {
      if(data[index]["class-name"].includes(input) && (data[index]["school"] === school || school === "All Colleges"))
      {
        window.localStorage.setItem(index, JSON.stringify(data[index]));
      }
    }
    if(searchType === "number")
    {
      if(data[index]["class-name"] === input && (data[index]["school"] === school || school === "All Colleges"))
      {
        window.localStorage.setItem(index, JSON.stringify(data[index]));
      }
    }
  }
  window.location.href = "http://localhost:8000/results.html";
});

  