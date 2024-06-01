import { defineStore } from "pinia";
import { ddmmyyyyDateString } from "../utils/resources/format_date";
import parentService from "../services/parent.service";
// import axios from "axios";

export const useParentStore = defineStore("parentStore", {
  state: () => ({
    parents: [],
    page: 0,
    limit: 10,
    loading: false,
    total: 0,
    txtSearch: "",
    status: "initial",
  }),
  actions: {
    resetPage() {
      if (this.page != 0) this.page = 0;
    },
    async searchParent(searchText) {
      this.loading = true;
      this.status = "searching";

      if (searchText !== this.txtSearch) {
        console.log("Reset page 0");
        this.resetPage();
      }
      const res = await parentService.search(searchText, this.page, this.limit);
      console.log(res);
      const data = res.data;
      if (data.status == 404) {
        console.log(data.message);
        this.parents = [];
        this.total = 0;
        this.loading = false;
        this.status = "search_failed";
        return;
      }
      // console.log(data.total);
      this.total = data.total;

      this.loading = false;
      this.status = "searched";
      this.parents = res.data.data;
      // console.log(this.parents);
    },

    async getTotalParent() {
      const res = await parentService.countParent();
      // console.log(res);
      const numParent = res.data;
      this.total = numParent.data;
      // console.log(numParent.data);
      return numParent.data;
    },
    deleteParent(idParentToDel) {
      for (let index = 0; index < this.parents.length; index++) {
        if (this.parents[index]["id"] == idParentToDel) {
          this.parents.splice(index, 1);
          return;
        }
      }
    },
    async deleteParentInDB(idParentToDel) {
      this.loading = true;

      const res = await parentService.deleleParent(idParentToDel);

      const data = res.data;

      if (data.status == 200) {
        this.deleteParent(idParentToDel);
        this.loading = false;
        return true;
      }

      return false;
    },

    async getParent() {
      this.loading = true;
      this.status = "loading";
      const res = await parentService.getParent(this.page, this.limit);
      const dataRes = res.data;
      const data = dataRes.data;
      if (data.status === 404) {
        this.status = "load_failed";
        return;
      }
      this.status = "loaded";
      this.loading = false;
      this.parents = dataRes.data;
      // console.log(dataRes.data);
      // console.log(this.parents);
    },

    async changePage(newVal) {
      this.page = newVal;
      if (this.txtSearch != "") {
        console.log("Has search");
        this.searchParent(this.txtSearch);
      } else {
        console.log("No search");
        this.getParent();
      }
    },

    async changeLimit(newVal) {
      this.limit = newVal;
      if (this.txtSearch != "") {
        this.searchParent(this.txtSearch);
      } else {
        this.getParent();
      }
    },
  },
});
