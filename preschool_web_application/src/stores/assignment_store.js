import { defineStore } from "pinia";
import teacherService from "../services/teacher.service";

export const useAssignmentStore = defineStore("assignment-store", {
  state: () => ({
    asignment: [],
    page: 0,
    limit: 10,
  }),
  getters: {},
  actions: {
    async getTeacherAssignment() {
      try {
        const response = await teacherService.getTeacherAssignment(
          this.limit,
          this.page
        );

        this.asignment = response.data.data;
        console.log(this.asignment);
        return response.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
});
