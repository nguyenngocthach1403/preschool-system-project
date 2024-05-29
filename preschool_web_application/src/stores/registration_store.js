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
    searchText: "",
    statusIds: [],
  }),
  actions: {
    formatRegistration(data) {
      let registrations = [];

      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        registrations.push({
          id: element.id,
          name: element.name,
          phone: element.phone,
          email: element.email,
          address: `${element.town ? element.town + "," : ""} ${
            element.district ? element.district + "," : ""
          } ${element.city ? element.city : ""}`,
          role: element.relationship,
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

    async countRegistration() {
      const response = await registrationService.getRegistrationTotal();

      const data = response.data;

      this.total = data.total;

      const responseStatusTotal = await registrationService.getTotalOfStatus();

      return responseStatusTotal.data.data;
    },

    async getTotalOfStatus() {
      const responseStatusTotal = await registrationService.getTotalOfStatus();

      return responseStatusTotal.data.data;
    },

    checkSatusIds(id) {
      if (!this.statusIds.includes(id)) {
        this.statusIds.push(id);
      }
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

      this.registrations = this.formatRegistration(data.data);
      this.total = data.total;

      this.status = "loaded";
      this.loading = false;

      console.log(this.registrations);

      return {
        success: true,
        message: "Load successful!",
      };
    },

    async searchHasStatus() {
      if (this.statusIds.length == 0) return;
      const response =
        await registrationService.getRegistrationWithStatusAndSearch(
          this.searchText,
          this.statusIds,
          this.page,
          this.limit
        );
      console.log(response);
      if (response.status !== 200) {
        this.registrations = [];
        this.total = 0;
        return {
          success: false,
          message: "Tìm kiếm thất tại",
        };
      }

      if (!response.data.success) {
        this.registrations = [];
        this.total = 0;
        return {
          success: false,
          message: "Tìm kiếm thất tại",
        };
      }

      this.registrations = this.formatRegistration(response.data.data);
      this.total = response.data.total;
      return {
        success: true,
      };
    },

    async getRegistrationsWithStatus() {
      if (this.statusIds.length == 0) return;
      this.page = 0;
      const response = await registrationService.getRegistrationsWithStatus(
        this.statusIds,
        this.page,
        this.limit
      );

      console.log(response);
      if (response.status !== 200) {
        return {
          success: false,
          message: "Tìm kiếm thất tại",
        };
      }

      if (!response.data.success) {
        return {
          success: false,
          message: "Tìm kiếm thất tại",
        };
      }

      this.registrations = this.formatRegistration(response.data.data);
      this.total = response.data.total;
      return {
        success: true,
      };
    },

    async searchRegistration() {
      const response = await registrationService.searchRegister(
        this.searchText,
        this.page,
        this.limit
      );
      console.log(response);
      if (response.status !== 200) {
        return {
          success: false,
          message: "Tìm kiếm thất tại",
        };
      }

      if (!response.data.success) {
        return {
          success: false,
          message: "Tìm kiếm thất tại",
        };
      }

      this.registrations = this.formatRegistration(response.data.data);
      this.total = response.data.total;
      return {
        success: true,
      };
    },
    async changePage(page) {
      if (page != this.page) {
        this.page = page;

        if (this.searchText !== "") {
          this.searchRegistration();
        }

        this.getRegistration();
      }
    },
    async changeLimit(newVal) {
      if (newVal >= this.total && this.page != 0) {
        this.page = 0;
      }
      this.getRegistration();
    },
  },
});
