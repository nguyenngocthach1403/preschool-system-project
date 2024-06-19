<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-fit mb-20 py-3">
    <div class="text-left px-[20px] text-[36px] font-bold">Teacher</div>
    <div class="flex justify-between content-center mr-3">
      <SearchForm @passSearchText="getSearchText"></SearchForm>

      <!-- <router-link :to="{ name: 'ParentCreationView' }">
        <CreateButtonComp></CreateButtonComp>
      </router-link> -->
    </div>
    <div class="my-2 w-full text-start px-6">
      Hiển thị
      <select
        id="show-num-teacher"
        class="w-fit h-[30px] border rounded-md outline-none border-black px-2"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="60">60</option>
        <option value="70">70</option>
        <option value="100">100</option>
      </select>
      Giáo viên
    </div>
    <TableData></TableData>
  </div>
</template>

<script setup>
import TableData from "@/presentations/teacher_page/component/table_comp.vue";
import SearchForm from "../../../components/search_form_comp.vue";
import CreateButtonComp from "../../../components/create_button.vue";
import Pagination from "../../../components/pagination.vue";
import ConfirmDialog from "@/components/confirm_dialog.vue";
// import CreateAccountView from "../../parent_page/views/add_account.vue";
import { ref, onMounted, onBeforeMount } from "vue";
</script>

<style scoped></style>
