const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 8080;

// create the express app
const app = express();

// -- tell express were to find the views and which template engine to use
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// -- middleware --
app.use(morgan("dev")); // log every request
app.use(bodyParser.urlencoded({ extended: false })); // added request.body

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/new-entry", (req, res) => {
  res.render("new-entry");
});

app.post("/new-entry", (req, res) => {
  const { body, title } = req.body;
  if (!body || !title) {
    res.status(400).send("Title and Body are required!");
    return;
  }
  entries.push({
    title: title,
    body: body,
    published: new Date()
  });
  res.redirect("/");
});

// -- create global array to store all the entries
const entries = [];
app.locals.entries = entries; // make this array available to all views

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Listening on port ... ${PORT}`);
});
