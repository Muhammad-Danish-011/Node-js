const express = require("express");
const path = require("path");


const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Specify the directory where your views are located
app.set("views", path.join(__dirname, "views"));

// Define the public directory for static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/profile", (req, res) => {
    const users = [];

    for (let i = 1; i <= 80000; i++) {
        users.push({
            name: `User${i}`,
            Email: `user${i}@example.com`,
            city: "karachi"
        });
    }

  res.render("profile" , {users});
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
