const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/class" });
const fs = require("fs");
const router = express.Router();
const classService = require("./class.service");
const config = require("../config/config");
router.get("/", getClass);
router.get("/search", findClass);
router.post("/add", upload.array("files"), createClass);

async function createClass(req, res) {
  //Valiable
  const { className, level, syllabus, startDate, endDate, limit, teacher } =
    req.body;

  const data = {
    name: className,
    level_id: level,
    syllabus_id: syllabus,
    start_date: startDate,
    end_date: endDate,
    limit: limit,
  };
  //Kiểm tra lớp có tồn tại hay chưa
  // if (await classService.isExistClassByName(className)) {
  //   return res.status(200).json({
  //     success: false,
  //     message: `Lớp học với tên ${className} đã tồn tại`,
  //   });
  // }

  //Kiểm tra tải hình ảnh
  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    const url =
      config.baseUrl + "/image/class/" + req.files[0].filename + ".jpg";

    data.class_img = url;
  }

  const result = await classService.createClass(data);

  if (result.code) {
    return res.status(500).json({
      success: false,
      error: result.error,
    });
  }

  if (!result.success) {
    return res.status(200).json({
      success: false,
      message: result.message,
    });
  }

  res.status(200).json({
    success: true,
    message: result.message,
  });
}

async function findClass(req, res) {
  const { searchText, limit, offset } = req.query;

  if (limit == undefined || offset == undefined) {
    return res.status(500).json({
      status: 500,
      error: "Limit và offset không được phép để trống.",
    });
  }

  const count = await classService.countFindingUpcomingAndOngoingClasses(
    searchText
  );

  if (count.code) {
    return res.status(500).json({
      status: 500,
      error: count.error,
    });
  }

  if (!count.success) {
    return res.status(200).json({
      status: 400,
      message: count.message,
    });
  }

  const result = await classService.findUpcomingAndOngoingClasses(
    searchText,
    limit,
    offset
  );

  if (result.code) {
    return res.status(500).json({
      status: 500,
      error: result.error,
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Successfull",
    total: count.total,
    data: result,
  });
}
async function getClass(req, res) {
  const { limit, offset } = req.query;

  //   //Xác thực đầu vào từ người dùng request
  if (
    limit === undefined ||
    offset === undefined ||
    limit == "" ||
    offset == ""
  ) {
    return res.status(400).json({
      status: 400,
      error: "Invalid input: query must be has limit and page.",
    });
  }

  const result = await classService.getClass(limit, offset);

  if (result.code) {
    return res.status(500).json({
      status: 500,
      error: result.code,
      message: result.message,
    });
  }

  res.status(200).json({
    status: 200,
    message: "Successful",
    data: result,
  });
}

module.exports = router;
