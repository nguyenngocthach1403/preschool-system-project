const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/:image", getImage);

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
