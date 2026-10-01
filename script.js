const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Client-side validation
    if (email.trim() === "" || password.trim() === "") {
        message.textContent = "Email and password cannot be empty.";
        return;
    }

    if (!email.includes("@")) {
        message.textContent = "Please enter a valid email.";
        return;
    }

    if (password.length < 8) {
        message.textContent =
            "Password must contain at least 8 characters.";
        return;
    }

    try {

        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        // textContent prevents the response from being interpreted as HTML
        message.textContent = data.message;

    } catch (error) {

        message.textContent =
            "Unable to connect to the server.";

    }

});