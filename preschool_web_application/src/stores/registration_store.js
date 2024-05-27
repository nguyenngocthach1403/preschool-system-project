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
          levels: element.levelsName,
          syllabus: element.syllabusName,
          status: element.status,
          profileStatus:
            element.infomationState == 1 || element.file_paths ? 1 : 0,
          user: element.accountId,
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
    async updateStatus(id, status) {
      const response = await registrationService.updateStatus(id, status);

      if (response.status !== 200) {
        return {
          success: false,
          error: response.data.message,
        };
      }

      if (!response.data.success) {
        return {
          success: false,
          error: response.data.message,
        };
      }

      this.registrations.find((e) => e.id == id).status = status;
      return {
        success: true,
        message: response.data.message,
      };
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
      if (page != this.page) {
        this.page = page;
        this.getRegistration();
      }
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
