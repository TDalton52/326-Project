"use strict";

document.getElementById("searchbutton").addEventListener("click", async function() 
{
  for(let i = 0; i < 10; i++)
  {
    if(i.toString() in window.localStorage)
    {
      window.localStorage.removeItem(i.toString());
    }
  }
  const response = await fetch(`https://${window.location.hostname}/getCourses`, {headers:{"accepts":"application/json"}});
  const data = await response.json();
  console.log(JSON.stringify(data));
  const input = document.getElementById("search").value;
  const select1 = document.getElementById("colleges");
  const select2 = document.getElementById("type");
  const school = select1.options[select1.selectedIndex].value;
  const searchType = select2.options[select2.selectedIndex].value;
  for(let index in data)
  {
    if(searchType === "keyword")
    {
      if(data[index]["name"].includes(input) && (data[index]["school"] === school || school === "All Colleges"))
      {
        console.log("setting storage!");
        window.localStorage.setItem(index, JSON.stringify(data[index]));
      }
    }
    if(searchType === "number")
    {
      if(data[index]["name"] === input && (data[index]["school"] === school || school === "All Colleges"))
      {
        window.localStorage.setItem(index, JSON.stringify(data[index]));
      }
    }
  }
  window.location.href = `https://${window.location.hostname}/client/results.html`
});

document.getElementById("loginbutton").addEventListener("click", function(){window.location.href = `https://${window.location.hostname}/client/login.html`});
document.getElementById("mycoursesbutton").addEventListener("click", function(){window.location.href = `https://${window.location.hostname}/client/my-courses.html`});

  