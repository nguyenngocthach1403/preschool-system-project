const express = require("express");
const multer = require("multer");
const router = express.Router();
const db = require("../config/db.service");
const upload = multer({ dest: "uploads/registration" });
const path = require("path");
const fs = require("fs");
const config = require("../config/config");
const registerService = require("../registrations/registration.service");
const studentService = require("../student/student.service");
const parentService = require("../parent/parent_service");
const relationshipService = require("../relationship/relationship.service");

const { error } = require("console");

router.post("/", upload.array("files"), async (req, res) => {
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
    admission_period_id,
    studentName,
    studentBirthday,
    studentFork,
    studentGender,
    studentNation,
    studentPlaceOfBirth,
  } = req.body;

  //Kiểm tra tồn tại của đơn
  if (
    await registerService.isExistRegisterByPhone(admission_period_id, phone)
  ) {
    return res.status(200).json({
      isExist: true,
    });
  }

  //create Student
  const resultToCreateStudent = await studentService.createNewStudent({
    name: studentName,
    gender: studentGender,
    birthday: studentBirthday,
    fork: studentFork,
    nation: studentNation,
    place_of_birth: studentPlaceOfBirth,
    status: 0,
  });

  if (resultToCreateStudent.code) {
    return res(400).json({
      success: false,
      error: resultToCreateStudent.message,
    });
  }

  if (!resultToCreateStudent.success) {
    return res(400).json({
      success: false,
      error: resultToCreateStudent.message,
    });
  }

  const dataToCreateRegister = {
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
    admission_period_id: admission_period_id,
    status: status,
    student_id: resultToCreateStudent.insertId,
  };

  if (req.files.length > 0) {
    const filePath = req.files[0].path;

    const file_path_with_extension = filePath + ".jpg";

    fs.renameSync(filePath, file_path_with_extension);

    const url =
      config.baseUrl + "/image/registration/" + req.files[0].filename + ".jpg";

    dataToCreateRegister.register_img = url;
  }

  const resultCreateRegister = await registerService.createRegister(
    dataToCreateRegister
  );

  if (resultCreateRegister.code) {
    if (req.files.length > 0) {
      fs.renameSync(req.files[0].path + ".jpg", "uploads/registration/none");
    }
    await studentService.deleteStudenPermanently(
      resultToCreateStudent.insertId
    );

    return res.status(200).json({
      status: 400,
      success: false,
      message: result.message,
      error: result.error,
    });
  }

  const registerCreated = await registerService.getRegisterByID(
    resultCreateRegister
  );

  //Create parent
  const resultCreateParent = await parentService.insertParent({
    name: name,
    phone: phone,
    email: email,
    role: relationship,
    status: 0,
  });

  if (!resultCreateParent.code) {
    if (resultCreateParent.success) {
      await relationshipService.createRelationship({
        student_id: resultToCreateStudent.insertId,
        parent_id: resultCreateParent.id,
      });
    }
  }

  res.status(200).json({
    status: 200,
    success: true,
    message: "Successful.",
    data: registerCreated !== false ? registerCreated : null,
  });
});

// router.get("/images/:imageName", (req, res) => {
//   const imageName = req.params.imageName;
//   const imagePath = path.join(__dirname, "../uploads/", imageName);

//   // Kiểm tra xem hình ảnh có tồn tại không
//   if (fs.existsSync(imagePath)) {
//     // res.status(200).send({ imagePath: imagePath });
//     const imageData = fs.readFileSync(imagePath);
//     res.writeHead(200, { "Content-Type": "image/jpeg" });
//     res.end(imageData, "binary");
//   } else {
//     res.status(404).send("Image not found");
//   }
// });

module.exports = router;
