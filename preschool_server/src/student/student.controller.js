const express = require("express");

const router = express.Router();

const db = require("../config/db");

const studentService = require("./student.service");

router.get("/", getAll);
router.get("/:id", getByID);

function getAll(req, res, next) {
  if (req.query.page !== undefined && req.query.limit !== undefined) {
    console.log(req.query.page);
    studentService
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
    studentService
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
  studentService
    .getByID(req.params.id)
    .then((result) => res.send(result))
    .catch(next);
}

function getByPage(req, res, next) {
  studentService
    .getByID(req.params.id)
    .then((result) => res.send(result))
    .catch(next);
}

module.exports = router;
