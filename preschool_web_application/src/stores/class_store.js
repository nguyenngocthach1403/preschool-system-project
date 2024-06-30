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
    totalStatus: null,
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
          name: element.class_name,
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
          level: element.level,
          syllabus: element.syllabus,
          managers: element.managers,
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
      try {
        this.status = "loading";

        const response = await classService.searchClass(
          this.searchText,
          this.session,
          this.statusIds,
          this.limit,
          this.page
        );

        console.log(response);

        const classes = response.data.data.classes || [];

        this.total = response.data.total;
        this.classes = this.formatClass(classes);
      } catch (error) {
        console.log(error);
      } finally {
        this.status = "loaded";
      }
    },

    async fetchClass() {
      try {
        this.status = "loading";

        const response = await classService.fetchClass(this.limit, this.page);
        console.log(response);

        const responseData = response.data;

        const classes = responseData.data.classes;

        this.classes = this.formatClass(classes);
        this.total = responseData.total;
        this.totalStatus = responseData.total_status;
      } catch (error) {
      } finally {
        this.status = "loaded";
      }
    },
  },
});
