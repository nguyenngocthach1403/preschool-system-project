const express = require("express");
const multer = require("multer");
const router = express.Router();
const db = require("../config/db.service");
const upload = multer({ dest: "uploads/" });
const path = require("path");
const fs = require("fs");
const config = require("../config/config");
const registerService = require("../registrations/registration.service");
const { error } = require("console");

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

  const data = {
    your_name: your_name,
    email: email,
    phone: phone,
    address: address,
    city: city,
    district: district,
    town: town,
    levels: levels,
    syllabus: syllabus,
    relationship: relationship,
    informationState: informationState,
    status: status,
  };

  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    const url = "http://localhost:9000/image/" + req.files[0].filename + ".jpg";

    data.file_paths = url;
  }

  const result = await registerService.createRegister(data);

  console.log(result);
  if (result.code) {
    if (req.files.length > 0) {
      fs.renameSync(req.files[0].path + ".jpg", "uploads/none");
    }

    return res.status(200).json({
      status: 400,
      message: result.message,
      error: result.error,
    });
  }

  res.status(200).json({
    status: 200,
    message: "Successful.",
    data: result,
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
