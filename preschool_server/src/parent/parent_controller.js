const express = require("express");
const router = express.Router();
const parentService = require("./parent_service");
const accountService = require("../account/account.service");

router.get("/", getAll);
router.post("/insert", insertParent);
router.put("/:id", updateParent);
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
  console.log(req.params.id);
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
  if (id == undefined) {
    return res.status(500).json({
      status: 500,
      error: "Không tìm thấy id.",
    });
  }

  const result = await parentService.getParentById(id);

  if (result.code) {
    return res.status(200).json({
      status: 500,
      error: result.error,
    });
  }

  if (result.length == 0) {
    return res.status(200).json({
      status: 500,
      error: "Không tìm thấy phụ huynh",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Succesful.",
    data: result,
  });
}

async function getParentSearch(req, res, next) {
  console.log(req.query.text, req.query.page, req.query.limit);

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

async function insertParent(req, res, next) {
  try {
    const insertId = await parentService.insertParent(req.body);

    if (insertId) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(500).json({ message: "error add parent" });
    }
  } catch (error) {
    next(error);
  }
}

async function updateParent(req, res, next) {
  try {
    const parentId = req.params.id;
    const newData = req.body;
    await parentService.updateParent(parentId, newData);
    res.json({
      status: 200,
      message: `Parent with ID ${parentId} updated successfully.`,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: `updated fail.`,
    });
  }
}
// async function deleteParent(req, res, next) {
//   try {
//     const parentId = `id = ${req.params.id}`;
//     await parentService.deleteParent(parentId);
//     res.json({ message: `Delete successfully.` });
//   } catch (error) {
//     next(error);
//   }
// }
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
