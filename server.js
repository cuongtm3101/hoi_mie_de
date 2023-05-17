const express = require("express");
const server = express();
const fs = require("fs");
const bodyParser = require("body-parser");

// Import routes
const questionRoutes = require("./routes/question.routes");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));

// Use routes
server.use("/api/v1/questions", questionRoutes);

server.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(`${__dirname}/public/homepage.html`);
});

server.get("/ask", (req, res) => {
  res.sendFile(`${__dirname}/public/ask.html`);
});

server.get("/question-detail/:id", (req, res) => {
  res.sendFile(`${__dirname}/public/question-detail.html`);
});

server.get("*", (req, res) => {
  res.send("<h1>PAGE NOT FOUND</h1>");
});

server.listen(3000, () => {
  console.log(`server is running on http://localhost:3000`);
});
