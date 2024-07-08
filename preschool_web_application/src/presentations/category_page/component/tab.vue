<template>
  <div
    class="bg-white ml-4 mt-[20px] rounded-xl mr-2 text-center h-full pb-[60px]"
  >
    <ConfirmDialog
      v-if="showConfirmDialogNews"
      class="absolute top-0 left-0"
      :content="`Bạn có muốn xóa tiêu đề ${showConfirmDialogNews.title} không?`"
      :value="showConfirmDialogNews"
      @confirm="getConfirmNews($event)"
    />
    <ConfirmDialog
      v-if="showConfirmDialogSlide"
      class="absolute top-0 left-0"
      :content="`Bạn có muốn ảnh slideshow với id là ${showConfirmDialogSlide.id} không?`"
      :value="showConfirmDialogSlide"
      @confirm="getConfirmSlide($event)"
    />
    <div class="m-auto w-[1300px] rounded-xl bg-white overflow-hidden relative">
      <div class="mx-10 my-5 flex border-b relative">
        <button
          class="px-5 py-3 h-fit"
          v-for="(tab, index) in tabList"
          :key="index"
          @click="selectTab($event, index)"
          :class="{ active: tab.active }"
          ref="TabElement"
        >
          {{ tab.title }}
        </button>
        <div
          ref="TabLineElement"
          class="h-1 bg-[#6EC2F7] absolute bottom-0 rounded-md ease-in-out duration-300"
        ></div>
      </div>
      <MenuManagementHomePageView
        v-if="getTabActive(0)"
        @add-toast="$emit('add-toast', $event)"
        @delete-slide="showConfirmDialogSlide = $event"
      />
      <NewsView
        v-if="getTabActive(1)"
        @add-toast="$emit('add-toast', $event)"
        @delete-news="showConfirmDialogNews = $event"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import NewsView from "../../news/view.vue";
import MenuManagementHomePageView from "../../home_page_management/view.vue";
const router = useRouter();
import { useNewsStore } from "../../../stores/news_store";
import ConfirmDialog from "../../../components/confirm_dialog.vue";
import slideshowService from "../../../services/slideshow.service.js";

const newsStore = useNewsStore();
const emits = defineEmits(["add-toast"]);
//element
const TabLineElement = ref(null);
const TabElement = ref(null);

const tabList = ref([
  {
    title: "Quản lý trang chủ",
    active: true,
  },
  {
    title: "Quản lý tin tức",
    active: false,
  },
]);

onMounted(async () => {
  initialActiveTab();
  getSlide();
});

//effect function
function initialActiveTab() {
  const indexHasActive = tabList.value.findIndex((e) => e.active);
  if (indexHasActive !== undefined) {
    TabLineElement.value.style.width =
      TabElement.value[indexHasActive].offsetWidth + "px";
    TabLineElement.value.style.left =
      TabElement.value[indexHasActive].offsetLeft + "px";
  }
}
function selectTab(event, index) {
  TabLineElement.value.style.width = event.target.offsetWidth + "px";
  TabLineElement.value.style.left = event.target.offsetLeft + "px";

  //clear active
  tabList.value.forEach((el) => (el.active = false));

  //new active
  tabList.value[index].active = true;
}
function getTabActive(index) {
  return tabList.value[index].active;
}
const showConfirmDialogNews = ref("");
const showConfirmDialogSlide = ref("");

const getConfirmNews = (event) => {
  if (!event) {
    showConfirmDialogNews.value = null;
    return;
  }
  console.log(event);
  deleteNews(event);
  showConfirmDialogNews.value = null;
};

const getConfirmSlide = (event) => {
  if (!event) {
    showConfirmDialogSlide.value = null;
    return;
  }
  console.log(event);
  deleteSlide(event);
  showConfirmDialogSlide.value = null;
};
async function deleteNews(id) {
  const resultOfDel = await newsStore.deleteNews(id.id);

  if (resultOfDel) {
    emits("add-toast", {
      title: "Xoá thành công!",
      content: "Xoá tiêu đề " + id.title,
      type: 0,
    });
  } else {
    emits("add-toast", {
      title: "Xoá thất bại!",
      content: `Lỗi xoá tiêu đề ${id.title}`,
      type: 1,
    });
  }
  newsStore.getNews();
  newsStore.getTotalNews();
}
async function deleteSlide(id) {
  const resultOfDel = await slideshowService.deleleSlide(id.id);

  if (resultOfDel) {
    emits("add-toast", {
      title: "Xoá thành công!",
      content: "Xoá ảnh slide có id là " + id.id,
      type: 0,
    });
    getSlide();
  } else {
    emits("add-toast", {
      title: "Xoá thất bại!",
      content: `Lỗi xoá ảnh slide có id là ${id.id}`,
      type: 1,
    });
  }
}
async function getSlide() {
  const resul = await slideshowService.getSlide();
  console.log(resul.data);
  if (resul.data.success != true) {
    emits("add-toast", {
      title: "Lỗi tải dữ liệu",
      content: resul.data.error,
      type: 3,
    });
    return;
  }
}
</script>

<style scoped>
.active {
  color: #3b44d1;
}
</style>
