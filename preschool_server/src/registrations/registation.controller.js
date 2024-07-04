const express = require("express");

const config = require("../config/config");

const registationService = require("./registration.service");

const fs = require("fs");

const checkService = require("../config/check.service");

const Response = require("../../helpers/response");

const multer = require("multer");
const { error } = require("console");

const upload = multer({ dest: "uploads/registration" });

const router = express.Router();

router.get("/:admission_period_id/total", getTotalRegistration);

router.get("/:admission_period_id/", getRegistration);

router.get("/:admission_period_id/search", searchRegistration);

router.get(
  "/:admission_period_id/search/status",
  getRegistrationWithStatusAndSearch
);

router.get("/update/status/:id", updateStatus);

router.post("/update/:id", upload.array("files"), updateRegister);

router.get("/:admission_period_id/status/total", getTotalOfStatus);

router.get("/:admission_period_id/status", getRegistrationsWithStatus);

router.get("/delete/id", deleteRegistration);

router.get("/id/:id", getRegisterByID);

router.post("/note/add", addNoteByRegisterId);

router.get("/note/delete", deleteNote);

async function addNoteByRegisterId(req, res) {
  const data = req.body;

  const result = await registationService.createNotes(data);

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

  const note = await registationService.getNoteById(result.insertId);

  if (note.code) {
    return res.status(200).json({
      success: false,
      error: note.error,
    });
  }

  return res.status(200).json({
    success: true,
    data: note,
  });
}

async function deleteNote(req, res) {
  const noteId = req.query.noteId;

  console.log(noteId);

  if (checkService.isEmpty(noteId)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "nodeId không đúng định dạng!",
    });
  }

  const result = await registationService.deleteNote(noteId);

  if (result) {
    return Response.sendResponse({
      res,
      statusCode: 200,
    });
  }

  Response.sendErrorResponse({
    res,
    statusCode: 400,
  });
}

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
    student_id,
  } = req.body;

  console.log(student_id);
  console.log(req.body);

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
    address_detail: address,
    city: city,
    district: district,
    town: town,
    level_id: levels,
    syllabus_id: syllabus,
    relationship: relationship,
    student_id: student_id,
    status: status,
  };

  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";
    console.log(req.files[0]);

    fs.renameSync(filePath, file_path_with_extension);

    const url =
      config.baseUrl + "/image/registration/" + req.files[0].filename + ".jpg";

    data.register_img = url;
  }

  const result = await registationService.updateRegister(id, data);

  if (result.code) {
    if (req.files.length > 0) {
      fs.renameSync(req.files[0].path + ".jpg", "uploads/registration/none");
    }

    return res.status(200).json({
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
      error: result.message,
    });
  }

  return res.status(200).json({
    success: true,
    message: result.message,
  });
}

async function getRegistrationsWithStatus(req, res) {
  const { status, limit, offset } = req.query;

  const count = await registationService.getTotalWithStatus(
    req.params.admission_period_id,
    status
  );
  const result = await registationService.getRegistrationsWithStatus(
    req.params.admission_period_id,
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
  console.log(req.query.phone);

  // if (checkService.isEmpty(id) || checkService.isEmpty(phone)) {
  //   return res.status(200).json({
  //     success: false,
  //     error: "Vui lòng nhập id và số diện thoại để xóa.",
  //   });
  // }

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
    req.params.admission_period_id,
    searchText,
    status,
    limit,
    offset
  );

  const count = await registationService.countRegisterWithSearchAndStatus(
    req.params.admission_period_id,
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

  const admission_period_id = req.params.admission_period_id;

  console.log(admission_period_id);

  const count = await registationService.getTotalWithSearch(
    admission_period_id,
    searchText
  );

  const result = await registationService.searchRegisterWithSearch(
    admission_period_id,
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
  const result = await registationService.getTotalOfStatus(
    req.params.admission_period_id
  );

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
  const approve_by = req.query.by;
  const status_before = req.query.status_before;

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

  const approve = await registationService.createApprove({
    register_id: id,
    account_id: approve_by,
    status_before: status_before,
    coming_status: status,
  });

  if (approve.code) {
    const resulstUpdate = await registationService.updateStatus(
      id,
      status_before
    );
    return res.status(200).json({
      success: false,
      error: approve.error,
    });
  }

  if (!approve.success) {
    const resulstUpdate = await registationService.updateStatus(
      id,
      status_before
    );
    return res.status(200).json({
      success: false,
      message: approve.message,
    });
  }

  res.status(200).json({
    success: true,
    message: resulstUpdate.message,
  });
}

async function getTotalRegistration(req, res) {
  const resultTotal = await registationService.getTotalRegistration(
    req.params.admission_period_id
  );
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
      success: false,
      error: "Invalid input: query must be has limit and page.",
    });
  }

  const result = await registationService.getRegistrations(
    req.params.admission_period_id,
    page,
    limit
  );
  if (result.code) {
    return res.status(500).json({
      status: 500,
      code: result.code,
      error: result.error,
    });
  }
  const count = await registationService.getTotalRegistration(
    req.params.admission_period_id
  );
  const statusCount = await registationService.getTotalOfStatus(
    req.params.admission_period_id
  );

  console.log(statusCount);

  res.status(200).json({
    status: 200,
    message: "Successful",
    total: count[0]["total"],
    status_count: statusCount.success ? statusCount.data : [],
    data: result,
  });
}

module.exports = router;
