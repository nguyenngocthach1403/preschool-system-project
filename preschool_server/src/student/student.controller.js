const express = require("express");

const router = express.Router();

const db = require("../config/db");

const studentService = require("./student.service");

router.get("/", getAll);
// router.get("/:id", getByID);
router.get("/total", getTotalStudent);

// router.get("/search", getStudentSearch);

router.get("/delete", deleteStudent);

router.post("/create", createStudent);

async function createStudent(req, res, next) {
  console.log(req.body);

  const result = await studentService.createNewStudent(req.body);

  if (result.code === "ER_NO_DEFAULT_FOR_FIELD") {
    res.send(
      JSON.stringify({
        status: 404,
        error: result.message,
        message: "Dữ liệu tạo chưa đủ!",
      })
    );
  }
  if (result === "ER_DUP_ENTRY") {
    res.send(
      JSON.stringify({
        status: 404,
        error: result.message,
        message: "Mã học sinh đã tồn tại!",
      })
    );
  }
  if (result > 0) {
    res.send(
      JSON.stringify({
        status: 200,
        message: "Successfull",
        effectedRows: result,
      })
    );
    return;
  }
}

async function deleteStudent(req, res, next) {
  if (req.query.id === undefined) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "Resouse not found",
      })
    );
    return;
  }

  const result = await studentService.deleteStudent(req.query.id);

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

async function getStudentSearch(req, res, next) {
  console.log(req.query.text, req.query.page, req.query.limit);

  const totalResult = await studentService.countSearchStudent(req.query.text);
  if (totalResult[0]["total"] == 0) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "Not found any student",
      })
    );
    return;
  }

  const resultStudentSearch = await studentService.searchStudent(
    req.query.text,
    req.query.page,
    req.query.limit
  );

  res.send({
    status: 200,
    message: "Successful",
    total: totalResult[0]["total"],
    data: resultStudentSearch,
  });
}

async function getTotalStudent(req, res, next) {
  console.log("Get total student in database");

  const countStudent = await studentService.countStudent();

  res.send(
    JSON.stringify({
      status: 200,
      message: "Successful",
      data: countStudent[0]["total"],
    })
  );
}

async function getAll(req, res, next) {
  const { limit, page } = req.query;
  if (limit === undefined || page === undefined) {
    return res.status(400).json({
      status: 400,
      error: "Invalid input: Querry must has limit and page",
    });
  }

  const result = await studentService.getStudent(page, limit);

  if (result.code) {
    return res.status(500).json({
      status: 500,
      code: result.code,
      error: result.message,
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Successful",
    data: result,
  });
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
