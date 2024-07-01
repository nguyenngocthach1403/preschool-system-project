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

        const responseData = response.data;
        const assignmentsData = responseData.data.assignmented;

        this.asignment = assignmentsData || [];
        console.log(response);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
});
