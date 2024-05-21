const express = require("express");
const router = express.Router();
const db = require("../config/db");
const parentService = require("./parent_service");

router.get("/", getAll);
// router.get("/:id", getByID);
router.post("/insert", insertParent);
router.put("/:id", updateParent);
router.delete("/:id", deleteParent);
router.post("/duplicate", isDuplicate);
router.get("/total", getTotalParent);
router.get("/search", getParentSearch);

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

// function getByID(req, res, next) {
//   console.log(req.params.id);
//   parentService
//     .getByID(req.params.id)
//     .then((result) => res.send(result))
//     .catch(next);
// }
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

async function getParentSearch(req, res, next) {
  console.log(req.query.text, req.query.page, req.query.limit);

  const totalResult = await parentService.countSearchParent(req.query.text);
  if (totalResult[0]["total"] == 0) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "Not found any student",
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
    const { email, phone, account_id } = req.body;
    const duplicateParent = await parentService.isDuplicate(
      email,
      phone,
      account_id
    );
    if (duplicateParent) {
      res.json({ message: "Email or phone or account_id already exists." });
    } else {
      res.json({ message: "Email, phone and account_id are unique." });
    }
  } catch (error) {
    next(error);
  }
}

async function insertParent(req, res, next) {
  try {
    console.log(req.body);
    const insertId = await parentService.insertParent(req.body);
    res.json({ insertId });
  } catch (error) {
    next(error);
  }
}

async function updateParent(req, res, next) {
  try {
    const parentId = req.params.id;
    const newData = req.body;
    await parentService.updateParent(parentId, newData);
    res.json({ message: `Parent with ID ${parentId} updated successfully.` });
  } catch (error) {
    next(error);
  }
}
async function deleteParent(req, res, next) {
  try {
    const parentId = `id = ${req.params.id}`;
    // const affectedRows = await parentService.deleteParent(parentId);
    await parentService.deleteParent(parentId);
    res.json({ message: `Delete successfully.` });
  } catch (error) {
    next(error);
  }
}
module.exports = router;
