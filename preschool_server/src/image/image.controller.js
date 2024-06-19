const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/:image", getImage);
router.get("/class/:image", getClassImage);
router.get("/students/:image", getStudentImage);
router.get("/registration/:image", getRegisterImage);
router.get("/parents/:image", getParentImage);

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
