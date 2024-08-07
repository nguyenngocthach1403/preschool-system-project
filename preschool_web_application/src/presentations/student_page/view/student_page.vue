<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-fit pb-[10px]">
    <ConfirmDialog
      v-if="showConfirmDialog"
      class="absolute top-0 left-0"
      :content="`Bạn có muốn xóa bé ${showConfirmDialog.name} không?`"
      :value="showConfirmDialog"
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
    <PopUpLinkParent
      v-if="showPopUpLinkParent"
      class="absolute top-0 left-0"
      :student-data="showPopUpLinkParent ?? null"
      @close="(showPopUpLinkParent = null), loadPage()"
      @add-toast="$emit('add-toast', $event)"
    />

    <!-- Header -->
    <div class="text-left px-6 text-[36px] py-4 font-bold border border-b-1">
      Học sinh
    </div>

    <!-- Search-->
    <div class="flex justify-between content-center mt-5 mr-3">
      <SearchFormComp
        @passSearchText="getSearchText"
        class="w-[400px] ml-[20px]"
      ></SearchFormComp>
      <router-link :to="{ name: 'StudentCreationView' }">
        <CreateButtonComp></CreateButtonComp>
      </router-link>
    </div>
    <ResultNumComp class="w-fit ml-8">{{ total }}</ResultNumComp>

    <!--Show muc-->
    <ShowNumberComp :numb-show="limit" @change-limit="changLimit($event)" />

    <!-- Table components -->
    <LoadingComp
      v-if="!dataOfTable || status == 'loading'"
      class="w-full h-full"
    ></LoadingComp>
    <EmptyBox v-if="students.length == 0" />
    <TableComp
      v-if="status == 'loaded' && students.length != 0"
      :data-table="dataOfTable"
      @delete-student="showConfirmDialog = $event"
      @edit-student="editStudent"
      @sort-student-id="sortDataByID"
      @sort-student-name="sortDataByName"
      @sort-student-class="sortDataByClass"
      @add-student-into-class="showAddClassFunction($event)"
      @link-parent-with-student="showPopUpLinkParentFunction($event)"
    ></TableComp>

    <div
      class="bottom-table-section flex justify-between h-[37px] content-center my-5"
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
import PopUpLinkParent from "../components/popup_linking_parent_with_student.vue";
import { ref, computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useStudentStore } from "../../../stores/student_store";
import LoadingComp from "../../../components/loading_comp.vue";
import ResultNumComp from "../../../components/result_comp.vue";
import ShowNumberComp from "../../../components/show_number_comp.vue";
import EmptyBox from "../../../components/empty_data.vue";
const searchText = ref("");
const studentStore = useStudentStore();
/* Data demo of Student Table */
const dataOfTable = ref([]);
const studentDel = ref(null);
const showConfirmDialog = ref("");
const showStudentEdit = ref(null);
const showPopUpAddClass = ref(false);
const showPopUpLinkParent = ref(null);

const { students, page, limit, loading, total, status } =
  storeToRefs(studentStore);
onMounted(async () => {
  studentStore.getStudent();

  //Get total student
  studentStore.getTotalStudent();

  dataOfTable.value = studentStore.students;
});
function loadPage() {
  if (searchText.value !== "") {
    studentStore.searchStudent(searchText.value);
  } else {
    studentStore.getStudent();
  }
}

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

// const getConfirm = (event) => {
//   if (event) {
//     const studentToDel = JSON.parse(localStorage.getItem("studentToDel") || {});

//     deleteStudent(studentToDel);

//     showConfirmDialog.value = null;
//   } else {
//     showConfirmDialog.value = null;
//   }
// };
const getConfirm = (event) => {
  if (!event) {
    showConfirmDialog.value = null;
    return;
  }

  //Call delete function
  deleteStudent(event);

  showConfirmDialog.value = null;
};
const editStudent = (event) => {
  showStudentEdit.value = event;
};
const emits = defineEmits(["add-toast"]);

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
function changLimit(event) {
  studentStore.changeLimit(event);
}
function showAddClassFunction(event) {
  showPopUpAddClass.value = event;
}
function showPopUpLinkParentFunction(event) {
  showPopUpLinkParent.value = event;
}
</script>

<style >
</style>
