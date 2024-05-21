import { defineStore } from "pinia";
import classService from "../services/class.service";

export const useClassStore = defineStore("classStore", {
  state: () => ({
    classes: [],
    page: 0,
    limit: 20,
    status: "initial",
  }),

  actions: {
    formatClass(data) {
      let classes = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        classes.push({
          id: data.classId,
          avatar: element.imgPath,
          name: element.className,
          start: new Date(element.startDate).toLocaleDateString(),
          end: new Date(element.endDate).toLocaleDateString(),
          teacher: element.teacherId,
          member: element.members,
          limitedMember: element.limit,
          session: new Date(element.startDate).getFullYear(),
          status:
            new Date(element.startDate) > new Date()
              ? "Đang hoạt động"
              : "Kết thúc",
          type: element.levels ?? "None",
        });
      }
      return classes;
    },
    addClass(classToAdd) {
      this.isBusy = true;

      this.classes.push(classToAdd);

      this.isBusy = false;
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
      this.status = "loaded";

      return {
        success: true,
        message: "Load successful",
      };
    },
  },
});
