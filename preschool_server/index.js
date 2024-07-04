const express = require("express");
const cors = require("cors");
const config = require("./src/config/config");
const morgan = require("morgan");
const socketIo = require("socket.io");
const app = express();
const path = require("path");
const http = require("http");

// const port = process.env.PORT;
const port = config.port || process.env.PORT;

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
app.use("/image", require("./src/image/image.controller"));
app.use(
  "/specialization",
  require("./src/specialization/specialization.controller")
);
app.use(
  "/teacherSpecialization",
  require("./src/teacher_specialization/teacher_specialization.controller")
);
app.use("/certificate", require("./src/certificate/certificate.controller"));
app.use(
  "/teacherCertificate",
  require("./src/teacher_certificate/teacher_certificate.controller")
);
app.use("/levels", require("./src/levels/levels.controller"));
app.use("/syllabus", require("./src/syllabus/syllabus.controller"));
app.use("/relationship", require("./src/relationship/relationship.controller"));
app.use(
  "/addmission_period",
  require("./src/admission_period/admission_period.controller")
);
app.use("/teacher", require("./src/teacher/teacher.controller"));
app.use(
  "/classCurrent",
  require("./src/teacher_class_current/teacher_class_current.controller")
);
app.use("/menu", require("./src/menu/menu.controller"));

server.listen(port, () => {
  console.log(`listen port ${port}`);
});
