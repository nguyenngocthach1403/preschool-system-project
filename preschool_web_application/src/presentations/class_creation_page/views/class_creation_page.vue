<template>
  <Layout :title="'Tạo lớp học mới'" @close="$emit('close')">
    <template #content>
      <form
        @submit.prevent="handleSubmitAddNewClass"
        class="px-[40px] relative text-[15px] text-start"
      >
        <!--Add Avatar-->
        <div
          class="add-avatar w-[100px] h-[100px] m-auto bg-[#D9D9D9] rounded-md relative"
        >
          <img
            v-if="avatarPath"
            :src="avatarPath"
            class="w-[100px] h-[100px] m-auto object-cover rounded-md border-2"
          />
          <input
            type="file"
            class="absolute top-0 left-0 w-[100px] h-[100px] opacity-0"
            accept=".png, .jpeg, .jpg"
            @change="handleUploadImg"
          />
        </div>
        <p class="w-full text-center py-2">Ảnh đại diện lớp</p>
        <label class="w-full text-start">
          <span class="pl-4 text-[16px]">Tên lớp</span>
          <span class="text-red-500"> *</span>
          <input
            v-model="classNameInput"
            type="text"
            placeholder="Nhập tên lớp học"
            class="input-text-default"
            :class="{ invalid: messageOfClassName }"
          />
          <div class="h-[30px] pt-2">
            <p class="invalid-text">
              {{ messageOfClassName }}
            </p>
          </div>
        </label>
        <!--Class type input-->
        <div class="flex justify-between w-full gap-4">
          <label class="w-full">
            <span class="pl-4 text-[16px]">Levels</span>
            <select
              v-model="classLevelInput"
              class="input-text-default"
              :class="{ invalid: messageOfLevel }"
            >
              <option value="null" selected disabled>Selected</option>
              <option v-for="item in levelList" :key="item" :value="item.value">
                {{ item.name }}
              </option>
            </select>
            <div class="h-[30px] pt-2">
              <p class="invalid-text">
                {{ messageOfLevel }}
              </p>
            </div>
          </label>
          <label class="w-full">
            <span class="pl-4 text-[16px]">Loại chương trình</span>
            <select
              v-model="classTypeInput"
              class="input-text-default"
              :class="{ invalid: messageOfSyllabus }"
            >
              <option value="null" selected disabled>Selected</option>
              <option
                v-for="item in syllabusList"
                :key="item"
                :value="item.value"
              >
                {{ item.name }}
              </option>
            </select>
            <div class="h-[30px] pt-2">
              <p class="invalid-text">
                {{ messageOfSyllabus }}
              </p>
            </div>
          </label>
        </div>
        <!--Time-->
        <div class="flex justify-between w-full gap-4">
          <label class="w-full">
            <span class="pl-4 text-[16px]">Ngày mở lớp</span>
            <input
              v-model="dateBeginInput"
              type="date"
              class="input-text-default"
              :class="{ invalid: messageOfBeginDate }"
            />
            <div class="h-[30px] pt-2">
              <p class="invalid-text">
                {{ messageOfBeginDate }}
              </p>
            </div>
          </label>
          <label class="w-full">
            <span class="pl-4 text-[16px]">Kết thúc dự kiến</span>
            <input
              v-model="dateFinishInput"
              type="date"
              class="input-text-default"
              :class="{ invalid: messageOfEndDate }"
            />
            <div class="h-[30px] pt-2">
              <p class="invalid-text">
                {{ messageOfEndDate }}
              </p>
            </div>
          </label>
        </div>

        <!--Limited member & Teacher-->
        <div class="flex justify-between w-full gap-4">
          <label class="w-full">
            <span class="pl-4 text-[16px]">Số lượng tối đa</span>
            <input
              v-model="limitedStudent"
              type="number"
              class="input-text-default"
              :class="{ invalid: messageOfLimit }"
            />
            <div class="h-[30px] pt-2">
              <p class="invalid-text">
                {{ messageOfLimit }}
              </p>
            </div>
          </label>
          <label class="w-full">
            <span class="pl-4 text-[16px]">Giáo viên phụ trách</span>
            <div class="relative">
              <input
                placeholder="Nhập mã giáo viên"
                v-model="teacherInput"
                type="text"
                class="input-text-default"
                :class="{ invalid: messageOfTeacher }"
              />
              <div v-if="loaddingTeacher" class="absolute right-0 top-1/3">
                <LoadingComp />
              </div>
              <div
                v-if="teacher"
                class="w-full h-full absolute top-0 px-3 pt-2 pb-1"
              >
                <div
                  class="w-full h-full bg-white relative flex items-center gap-5"
                >
                  <img
                    :src="teacher.avatar"
                    class="w-[30px] h-[30px] border rounded-full object-cover"
                  />
                  <div>
                    <p>{{ teacher.name }}</p>
                  </div>
                  <button
                    @click.prevent="teacher = null"
                    class="hover:bg-gray-200 w-[25px] h-[22px] absolute right-0 top-1/4 content-center rounded-md"
                  >
                    <img :src="close_icon" class="w-[15px] m-auto" />
                  </button>
                </div>
              </div>
            </div>
            <div class="h-[30px] pt-2">
              <p class="invalid-text">
                {{ messageOfTeacher }}
              </p>
            </div>
          </label>
        </div>
        <!--Button save & close-->
      </form>
    </template>
    <template #bottom>
      <div
        id="button-side"
        class="w-full flex my-2 justify-center gap-5 basis-1/6 text-[14px]"
      >
        <button
          type="button"
          @click="exit()"
          class="h-[35px] my-[5px] border border-[#3B44D1] hover:bg-blue-400/50 hover:text-[#3B44D1] hover:border-white text-black px-[25px] rounded-md"
        >
          Hủy
        </button>
        <button
          v-if="!creating"
          @click="handleSubmitAddNewClass()"
          type="button"
          class="h-[35px] my-[5px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md ]"
        >
          Thêm
        </button>

        <button
          v-if="creating"
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
        </button>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useClassStore } from "@/stores/class_store.js";
