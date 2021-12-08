document.getElementById("register").addEventListener("click", async function(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  //TODO: Make sure username and password are non-empty before sending POST
  const response = await fetch('/register', {
      method: 'POST',
      body: JSON.stringify({
          name: username,
          pwd: password,
      }),
      headers: { 'Content-Type' : 'application/json'}
  });
  if (!response.ok) {
      console.error("I fucked up.");
  }
});