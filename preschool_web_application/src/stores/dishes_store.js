import { defineStore } from "pinia";
import menuService from "../services/menu.service";

/**
 * @returns aaa
 */
export const useDishesStore = defineStore("dishesStore", {
  state: () => ({
    dishes: [],
    page: 0,
    limit: 20,
    loading: false,
    total: 0,
  }),
  actions: {
    /**
     * Phương thức lấy danh sách các món ăn
     * @void
     */
    async fetchDishes() {
      try {
        this.loading = true;

        const response = await menuService.featchDishes(this.limit, this.page);

        const dataResponse = response.data.data;

        this.dishes = dataResponse.dishes;

        this.total = dataResponse.count;
      } catch (error) {
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
  },
});
