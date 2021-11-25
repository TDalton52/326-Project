"use strict";

//Add links to buttons: these lines find all buttons that link to a specific page and add that event listener
document.getElementById("homebutton").addEventListener("click", function() {window.location.href = `https://${window.location.hostname}`;});
document.getElementById("searchresults").addEventListener("click", function() {window.location.href = `https://${window.location.hostname}/client/results.html`;});

function detectConflict(data)
{
  let times = {};
  for(const index in data)
  {
    if(data[index].time in times)
    {
      alert(`Conflict detected! Both ${data[index].name} and ${times[data[index].time]} meet at ${data[index].time}! The schedule will display both classes, but this conflict must be fixed during real registration`)
    }
    times[data[index].time] = data[index].name;
  }
}

window.addEventListener("load", async function()
{
  const response = await fetch(`https://${window.location.hostname}/getCourses`, {headers:{"accepts":"application/json"}});
  const data = await response.json();
  detectConflict(data);
  for(const index in data)
  {
    const days = data[index].time.split(" ")[0].split(/(?=[A-Z])/); //split by any capital letter
    const startTime = data[index].time.split(" ")[1].split("-")[0];
    const endTime = data[index].time.split(" ")[1].split("-")[1];
    console.log(JSON.stringify(days));
    console.log(startTime);
    console.log(endTime);
    for(const day in days)
    {
      document.getElementById(`${days[day]}${startTime.charAt(0)}`).innerText = data[index].name;
      document.getElementById(`${days[day]}${endTime.charAt(0)}`).innerText = data[index].name;
    }
  }
});