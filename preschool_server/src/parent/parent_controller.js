const express = require("express");
const router = express.Router();
const parentService = require("./parent_service");
const accountService = require("../account/account.service");
const checkService = require("../config/check.service");
const multer = require("multer");
const upload = multer({ dest: "uploads/parents" });
const fs = require("fs");
const config = require("../config/config");

router.get("/", getAll);
router.post("/insert", insertParent);
router.post("/update/:id", upload.array("files"), updateParent);
// router.delete("/:id", deleteParent);
router.post("/duplicate", isDuplicate);
router.post("/duplicateAccount", isDuplicateAccount);
router.get("/total", getTotalParent);
router.get("/search", getParentSearch);
router.get("/delete", deleteParent);
router.get("/:id", getByID);
router.get("/get/id/:id", getParentById);

async function getAll(req, res, next) {
  const { limit, page } = req.query;
  if (limit === undefined || page === undefined) {
    return res.status(400).json({
      status: 400,
      error: "Invalid input: Querry must has limit and page",
    });
  }

  const result = await parentService.getPage(page, limit);

  if (result.code) {
    return res.status(500).json({
      status: 500,
      code: result.code,
      error: result.message,
    });
  }
  res.status(200).json({
    status: 200,
    message: "Successful",
    data: result,
  });
}

function getByID(req, res, next) {
  parentService
    .getByID(req.params.id)
    .then((result) => res.send(result))
    .catch(next);
}
async function getTotalParent(req, res, next) {
  console.log("Get total parent in database");

  const countParent = await parentService.countParent();

  res.send(
    JSON.stringify({
      status: 200,
      message: "Successful",
      data: countParent[0]["total"],
    })
  );
}

async function getParentById(req, res) {
  const id = req.params.id;

  const isExistParent = await parentService.isExistParent(id);

  if (!isExistParent)
    return res.status(200).json({
      success: false,
      message: "Phụ huynh không tồn tại.",
    });

  const result = await parentService.getParentById(id);

  if (result.code) {
    return res.status(200).json({
      success: false,
      error: result.error,
    });
  }

  if (result.length == 0) {
    return res.status(200).json({
      success: false,
      error: "Không tìm thấy phụ huynh",
    });
  }

  res.status(200).json({
    success: true,
    message: "Succesful.",
    data: result,
  });
}

async function getParentSearch(req, res, next) {
  const totalResult = await parentService.countSearchParent(req.query.text);
  if (totalResult[0]["total"] == 0) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "Not found any parent",
      })
    );
    return;
  }
  const resultParentSearch = await parentService.searchParent(
    req.query.text,
    req.query.page,
    req.query.limit
  );
  res.send({
    status: 200,
    message: "Successful",
    total: totalResult[0]["total"],
    data: resultParentSearch,
  });
}
async function isDuplicate(req, res, next) {
  try {
    const { email, phone, account } = req.body;
    const duplicateParent = await parentService.isDuplicate(
      email,
      phone,
      account
    );
    if (duplicateParent) {
      res.json({
        status: 400,
        message: "Email or phone or account already exists.",
      });
    } else {
      res.json({
        status: 200,
        message: "Email, phone and account are unique.",
      });
    }
  } catch (error) {
    next(error);
  }
}
async function isDuplicateAccount(req, res, next) {
  try {
    const { account } = req.body;
    const duplicateParent = await parentService.isDuplicateAccount(account);
    if (duplicateParent) {
      res.json({ status: 400, message: "account already exist" });
    } else {
      res.json({ status: 200, message: "success" });
    }
  } catch (error) {
    next(error);
  }
}

// async function insertParent(req, res, next) {
//   try {
//     const { email, phone, account } = req.body;
//     const duplicateCheck = await parentService.isDuplicate(
//       email,
//       phone,
//       account
//     );
//     if (duplicateCheck) {
//       return res.status(200).json({
//         status: 400,
//         message: "Email or phone or account already exists.",
//       });
//     }
//     const insertId = await parentService.insertParent(req.body);

//     if (insertId) {
//       res.status(200).json({ status: 200, message: "success" });
//     } else {
//       res.status(200).json({ status: 500, message: "error add parent" });
//     }
//   } catch (error) {
//     next(error);
//   }
// }
async function insertParent(req, res, next) {
  try {
    const {
      name,
      gender,
      birthday,
      address,
      job,
      email,
      phone,
      role,
      status,
      account,
    } = req.body;
    const duplicateCheck = await parentService.isDuplicate(
      email,
      phone,
      account
    );
    if (duplicateCheck) {
      return res.status(200).json({
        status: 400,
        message: "Email or phone or account already exists.",
      });
    }
    const data = {
      name: name,
      gender: gender,
      birthday: birthday,
      address: address,
      job: job,
      email: email,
      phone: phone,
      role: role,
      status: status,
      account_id: account,
    };

    const result = await parentService.insertParent(data);

    if (result) {
      res.status(200).json({ status: 200, message: "success" });
    } else {
      res.status(200).json({ status: 500, message: "error add parent" });
    }
  } catch (error) {
    next(error);
  }
}

async function updateParent(req, res) {
  const parentId = req.params.id;

  const {
    name,
    gender,
    birthday,
    phone,
    email,
    job,
    role,
    address,
    status,
    username,
  } = req.body;

  //Kiểm tra có phụ huynh hay chưa.
  const isExistParent = await parentService.isExistParent(parentId);

  //Nếu kho tồn tại => out
  if (!isExistParent) {
    return res.status(200).json({
      success: false,
      message: "Không tìm thấy phụ huynh.",
    });
  }

  //Phụ huynh có tồn tại
  //Kiểm tra dữ liệu
  // => Nếu người dùng có sửa đổi tài khoản => Kiểm tra tồn tại của tài khoản
  if (!checkService.isEmpty(username)) {
    //Kiểm tra nếu có
    if (await accountService.isExistAccountByUsername(username)) {
      //Lấy account
      var account = await accountService.getAccountByUsername(username);
    } else {
      return res.status(200).json({
        success: false,
        message: "Tài khoản không tồn tại.",
      });
    }
  }

  //Kiểm tra tải hình ảnh
  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    var url =
      config.baseUrl + "/image/parents/" + req.files[0].filename + ".jpg";
  }

  //Cập nhật phụ huynh
  const result = await parentService.updateParent(parentId, {
    name: name,
    gender: gender,
    birthday: birthday,
    phone: phone,
    email: email,
    job: job,
    role: role,
    address: address,
    status: status,
    account_id: account != undefined ? account.id : undefined,
    avatar: url || undefined,
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
    error: result.message,
  });
}
async function deleteParent(req, res, next) {
  if (req.query.id === undefined) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "Resouse not found",
      })
    );
    return;
  }

  const result = await parentService.deleteParent(req.query.id);

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
