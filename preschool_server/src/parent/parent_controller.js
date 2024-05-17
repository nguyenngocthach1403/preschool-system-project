const express = require("express");
const router = express.Router();
const db = require("../config/db");
const parentService = require("./parent_service");

router.get("/", getAll);
router.get("/:id", getByID);

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
module.exports = router;
