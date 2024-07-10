const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/:image", getImage);
router.get("/class/:image", getClassImage);
router.get("/students/:image", getStudentImage);
router.get("/registration/:image", getRegisterImage);
router.get("/parents/:image", getParentImage);
router.get("/teacher/:image", getTeacherImage);
router.get("/news/:image", getNewsImage);
router.get("/slide/:image", getSlideImage);
router.get("/setting/:image", getSettingImage);

async function getStudentImage(req, res) {
  const imageName = req.params.image;

  if (!fs.existsSync(`uploads/students/${imageName}`)) {
    return res.status(200).json({
      status: 500,
      error: "Not found image",
    });
  }
  let imgDefault = await fs.readFileSync(`uploads/students/${imageName}`);

  imgDefault = Buffer.from(imgDefault, "base64");

  res.writeHead(200, {
    "Content-Type": "image/jpg",
    "Content-Length": imgDefault.byteLength,
  });

  res.end(imgDefault);
}

async function getParentImage(req, res) {
  const imageName = req.params.image;

  if (!fs.existsSync(`uploads/parents/${imageName}`)) {
    return res.status(200).json({
      status: 500,
      error: "Not found image",
    });
  }
  let imgDefault = await fs.readFileSync(`uploads/parents/${imageName}`);

  imgDefault = Buffer.from(imgDefault, "base64");

  res.writeHead(200, {
    "Content-Type": "image/jpg",
    "Content-Length": imgDefault.byteLength,
  });

  res.end(imgDefault);
}

async function getClassImage(req, res) {
  const imageName = req.params.image;

  if (!fs.existsSync(`uploads/class/${imageName}`)) {
    return res.status(200).json({
      status: 500,
      error: "Not found image",
    });
  }
  let imgDefault = await fs.readFileSync(`uploads/class/${imageName}`);

  imgDefault = Buffer.from(imgDefault, "base64");

  res.writeHead(200, {
    "Content-Type": "image/jpg",
    "Content-Length": imgDefault.byteLength,
  });

  res.end(imgDefault);
}

async function getRegisterImage(req, res) {
  const imageName = req.params.image;

  if (!fs.existsSync(`uploads/registration/${imageName}`)) {
    return res.status(200).json({
      status: 500,
      error: "Not found image",
    });
  }
  let imgDefault = await fs.readFileSync(`uploads/registration/${imageName}`);

  imgDefault = Buffer.from(imgDefault, "base64");

  res.writeHead(200, {
    "Content-Type": "image/jpg",
    "Content-Length": imgDefault.byteLength,
  });

  res.end(imgDefault);
}
async function getTeacherImage(req, res) {
  const imageName = req.params.image;

  if (!fs.existsSync(`uploads/teacher/${imageName}`)) {
    return res.status(200).json({
      status: 500,
      error: "Not found image",
    });
  }
  let imgDefault = await fs.readFileSync(`uploads/teacher/${imageName}`);

  imgDefault = Buffer.from(imgDefault, "base64");

  res.writeHead(200, {
    "Content-Type": "image/jpg",
    "Content-Length": imgDefault.byteLength,
  });

  res.end(imgDefault);
}
async function getNewsImage(req, res) {
  const imageName = req.params.image;

  if (!fs.existsSync(`uploads/news/${imageName}`)) {
    return res.status(200).json({
      status: 500,
      error: "Not found image",
    });
  }
  let imgDefault = await fs.readFileSync(`uploads/news/${imageName}`);

  imgDefault = Buffer.from(imgDefault, "base64");

  res.writeHead(200, {
    "Content-Type": "image/jpg",
    "Content-Length": imgDefault.byteLength,
  });

  res.end(imgDefault);
}
async function getSlideImage(req, res) {
  const imageName = req.params.image;

  if (!fs.existsSync(`uploads/slide/${imageName}`)) {
    return res.status(200).json({
      status: 500,
      error: "Not found image",
    });
  }
  let imgDefault = await fs.readFileSync(`uploads/slide/${imageName}`);

  imgDefault = Buffer.from(imgDefault, "base64");

  res.writeHead(200, {
    "Content-Type": "image/jpg",
    "Content-Length": imgDefault.byteLength,
  });

  res.end(imgDefault);
}
async function getSettingImage(req, res) {
  const imageName = req.params.image;

  if (!fs.existsSync(`uploads/setting/${imageName}`)) {
    return res.status(200).json({
      status: 500,
      error: "Not found image",
    });
  }
  let imgDefault = await fs.readFileSync(`uploads/setting/${imageName}`);

  imgDefault = Buffer.from(imgDefault, "base64");

  res.writeHead(200, {
    "Content-Type": "image/jpg",
    "Content-Length": imgDefault.byteLength,
  });

  res.end(imgDefault);
}
async function getImage(req, res) {
  const imageName = req.params.image;

  if (!fs.existsSync(`uploads/${imageName}`)) {
    return res.status(200).json({
      status: 500,
      error: "Not found image",
    });
  }
  let imgDefault = await fs.readFileSync(`uploads/${imageName}`);

  imgDefault = Buffer.from(imgDefault, "base64");

  res.writeHead(200, {
    "Content-Type": "image/jpg",
    "Content-Length": imgDefault.byteLength,
  });

  res.end(imgDefault);
}

module.exports = router;
