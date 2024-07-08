<template>
  <PopUpLayout
    :title="'Thêm học sinh vào lớp'"
    @close="$emit('close')"
    :width-popup="600"
  >
    <template #content>
      <div class="px-10 w-[700px]">
        <p class="text-start">
          <span class="px-2 py-1 text-[15px]">Chọn học sinh</span>
        </p>
        <InputSerachComp
          class="h-[50px] w-full"
          :options="studentListOption"
          :value="searchValue"
          @newValue="searchValue = $event"
          @selected="selected = $event"
          :has-data="hasData"
          @scrollEnd="handleScrollEnd()"
        />
      </div>
    </template>
    <template #button
      ><button
        v-if="!loading"
        @click="addStudentIntoClass()"
        type="button"
        class="h-[35px] my-[5px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md"
      >
        Thêm
      </button>
      <button
        v-if="loading"
        type="button"
        class="h-[35px] basis-1/11 rounded-md my-[5px] w-fit outline-none border-[0.12rem] focus:border-blue-500 px-4 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
        disabled
      >
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Processing...
      </button></template
    >
  </PopUpLayout>
</template>

<script setup>
import PopUpLayout from "../../../components/popup_layout.vue";
import InputSerachComp from "../../../components/input_search_select.vue";
import { onMounted, ref, watch } from "vue";
import classService from "../../../services/class.service";

//service
import studentService from "../../../services/student.service";

//model
const searchValue = ref("");
const selected = ref(null);
const studentListOption = ref([]);

const page = ref(0);
const hasData = ref(true);

const loading = ref(false);

//life cicle
onMounted(() => {
  getStudentsWithoutClass();
  // getLocalStudentWithoutClass();
});

//emits props watch
watch(searchValue, (newVal) => {
  page.value = 0;
  hasData.value = true;
  studentListOption.value = [];
  if (newVal == "") {
    console.log("search", newVal);
    getStudentsWithoutClass();
    return;
  }
  searchStudentWithoutClass();
});
const props = defineProps({
  classId: {
    type: Number,
    require: true,
  },
});
const emits = defineEmits(["close", "add-toast"]);

//function student withou class
async function getStudentsWithoutClass() {
  if (!hasData.value) return;
  const repsonse = await studentService.getStudentsWithoutClass(10, page.value);

  console.log(repsonse);

  if (repsonse.data.success) {
    studentListOption.value = [
      ...studentListOption.value,
      ...repsonse.data.data,
    ];
    if (repsonse.data.data.length == 0 || repsonse.data.data.length < 10) {
      hasData.value = false;
      return;
    }
  }
}

async function searchStudentWithoutClass() {
  if (!hasData.value) return;
  const repsonse = await studentService.searchStudentsWithoutClass(
    searchValue.value,
    10,
    page.value
  );

  if (repsonse.data.success) {
    studentListOption.value = [
      ...studentListOption.value,
      ...repsonse.data.data,
    ];
    if (repsonse.data.data.length == 0 || repsonse.data.data.length < 10) {
      hasData.value = false;
      return;
    }
  }
}

function handleScrollEnd() {
  if (!hasData.value) return;
  page.value += 1;
  console.log(page.value);
  if (searchValue.value != "") {
    searchStudentWithoutClass();
    return;
  }
  getStudentsWithoutClass();
}

async function addStudentIntoClass() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!props.classId || !user || !selected.value) {
    return;
  }
  loading.value = true;

  const response = await classService.addStudentIntoClass(
    props.classId,
    user.id,
    selected.value
  );

  loading.value = false;

  if (!response.data.success) {
    alert("a");
    emits("add-toast", {
      title: "Quá trình thất bại",
      content: response.data.error,
      type: 1,
    });
    return;
  }
  let StudentNames = "";
  for (let index = 0; index < response.data.data.length; index++) {
    const element = response.data.data[index];

    StudentNames += element.name;
    if (index < response.data.data.length - 1) {
      StudentNames += ", ";
    }
  }
  console.log(StudentNames);
  emits("add-toast", {
    title: "Thêm học sinh vào lớp thành công.",
    content: `Đã thêm ${StudentNames} vào lớp.`,
    type: 0,
  });

  selected.value = [];
  emits("close");
}
// function getLocalStudentWithoutClass() {
//   const data = localStorage.getItem("studentWithoutClasses");
//   console.log(data);
// }
</script>

<style lang="scss" scoped>
</style>