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
          username: element.username,
          phone: element.phone,
          role: element.role,
          email: element.email,
          status: element.status,
        });
      }
      return account;
    },

    async createAccount(accountToCreate) {
      this.status = "creating";

      console.log("Account to create", accountToCreate);

      const response = await accountService.createAccount(accountToCreate);

      const data = response.data;

      console.log("Response: ", response);

      if (data.status == 404) {
        this.status = "create_failed";
        return { success: false, message: data.error };
      }

      this.status = "created";
      return { success: true, message: "Create successful." };
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
      return {
        success: true,
      };
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
