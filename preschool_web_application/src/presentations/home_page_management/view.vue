<template>
  <div class="bg-white ml-4 h-fit rounded-3xl text-center mb-20 mb-3">
    <div class="head ml-4 text-[20px] font-bold">
      Danh sách hình ảnh SlideShow
    </div>
    <div class="flex justify-end content-center mr-3 mt-5 mb-5">
      <router-link :to="{ name: 'CreateSlideView' }">
        <CreateButtonComp></CreateButtonComp>
      </router-link>
    </div>
    <ResultNumComp>{{ total }}</ResultNumComp>

    <TableData
      :data-table="dataOfTable"
      @delete-slide="handleDeleteSlide($event)"
    ></TableData>
  </div>
</template>

<script setup>
import TableData from "../home_page_management/table.vue";
import CreateButtonComp from "../../components/create_button.vue";

import { ref, onMounted } from "vue";
import ResultNumComp from "../../components/result_comp.vue";
import SlideshowService from "../../services/slideshow.service.js";
const total = ref(null);
const dataOfTable = ref([]);

async function getTotal() {
  const resul = await SlideshowService.getTotal();
  console.log(resul.data);
  if (resul.data.status != 200) {
    emits("add-toast", {
      title: "Lỗi tải dữ liệu",
      content: resul.data.error,
      type: 3,
    });
    return;
  }
  total.value = resul.data.data;
}

async function getSlide() {
  const resul = await SlideshowService.getSlide();
  console.log(resul.data);
  if (resul.data.success != true) {
    emits("add-toast", {
      title: "Lỗi tải dữ liệu",
      content: resul.data.error,
      type: 3,
    });
    return;
  }
  dataOfTable.value = resul.data.data;
}
const emits = defineEmits(["add-toast", "delete-slide"]);

onMounted(async () => {
  getTotal();
  getSlide();
});

function handleDeleteSlide(id) {
  emits("delete-slide", id);
}
</script>

<style scoped></style>
