const express = require("express");
const multer = require("multer");
const {
  getTotalRegistration,
  updateStatus,
  updateRegister,
  getTotalOfStatus,
  getRegistrationsWithStatus,
  deleteRegistration,
  getRegisterByID,
  deleteNote,
} = require("../registrations/registration.service");

const {
  getRegistration,
  searchRegistration,
  getRegistrationWithStatusAndSearch,
  addNoteByRegisterId,
  register,
} = require("../registrations/registation.controller");
const { validateStudent } = require("../../middleware/student");
const validateParent = require("../../middleware/parent.middleware");
const validateRegistration = require("../../middleware/registration.middleware");

const upload = multer({ dest: "uploads/registration" });

const router = express.Router();

router.get("/:admission_period_id/total", getTotalRegistration);

router.get("/:admission_period_id/", getRegistration);

router.get("/:admission_period_id/search", searchRegistration);

router.post(
  "/register",
  validateRegistration,
  validateStudent,
  validateParent,
  register
);

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

module.exports = router;
