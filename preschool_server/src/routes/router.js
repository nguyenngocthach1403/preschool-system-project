const express = require("express");
const router = express.Router();
const path = require("path");

//Router demo
router.get("/", (req, res) => {
  res.send("Hello World");
});

router.use("/login", require("./auth.router"));

router.use("/students", require("../student/student.controller"));
router.use("/parents", require("../parent/parent_controller"));

router.use(
  "/registrations",
  require("../registrations/registation.controller")
);

router.use("/news", require("../news/news.controller"));
router.use("/register", require("../register/register"));
router.use("/images", express.static(path.join(__dirname, "uploads")));
router.use("/account", require("../account/account.controller"));
router.use("/class", require("../class/class.controller"));
router.use("/image", require("../image/image.controller"));
router.use(
  "/specialization",
  require("../specialization/specialization.controller")
);
router.use(
  "/teacherSpecialization",
  require("../teacher_specialization/teacher_specialization.controller")
);
router.use("/certificate", require("../certificate/certificate.controller"));
router.use(
  "/teacherCertificate",
  require("../teacher_certificate/teacher_certificate.controller")
);
router.use("/levels", require("../levels/levels.controller"));
router.use("/syllabus", require("../syllabus/syllabus.controller"));
router.use("/relationship", require("../relationship/relationship.controller"));
router.use(
  "/addmission_period",
  require("../admission_period/admission_period.controller")
);
router.use("/teacher", require("../teacher/teacher.controller"));
router.use(
  "/classCurrent",
  require("../teacher_class_current/teacher_class_current.controller")
);
router.use("/menu", require("../menu/menu.controller"));
router.use("/schedule", require("../schedules/schedule.controller"));
router.use("/slide", require("../slideshow/slideshow.controller"));
router.use(
  "/setting",
  require("../setting_homepage/setting_homepage.controller")
);
router.use("/evaluation", require("../evaluation/evaluation.controller"));

module.exports = router;
