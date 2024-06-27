import { defineStore } from "pinia";
import { ddmmyyyyDateString } from "../utils/resources/format_date";
import teacherService from "../services/teacher.service";

export const useTeacherStore = defineStore("teacherStore", {
  state: () => ({
    teachers: [],
    page: 0,
    limit: 10,
    loading: false,
    total: 0,
    txtSearch: "",
    status: "initial",
  }),
  actions: {
    resetPage() {
      if (this.page != 0) this.page = 0;
    },
    async getTeacher() {
      this.loading = true;
      this.status = "loading";
      const res = await teacherService.getTeacher(this.page, this.limit);
      console.log(res);
      const dataRes = res.data;
      const data = dataRes.data;
      if (data.status === 404) {
        this.status = "load_failed";
        return;
      }
      this.status = "loaded";
      this.loading = false;
      this.teachers = dataRes.data;
      console.log(dataRes.data);
      // console.log(this.teachers);
    },
    async getTotalTeacher() {
      const res = await teacherService.countTeacher();
      // console.log(res);
      const numTeacher = res.data;
      this.total = numTeacher.data;
      // console.log(numTeacher.data);
      return numTeacher.data;
    },
    async searchTeacher() {
      this.loading = true;
      this.status = "searching";

      const res = await teacherService.search(
        this.txtSearch,
        this.page,
        this.limit
      );
      console.log(res);
      const data = res.data;
      if (data.status == 404) {
        console.log(data.message);
        this.teachers = [];
        this.total = 0;
        this.loading = false;
        this.status = "search_failed";
        return;
      }
      this.total = data.total;

      this.loading = false;
      this.status = "searched";
      this.teachers = res.data.data;
    },
    async createTeacher(teacherToCreate) {
      this.status = "creating";
      const res = await teacherService.createTeacher(teacherToCreate);
      const data = res.data;
      console.log(res.data);

      if (data.status != 200) {
        this.status = "create_failed";
        return {
          success: false,
          message: data.error,
        };
      }
      this.status = "created";
      return {
        success: true,
      };
    },
    async updateTeacher(idTeacher, dataToUpdate) {
      this.status = "updating";
      const response = await teacherService.updateTeacher(
        idTeacher,
        dataToUpdate
      );
      if (response.data.status === 500) {
        this.status = "update_failed";
        return {
          status: 500,
          success: false,
          message: response.data.error,
        };
      }
      if (response.data.status === 400) {
        this.status = "Account already exists.";
        return {
          status: 400,
          success: false,
          message: response.data.error,
        };
      }
      if (response.data.status === 404) {
        this.status = "Account not already ";
        return {
          status: 404,
          success: false,
          message: response.data.error,
        };
      }

      this.getTeacher();
      return {
        success: true,
        message: response.data.message,
      };
    },
    async deleteTeacher(idTeacherToDel) {
      this.loading = true;
      const res = await teacherService.deleleTeacher(idTeacherToDel);
      const data = res.data;
      if (data.status == 200) {
        this.deleteTeacher(idTeacherToDel);
        this.loading = false;
        return true;
      }
      return false;
    },
    async changePage(newVal) {
      this.page = newVal;
      if (this.txtSearch != "") {
        console.log("Has search");
        this.searchTeacher(this.txtSearch);
      } else {
        console.log("No search");
        this.getTeacher();
      }
    },

    async changeLimit(newVal) {
      this.limit = newVal;
      if (this.txtSearch != "") {
        this.searchTeacher(this.txtSearch);
      } else {
        this.getTeacher();
      }
    },
  },
});
