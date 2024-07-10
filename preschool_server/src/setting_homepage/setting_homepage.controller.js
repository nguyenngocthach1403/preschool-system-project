const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/setting" });
const fs = require("fs");
const settingService = require("./setting_homepage.service");
const router = express.Router();
const config = require("../config/config");
router.get("/", getSetting);
router.post("/update", upload.array("files"), updateSetting);
async function getSetting(req, res) {
  const result = await settingService.getSetting();

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
async function updateSetting(req, res) {
  const data = req.body;
  req.body;

  //Kiểm tra tải hình ảnh
  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    var url =
      config.baseUrl + "/image/setting/" + req.files[0].filename + ".jpg";
    data.url_logo_page = url;
  }

  //Cập nhật
  const result = await settingService.updateSetting({
    name_school: data.name_school,
    address: data.address,
    hotline: data.hotline,
    email: data.email,
    review: data.review,
    fb_link: data.fb_link,
    ytb_link: data.ytb_link,
    url_logo_page: data.url_logo_page,
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
module.exports = router;
