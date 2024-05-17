const express = require("express");
const router = express.Router();
const db = require("../config/db");
const parentService = require("./parent_service");

router.get("/", getAll);
router.get("/:id", getByID);
router.post("/insert", insertParent);
router.put("/:id", updateParent);
router.delete("/:id", deleteParent);

function getAll(req, res, next) {
  if (req.query.page !== undefined && req.query.limit !== undefined) {
    console.log(req.query.page);
    parentService
      .getPage(req.query.page, req.query.limit)
      .then((result) => {
        if (result.length !== 0) {
          res.send(result);
        } else {
          res.send([]);
        }
      })
      .catch(next);
  } else {
    parentService
      .getAll()
      .then((result) => {
        res.send(
          JSON.stringify({
            status: 200,
            message: "Successful",
            data: result,
          })
        );
      })
      .catch(next);
  }
}

function getByID(req, res, next) {
  console.log(req.params.id);
  parentService
    .getByID(req.params.id)
    .then((result) => res.send(result))
    .catch(next);
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
