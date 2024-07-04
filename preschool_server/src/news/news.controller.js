const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/news" });
const fs = require("fs");
const newsService = require("../news/news.service");
const router = express.Router();
const config = require("../config/config");

router.get("/", getAllNews);
router.get("/total", getTotalNews);
router.get("/id/:id", getNewsById);
router.get("/getNews", getNews);
router.get("/search", getNewsSearch);
router.post("/create", upload.array("files"), createNews);
router.post("/update/:id", upload.array("files"), updateNews);
router.get("/delete", deleteNews);
//lấy dữ liệu cho admin
async function getAllNews(req, res) {
  const { limit, page } = req.query;
  if (limit === undefined || page === undefined) {
    return res.status(400).json({
      status: 400,
      error: "Invalid input: Querry must has limit and page",
    });
  }
  const result = await newsService.getNewsAll(page, limit);
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
//lấy dữ liệu cho client trang chủ
async function getNews(req, res) {
  const result = await newsService.getNews();

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

async function getNewsById(req, res) {
  const id = req.params.id;

  const result = await newsService.getByID(id);

  if (result.code) {
    return res.status(200).json({
      success: false,
      error: result.error,
    });
  }

  if (result.length == 0) {
    return res.status(200).json({
      success: false,
      error: "Không tìm thấy tin tức",
    });
  }

  res.status(200).json({
    success: true,
    message: "Succesful.",
    data: result,
  });
}

async function getNewsSearch(req, res, next) {
  const totalResult = await newsService.countSearchNews(req.query.text);
  if (totalResult[0]["total"] == 0) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "Not found any news",
      })
    );
    return;
  }
  const resultNewsSearch = await newsService.searchNews(
    req.query.text,
    req.query.page,
    req.query.limit
  );
  res.send({
    status: 200,
    message: "Successful",
    total: totalResult[0]["total"],
    data: resultNewsSearch,
  });
}

async function getTotalNews(req, res) {
  const countNews = await newsService.countNews();

  res.send(
    JSON.stringify({
      status: 200,
      message: "Successful",
      data: countNews[0]["total"],
    })
  );
}

async function createNews(req, res) {
  const data = req.body;

  if (data.title == undefined || data.title == "") {
    return res.status(200).json({
      status: 500,
      error: "Lỗi: Tiêu đề không được phép để trống.",
    });
  }
  //   Kiểm tra tải hình ảnh
  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    var url = config.baseUrl + "/image/news/" + req.files[0].filename + ".jpg";
    data.img = url;
  }
  if (await newsService.isExistNewsByTitle(data.title)) {
    return res.status(200).json({
      success: false,
      message: `Tên tiêu đề đã tồn tại`,
    });
  }
  const result = await newsService.createNews({
    title: data.title,
    description: data.description,
    status: data.status,
    img: data.img,
  });

  if (result.code) {
    return res.status(400).json({
      success: false,
      error: result.error,
    });
  }

  if (!result.success) {
    if (req.files.length > 0) {
      fs.renameSync(req.files[0].path + ".jpg", "uploads/news/none");
    }
    return res.status(200).json({
      success: false,
      error: result.message,
    });
  }
  res.status(200).json({
    status: 200,
    success: true,
    message: "Tạo tin tức thành công.",
  });
}
async function updateNews(req, res) {
  const NewsId = req.params.id;

  const data = req.body;

  //Kiểm tra tải hình ảnh
  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    var url = config.baseUrl + "/image/news/" + req.files[0].filename + ".jpg";
    data.img = url;
  }
  if (await newsService.isExistNewsByTitle(data.title)) {
    return res.status(200).json({
      success: false,
      message: `Tên tiêu đề đã tồn tại`,
    });
  }

  //Cập nhật
  const result = await newsService.updateNews(NewsId, {
    title: data.title,
    description: data.description,
    status: data.status,
    img: data.img,
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
async function deleteNews(req, res) {
  if (req.query.id === undefined) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "Resouse not found",
      })
    );
    return;
  }

  const result = await newsService.deleteNews(req.query.id);

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
