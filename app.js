// Dependencies
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

const config = require("./config/database");

// Mongoose
mongoose.connect(config.database);
mongoose.connection.on("connected", () => {
  console.log("Connected to database", config.database);
});
mongoose.connection.on("error", (error) => {
  console.log("Database error:", error);
});

// Routes
const users = require("./routes/users");

// Set appp and port
const app = express();
const port = 3000;

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Body-parser middleware
app.use(bodyParser.json());          

// Passport middleware
app.use(passport.initialize());  
app.use(passport.session());
require("./config/passport")(passport);

// Routing
app.use("/users", users);

app.get("/", (req, res) => {
  res.send("Invalid Endpoint");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start server
app.listen(port, () => {
  console.log("Server started on port", port);
});