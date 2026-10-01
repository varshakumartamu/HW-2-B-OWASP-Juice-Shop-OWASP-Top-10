const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    // Server-side validation
    if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        email.trim() === "" ||
        password.trim() === ""
    ) {
        return res.status(400).json({
            message: "Email and password are required."
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            message: "Invalid email address."
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 characters."
        });
    }

    return res.json({
        message: "Login request accepted."
    });

});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});