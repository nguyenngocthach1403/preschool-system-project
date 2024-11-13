const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const socketIo = require("socket.io");
const app = express();
const path = require("path");
const http = require("http");

// const port = process.env.PORT;
const port = 9000 || process.env.PORT;

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "*",
  })
);

io.on("connection", async (socket) => {
  console.log("New client connected");
  socket.on("changeRegisterStatus", async () => {
    console.log("Change status");
    io.emit("changedRegisterStatus");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/api/v1", require("./src/routes/router"));

server.listen(port, () => {
  console.log(`listen port ${port}`);
});
