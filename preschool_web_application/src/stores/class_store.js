import { defineStore } from "pinia";
import classService from "../services/class.service";

export const useClassStore = defineStore("classStore", {
  state: () => ({
    classes: [],
    page: 0,
    limit: 20,
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
          id: element.id,
          avatar: element.class_img,
          name: element.name,
          start: element.start_date,
          end: element.end_date,
          member: element.members,
          limitedMember: element.limit,
          session: new Date(element.start_date).getFullYear(),
          status:
            new Date(element.start_date) > new Date()
              ? "Sắp bắt đầu"
              : new Date(element.end_date) > new Date()
              ? "Đang hoạt động"
              : "Kết thúc",
          levels: element.levelsName ?? "none",
          sysllabus: element.sysllabusName ?? "none",
        });
      }
      return classes;
    },
    addClass(classToAdd) {
      this.isBusy = true;

      this.classes.push(classToAdd);

      this.isBusy = false;
    },

    async searchClasses(searchText) {
      this.status = "searching";

      if (this.searchText != searchText) {
        this.searchClass = searchText;
      }

      const response = await classService.searchClass(
        this.searchClass,
        this.limit,
        this.page
      );

      console.log(response);

      if (response.status == 200 && response.data.status == 200) {
        this.total = response.data.total;
        this.classes = this.formatClass(response.data.data);
        this.status = "searched";
      }
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
      console.log(response);
      this.status = "loaded";

      return {
        success: true,
        message: "Load successful",
      };
    },
  },
});
