<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-fit mb-20 py-3">
    <ConfirmDialog
      v-if="showConfirmDialog"
      class="absolute top-0 left-0"
      :content="`Bạn có muốn xóa giáo viên ${showConfirmDialog.name} không?`"
      :value="showConfirmDialog"
      @confirm="getConfirm($event)"
    />
    <CreateAccountView
      v-if="showCreateAccountView"
      class="absolute top-0 left-0"
      :teacher-id="showCreateAccountView"
      @close="closeAccountCreationView()"
      @add-toast="$emit('add-toast', $event)"
    />
    <div class="text-left px-[20px] text-[36px] font-bold">Giáo viên</div>
    <div class="flex justify-between content-center mr-3">
      <SearchForm
        @passSearchText="getSearchText"
        class="w-[400px] ml-[20px]"
      ></SearchForm>

      <router-link :to="{ name: 'TeacherCreationView' }">
        <CreateButtonComp :title="'Thêm giáo viên'"></CreateButtonComp>
      </router-link>
    </div>
    <ResultNumComp>{{ total }}</ResultNumComp>
    <ShowNumberComp :numb-show="limit" @change-limit="changeLimit($event)" />
    <TableData
      :data-table="teachers"
      @create-account-for-teacher="showCreateAccountView = $event"
      @delete-teacher="showConfirmDialog = $event"
    ></TableData>
    <div
      class="bottom-table-section flex justify-between h-[37px] content-center my-3"
    >
      <div
        v-if="status !== 'search_failed' && status !== 'load_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        Hiển thị từ {{ page * limit + 1 }} đến
        {{ (page + 1) * limit - (limit - teachers.length) }} trong
        {{ total }} giáo viên
      </div>
      <div
        v-if="status == 'search_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        Not found any teacher!
      </div>
      <div
        v-if="status == 'load_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        There are no teacher!
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
import TableData from "../component/table_comp.vue";
import SearchForm from "../../../components/search_form_comp.vue";
import CreateButtonComp from "../../../components/create_button.vue";
import Pagination from "../../../components/pagination.vue";
import ConfirmDialog from "@/components/confirm_dialog.vue";
import CreateAccountView from "../../account_page/components/create_account_teacher_view.vue";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTeacherStore } from "../../../stores/teacher_store";
import ResultNumComp from "../../../components/result_comp.vue";
import ShowNumberComp from "../../../components/show_number_comp.vue";
const teacherStore = useTeacherStore();
const showConfirmDialog = ref("");
const showCreateAccountView = ref(false);
const { teachers, page, limit, loading, total, status } =
  storeToRefs(teacherStore);
onMounted(async () => {
  teacherStore.getTeacher();
  //Get total
  teacherStore.getTotalTeacher();
});
const searchText = ref("");
const getSearchText = (event) => {
  searchText.value = event;

  if (event != teacherStore.txtSearch) {
    teacherStore.txtSearch = searchText.value;
    teacherStore.page = 0;
  }
  // call Api search
  teacherStore.searchTeacher();
};
function round(value) {
  return Math.ceil(value);
}
function changePage(event) {
  const page = event - 1;
  teacherStore.changePage(page);
}
function changeLimit(event) {
  teacherStore.changeLimit(event);
}
function closeAccountCreationView() {
  showCreateAccountView.value = null;
  if (teacherStore.txtSearch != "") {
    teacherStore.searchTeacher(teacherStore.txtSearch);
    return;
  }
}
const getConfirm = (event) => {
  if (!event) {
    showConfirmDialog.value = null;
    return;
  }
  deleteTeacher(event);
  showConfirmDialog.value = null;
};
const emits = defineEmits(["add-toast"]);
async function deleteTeacher(teacherToDel) {
  const resultOfDel = await teacherStore.deleteTeacher(teacherToDel.id);

  if (resultOfDel) {
    emits("add-toast", {
      title: "Xoá thành công!",
      content: "Xoá giáo viên " + teacherToDel.name,
      type: 0,
    });
    teacherStore.getTeacher();
    teacherStore.getTotalTeacher();
  } else {
    emits("add-toast", {
      title: "Xoá thất bại!",
      content: `Lỗi xoá giáo viên ${teacherToDel.name}`,
      type: 1,
    });
  }
}
</script>
<style scoped></style>
