const express = require("express");
//service
const ScheduleService = require("./schedule.service");
const AccountSerevice = require("../account/account.service");
const ClassService = require("../class/class.service");
const Response = require("../../helpers/response");
const {
  isEmpty,
  isNumber,
  isValidTime,
  isValidDate,
} = require("../../helpers/validation");
const router = express.Router();

router.get("/activities", getActivities);
router.get("/timetable", getTimetable);
router.get("/timetable/search", searchTimetable);
router.get("/activity/search", searchSchedules);
router.post("/activity/add", addActivity);
router.post("/activity/update", updateActivity);
router.delete("/activity/delete", deleleActivity);
router.post("/timetable/add", addTimetable);
router.get("/", getSchedules);
router.post("/create", createSchedule);
router.post("/update", updateSchedule);
router.post("/delete", deleteTimetableOfWeek);

async function updateActivity(req, res) {
  const { activityId } = req.query;
  const { name, description } = req.body;

  if (isEmpty(activityId) || !isNumber(activityId)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "Mã món ăn không hợp lệ!",
    });
  }

  if ((await ScheduleService.isExistActivity(activityId)) == false) {
    return Response.sendErrorResponse({
      res,
      statusCode: 404,
      error: "Dữ liệu không tồn tại!",
    });
  }

  try {
    await ScheduleService.updateActivity(activityId, { name, description });
    Response.sendResponse({ res, statusCode: 200 });
  } catch (error) {
    Response.sendErrorResponse({ res, statusCode: 400, error: error });
  }
}
async function deleleActivity(req, res) {
  const { activityId } = req.query;

  if (isEmpty(activityId) || !isNumber(activityId)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "Mã món ăn không hợp lệ!",
    });
  }

  if ((await ScheduleService.isExistActivity(activityId)) == false) {
    return Response.sendErrorResponse({
      res,
      statusCode: 404,
      error: "Dữ liệu không tồn tại!",
    });
  }

  try {
    await ScheduleService.deleteActivity(activityId);
    Response.sendResponse({ res, statusCode: 200 });
  } catch (error) {
    Response.sendErrorResponse({ res, statusCode: 400, error: error });
  }
}

async function deleteTimetableOfWeek(req, res) {
  const { classId } = req.query;
  const { startTime, endTime, startDate, endDate } = req.body;

  console.log(classId, startTime, endTime, startDate, endDate);
  try {
    const timetableIds =
      await ScheduleService.getTimetableIdByDateAndTimeAndClassId(
        classId,
        startTime,
        endTime,
        startDate,
        endDate
      );

    if (!timetableIds) {
      return Response.sendErrorResponse({
        statusCode: 404,
        res,
        error: "Dữ liệu không tồn tại!",
      });
    }

    for (let index = 0; index < timetableIds.length; index++) {
      const element = timetableIds[index];
      await ScheduleService.deleteAllActivityGroupsByTimetableId(element.id);
      await ScheduleService.deleteAllTimetablAssignmentByTimetableId(
        element.id
      );
      await ScheduleService.deleteAllTimetablByTimetableId(element.id);
    }
    return Response.sendResponse({
      statusCode: 200,
      res,
    });
  } catch (error) {
    console.error(error);
    return Response.sendErrorResponse({
      statusCode: 400,
      res,
      error: "Dữ liệu không tồn tại!",
    });
  }
}

async function updateSchedule(req, res) {
  const { timetableId } = req.query;
  const {
    activitiesToDelete,
    teachersToDelete,
    activitiesToAdd,
    teachersToAdd,
  } = req.body;

  if (isEmpty(timetableId)) {
    return Response.sendErrorResponse({
      statusCode: 400,
      res,
      error: "Dữ liệu không tồn tại!",
    });
  }

  try {
    for (const item in teachersToDelete) {
      await ScheduleService.deletedTimetableAssignment(
        timetableId,
        teachersToDelete[item].teacher_id
      );
    }
    for (const item in activitiesToDelete) {
      console.log(activitiesToDelete[item]);
      await ScheduleService.deletedActivityGroups(
        timetableId,
        activitiesToDelete[item].activity_id
      );
    }
    for (let index = 0; index < activitiesToAdd.length; index++) {
      const element = activitiesToAdd[index];
      await ScheduleService.createActivityGroups({
        timetable_id: timetableId,
        activity_id: element.id,
      });
    }
    for (let index = 0; index < teachersToAdd.length; index++) {
      const element = teachersToAdd[index];

      await ScheduleService.createTimetableAssignment({
        timetable_id: timetableId,
        teacher_id: element.id,
      });
    }
    Response.sendResponse({ res, statusCode: 200 });
  } catch (error) {
    //
    console.log(error.message);
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: error.message,
    });
  }
}

