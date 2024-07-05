<template>
  <div class="bg-white ml-4 h-fit rounded-3xl text-center mb-20 mb-3">
    <ConfirmDialog
      v-if="showConfirmDialog"
      class="absolute top-0 left-0"
      :content="`Bạn có muốn xóa tiêu đề ${showConfirmDialog.title} không?`"
      :value="showConfirmDialog"
      @confirm="getConfirm($event)"
    />

    <div class="flex justify-between content-center mr-3 mt-5">
      <SearchForm
        @passSearchText="getSearchText"
        class="w-[400px] ml-[20px]"
      ></SearchForm>

      <router-link :to="{ name: 'CreateNewsView' }">
        <CreateButtonComp></CreateButtonComp>
      </router-link>
    </div>
    <ResultNumComp>{{ total }}</ResultNumComp>

    <ShowNumberComp :numb-show="limit" @change-limit="changeLimit($event)" />

    <TableData
      :data-table="news"
      @delete-news="showConfirmDialog = $event"
    ></TableData>
    <div
      class="bottom-table-section flex justify-between h-[37px] content-center my-3"
    >
      <div
        v-if="status !== 'search_failed' && status !== 'load_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        Hiển thị từ {{ page * limit + 1 }} đến
        {{ (page + 1) * limit - (limit - news.length) }} trong {{ total }} tin
        tức
      </div>
      <div
        v-if="status == 'search_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        Not found any news!
      </div>
      <div
        v-if="status == 'load_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        There are no news!
      </div>
      <Pagination
        v-if="status !== 'search_failed' || status !== 'load_failed'"
        :page-nums="round(total / limit)"
        :page-active="page + 1"
        @click-page="changePage($event)"
      ></Pagination>
    </div>
  </div>
</template>

<script setup>
import TableData from "../news/table.vue";
import SearchForm from "../../components/search_form_comp.vue";
import CreateButtonComp from "../../components/create_button.vue";
import Pagination from "../../components/pagination.vue";
import ConfirmDialog from "../../components/confirm_dialog.vue";

import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useNewsStore } from "../../stores/news_store";
import ResultNumComp from "../../components/result_comp.vue";
import ShowNumberComp from "../../components/show_number_comp.vue";

const newsStore = useNewsStore();
const dataOfTable = ref([]);
const { news, page, limit, loading, total, status } = storeToRefs(newsStore);
const showConfirmDialog = ref("");

onMounted(async () => {
  newsStore.getNews();
  newsStore.getTotalNews();
});
const searchText = ref("");

const getSearchText = (event) => {
  searchText.value = event;
  useNewsStore.txtSearch = searchText.value;
  newsStore.searchNews(event);
  //   dataOfTable.value = useNewsStore.news;
};
function round(value) {
  return Math.ceil(value);
}

function changePage(event) {
  const page = event - 1;
  newsStore.changePage(page);
}
function changeLimit(event) {
  newsStore.changeLimit(event);
}

const getConfirm = (event) => {
  if (!event) {
    showConfirmDialog.value = null;
    return;
  }
  deleteNews(event);
  showConfirmDialog.value = null;
};
const emits = defineEmits(["add-toast"]);
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
</script>

<style scoped></style>
