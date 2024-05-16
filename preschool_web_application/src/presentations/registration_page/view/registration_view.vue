<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-fit pb-[10px]">
    <CreateAccountView
      v-if="showCreateAccountView"
      class="absolute top-0 left-0"
      @close="showCreateAccountView = false"
      :registration="registerItem"
    />
    <!-- Header -->
    <div class="text-left px-[20px] text-[36px] font-bold">Registration</div>

    <!-- Search-->
    <div class="flex justify-between content-center mr-3">
      <SearchFormComp></SearchFormComp>
      <!-- <router-link to="/students/create">
        <CreateButtonComp></CreateButtonComp>
      </router-link> -->
    </div>

    <!--Show muc-->
    <div class="my-2 w-full text-start px-6">
      Hiển thị
      <select
        id="show-num-student"
        class="w-fit h-[30px] border rounded-md outline-none border-black px-2"
        @change="showStudentNumSelectChange"
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
      Danh mục
    </div>

    <!-- Quick search -->

    <!-- Table components -->
    <TableComp
      :data="dataTable"
      @click-create-acount="createAccountShow($event)"
    ></TableComp>
    <div
      class="bottom-table-section flex justify-between h-[37px] content-center"
    >
      <div
        v-if="status !== 'search_failed' && status !== 'load_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        Hiển thị từ {{ page * limit + 1 }} đến
        {{ (page + 1) * limit - (limit - registrations.length) }} trong
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
        :page-nums="round(registrationStore.total / registrationStore.limit)"
        @click-page="changePage($event)"
      ></Pagination>
    </div>
  </div>
</template>

<script setup>
import TableComp from "../components/table.vue";
import CreateAccountView from "../../account_page/components/create_account_view.vue";
import SearchFormComp from "../../../components/search_form_comp.vue";
import Pagination from "../../../components/pagination.vue";
import { storeToRefs, mapState } from "pinia";
import { useRegistrionStore } from "../../../stores/registration_store";
import { onMounted, ref, watch } from "vue";

const registrationStore = useRegistrionStore();
const { registrations, total, status, limit, page, loading } =
  storeToRefs(registrationStore);

onMounted(async () => {
  await registrationStore.getRegistration();

  dataTable.value = registrationStore.formatRegistration(
    registrationStore.registrations
  );
});

watch(loading, () => {
  dataTable.value = registrationStore.formatRegistration(
    registrationStore.registrations
  );
});

const showCreateAccountView = ref(false);

const registerItem = ref(null);

const dataTable = ref([
  {
    id: 10,
    name: "Nguyễn Ngọc Thạch",
    phone: "0899982782",
    email: "nguyenngocthach142003@gmail.com",
    address: "Long Khê, Cần Đước, Long An",
    role: 1,
    levels: 1,
    syllabus: 0,
    profileStatus: 3,
    user: "NNTHACH",
  },
  {
    id: 9,
    name: "Nguyễn Ngọc Thạch",
    phone: "0899982782",
    email: "nguyenngocthach142003@gmail.com",
    address: "Long Khê, Cần Đước, Long An",
    role: 1,
    levels: 1,
    syllabus: 0,
    profileStatus: 3,
    user: "NNTHACH",
  },
]);
function changePage(event) {
  registrationStore.changePage(event - 1);
}
function createAccountShow(event) {
  showCreateAccountView.value = true;
  registerItem.value = event;
}
function round(value) {
  return Math.ceil(value);
}
function showStudentNumSelectChange(event) {
  registrationStore.changeLimit(parseInt(event.target.value));
}
</script>