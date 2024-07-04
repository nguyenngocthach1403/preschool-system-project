import { defineStore } from "pinia";
import { ddmmyyyyDateString } from "../utils/resources/format_date";
import newsService from "../services/news.service";

export const useNewsStore = defineStore("newsStore", {
  state: () => ({
    news: [],
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
    async getNews() {
      this.loading = true;
      this.status = "loading";
      const res = await newsService.getNews(this.page, this.limit);
      console.log(res.data.success);
      if (res.data.success != true) {
        this.status = "load_failed";
        return;
      }
      this.status = "loaded";
      this.loading = false;
      this.news = res.data.data;
      // console.log(res.data.data);
      // console.log(this.news);
    },
    async getTotalNews() {
      const res = await newsService.getTotal();

      const numNews = res.data;

      this.total = numNews.data;
    },
    async searchNews(searchText) {
      this.loading = true;
      this.status = "searching";

      const res = await newsService.searchNews(
        searchText,
        this.page,
        this.limit
      );
      const data = res.data;
      if (data.status == 404) {
        console.log(data.message);
        this.news = [];
        this.total = 0;
        this.loading = false;
        this.status = "search_failed";
        return;
      }
      this.total = data.total;
      this.loading = false;
      this.status = "searched";
      this.news = res.data.data;
      console.log(res.data);
    },
    // async createTeacher(dataToCreate) {
    //   this.status = "creating";
    //   const res = await newsService.createNews(dataToCreate);
    //   const data = res.data;
    //   console.log(res.data);

    //   if (data.status != 200) {
    //     this.status = "create_failed";
    //     return {
    //       success: false,
    //       message: data.error,
    //     };
    //   }
    //   this.status = "created";
    //   return {
    //     success: true,
    //   };
    // },
    // async updateTeacher(idTeacher, dataToUpdate) {
    //   this.status = "updating";
    //   const response = await teacherService.updateTeacher(
    //     idTeacher,
    //     dataToUpdate
    //   );
    //   if (response.data.status === 500) {
    //     this.status = "update_failed";
    //     return {
    //       status: 500,
    //       success: false,
    //       message: response.data.error,
    //     };
    //   }
    //   if (response.data.status === 400) {
    //     this.status = "Account already exists.";
    //     return {
    //       status: 400,
    //       success: false,
    //       message: response.data.error,
    //     };
    //   }
    //   if (response.data.status === 404) {
    //     this.status = "Account not already ";
    //     return {
    //       status: 404,
    //       success: false,
    //       message: response.data.error,
    //     };
    //   }

    //   this.getTeacher();
    //   return {
    //     success: true,
    //     message: response.data.message,
    //   };
    // },
    async deleteNews(id) {
      this.loading = true;
      const res = await newsService.deleleNews(id);
      const data = res.data;
      if (data.status == 200) {
        this.deleteNews(id);
        this.loading = false;
        return true;
      }
      return false;
    },
    async changePage(newVal) {
      this.page = newVal;
      if (this.txtSearch != "") {
        this.searchNews(this.txtSearch);
      } else {
        this.getNews();
      }
    },

    async changeLimit(newVal) {
      this.limit = newVal;
      if (this.txtSearch != "") {
        this.searchNews(this.txtSearch);
      } else {
        this.getNews();
      }
    },
  },
});