async function getSchedules(req, res) {
  const { classId, startDate, endDate } = req.query;

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "Ngày không hợp lệ!",
    });
  }

  if (isEmpty(classId) || !isNumber(classId)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "classId phải là số!",
    });
  }

  ///Kiểm tra tồn tại lớp học
  const isExistClass = await ClassService.isExistClass(classId);

  if (!isExistClass) {
    return Response.sendErrorResponse({
      res,
      statusCode: 404,
      error: "Lớp không tồn tại!",
    });
  }

  const result = await ScheduleService.getSchedules(
    classId,
    startDate,
    endDate
  );

  Response.sendResponse({ res, statusCode: 200, responseBody: result || [] });
}

async function createSchedule(req, res) {
  const { classId } = req.query;
  const {
    startTime,
    endTime,
    dateId,
    timetableId,
    date,
    activities,
    teachers,
  } = req.body;

  if (isEmpty(timetableId) && isEmpty(dateId)) {
    if (!isValidTime(startTime) || !isValidTime(endTime)) {
      return Response.sendErrorResponse({
        statusCode: 400,
        res,
        error: "Thời gian không hợp lệ!",
      });
    }
    if (isEmpty(date)) {
      return Response.sendErrorResponse({
        statusCode: 400,
        res,
        error: "Ngày không hợp lệ!",
      });
    }
    try {
      const resultCreateSchedule = await ScheduleService.createSchedule({
        class_id: classId,
        date: date,
      });

      const resultCreateTimeTable = await ScheduleService.createTimetable({
        start_time: startTime,
        end_time: endTime,
        schedule_id: resultCreateSchedule,
      });

      for (let index = 0; index < activities.length; index++) {
        const element = activities[index];
        await ScheduleService.createActivityGroup({
          activity_id: element.id,
          timetable_id: resultCreateTimeTable,
        });
      }
      console.log(teachers);
      for (const index in teachers) {
        await ScheduleService.createTimetableAssignment({
          teacher_id: teachers[index].id,
          timetable_id: resultCreateTimeTable,
        });
      }
    } catch (error) {
      return Response.sendErrorResponse({
        statusCode: 400,
        res,
        error: error.message,
      });
    }

    return Response.sendResponse({
      statusCode: 200,
      res,
    });
  }

  if (!isEmpty(dateId) && isEmpty(timetableId)) {
    if (!isValidTime(startTime) || !isValidTime(endTime)) {
      return Response.sendErrorResponse({
        statusCode: 400,
        res,
        error: "Thời gian không hợp lệ!",
      });
    }
    try {
      const resultCreateTimeTable = await ScheduleService.createTimetable({
        start_time: startTime,
        end_time: endTime,
        schedule_id: dateId,
      });

      for (let index = 0; index < activities.length; index++) {
        const element = activities[index];
        await ScheduleService.createActivityGroup({
          activity_id: element.id,
          timetable_id: resultCreateTimeTable,
        });
      }
      console.log(teachers);
      for (const index in teachers) {
        await ScheduleService.createTimetableAssignment({
          teacher_id: teachers[index].id,
          timetable_id: resultCreateTimeTable,
        });
      }
    } catch (error) {
      return Response.sendErrorResponse({
        statusCode: 400,
        res,
        error: error.sqlMessage,
      });
    }

    return Response.sendResponse({
      statusCode: 200,
      res,
    });
  }

  for (let index = 0; index < activities.length; index++) {
    const element = activities[index];
    await ScheduleService.createActivityGroup({
      activity_id: element.id,
      timetable_id: timetableId,
    });
  }
  return Response.sendResponse({
    statusCode: 200,
    res,
  });
}

