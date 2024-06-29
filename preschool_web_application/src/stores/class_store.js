import { defineStore } from "pinia";
import classService from "../services/class.service";

export const useClassStore = defineStore("classStore", {
  state: () => ({
    classes: [],
    page: 0,
    limit: 10,
    status: "initial",
    searchText: "",
    session: "",
    total: 0,
    statusIds: [],
  }),

  actions: {
    formatClass(data) {
      let classes = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        classes.push({
          id: element.id,
          avatar: element.class_img,
          name: element.name,
          start: element.start_date,
          end: element.end_date,
          member: element.members,
          limitedMember: element.member_limit,
          session: element.session,
          type: element.type,
          status:
            new Date(element.start_date) > new Date()
              ? "Sắp bắt đầu"
              : new Date(element.end_date) > new Date()
              ? "Đang hoạt động"
              : "Kết thúc",
          levelName: element.levelsName ?? "none",
          syllabusName: element.syllabusName ?? "none",
          levelId: element.level_id,
          syllabusId: element.syllabus_id,
          teachers: element.teachers,
        });
      }
      return classes;
    },
    addClass(classToAdd) {
      this.isBusy = true;

      this.classes.push(classToAdd);

      this.isBusy = false;
    },

    async searchClasses() {
      this.status = "loading";

      const response = await classService.searchClass(
        this.searchText,
        this.session,
        this.statusIds,
        this.limit,
        this.page
      );

      const data = response.data;

      this.total = data.total;
      this.classes = this.formatClass(data.data);
      this.status = "loaded";
    },

    async fetchClass() {
      this.status = "loading";
      const response = await classService.fetchClass(this.limit, this.page);

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
      this.total = data.total;
      console.log(response);
      this.status = "loaded";

      return {
        success: true,
        message: "Load successful",
      };
    },
  },
});
