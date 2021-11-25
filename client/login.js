document.getElementById("login").addEventListener("click", async function(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const response = await fetch('/login', {
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

document.getElementById("registerbutton").addEventListener("click", function() {window.location.href = `https://${window.location.hostname}/client.register.html`})