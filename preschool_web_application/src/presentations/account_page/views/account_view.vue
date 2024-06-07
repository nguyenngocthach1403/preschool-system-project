<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-fit pb-[10px]">
    <div
      class="text-left px-6 text-[36px] py-4 mb-5 font-bold border border-b-1"
    >
      Account
    </div>
    <SearchFormComp class="w-[400px] ml-[20px]" />
    <!--Show muc-->
    <div class="my-2 w-full text-start px-6">
      Hiển thị
      <select
        id="show-num-student"
        class="w-fit h-[30px] border rounded-md outline-none border-black px-2"
        @change="showAccountNumSelectChange"
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
      học sinh
    </div>
    <TableComp :data="account"></TableComp>
    <div
      class="bottom-table-section flex justify-between h-[37px] content-center my-3"
    >
      <div
        v-if="status !== 'search_failed' && status !== 'load_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        Hiển thị từ {{ page * limit + 1 }} đến
        {{ (page + 1) * limit - (limit - account.length) }} trong
        {{ total }} danh mục
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
      <Pagination
        :page-nums="round(total / limit)"
        :page-active="page + 1"
        @click-page="accountStore.changePage($event - 1)"
      ></Pagination>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import TableComp from "../components/table_comp.vue";
import SearchFormComp from "../../../components/search_form_comp.vue";
import Pagination from "../../../components/pagination.vue";
import { useAccountStore } from "../../../stores/account_store";
import { storeToRefs } from "pinia";

const accountStore = useAccountStore();

const { account, status, page, limit, total } = storeToRefs(accountStore);

const emits = defineEmits(["add-toast"]);

onMounted(async () => {
  const res = await accountStore.getAccount();

  if (!res.success) {
    emits("add-toast", {
      content: res.error,
      title: "Tải dữ liệu account thất bại!",
      type: 1,
    });
  }
});
function round(value) {
  return Math.ceil(value);
}

function showAccountNumSelectChange(event) {
  accountStore.changeLimit(parseInt(event.target.value));
}
</script>

<style scoped>
</style>