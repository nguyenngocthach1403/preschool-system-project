const addmissionService = require("./enrollment_sessions.service");
const { sendResponse, sendErrorResponse } = require("../../helpers/response");

async function getAddmissionPeriod(req, res) {
  const result = await addmissionService.getAddmissionPeriod();

  if (result.code) {
    return res.status(500).json({
      success: false,
      error: result.error,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Thành công",
    data: result,
  });
}

async function getAddmissionPeriodOpenning(req, res) {
  const result = await addmissionService.getAddmissionPeriodOpenning();

  if (result.code) {
    return res.status(500).json({
      success: false,
      error: result.error,
    });
  }

  if (!result.success) {
    return res.status(200).json({
      success: false,
      message: result.message,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Thành công",
    data: result.data,
  });
}

async function createEnrollmentSessions(req, res) {
  const dataToCreate = req.body;

  console.log(`datra ${dataToCreate.enrollmentClasses}`);

  const user = res.user;
  try {
    const insertId = await addmissionService.createEnrollmentSessions({
      name: dataToCreate.name,
      start_date: dataToCreate.startDate,
      end_date: dataToCreate.endDate,
      created_by: user.user_id,
      openning: dataToCreate.status,
    });

    //Create sessionClasse
    for (classItem in dataToCreate.enrollmentClasses) {
      await addmissionService.createSessionClasses(
        insertId,
        dataToCreate.enrollmentClasses[classItem]
      );
    }

    const enrollmentReaded = await addmissionService.getEnrollmentById(
      insertId
    );

    enrollmentReaded.session_classes =
      await addmissionService.getSessionClassesBySessionId(insertId);

    sendResponse({ res, statusCode: 201, responseBody: enrollmentReaded });
  } catch (error) {
    sendErrorResponse({ res, error: error, statusCode: 500 });
  }
}

module.exports = {
  getAddmissionPeriod,
  getAddmissionPeriodOpenning,
  createEnrollmentSessions,
};
