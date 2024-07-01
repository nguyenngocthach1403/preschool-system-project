import { defineStore } from "pinia";
import classCurrentService from "../services/class_current.service";

export const useClassCurrentStore = defineStore("classCurrentStore", {
  state: () => ({
    classes: [],
    page: 0,
    limit: 10,
    status: "initial",
    searchText: "",
    total: 0,
  }),

  actions: {
    formatClass(data) {
      let classes = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        classes.push({
          name: element.name,
          start: element.start_date,
          end: element.end_date,
          limitedMember: element.member_limit,
          session: new Date(element.start_date).getFullYear(),
          levels: element.levelsName ?? "none",
          sysllabus: element.sysllabusName ?? "none",
        });
      }
      return classes;
    },

    async getClass(teacher_id) {
      this.status = "loading";
      const response = await classCurrentService.getClassCurrent(
        teacher_id,
        this.page,
        this.limit
      );
      const data = response.data;
      if (data.status == 400) {
        this.status = "load_failed";
        return {
          success: false,
          message: data.message,
        };
      }
      if (data.status === 500) {
        this.status = "load_failed";
        return {
          success: false,
          message: data.message,
        };
      }
      this.classes = this.formatClass(data.data);
      console.log(response);
      this.status = "loaded";

      return {
        success: true,
        message: "Load successful",
      };
    },
    async changePage(page) {
      if (this.page === page) return;

      this.page = page;
      if (this.txtSearch != "") {
        console.log("Has search");
        // this.searchStudent(this.txtSearch);
      } else {
        console.log("No search");
        this.getClassCurrent();
      }
    },
  },
});
