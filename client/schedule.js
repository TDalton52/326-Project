"use strict";

//Add links to buttons: these lines find all buttons that link to a specific page and add that event listener
document.getElementById("homebutton").addEventListener("click", function() {window.location.href = `https://${window.location.hostname}`;});
document.getElementById("searchbutton").addEventListener("click", function() {window.location.href = `https://${window.location.hostname}/client/results.html`;});
document.getElementById("mycoursesbutton").addEventListener("click", function(){window.location.href = `https://${window.location.hostname}/client/my-courses.html`});

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

function handleHolyokeAndAmherstDaySystem(dayString, course, startTime, endTime)
{
  if(startTime.charAt(0) == "0")
  {
    startTime = startTime.substring(1);
  }
  if(endTime.charAt(0) == "0")
  {
    endTime = endTime.substring(1);
  }
  const startTimeHour = startTime.split(":");
  const endTimeHour = endTime.split(":")
  if(dayString == "M")
  {
    document.getElementById(`M${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`M${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
  }
  else if(dayString == "T")
  {
    document.getElementById(`TU${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`TU${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
  }
  else if(dayString == "W")
  {
    document.getElementById(`W${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`W${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
  }
  else if(dayString == "TH")
  {
    document.getElementById(`TH${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`TH${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
  }
  else if(dayString == "F")
  {
    document.getElementById(`F${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`F${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
  }
  else if(dayString == "MW")
  {
    document.getElementById(`M${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`M${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`W${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`W${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
  }
  else if(dayString == "MF")
  {
    document.getElementById(`M${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`M${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`F${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`F${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
  }
  else if(dayString == "WF")
  {
    document.getElementById(`W${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`W${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`F${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`F${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
  }
  else if(dayString == "MWF")
  {
    document.getElementById(`M${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`M${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`W${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`W${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`F${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`F${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
  }
  else if(dayString == "TTH")
  {
    document.getElementById(`TU${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`TU${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`TH${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`TH${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
  }
}

function handleUntimed(course)
{
  if(document.getElementById("notime").innerText == "")
  {
    document.getElementById("notime").innerText = course.name;
  }
  else
  {
    document.getElementById("notime").innerText += ", " + course.name;
  }
}

function handleUmass(course)
{
  const timeInfo = course.time.split(" ");
  const endTime = timeInfo.pop();
  const startTime = timeInfo.pop();
  if(timeInfo.length == 0)
  {
    handleUntimed(course);
    return;
  }
  const startTimeHour = startTime.split(":");
  const endTimeHour = endTime.split(":")
  for(const day in timeInfo) //last 2 elements are time, popping them out will give just days
  {
    console.log(`${timeInfo[day]}${startTimeHour}`);
    document.getElementById(`${timeInfo[day]}${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    console.log(`${timeInfo[day]}${endTimeHour}`);
    document.getElementById(`${timeInfo[day]}${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
  }
}

function handleHolyoke(course)
{
  const timeInfo = course.time.split(" ");
  console.log(JSON.stringify(timeInfo));
  const times = timeInfo[1].split("-");
  console.log(JSON.stringify(times));
  const startTime = times[0].substring(0, 5);
  console.log(startTime);
  const endTime = times[1].substring(0, 5);
  console.log(endTime);
  handleHolyokeAndAmherstDaySystem(timeInfo[0], course, startTime, endTime);
}

function handleAmherst(course)
{
  const timeInfo = course.time.split(" ");
  const startTime = timeInfo[1];
  const endTime = timeInfo[2].split("-")[1];
  handleHolyokeAndAmherstDaySystem(timeInfo[0], course, startTime, endTime);
}

function handleSmith(course)
{
  const timeInfo = course.time.split(" ");
  timeInfo.pop();
  const endTime = timeInfo.pop();
  timeInfo.pop();
  timeInfo.pop();
  const startTime = timeInfo.pop();
  const startTimeHour = startTime.split(":");
  const endTimeHour = endTime.split(":")
  for(const day in timeInfo) //last 5 elements are AM/PM, a time, "-", AM/PM, and another time in that order, popping them out will give just days
  {
    document.getElementById(`${timeInfo[day]}${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`${timeInfo[day]}${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
  }
}

function handleHampshire(course)
{
  if(course.time == "#NAME?") //why does this happen?
  {
    handleUntimed(course);
    return;
  }
  const timeInfo = course.time.split(";");
  for(const entry in timeInfo)
  {
    const day = entry.split(" ");
    const times = day[0].split("-");
    const startTime = times[0].substring(0, 5);
    const endTime = times[0].substring(0, 5);
    if(startTime.charAt(0) == "0")
    {
      startTime = startTime.substring(1);
    }
    if(endTime.charAt(0) == "0")
    {
      endTime = endTime.substring(1);
    }
    const startTimeHour = startTime.split(":");
    const endTimeHour = endTime.split(":")
    document.getElementById(`${day[1]}${startTimeHour}`).innerText += course.name + " (" + course.time + ")";
    document.getElementById(`${day[1]}${endTimeHour}`).innerText += course.name + " (" + course.time + ")";
  }
}

window.addEventListener("load", async function()
{
  const response = await fetch(`https://${window.location.hostname}/myCourses`);
  const data = await response.json();
  console.log(JSON.stringify(data));
  detectConflict(data);
  for(const index in data)
  {
    if(data[index].time == null)
    {
      handleUntimed(data[index]);
    }
    else if(data[index].school == "UMass Amherst")
    {
      handleUmass(data[index]);
    }
    else if(data[index].school == "Mount Holyoke College")
    {
      handleHolyoke(data[index]);
    }
    else if(data[index].school == "Amherst College")
    {
      handleAmherst(data[index]);
    }
    else if(data[index].school == "Smith College")
    {
      handleSmith(data[index]);
    }
    else if(data[index].school == "Hampshire College")
    {
      handleHampshire(data[index]);
    }
  }
});