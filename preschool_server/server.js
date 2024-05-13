const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

const port = 9000;

const db = require("./src/config/db"); // Database

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/students", require("./src/student/student.controller"));
app.use("/parents", require("./src/parent/parent_controller"));

app.use("/register", require("./src/register/register"));

app.use("/images", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`listen port ${port}`);
});
