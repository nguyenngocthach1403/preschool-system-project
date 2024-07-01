const express = require("express");
const router = express.Router();
const classCurrentService = require("./teacher_class_current.service");
router.get("/:id", getClassCurrent);

// async function getClass(req, res) {
//   const { limit, offset } = req.query;
//   const { teacher_id } = req.body;
//   if (
//     limit === undefined ||
//     offset === undefined ||
//     limit == "" ||
//     offset == ""
//   ) {
//     return res.status(400).json({
//       status: 400,
//       error: "Invalid input: query must be has limit and page.",
//     });
//   }

//   const result = await classCurrentService.getClassManagedByTeacher(teacher_id);

//   if (result.code) {
//     return res.status(500).json({
//       status: 500,
//       error: result.code,
//       message: result.message,
//     });
//   }
//   res.status(200).json({
//     status: 200,
//     message: "Successful",
//     data: result,
//   });
// }
async function getClassCurrent(req, res) {
  const id = req.params.id;
  const page = req.query.page;
  const limit = req.query.limit;
  const result = await classCurrentService.getClassCurrent(id, page, limit);
  // console.log(result);
  if (result.code) {
    return res.status(500).json({
      status: 500,
      error: result.code,
      message: result.message,
    });
  }
  res.status(200).json({
    status: 200,
    message: "Successful",
    data: result,
  });
}
module.exports = router;
