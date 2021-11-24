"use strict";

document.getElementById("searchbutton").addEventListener("click", async function() 
{
  localStorage.clear();
  const response = await fetch(`https://${window.location.hostname}/getScores`, {headers:{"accepts":"application/json"}});
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
  window.location.href = `https://${window.location.hostname}/results.html`;
});

  