async function searchTimetable(req, res) {
  const { searchText, startTime, endTime, limit, offset } = req.query;

  if (
    isEmpty(limit) ||
    isEmpty(offset) ||
    !isNumber(limit) ||
    !isNumber(offset)
  ) {
    return Response.sendErrorResponse({
      statusCode: 400,
      res,
      error: "Limit và offset không hợp lệ!",
    });
  }

  const timetable = await ScheduleService.searchTimeTable(
    limit,
    offset,
    searchText,
    startTime,
    endTime
  );

  Response.sendResponse({
    res,
    statusCode: 200,
    responseBody: timetable || [],
  });
}

async function addTimetable(req, res) {
  const { startTime, endTime, activities } = req.body;

  if (!isValidTime(startTime) || !isValidTime(endTime)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "Thời gian không hợp hệ!",
    });
  }

  //Kiểm tra danh sách activity được thêm vào
  if (typeof activities != "object" || activities.length == 0) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "activities phải có dạng danh sách!",
    });
  }

  //Kiểm tra tồn tại các activity trong danh sách
  for (let index = 0; index < activities.length; index++) {
    const element = activities[index];

    const isExitActivity = await ScheduleService.isExistActivity(element.id);

    if (!isExitActivity) {
      return Response.sendErrorResponse({
        res,
        statusCode: 404,
        error: `Hoạt động ${element.name} không tồn tại!`,
      });
    }
  }

  const timetableCreated = await ScheduleService.createTimetable({
    start_time: startTime,
    end_time: endTime,
  });

  for (let index = 0; index < activities.length; index++) {
    const element = activities[index];

    await ScheduleService.createActivityGroup({
      activity_id: element.id,
      timetable_id: timetableCreated,
    });
  }

  Response.sendResponse({
    res,
    statusCode: 200,
    responseBody: timetableCreated,
  });
}

async function addActivity(req, res) {
  const { name, description, createBy } = req.body;

  ///Kiểm tra định dạng dữ liệu
  if (isEmpty(createBy) || !isNumber(createBy)) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "Người tạo không hợp lệ!",
    });
  }
  ///Kiểm tra tồn tại của tài khoản
  const isExitCreator = await AccountSerevice.isExitAccountById(createBy);

  if (!isExitCreator) {
    return Response.sendErrorResponse({
      res,
      statusCode: 404,
      error: "Người tạo tồn tại!",
    });
  }

  const result = await ScheduleService.createActivity({
    name: name,
    description: description,
    created_by: createBy,
  });

  console.log(result);

  if (!result) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      error: "Tạo thất bại!",
    });
  }

  Response.sendResponse({
    res,
    statusCode: 200,
    responseBody: result,
  });
}

async function getTimetable(req, res) {
  const { limit, offset } = req.query;
  console.log(offset);

  if (
    isEmpty(limit) ||
    isEmpty(offset) ||
    !isNumber(limit) ||
    !isNumber(offset)
  ) {
    return Response.sendErrorResponse({
      statusCode: 400,
      res,
      error: "Limit và offset không hợp lệ!",
    });
  }

  const timetable = await ScheduleService.getTimetable(limit, offset);

  Response.sendResponse({
    res,
    statusCode: 200,
    responseBody: timetable || [],
  });
}

async function searchSchedules(req, res) {
  const { searchText, limit, offset } = req.query;
  if (
    isEmpty(limit) ||
    isEmpty(offset) ||
    !isNumber(limit) ||
    !isNumber(offset)
  ) {
    return Response.sendErrorResponse({
      statusCode: 400,
      res,
      error: "Limit và offset không hợp lệ!",
    });
  }

  const activities = await ScheduleService.searchActivities(
    searchText,
    limit,
    offset
  );

  Response.sendResponse({
    res,
    statusCode: 200,
    responseBody: activities || [],
  });
}
async function getActivities(req, res) {
  const { limit, offset } = req.query;

  if (
    isEmpty(limit) ||
    isEmpty(offset) ||
    !isNumber(limit) ||
    !isNumber(offset)
  ) {
    return Response.sendErrorResponse({
      statusCode: 400,
      res,
      error: "Limit và offset không hợp lệ!",
    });
  }

  const activities = await ScheduleService.getActivities(limit, offset);

  Response.sendResponse({
    res,
    statusCode: 200,
    responseBody: activities || [],
  });
}

module.exports = router;
