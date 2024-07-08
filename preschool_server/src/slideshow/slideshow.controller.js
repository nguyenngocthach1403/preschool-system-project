const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/slide" });
const fs = require("fs");
const slideService = require("../slideshow/slideshow.service");
const router = express.Router();
const config = require("../config/config");

router.get("/", getSlide);
router.get("/total", getTotalSlide);
router.get("/id/:id", getSlideById);
router.post("/create", upload.array("files"), createSlide);
router.post("/update/:id", upload.array("files"), updateSlide);
router.get("/delete", deleteSlide);

async function getSlide(req, res) {
  const result = await slideService.getSlide();

  if (result.code) {
    return res.status(200).json({
      success: false,
      error: result.error,
    });
  }

  res.status(200).json({
    success: true,
    data: result,
  });
}

async function getSlideById(req, res) {
  const id = req.params.id;

  const result = await slideService.getByID(id);

  if (result.code) {
    return res.status(200).json({
      success: false,
      error: result.error,
    });
  }

  if (result.length == 0) {
    return res.status(200).json({
      success: false,
      error: "Không tìm thấy",
    });
  }

  res.status(200).json({
    success: true,
    message: "Succesful.",
    data: result,
  });
}

async function getTotalSlide(req, res) {
  const countNews = await slideService.countSlide();

  res.send(
    JSON.stringify({
      status: 200,
      message: "Successful",
      data: countNews[0]["total"],
    })
  );
}

async function createSlide(req, res) {
  const data = req.body;

  //   Kiểm tra tải hình ảnh
  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    var url = config.baseUrl + "/image/slide/" + req.files[0].filename + ".jpg";
    data.url = url;
  }

  const result = await slideService.createSlide({
    url: data.url,
    status: data.status,
  });

  if (result.code) {
    return res.status(400).json({
      success: false,
      error: result.error,
    });
  }

  if (!result.success) {
    if (req.files.length > 0) {
      fs.renameSync(req.files[0].path + ".jpg", "uploads/slide/none");
    }
    return res.status(200).json({
      success: false,
      error: result.message,
    });
  }
  res.status(200).json({
    status: 200,
    success: true,
    message: "Tạo thành công.",
  });
}
async function updateSlide(req, res) {
  const SlideId = req.params.id;

  const data = req.body;

  //Kiểm tra tải hình ảnh
  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    var url = config.baseUrl + "/image/slide/" + req.files[0].filename + ".jpg";
    data.url = url;
  }

  //Cập nhật
  const result = await slideService.updateSlide(SlideId, {
    url: data.url,
    status: data.status,
  });

  if (result.code) {
    return res.status(200).json({
      success: false,
      error: result.error,
    });
  }

  if (!result.success) {
    return res.status(200).json({
      success: false,
      error: result.message,
    });
  }

  res.status(200).json({
    success: true,
    error: result.message,
  });
}
async function deleteSlide(req, res) {
  if (req.query.id === undefined) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "Resouse not found",
      })
    );
    return;
  }

  const result = await slideService.deleteSlide(req.query.id);

  if (result === 0) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "Resouse not found",
      })
    );
  } else {
    res.send(
      JSON.stringify({
        status: 200,
        message: "Resouse delete Successful",
      })
    );
  }
}

module.exports = router;
