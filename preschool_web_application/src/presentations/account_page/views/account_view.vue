<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-fit pb-[10px]">
    <div class="text-left px-[20px] text-[36px] font-bold">Account</div>
    <SearchFormComp />

    <TableComp :data="dataTalbe"></TableComp>
    <div
      class="bottom-table-section flex justify-between h-[37px] content-center my-3"
    >
      <div
        v-if="status !== 'search_failed' && status !== 'load_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        <!-- Hiển thị từ {{ page * limit + 1 }} đến
        {{ (page + 1) * limit - (limit - registrations.length) }} trong
        {{ total }} danh mục -->
      </div>
      <div
        v-if="status == 'search_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        không tìm thấy danh mục nào!
      </div>
      <div
        v-if="status == 'load_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        Không có danh mục nào tồn tại!
      </div>
      <Pagination :page-nums="page"></Pagination>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TableComp from "../components/table_comp.vue";
import SearchFormComp from "../../../components/search_form_comp.vue";
import Pagination from "../../../components/pagination.vue";

const page = ref(2);

const dataTalbe = ref([
  {
    id: 1,
    username: "UDAD",
    role: 1,
    phone: "023123123123",
    email: "nguyenngocthach142003@gmail.com",
    isOnline: 1,
  },
  {
    id: 2,
    username: "UDAD",
    role: 1,
    phone: "023123123123",
    email: "nguyenngocthach142003@gmail.com",
    isOnline: 1,
  },
]);
</script>

<style scoped>
</style>