import close_icon from "../../../assets/icons/close.svg";
import Layout from "@/components/edit_and_create_layout.vue";
import SaveButton from "@/components/save_button.vue";
import LevelsService from "../../../services/levels.service";
import SyllabusService from "../../../services/syllabus.service";
import { isEmpty } from "../../../utils/resources/check_valid";
import LoadingComp from "../../../components/loading_comp.vue";
import classService from "../../../services/class.service";

const classNameInput = ref("");
const dateBeginInput = ref(null);
const dateFinishInput = ref(null);
const limitedStudent = ref(0);
const teacherInput = ref("");
const classStore = useClassStore();
const classLevelInput = ref(null);
const classTypeInput = ref(null);
const levelList = ref([]);
const syllabusList = ref([]);
const loaddingTeacher = ref(false);
const creating = ref(false);
const teacher = ref(null);

const messageOfClassName = ref("");
const messageOfLevel = ref("");
const messageOfSyllabus = ref("");
const messageOfBeginDate = ref("");
const messageOfEndDate = ref("");
const messageOfTeacher = ref("");
const messageOfLimit = ref("");

const isLeave = ref(false);

const avatarUpload = ref(null);
const avatarPath = ref(null);

onMounted(async () => {
  await getLevels();
  await getSyllabus();
});

watch(classNameInput, () => {
  if (!isEmpty(classNameInput.value)) {
    messageOfClassName.value = "";
  }
});

watch(classLevelInput, () => {
  if (!isEmpty(classLevelInput.value)) {
    messageOfLevel.value = "";
  }
});

watch(classTypeInput, () => {
  if (!isEmpty(classTypeInput.value)) {
    messageOfSyllabus.value = "";
  }
});

watch(dateBeginInput, () => {
  if (!isEmpty(dateBeginInput.value)) {
    messageOfBeginDate.value = "";
  }
});

watch(dateFinishInput, () => {
  if (!isEmpty(dateFinishInput.value)) {
    messageOfEndDate.value = "";
  }
});

