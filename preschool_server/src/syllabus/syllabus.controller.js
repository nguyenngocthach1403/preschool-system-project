const express = require("express");

const router = express.Router();

const syllabusService = require("../syllabus/syllabus.service");
const { isEmpty } = require("../config/check.service");

router.get("/", getSyllabus);
router.post("/create", createSyllabus);

async function getSyllabus(req, res) {
  const result = await syllabusService.getSyllabus();

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
async function createSyllabus(req, res) {
  const data = req.body;

  //Kiểm tra username rỗng
  if (isEmpty(data.name)) {
    return res.status(200).json({
      success: false,
      message: `Tạo chương trình thất bại do tên chương trình bị bỏ trống`,
    });
  }
  //Kiểm tra tài khoản đã tồn tại chưa
  if (await syllabusService.isExistSyllabusByName(data.name)) {
    return res.status(200).json({
      success: false,
      message: `Chương trình đã tồn tại với tên ${data.name}`,
    });
  }

  const result = await syllabusService.createSyllabus({
    name: data.name,
    description: data.description,
    created_by: data.created_by,
  });

  if (result.code) {
    return res.status(500).json({
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
    message: result.message,
  });
}
module.exports = router;
