import { api } from "../services/Api";

const fetchActivities = (limit, page) => {
  return api().get(
    `/schedule/activities?limit=${limit}&offset=${page * limit}`
  );
};

const fetchTimetable = (limit, page) => {
  return api().get(`/schedule/timetable?limit=${limit}&offset=${page * limit}`);
};

const createActivity = (activityToCreate) => {
  return api().post(`/schedule/activity/add`, activityToCreate);
};

const createTimetable = (timetableToCreate) => {
  return api().post(`/schedule/timetable/add`, timetableToCreate);
};

const fetchSchedules = (classId, startDate, endDate) => {
  return api().get(
    `/schedule?classId=${classId}&startDate=${startDate}&endDate=${endDate}`
  );
};

const createSchedule = (classId, dateToCreate) => {
  return api().post(`/schedule/create?classId=${classId}`, dateToCreate);
};

const updateSchedule = (timetableID, dataToUpdate) => {
  return api().post(
    `/schedule/update?timetableId=${timetableID}`,
    dataToUpdate,
    {
      timeout: 20000,
    }
  );
};

const deleteTimetableOfWeek = (classId, dataToDelete) => {
  return api().post(`/schedule/delete?classId=${classId}`, dataToDelete);
};
export default {
  fetchActivities,
  fetchTimetable,
  createActivity,
  createTimetable,
  fetchSchedules,
  createSchedule,
  updateSchedule,
  deleteTimetableOfWeek,
};
