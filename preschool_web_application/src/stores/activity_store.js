import { defineStore } from "pinia";
import ScheduleService from "../services/schedule.service";

/**
 * @returns aaa
 */
export const useActivityStore = defineStore("activityStore", {
  state: () => ({
    activities: [],
    page: 0,
    limit: 20,
    loading: false,
    total: 0,
  }),
  actions: {
    /**
     * Phương thức lấy danh sách thời gian biểu
     */
    async fetchActivities() {
      try {
        this.loading = true;
        const response = await ScheduleService.fetchActivities(
          this.limit,
          this.page
        );

        const dataResponse = response.data;

        this.activities = dataResponse.data.activities;

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
