import { defineStore } from "pinia";
import ScheduleService from "../services/schedule.service";

export const useTimetableStore = defineStore("timetableStore", {
  state: () => ({
    timetables: [],
    page: 0,
    limit: 20,
    loading: false,
    total: 0,
    searchText: "",
    startTime: null,
    endTime: null,
  }),
  actions: {
    /**
     * Phương thức tìm kiếm danh sách thới gian biểu theo hoạt động và thời gian
     */
    async searchTimetable() {},
    /**
     * Phương thức lấy danh sách thời gian biểu
     */
    async fetchTimeTable() {
      try {
        this.loading = true;
        const response = await ScheduleService.fetchTimetable(
          this.limit,
          this.page
        );

        const dataResponse = response.data;

        this.timetables = dataResponse.data.timetable;

        this.total = dataResponse.data.count;

        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 100);
      }
    },
  },
});