watch(limitedStudent, () => {
  if (!isEmpty(limitedStudent.value)) {
    messageOfLimit.value = "";
  }
});

watch(teacherInput, () => {
  //Loading teacher
  if (!isEmpty(teacherInput.value)) {
    loaddingTeacher.value = true;
  } else {
    loaddingTeacher.value = false;
  }
  setTimeout(() => {
    // Load teacher in server
  }, 1000);
});

const emits = defineEmits(["close", "add-toast"]);

const handleUploadImg = (event) => {
  //Lấy hình
  avatarUpload.value = event.target.files[0];

  //Kiểm tra tồn tại
  if (!avatarUpload) return;

  //Kiểm tra size
  if (avatarUpload.value.size / 1024 > 5120) {
    //Bỏ nếu quá dung lượng cho phếp
    avatarUpload.value = null;
    return;
  }

  //Tạo đường dẫn của ảnh
  avatarPath.value = URL.createObjectURL(avatarUpload.value);
};

async function handleSubmitAddNewClass() {
  if (checkValid()) {
    return;
  }
  creating.value = true;

  const formData = new FormData();

  if (avatarUpload.value) {
    formData.append("files", avatarUpload.value);
  }
  formData.append("className", classNameInput.value);
  formData.append("level", classLevelInput.value);
  formData.append("syllabus", classTypeInput.value);
  formData.append("startDate", dateBeginInput.value);
  formData.append("endDate", dateFinishInput.value);
  formData.append("limit", limitedStudent.value);
  if (!isEmpty(teacherInput.value)) {
    formData.append("teacher", teacherInput.value);
  }

  const response = await classService.createClass(formData);

  creating.value = false;

  if (response.status !== 200 && response.status !== 500) {
    emits("add-toast", {
      title: "Warnning !",
      content: response.statusText,
      type: 2,
    });
    return;
  }

  if (response.status === 500) {
    emits("add-toast", {
      title: "Error!",
      content: response.data.error,
      type: 1,
    });
    return;
  }

  if (!response.data.success) {
    emits("add-toast", {
      title: "Error!",
      content: response.data.message,
      type: 1,
    });
    return;
  }

  emits("add-toast", {
    title: "Thành công !",
    content: response.data.message,
    type: 0,
  });
}

function checkValid() {
  let invalid = false;
  if (isEmpty(classNameInput.value)) {
    invalid = true;
    messageOfClassName.value = "Tên lớp học không được để trống";
  }
  if (isEmpty(classLevelInput.value)) {
    invalid = true;
    messageOfLevel.value = "Vui lòng chọn cấp độ lớp.";
  }
  if (isEmpty(classTypeInput.value)) {
    invalid = true;
    messageOfSyllabus.value = "Vui lòng chọn chương trình.";
  }
  if (isEmpty(dateBeginInput.value)) {
    invalid = true;
    messageOfBeginDate.value = "Vui lòng chọn ngày mở lớp";
  }
  if (isEmpty(dateFinishInput.value)) {
    invalid = true;
    messageOfEndDate.value = "Vui lòng chọn ngày kết thúc lớp";
  }
  if (isEmpty(limitedStudent.value)) {
    invalid = true;
    messageOfLimit.value = "Vui lòng chọn số lượng";
  }

  return invalid;
}

function exit() {
  isLeave.value = true;

  setTimeout(() => {
    emits("close");
    isLeave.value = false;
  }, 200);
}

async function getLevels() {
  const response = await LevelsService.getLevels();
  if (response.status == 200 && response.data.success) {
    for (let index = 0; index < response.data.data.length; index++) {
      const element = response.data.data[index];
      levelList.value.push({
        name: element.levelsName,
        value: element.id,
      });
    }
  }
}

async function getSyllabus() {
  const response = await SyllabusService.getSyllabus();
  if (response.status == 200 && response.data.success) {
    for (let index = 0; index < response.data.data.length; index++) {
      const element = response.data.data[index];
      syllabusList.value.push({
        name: element.syllabusName,
        value: element.id,
      });
    }
  }
}
</script>

<style scoped>
.invalid {
  border: 1px solid red;
}
</style>