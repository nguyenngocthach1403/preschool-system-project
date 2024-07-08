<template>
  <div class="h-full w-full mt-5">
    <PopupCreate
      v-if="isShowCreate"
      @close="closePopupCreate($event)"
      @add-toast="$emit('add-toast', $event)"
    />
    <PopupEditDish
      v-if="isShowEdit"
      :dish="isShowEdit"
      @close="isShowEdit = null"
      @add-toast="$emit('add-toast', $event)"
    />
    <ComfirmPopup
      v-if="isShowDelete"
      class="absolute top-0 left-0"
      :content="`Bạn có muốn xóa món ${isShowDelete.name} không?`"
      :value="isShowDelete"
      @confirm="getComfirm($event)"
    />
    <div class="flex justify-between">
      <SearchComp class="w-[450px]" />
      <CreateButton @click="openCreateDish()" :title="'Thêm món'" />
    </div>
    <ResultNumComp class="my-2">{{ total }}</ResultNumComp>
    <LaodingComp v-if="loading" />
    <DishesTable
      v-if="!loading"
      @edit="isShowEdit = $event"
      @delete="isShowDelete = $event"
      :dishes="dishes"
      class="drop-shadow-xl"
    />

    <div
      v-if="dishes.length != 0"
      class="flex h-[50px] justify-between items-center"
    >
      <div class="">
        Hiển thị từ {{ page * limit == 0 ? 1 : page * limit }} đến
        {{ (page + 1) * limit - (limit - dishes.length) }} trong {{ total }} món
        ăn
      </div>
      <Pagination
        :page-active="page + 1"
        :pageNums="Math.ceil(total / limit)"
        @click-page="nextPage($event - 1)"
      />
    </div>
  </div>
</template>

<script setup>
//component
import { onMounted, ref } from "vue";
import DishesTable from "../components/dish_table.vue";
import LaodingComp from "../../../components/loading_comp.vue";
import Pagination from "../../../components//pagination.vue";
import ResultNumComp from "../../../components/result_comp.vue";
import SearchComp from "../../../components/search_form_comp.vue";
import CreateButton from "../../../components/create_button.vue";
import PopupCreate from "../components/popup_create_dish.vue";
import PopupEditDish from "../components/popup_edit_dish.vue";
import ComfirmPopup from "../../../components/confirm_dialog.vue";
//Service
import { checkPermissions } from "../../../utils/resources/check_valid";
//store
import { useDishesStore } from "../../../stores/dishes_store";
import { storeToRefs } from "pinia";
const dishesStore = useDishesStore();

const isShowCreate = ref(false);
const isShowEdit = ref(false);
const isShowDelete = ref(false);

const { dishes, loading, page, limit, total } = storeToRefs(dishesStore);

const emits = defineEmits(["add-toast"]);

async function initital() {
  if (dishesStore.dishes.length == 0) {
    await dishesStore.fetchDishes();
  }
}

function round(value) {
  return Math.ceil(value);
}

function closePopupCreate(event) {
  isShowCreate.value = false;
  if (event) dishesStore.fetchDishes();
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

function getComfirm(result) {
  if (!result) isShowDelete.value = null;
}

function nextPage(newPage) {
  if (newPage != dishesStore.page) {
    dishesStore.page = newPage;
    dishesStore.fetchDishes();
  }
}

onMounted(async () => {
  await initital();
});
</script>

<style  scoped>
</style>