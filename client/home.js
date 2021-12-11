"use strict";

document.getElementById("searchbutton").addEventListener("click", async function() 
{
  if("numresults" in window.localStorage)
  {
    for(let i = 0; i < window.localStorage.getItem("numresults"); i++)
    {
      window.localStorage.removeItem(i.toString());
    }
    window.localStorage.removeItem("numresults");
  }
  const name = document.getElementById("search").value
  const response = await fetch(`https://${window.location.hostname}/getCourses?name=${document.getElementById("search").value}`, {headers:{"accepts":"application/json"}});
  const data = await response.json();
  console.log(JSON.stringify(data));
  const select1 = document.getElementById("colleges");
  const select2 = document.getElementById("numresults");
  const school = select1.options[select1.selectedIndex].value;
  const numresults = select2.options[select2.selectedIndex].value;
  window.localStorage.setItem("numresults", numresults);
  for(let index in data)
  {
    if((data[index]["school"] === school || school === "All Colleges"))
    {
      console.log("setting storage!");
      window.localStorage.setItem(index, JSON.stringify(data[index]));
    }
    if(index == numresults - 1)
    {
      break;
    }
  }
  window.location.href = `https://${window.location.hostname}/client/results.html`
});

document.getElementById("loginbutton").addEventListener("click", function(){window.location.href = `https://${window.location.hostname}/client/login.html`});
document.getElementById("mycoursesbutton").addEventListener("click", function(){window.location.href = `https://${window.location.hostname}/client/my-courses.html`});

  