const express = require("express");
const cors = require("cors");
const config = require("./src/config/config");
const morgan = require("morgan");

const app = express();
const path = require("path");

// const port = process.env.PORT;
const port = config.port;

app.use(morgan("dev"));

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

app.use("/login", require("./src/auth/auth.controller"));

app.use("/students", require("./src/student/student.controller"));
app.use("/parents", require("./src/parent/parent_controller"));

app.use(
  "/registrations",
  require("./src/registrations/registation.controller")
);

app.use("/register", require("./src/register/register"));
app.use("/images", express.static(path.join(__dirname, "uploads")));
app.use("/account", require("./src/account/account.controller"));
app.use("/class", require("./src/class/class.controller"));

app.listen(port, () => {
  console.log(`listen port ${port}`);
});
