import { defineStore } from "pinia";
import registrationService from "../services/registration.service";

export const useRegistrionStore = defineStore("registrationStore", {
  state: () => ({
    registrations: [],
    total: 0,
    status: "initial",
    limit: 10,
    page: 0,
    loading: false,
  }),
  actions: {
    formatRegistration(data) {
      let registrations = [];

      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        registrations.push({
          id: element.id,
          name: element.your_name,
          phone: element.phone,
          email: element.email,
          address: `${element.town ? element.town + "," : ""} ${
            element.district ? element.district + "," : ""
          } ${element.city ? element.city : ""}`,
          role: element.role,
          levels: element.levels,
          syllabus: element.syllabus,
          profileStatus: element.infomationState,
          user: element.acountId,
        });
      }
      return registrations;
    },
    async getRegistrationTotal() {
      const response = await registrationService.getRegistrationTotal();

      const data = response.data;

      this.total = data.total;

      return data.total;
    },
    async getRegistration() {
      this.status = "loading";
      this.loading = true;
      if ((await this.getRegistrationTotal()) < 1) {
        this.status = "load_failed";
        return {
          success: false,
          message: "There is not something!",
        };
      }

      const response = await registrationService.getRegistrations(
        this.limit,
        this.page
      );

      const data = response.data;
      if (data.status !== 200) {
        this.status = "load_failed";
        return {
          success: false,
          message: "There is not something!",
        };
      }

      this.registrations = data.data;

      this.status = "loaded";
      this.loading = false;

      console.log(this.registrations);

      return {
        success: true,
        message: "Load successful!",
      };
    },
    async changePage(page) {
      this.page = page;
      this.getRegistration();
    },
    async changeLimit(newVal) {
      if (newVal >= this.total && this.page != 0) {
        this.page = 0;
      }
      this.limit = newVal;
      this.getRegistration();
    },
  },
});
