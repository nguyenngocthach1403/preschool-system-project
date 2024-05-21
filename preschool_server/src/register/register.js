const express = require("express");
const multer = require("multer");
const router = express.Router();
const db = require("../config/db");
const upload = multer({ dest: "uploads/" });
const path = require("path");
const fs = require("fs");

router.post("/", upload.array("files"), async (req, res) => {
  const {
    your_name,
    email,
    phone,
    address,
    city,
    district,
    town,
    levels,
    syllabus,
    relationship,
    informationState,
    status,
  } = req.body;
  const file_paths = req.files.map((file) => file.path);
  const fileNamesWithoutUploads = file_paths.map((filePath) =>
    filePath.replace("uploads/", "")
  );
  const query =
    "INSERT INTO Registers (your_name, email, phone, address, city, district, town, levels, syllabus, relationship, informationState, status, file_paths) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
  const values = [
    your_name,
    email,
    phone,
    address,
    city,
    district,
    town,
    levels,
    syllabus,
    relationship,
    informationState,
    status,
    fileNamesWithoutUploads.join(","),
  ];
  db.connect();
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send({ message: "Error registering" });
      return;
    }

    console.log("registered successfully");
    res.status(200).send({ message: "registered successfully" });
  });
});

router.get("/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "../uploads/", imageName);

  // Kiểm tra xem hình ảnh có tồn tại không
  if (fs.existsSync(imagePath)) {
    // res.status(200).send({ imagePath: imagePath });
    const imageData = fs.readFileSync(imagePath);
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(imageData, "binary");
  } else {
    res.status(404).send("Image not found");
  }
});

module.exports = router;
