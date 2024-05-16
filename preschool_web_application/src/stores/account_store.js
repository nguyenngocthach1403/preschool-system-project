import { defineStore } from "pinia";
import accountService from "../services/account.service";

export const useAccountStore = defineStore("accountStore", {
  state: () => ({
    account: [],
    status: "initial",
    page: 0,
    limit: 10,
    total: 0,
  }),
  actions: {
    formatData(data) {
      let account = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        account.push({
          id: element.id,
          username: element.username,
          phone: element.phone,
          role: element.role,
          email: element.email,
          isOnline: 1,
        });
      }
      return account;
    },
    async getTotal() {
      const response = await accountService.getTotalAccount();

      const data = response.data;

      if (data.status === 400) {
        return;
      }

      this.total = data.total;

      return this.total;
    },

    async getAccount() {
      this.status = "loading";

      if ((await this.getTotal()) <= 0) {
        this.status = "load_failed";
        return {
          success: false,
          error: data.message ?? data.error,
        };
      }

      const response = await accountService.getAccount(this.page, this.limit);

      const data = response.data;

      console.log(response.data);

      if (data.status === 404) {
        this.status = "load_failed";
        return {
          success: false,
          error: data.message ?? data.error,
        };
      }

      this.account = this.formatData(data.data);

      this.status = "loaded";
    },
    changePage(page) {
      if (this.page !== page) {
        this.page = page;
        this.getAccount();
      }
    },
    changeLimit(limit) {
      if (this.limit != limit) {
        this.limit = limit;
        if (this.limit > this.total && this.page != 0) {
          this.page = 0;
        }
        this.getAccount();
      }
    },
  },
});
