const express = require("express");
const router = express.Router();
const { decodeHeader, isAdmin } = require("../../middleware/verifyAuth");
const {
  getAddmissionPeriod,
  getAddmissionPeriodOpenning,
  createEnrollmentSessions,
  getSessionClasses,
} = require("../enrollment_sessions/enrollment_sessions.controller");

router.get("/", decodeHeader, getAddmissionPeriod);
router.get("/openning", getAddmissionPeriodOpenning);
router.get("/session-classes", getSessionClasses);
router.post("/create", decodeHeader, isAdmin, createEnrollmentSessions);

module.exports = router;
