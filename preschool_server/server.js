const express = require("express");

const app = express();

const port = 9000;

const db = require("./src/config/db"); // Database

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/students", require("./src/student/student.controller"));

app.listen(port, () => {
  console.log(`listen port ${port}`);
});