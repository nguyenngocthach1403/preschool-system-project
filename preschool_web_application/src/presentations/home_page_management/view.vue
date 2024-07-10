<template>
  <div class="bg-white ml-4 h-fit rounded-3xl text-center mb-20 mb-3">
    <ConfirmDialog
      v-if="showConfirmDialogSlide"
      class="absolute top-0 left-0"
      :content="`Bạn có muốn ảnh slideshow với id là ${showConfirmDialogSlide.id} không?`"
      :value="showConfirmDialogSlide"
      @confirm="getConfirmSlide($event)"
    />
    <div class="head ml-4 text-[20px] text-left font-bold mt-6">
      Danh sách hình ảnh SlideShow
    </div>
    <div class="flex justify-end content-center mr-3 mb-5">
      <router-link :to="{ name: 'CreateSlideView' }">
        <CreateButtonComp :title="'Thêm ảnh mới'"></CreateButtonComp>
      </router-link>
    </div>
    <ResultNumComp>{{ total }}</ResultNumComp>

    <TableData
      :data-table="dataOfTable"
      @delete-slide="showConfirmDialogSlide = $event"
    ></TableData>
  </div>
</template>

<script setup>
import TableData from "../home_page_management/table.vue";
import CreateButtonComp from "../../components/create_button.vue";

import { ref, onMounted, onBeforeMount } from "vue";
import ResultNumComp from "../../components/result_comp.vue";
import SlideshowService from "../../services/slideshow.service.js";
import ConfirmDialog from "../../components/confirm_dialog.vue";
import slideshowService from "../../services/slideshow.service.js";
const total = ref(null);
const dataOfTable = ref([]);
const showConfirmDialogSlide = ref(null);
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

// async function handleDeleteSlide(id) {
//   emits("delete-slide", id);
// }

async function getConfirmSlide(event) {
  if (!event) {
    showConfirmDialogSlide.value = null;
    return;
  }
  await deleteSlide(event);
  showConfirmDialogSlide.value = null;
}

async function deleteSlide(id) {
  const resultOfDel = await slideshowService.deleleSlide(id.id);

  if (resultOfDel) {
    emits("add-toast", {
      title: "Xoá thành công!",
      content: "Xoá ảnh slide có id là " + id.id,
      type: 0,
    });
  } else {
    emits("add-toast", {
      title: "Xoá thất bại!",
      content: `Lỗi xoá ảnh slide có id là ${id.id}`,
      type: 1,
    });
  }
  await getSlide();
}
</script>

<style scoped></style>
