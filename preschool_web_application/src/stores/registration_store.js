import { defineStore } from "pinia";
import registrationService from "../services/registration.service";
import { HttpStatusCode } from "axios";

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
    admission_period_id: null,
  }),
  actions: {
    formatRegistration(data) {
      let registrations = [];

      data.forEach((element) => {
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
          register_img: element.register_img,
          student_name: element.student_name,
          register_img: element.register_img,
        });
      });

      return registrations;
    },

    async countRegistration() {
      const response = await registrationService.getRegistrationTotal(
        this.admission_period_id
      );

      const data = response.data;

      this.total = data.total;

      const responseStatusTotal = await registrationService.getTotalOfStatus(
        this.admission_period_id
      );

      return responseStatusTotal.data.data;
    },

    async getTotalOfStatus() {
      const responseStatusTotal = await registrationService.getTotalOfStatus(
        this.admission_period_id
      );

      return responseStatusTotal.data.data;
    },

    checkSatusIds(id) {
      if (!this.statusIds.includes(id)) {
        this.statusIds.push(id);
      }
    },

    async updateStatus(id, status, status_before) {
      const response = await registrationService.updateStatus(
        id,
        status,
        window.user.id,
        status_before
      );

      console.log(response);

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
      if (
        this.admission_period_id == null ||
        this.admission_period_id == "null"
      )
        return;

      const response = await registrationService.getRegistrations(
        this.admission_period_id,
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

      this.status = "loading";

      const response =
        await registrationService.getRegistrationWithStatusAndSearch(
          this.admission_period_id,
          this.searchText,
          this.statusIds,
          this.page,
          this.limit
        );

      this.status = "loaded";

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
      if (this.admission_period_id == null) return;

      this.status = "loading";

      this.page = 0;
      const response = await registrationService.getRegistrationsWithStatus(
        this.admission_period_id,
        this.statusIds,
        this.page,
        this.limit
      );

      this.status = "loaded";

      console.log(response);
      if (response.status !== 200) {
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

    async searchRegistration() {
      this.status = "loading";
      const response = await registrationService.searchRegister(
        this.admission_period_id,
        this.searchText,
        this.page,
        this.limit
      );
      this.status = "loaded";
      console.log(response);
      if (response.status !== 200) {
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
      this.limit = newVal;
      this.getRegistration();
    },

    async deleteRegistration(register) {
      const response = await registrationService.deleteRegistration(
        register.id,
        register.phone
      );

      if (response.status !== HttpStatusCode.Ok) {
        return {
          success: false,
          message: "Tiến trình thực hiện bị lỗi. Vui lòng thử lại.",
        };
      }

      if (!response.data.success) {
        return {
          success: false,
          message: response.data.error,
        };
      }

      return {
        success: true,
        message: response.data.message,
      };
    },
  },
});
