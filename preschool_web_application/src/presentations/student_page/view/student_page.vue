<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-dvh">
    <ConfirmDialog
      v-if="showConfirmDialog"
      class="absolute top-0 left-0"
      :content="showConfirmDialog"
      @confirm="getConfirm"
    />
    <EditStudentView
      v-if="showStudentEdit"
      class="absolute top-0 left-0"
      :student-data="showStudentEdit"
      @close="showStudentEdit = false"
    />

    <!-- Header -->
    <div class="text-left px-[20px] text-[36px] font-bold">Student</div>

    <!-- Search-->
    <div class="flex justify-between content-center mr-3">
      <SearchFormComp @passSearchText="getSearchText"></SearchFormComp>
      {{ loading }}

      <router-link to="/students/create">
        <CreateButtonComp></CreateButtonComp>
      </router-link>
    </div>

    <!-- Quick search -->

    <!-- Table components -->
    <TableComp
      :data-table="filteredStudentData"
      @delete-student="deleteStudentById"
      @edit-student="editStudent"
      @sort-student-id="sortDataByID"
      @sort-student-name="sortDataByName"
      @sort-student-class="sortDataByClass"
    ></TableComp>
  </div>
</template>

<script setup>
/* Import component here */
import TableComp from "@/presentations/student_page/components/table_comp.vue";
import SearchFormComp from "@/components/search_form_comp.vue";
import ToolTipComp from "@/utils/resources/tooltip.vue";
import CreateButtonComp from "@/components/create_button.vue";
import ConfirmDialog from "@/components/confirm_dialog.vue";
import EditStudentView from "./student_edition_view.vue";

import { ref, computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useStudentStore } from "../../../stores/student_store";

/* Another import here */
import add_icon from "@/assets/icons/pls.svg";

const tooltip = ref(false);
const searchText = ref("");
const studentStore = useStudentStore();
/* Data demo of Student Table */
const dataOfTable = ref([]);
const studentDel = ref(null);
const showConfirmDialog = ref("");
const showStudentEdit = ref(null);

const { students, loading } = storeToRefs(studentStore);
onMounted(async () => {
  studentStore.getStudent();
  console.log("SS", students);
  console.log("a", loading);
  dataOfTable.value = studentStore.students;
});

watch(loading, () => {
  if (loading) {
    dataOfTable.value = studentStore.students;
  }
});

const getSearchText = (event) => {
  searchText.value = event;
};

const filteredStudentData = computed(() => {
  return dataOfTable.value.filter((e) => {
    return (
      e.name.match(searchText.value) ||
      e.class.match(searchText.value) ||
      e.birthday.match(searchText.value)
    );
  });
});

const sortDataByID = () => {
  dataOfTable.value.sort((a, b) => a.id - b.id);
};

const sortDataByName = () => {
  dataOfTable.value.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
};

const sortDataByClass = () => {
  dataOfTable.value.sort((a, b) => a.class.localeCompare(b.class));
};

const getConfirm = (event) => {
  if (event) {
    const studentToDel = JSON.parse(localStorage.getItem("studentToDel") || {});
    studentStore.deleteStudent(studentToDel.id);
    //emit toast
    emits("add-toast", {
      title: "Detele Successfully!",
      content: "Delete " + studentToDel.name + " student",
      type: 0,
    });
  }
  showConfirmDialog.value = null;
};

const emits = defineEmits(["add-toast"]);
const deleteStudentById = (event) => {
  localStorage.setItem("studentToDel", JSON.stringify(event));
  showConfirmDialog.value = "Bạn có muốn xóa bé " + event.name + " không?";
};

const editStudent = (event) => {
  showStudentEdit.value = event;
};
</script>

<style scoped>
</style>