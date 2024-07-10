const db = require("../config/db.service");
const config = require("../config/config");

const countActivity = async () => {
  try {
    const response = await db.select(
      config.tb.activity,
      "COUNT(*) AS total",
      "WHERE deleted = 0"
    );
    const dbResponse = response[0];
    if (!dbResponse) return 0;
    return dbResponse["total"];
  } catch (error) {
    console.error(error);
    return 0;
  }
};
const countActivityWidthSearch = async (searchText) => {
  try {
    const response = await db.select(
      config.tb.activity,
      "COUNT(*) AS total",
      `WHERE deleted = 0 AND name LIKE '%${searchText}%'`
    );
    const dbResponse = response[0];
    if (!dbResponse) return 0;
    return dbResponse["total"];
  } catch (error) {
    console.error(error);
    return 0;
  }
};

const countTimetable = async () => {
  try {
    const response = await db.select(config.tb.timetable, "COUNT(*) AS total");
    const dbResponse = response[0];
    if (!dbResponse) return 0;
    return dbResponse["total"];
  } catch (error) {
    console.error(error);
    return 0;
  }
};

const getActivities = async (limit, offset) => {
  try {
    const response = await db.selectLimit(
      `${config.tb.activity} act LEFT JOIN ${config.tb.account} acc ON acc.id  = act.created_by`,
      `act.*, acc.username, acc.role`,
      `WHERE act.deleted = 0`,
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );
    const count = await countActivity();

    if (response.length == 0) return undefined;

    return { count, activities: response };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
const searchActivities = async (searchText, limit, offset) => {
  try {
    const response = await db.selectLimit(
      `${config.tb.activity} act LEFT JOIN ${config.tb.account} acc ON acc.id  = act.created_by`,
      `act.*, acc.username, acc.role`,
      `WHERE act.deleted = 0 AND act.name LIKE '%${searchText}%'`,
      `LIMIT ${limit}`,
      `OFFSET ${offset}`
    );
    const count = await countActivityWidthSearch(searchText);

    if (response.length == 0) return undefined;

    return { count, activities: response };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const createActivity = async (activityToCreate) => {
  try {
    const response = await db.insert(config.tb.activity, activityToCreate);

    if (response.affectedRows == 0) return false;

    return response.insertId;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const createTimetable = async (timetableToCreate) => {
  try {
    const response = await db.insert(config.tb.timetable, timetableToCreate);

    if (response.affectedRows == 0) return false;

    return response.insertId;
  } catch (error) {
    console.error(error);
    throw new Error(error.sqlMessage);
  }
};

const createSchedule = async (dateToCreate) => {
  try {
    const response = await db.insert("schedules", dateToCreate);

    if (response.affectedRows == 0) return false;

    return response.insertId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const searchTimeTable = async (
  limit,
  offset,
  searchText,
  startTime,
  endTime
) => {
  try {
    const response = await db.query(`
      WITH TimetableList AS (
          SELECT
              t.id,
              t.start_time,
              t.end_time
          FROM timetable t
          JOIN activity_groups ag ON t.id = ag.timetable_id
          JOIN activities a ON ag.activity_id = a.id
          WHERE a.name LIKE '%${searchText}%'
            AND a.deleted = 0 ${
              startTime != undefined && endTime != undefined
                ? `AND t.start_time >= '${startTime}'
            AND t.end_time <= '${endTime}'
          `
                : ""
            }
          GROUP BY t.id, t.start_time, t.end_time
          LIMIT ${limit}
          OFFSET ${offset}
      )
      SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
              'id', ttl.id,
              'start_time', TIME_FORMAT(ttl.start_time, '%H:%i'),
              'end_time', TIME_FORMAT(ttl.end_time, '%H:%i'),
              'activities', (
                  SELECT JSON_ARRAYAGG(
                      JSON_OBJECT(
                          'activity_id', a.id,
                          'activity_name', a.name,
                          'activity_description', a.description
                      )
                  )
                  FROM activity_groups ag
                  LEFT JOIN activities a
                  ON ag.activity_id = a.id
                  WHERE ttl.id = ag.timetable_id 
                    AND a.deleted = 0
              )
          )
      ) AS tt
      FROM TimetableList ttl;
      `);

    const count = await countTimetable();

    const dbResponse = response[0];

    if (!dbResponse) return undefined;

    return { count, timetable: dbResponse["tt"] };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const getSchedules = async (classId, startDate, endDate) => {
  try {
    const response = await db.query(`
      SELECT JSON_OBJECTAGG(
	DATE_FORMAT(sch.date, '%d/%m/%Y'),
    JSON_OBJECT(
		'date', sch.date,
        'id', sch.id,
        'timetable', (
			SELECT JSON_OBJECTAGG(
					CONCAT(DATE_FORMAT(tt.start_time, '%H:%i'), '-', DATE_FORMAT(tt.end_time, '%H:%i')),
                    JSON_OBJECT(
						'id', tt.id,
						'start_time', DATE_FORMAT(tt.start_time, '%H:%i'),
                        'end_time', DATE_FORMAT(tt.end_time, '%H:%i'),
                        'teachers', (
							SELECT JSON_ARRAYAGG(
								JSON_OBJECT(
									'teacher_id', t.id,
                                    'teacher_name', t.name,
                                    'teacher_avatar', t.avatar
                                )
                            )
                            FROM timetable_assignment ta
                            LEFT JOIN teachers t
                            ON t.id = ta.teacher_id
                            WHERE ta.timetable_id = tt.id
                        ),
                        'activities', (
							SELECT JSON_ARRAYAGG(
								JSON_OBJECT(
									'activity_id', act.id,
                                    'activity_name',act.name
                                )
                            )
                            FROM activity_groups ag
                            LEFT JOIN activities act
                            ON ag.activity_id = act.id
                            WHERE ag.timetable_id = tt.id
                        )
                    )
                )
            FROM  timetable tt
            WHERE tt.schedule_id = sch.id
        ) 
    )
) as schedules
      FROM schedules sch
      WHERE sch.class_id = ${classId}
      AND sch.date >= '${startDate}' AND sch.date <= '${endDate}'
      `);

    const dbRespponse = response[0];

    if (!dbRespponse) return undefined;

    return dbRespponse;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const getTimetable = async (limit, offset) => {
  try {
    const response = await db.query(`
      WITH TimetableList AS (
        SELECT
          *
        FROM timetable
        LIMIT ${limit}
        OFFSET ${offset}
      ) 
      SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
          'id',ttl.id,
              'start_time', TIME_FORMAT(ttl.start_time, '%H:%i'),
              'end_time', TIME_FORMAT(ttl.end_time, '%H:%i'),
          'activities', (
            SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                'activity_id', a.id,
                          'activity_name', a.name,
                          'activity_deiscription', a.description
                      )
                  )
                  FROM activity_groups ag
                  LEFT JOIN activities a
                  ON ag.activity_id = a.id
                  WHERE ttl.id = ag.timetable_id AND a.deleted = 0
              )
          )
      ) AS tt
      From TimetableList ttl
      `);
    const count = await countTimetable();

    const dbResponse = response[0];

    if (!dbResponse) return undefined;

    return { count, timetable: dbResponse["tt"] };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const isExistActivity = async (activityId) => {
  try {
    const response = await db.select(
      config.tb.activity,
      "*",
      `WHERE id = ${activityId}`
    );

    const dbResponse = response[0];

    if (!dbResponse) return false;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const createActivityGroup = async (dataToCreate) => {
  try {
    const response = await db.insert("activity_groups", dataToCreate);

    if (response.affectedRows == 0) return false;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const createActivityGroups = async (dataToCreate) => {
  try {
    const response = await db.insert("activity_groups", dataToCreate);

    if (response.affectedRows == 0) return false;

    return response.insertId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deletedTimetableAssignment = async (timetableId, teacherId) => {
  try {
    const response = await db.deleteRow(
      "timetable_assignment",
      `WHERE timetable_id = ${timetableId} AND
      teacher_id = ${teacherId}`
    );

    if (response.affectedRows == 0) return false;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
const deletedActivityGroups = async (timetableId, activityId) => {
  try {
    const response = await db.deleteRow(
      "activity_groups",
      `WHERE timetable_id = ${timetableId} AND
      activity_id = ${activityId}`
    );

    if (response == 0) throw new Error("Thất bại!");

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createTimetableAssignment = async (dataToCreate) => {
  try {
    const response = await db.insert("timetable_assignment", dataToCreate);

    if (response.affectedRows == 0) return false;

    return response.insertId;
  } catch (error) {
    throw new Error(error.sqlMessage);
  }
};

const getTimetableIdByDateAndTimeAndClassId = async (
  classId,
  startTime,
  endTime,
  startDate,
  endDate
) => {
  try {
    const response = await db.query(
      `SELECT tt.id FROM timetable tt LEFT JOIN schedules sch ON sch.id = tt.schedule_id WHERE sch.class_id = ${classId} 
      AND (sch.date BETWEEN '${startDate}' AND '${endDate}') 
      AND tt.start_time = '${startTime}' 
      AND tt.end_time + '${endTime}'`
    );

    if (response.length == 0) return undefined;
    return response;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const deleteAllActivityGroupsByTimetableId = async (timetableId) => {
  try {
    const response = await db.deleteRow(
      "activity_groups",
      `WHERE timetable_id = ${timetableId}`
    );

    if (response == 0) return false;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const deleteAllTimetablAssignmentByTimetableId = async (timetableId) => {
  try {
    const response = await db.deleteRow(
      "timetable_assignment",
      `WHERE timetable_id = ${timetableId}`
    );

    if (response == 0) return false;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
const deleteAllTimetablByTimetableId = async (timetableId) => {
  try {
    const response = await db.deleteRow(
      config.tb.timetable,
      `WHERE id = ${timetableId}`
    );

    if (response == 0) return false;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
const deleteActivity = async (activityId) => {
  try {
    const response = await db.update(
      config.tb.activity,
      { deleted: 1 },
      { id: activityId }
    );
    if (response == 0) throw new Error("Thất bại!");

    return true;
  } catch (error) {
    throw error;
  }
};

const updateActivity = async (activityId, dataToUpData) => {
  const keys = Object.keys(dataToUpData);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    if (dataToUpData[key] == undefined) {
      delete dataToUpData[key];
    }
  }
  try {
    const response = await db.update(config.tb.activity, dataToUpData, {
      id: activityId,
    });
    if (response == 0) throw new Error("Thất bại!");

    return true;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getActivities,
  countActivity,
  getTimetable,
  createActivity,
  createTimetable,
  isExistActivity,
  createActivityGroup,
  searchTimeTable,
  getSchedules,
  createSchedule,
  createActivityGroups,
  createTimetableAssignment,
  deletedActivityGroups,
  deletedTimetableAssignment,
  getTimetableIdByDateAndTimeAndClassId,
  deleteAllActivityGroupsByTimetableId,
  deleteAllTimetablAssignmentByTimetableId,
  deleteAllTimetablByTimetableId,
  searchActivities,
  deleteActivity,
  updateActivity,
};
