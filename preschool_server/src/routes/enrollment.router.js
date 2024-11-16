const express = require("express");
const router = express.Router();
const { decodeHeader, isAdmin } = require("../../middleware/verifyAuth");
const {
  getAddmissionPeriod,
  getAddmissionPeriodOpenning,
  createEnrollmentSessions,
} = require("../enrollment_sessions/enrollment_sessions.controller");

router.get("/", decodeHeader, getAddmissionPeriod);
router.get("/openning", decodeHeader, getAddmissionPeriodOpenning);
router.post("/create", decodeHeader, isAdmin, createEnrollmentSessions);

module.exports = router;
