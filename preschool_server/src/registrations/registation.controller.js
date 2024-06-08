const express = require("express");

const config = require("../config/config");

const registationService = require("./registration.service");

const fs = require("fs");

const checkService = require("../config/check.service");

const multer = require("multer");

const upload = multer({ dest: "uploads/registration" });

const router = express.Router();

router.get("/total", getTotalRegistration);

router.get("/", getRegistration);

router.get("/search", searchRegistration);

router.get("/search/status", getRegistrationWithStatusAndSearch);

router.get("/update/status/:id", updateStatus);

router.post("/update/:id", upload.array("files"), updateRegister);

router.get("/status/total", getTotalOfStatus);

router.get("/status", getRegistrationsWithStatus);

router.get("/delete", deleteRegistration);

router.get("/id/:id", getRegisterByID);

async function updateRegister(req, res) {
  const id = req.params.id;

  const {
    name,
    email,
    phone,
    address,
    city,
    district,
    town,
    levels,
    syllabus,
    relationship,
    status,
  } = req.body;

  const isExist = await registationService.isExitsRegister(id);

  if (!isExist) {
    return res.status(200).json({
      success: false,
      message: "Đơn đăng ký không tồn tại",
    });
  }

  const data = {
    name: name,
    email: email,
    phone: phone,
    address: address,
    city: city,
    district: district,
    town: town,
    levels: levels,
    syllabus: syllabus,
    relationship: relationship,
    status: status,
  };

  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    const url =
      config.baseUrl + "/image/registration/" + req.files[0].filename + ".jpg";

    data.file_paths = url;
  }

  const result = await registationService.updateRegister(id, data);

  if (result.code) {
    if (req.files.length > 0) {
      fs.renameSync(req.files[0].path + ".jpg", "uploads/registration/none");
    }

    return res.status(400).json({
      success: false,
      error: result.error,
    });
  }

  if (!result.success) {
    if (req.files.length > 0) {
      fs.renameSync(req.files[0].path + ".jpg", "uploads/registration/none");
    }

    return res.status(200).json({
      success: false,
      message: result.message,
    });
  }

  return res.status(200).json({
    success: true,
    message: result.message,
  });
}

async function getRegistrationsWithStatus(req, res) {
  const { status, limit, offset } = req.query;
  console.log(status);
  const count = await registationService.getTotalWithStatus(status);
  const result = await registationService.getRegistrationsWithStatus(
    status,
    limit,
    offset
  );
  if (result.code) {
    return res.status(400).json({ success: false, error: result.error });
  }
  if (!result.success) {
    return res.status(200).json({ success: false, message: result.error });
  }
  res
    .status(200)
    .json({ success: true, total: count[0]["total"], data: result.data });
}

async function getRegisterByID(req, res) {
  const id = req.params.id;

  const isExist = await registationService.isExitsRegister(id);
  if (!isExist) {
    return res.status(200).json({
      success: false,
      message: "Đơn đăng ký không tồn tại.",
    });
  }

  const register = await registationService.getRegisterByID(id);

  if (register.code) {
    return res.status(500).json({
      success: false,
      error: register.error,
    });
  }

  if (!register.success) {
    return res.status(200).json({
      success: false,
      error: register.message,
    });
  }

  return res.status(200).json({
    success: true,
    message: register.message,
    data: register.data,
  });
}

async function deleteRegistration(req, res) {
  const { id, phone } = req.query;

  if (checkService.isEmpty(id) || checkService.isEmpty(phone)) {
    return res.status(200).json({
      success: false,
      error: "Vui lòng nhập id và số diện thoại để xóa.",
    });
  }

  //Call function delete
  const result = await registationService.deleteRegistration(id, phone);

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

  return res.status(200).json({
    success: true,
    error: result.message,
  });
}

async function getRegistrationWithStatusAndSearch(req, res) {
  const { searchText, status, limit, offset } = req.query;

  const result = await registationService.getRegisterWithSearchAndStatus(
    searchText,
    status,
    limit,
    offset
  );

  const count = await registationService.countRegisterWithSearchAndStatus(
    searchText,
    status
  );

  if (result.code) {
    return res.status(500).json({
      success: false,
      error: result.error,
    });
  }
  if (!result.success) {
    return res.status(200).json({
      success: false,
      error: result.error,
    });
  }

  res.status(200).json({
    success: true,
    total: count.data[0]["total"],
    data: result.data,
  });
}

async function searchRegistration(req, res) {
  const { searchText, limit, offset } = req.query;

  const count = await registationService.getTotalWithSearch(searchText);

  const result = await registationService.searchRegisterWithSearch(
    searchText,
    limit,
    offset
  );

  if (result.code) {
    return res.status(400).json({
      success: false,
      error: result.error,
    });
  }

  if (!result.success) {
    return res.status(200).json({
      success: false,
      message: result.error,
    });
  }

  res.status(200).json({
    success: true,
    total: count.data[0]["total"],
    data: result.data,
  });
}

async function getTotalOfStatus(req, res) {
  const result = await registationService.getTotalOfStatus();

  if (result.code) {
    return res.status(400).json({
      status: 400,
      error: result.error,
    });
  }

  if (!result.success) {
    return res.status(500).json({
      status: 500,
      error: result.error,
    });
  }

  res.status(200).json({
    status: 200,
    data: result.data,
  });
}
async function updateStatus(req, res) {
  const id = req.params.id;
  const status = req.query.status;

  const isExits = await registationService.isExitsRegister(id);

  if (!isExits) {
    return res.status(200).json({
      success: false,
      message: "Không tìm thấy đơn.",
    });
  }

  //Cập nhật sau khi đã kiểm tra tồn tại
  const resulstUpdate = await registationService.updateStatus(id, status);
  if (resulstUpdate.code) {
    return res.status(500).json({
      success: false,
      error: resulstUpdate.error,
    });
  }
  if (!resulstUpdate.success) {
    return res.status(200).json({
      success: false,
      message: resulstUpdate.message,
    });
  }

  res.status(200).json({
    success: true,
    message: resulstUpdate.message,
  });
}

async function getTotalRegistration(req, res) {
  const resultTotal = await registationService.getTotalRegistration();
  res.send(
    JSON.stringify({
      status: 200,
      message: "Successful",
      total: resultTotal[0]["total"],
    })
  );
}

async function getRegistration(req, res) {
  const { limit, page } = req.query;

  //   //Xác thực đầu vào từ người dùng request
  if (limit === undefined && page === undefined) {
    return res.status(400).json({
      status: 400,
      error: "Invalid input: query must be has limit and page.",
    });
  }

  const result = await registationService.getRegistrations(page, limit);
  if (result.code) {
    res.status(500).json({
      status: 500,
      code: result.code,
      message: result.message,
    });
  }
  const count = await registationService.getTotalRegistration();

  res.status(200).json({
    status: 200,
    message: "Successful",
    total: count[0]["total"],
    data: result,
  });
}

module.exports = router;
