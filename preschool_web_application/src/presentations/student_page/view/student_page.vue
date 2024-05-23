<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-fit pb-[10px]">
    <ConfirmDialog
      v-if="showConfirmDialog"
      class="absolute top-0 left-0"
      :content="showConfirmDialog"
      @confirm="getConfirm($event)"
    />
    <EditStudentView
      v-if="showStudentEdit"
      class="absolute top-0 left-0"
      :student-data="showStudentEdit"
      @add-toast="$emit('add-toast', $event)"
      @close="showStudentEdit = false"
    />
    <PopUpAddStudentIntoClass
      class="absolute top-0 left-0"
      v-if="showPopUpAddClass"
      :student-data="showPopUpAddClass ?? null"
      @close="showPopUpAddClass = null"
      @add-toast="$emit('add-toast', $event)"
    />

    <!-- Header -->
    <div class="text-left px-6 text-[36px] py-4 font-bold border border-b-1">
      Student
    </div>

    <!-- Search-->
    <div class="flex justify-between content-center mt-5 mr-3">
      <SearchFormComp @passSearchText="getSearchText"></SearchFormComp>
      <router-link :to="{ name: 'StudentCreationView' }">
        <CreateButtonComp></CreateButtonComp>
      </router-link>
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
      học sinh
    </div>

    <!-- Quick search -->

    <!-- Table components -->
    <TableComp
      :data-table="dataOfTable"
      @delete-student="deleteStudentById"
      @edit-student="editStudent"
      @sort-student-id="sortDataByID"
      @sort-student-name="sortDataByName"
      @sort-student-class="sortDataByClass"
      @add-student-into-class="showAddClassFunction($event)"
    ></TableComp>

    <div
      class="bottom-table-section flex justify-between h-[37px] content-center"
    >
      <div
        v-if="status !== 'search_failed' && status !== 'load_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        Hiển thị từ {{ page * limit + 1 }} đến
        {{ (page + 1) * limit - (limit - students.length) }} trong
        {{ total }} học sinh
      </div>
      <div
        v-if="status == 'search_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        Not found any student!
      </div>
      <div
        v-if="status == 'load_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        There are no students!
      </div>
      <Pagination
        v-if="status !== 'search_failed' && status !== 'load_failed'"
        :page-nums="round(total / limit)"
        :page-active="page + 1"
        @click-page="changePage($event)"
      ></Pagination>
    </div>
  </div>
</template>

<script setup>
/* Import component here */
import TableComp from "@/presentations/student_page/components/table_comp.vue";
import SearchFormComp from "@/components/search_form_comp.vue";
import CreateButtonComp from "@/components/create_button.vue";
import ConfirmDialog from "@/components/confirm_dialog.vue";
import EditStudentView from "./student_edition_view.vue";
import Pagination from "../../../components/pagination.vue";
import PopUpAddStudentIntoClass from "../components/popup_add_student_to_class.vue";
import { ref, computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useStudentStore } from "../../../stores/student_store";

const searchText = ref("");
const studentStore = useStudentStore();
/* Data demo of Student Table */
const dataOfTable = ref([]);
const studentDel = ref(null);
const showConfirmDialog = ref("");
const showStudentEdit = ref(null);
const showPopUpAddClass = ref(false);

const { students, page, limit, loading, total, status } =
  storeToRefs(studentStore);
onMounted(async () => {
  studentStore.getStudent();

  //Get total student
  studentStore.getTotalStudent();

  dataOfTable.value = studentStore.students;
});

watch(loading, () => {
  if (loading) {
    dataOfTable.value = studentStore.students;
  }
});

// watch(page, () => {
//   studentStore.getStudent();
// });

const getSearchText = (event) => {
  searchText.value = event;

  studentStore.txtSearch = searchText.value;

  // call Api search

  studentStore.searchStudent(event);

  console.log(event);

  dataOfTable.value = studentStore.students;
};

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

    deleteStudent(studentToDel);

    showConfirmDialog.value = null;
  } else {
    showConfirmDialog.value = null;
  }
};
const editStudent = (event) => {
  showStudentEdit.value = event;
};
const emits = defineEmits(["add-toast"]);
const deleteStudentById = (event) => {
  localStorage.setItem("studentToDel", JSON.stringify(event));
  showConfirmDialog.value = "Bạn có muốn xóa bé " + event.name + " không?";
};

function round(value) {
  return Math.ceil(value);
}

function changePage(event) {
  const page = event - 1;
  studentStore.changePage(page);
}

async function deleteStudent(studentToDel) {
  const resultOfDel = await studentStore.deleteStudentInDB(studentToDel.id);

  if (resultOfDel) {
    //emit toast
    emits("add-toast", {
      title: "Detele Successfully!",
      content: "Delete " + studentToDel.name + " student",
      type: 0,
    });
  } else {
    //emit toast
    emits("add-toast", {
      title: "Detele Failed!",
      content: `Not found ${studentToDel.name}`,
      type: 1,
    });
  }
}

function showStudentNumSelectChange(event) {
  studentStore.changeLimit(parseInt(event.target.value));
}
function showAddClassFunction(event) {
  showPopUpAddClass.value = event;
}
</script>

<style >
</style>
