<template>
  <div class="h-full w-full mt-5">
    <PopupCreate
      v-if="isShowCreate"
      @close="closePopupCreate($event)"
      @add-toast="$emit('add-toast', $event)"
    ></PopupCreate>
    <div class="flex justify-between">
      <SearchComp class="w-[450px]" />
      <CreateButton @click="isShowCreate = true" :title="'Tạo mới'" />
    </div>
    <ResultNumComp class="my-2">{{ meals.length }}</ResultNumComp>
    <LoadingComp v-if="loading" />
    <MealTable v-if="!loading" :meals="meals" class="drop-shadow-xl" />
  </div>
</template>

<script setup>
//component
import MealTable from "../components/meal_table.vue";
import LoadingComp from "../../../components/loading_comp.vue";
import Pagination from "../../../components//pagination.vue";
import ResultNumComp from "../../../components/result_comp.vue";
import SearchComp from "../../../components/search_form_comp.vue";
import CreateButton from "../../../components/create_button.vue";
import PopupCreate from "../components/popup_create_meal.vue";

//Service
import MenuService from "../../../services/menu.service";
import { checkPermissions } from "../../../utils//resources/check_valid";
import { onMounted, ref } from "vue";

//state
const loading = ref(false);
const isShowCreate = ref(false);

//valiable
const meals = ref([]);

onMounted(async () => {
  meals.value = await fetchMeal();
});

/**
 * Phương thức lấy danh sách cá buổi ăn trong ngày
 * @return {Object}
 */
async function fetchMeal() {
  try {
    loading.value = true;
    const response = await MenuService.fetchMeals();

    const dataResponse = response.data.data;

    return dataResponse;
  } catch (error) {
    return undefined;
  } finally {
    loading.value = false;
  }
}

function openCreateDish() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!checkPermissions(user.role)) {
    emits("add-toast", {
      title: "Bạn không đủ quyền thực hiện chức năng này",
      type: 2,
    });
    return;
  }
  isShowCreate.value = true;
}

function closePopupCreate(event) {
  isShowCreate.value = false;
  if (event) {
    meals.value = fetchMeal();
  }
}
</script>

<style lang="scss" scoped>
</style>