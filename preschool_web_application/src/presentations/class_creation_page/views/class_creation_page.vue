<template>
  <Layout :title="'Tạo lớp học mới'" @close="$emit('close')">
    <template #content>
      <form
        @submit.prevent="handleSubmitAddNewClass"
        class="px-[40px] relative text-[15px] text-start"
      >
        <!--Add Avatar-->
        <div
          class="add-avatar w-[140px] h-[140px] m-auto bg-[#D9D9D9] rounded-md relative"
        >
          <img
            v-if="avatarPath"
            :src="avatarPath"
            class="w-[140px] h-[140px] m-auto object-cover rounded-md border-2"
          />
          <input
            type="file"
            class="absolute top-0 left-0 w-[140px] h-[140px] opacity-0"
            accept=".png, .jpeg, .jpg"
            @change="handleUploadImg"
          />
        </div>
        <p class="w-full text-center py-2">Ảnh đại diện lớp</p>

        <div class="flex justify-between w-full gap-4">
          <label class="w-full text-start">
            <span class="pl-4 text-[16px]">Tên lớp</span>
            <span class="text-red-500"> (*)</span>
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
          <label class="w-full">
            <span class="pl-4 text-[16px]">Loại</span>
            <span class="text-red-500"> (*)</span>
            <select
              v-model="classTypeInput"
              class="input-text-default"
              :class="{ invalid: messageOfType }"
            >
              <option value="null" selected disabled>Selected</option>
              <option value="Nội trú">Nội trú</option>
              <option value="Bán trú">Bán trú</option>
            </select>
            <div class="h-[30px] pt-2">
              <p class="invalid-text">
                {{ messageOfType }}
              </p>
            </div>
          </label>
        </div>
        <!--Class type input-->
        <div class="flex justify-between w-full gap-4">
          <label class="w-full">
            <span class="pl-4 text-[16px]">Cấp bậc</span>
            <span class="text-red-500"> (*)</span>
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
            <span class="pl-4 text-[16px]">Chương trình</span>
            <span class="text-red-500"> (*)</span>
            <select
              v-model="classSyllabusInput"
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
            <span class="pl-4 text-[16px]">Ngày mở lớp</span
            ><span class="text-red-500"> (*)</span>
            <VueDatePicker
              :enable-time-picker="false"
              v-model="dateBeginInput"
              :class="{ invalid: messageOfBeginDate }"
            />
            <div class="h-[30px] pt-2">
              <p class="invalid-text">
                {{ messageOfBeginDate }}
              </p>
            </div>
          </label>
          <label class="w-full">
            <span class="pl-4 text-[16px]">Kết thúc dự kiến</span
            ><span class="text-red-500"> (*)</span>
            <VueDatePicker
              :enable-time-picker="false"
              v-model="dateFinishInput"
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
            <span class="pl-4 text-[16px]">Số lượng tối đa (mặc định 30)</span>
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
            <span class="pl-4 text-[16px]">Niên khóa</span>
            <span class="text-red-500"> (*)</span>
            <div class="">
              <input
                placeholder="Nhập mã niên khóa"
                v-model="sessionInput"
                type="number"
                class="input-text-default"
                :class="{ invalid: messageOfSession }"
              />
            </div>
            <div class="h-[30px] pt-2">
              <p class="invalid-text">{{ messageOfSession }}</p>
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
          v-if="!creating && !props.classData"
          @click="handleSubmitAddNewClass()"
          type="button"
          class="h-[35px] my-[5px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md ]"
        >
          Thêm
        </button>
        <button
          v-if="!creating && props.classData"
          @click="handleUpdateClass()"
          type="button"
          class="h-[35px] my-[5px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md ]"
        >
          Cập nhật
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
import Layout from "@/components/edit_and_create_layout.vue";
import LevelsService from "../../../services/levels.service";
import SyllabusService from "../../../services/syllabus.service";
import { isEmpty } from "../../../utils/resources/check_valid";
import LoadingComp from "../../../components/loading_comp.vue";
import classService from "../../../services/class.service";
import { yyyymmddDateString } from "../../../utils/resources/format_date";

const classNameInput = ref("");
const dateBeginInput = ref(null);
const dateFinishInput = ref(null);
const limitedStudent = ref(0);
const sessionInput = ref("");
const classLevelInput = ref(null);
const classSyllabusInput = ref(null);
const levelList = ref([]);
const syllabusList = ref([]);
const creating = ref(false);
const classTypeInput = ref("");

const messageOfClassName = ref("");
const messageOfLevel = ref("");
const messageOfSyllabus = ref("");
const messageOfBeginDate = ref("");
const messageOfEndDate = ref("");
const messageOfLimit = ref("");
const messageOfSession = ref("");
const messageOfType = ref("");

const isLeave = ref(false);

const avatarUpload = ref(null);
const avatarPath = ref(null);

watch(classNameInput, () => {
  if (!isEmpty(classNameInput.value)) {
    messageOfClassName.value = "";
  }
});

watch(classTypeInput, () => {
  if (!isEmpty(classTypeInput.value)) {
    messageOfType.value = "";
  }
});

watch(classLevelInput, () => {
  if (!isEmpty(classLevelInput.value)) {
    messageOfLevel.value = "";
  }
});

watch(classSyllabusInput, () => {
  if (!isEmpty(classSyllabusInput.value)) {
    messageOfSyllabus.value = "";
  }
});

watch(dateBeginInput, () => {
  if (!isEmpty(dateBeginInput.value)) {
    messageOfBeginDate.value = "";
    sessionInput.value = dateBeginInput.value.getFullYear();
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

const props = defineProps(["classData"]);

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
  formData.append("syllabus", classSyllabusInput.value);
  formData.append(
    "startDate",
    yyyymmddDateString(new Date(dateBeginInput.value).toLocaleDateString())
  );
  formData.append(
    "endDate",
    yyyymmddDateString(new Date(dateFinishInput.value).toLocaleDateString())
  );
  formData.append("limit", limitedStudent.value);
  formData.append(
    "session",
    sessionInput.value || new Date(dateBeginInput.value).getFullYear()
  );
  formData.append("type", classTypeInput.value);

  formData.append("created_by", window.user.id);

  const response = await classService.createClass(formData);

  creating.value = false;

  if (response.status !== 200 && response.status !== 400) {
    emits("add-toast", {
      title: "Warnning !",
      content: response.statusText,
      type: 2,
    });
    return;
  }

  if (response.status == 400) {
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
    title: "Thành công!",
    content: response.data.message,
    type: 0,
  });
  emits("close");
}
async function handleUpdateClass() {
  if (checkValid()) {
    return;
  }
  creating.value = true;

  const formData = new FormData();

  if (avatarUpload.value) {
    formData.append("files", avatarUpload.value);
  }
  if (classNameInput.value != props.classData.name) {
    formData.append("className", classNameInput.value);
  }
  if (classLevelInput.value != props.classData.levelId) {
    formData.append("level", classLevelInput.value);
  }
  if (classSyllabusInput.value != props.classData.syllabusId) {
    formData.append("syllabus", classSyllabusInput.value);
  }
  if (dateBeginInput.value != props.classData.start) {
    formData.append(
      "startDate",
      yyyymmddDateString(new Date(dateBeginInput.value).toLocaleDateString())
    );
  }
  if (dateFinishInput.value != props.classData.end) {
    formData.append(
      "endDate",
      yyyymmddDateString(new Date(dateFinishInput.value).toLocaleDateString())
    );
  }
  if (limitedStudent.value != props.classData.limitedMember) {
    formData.append("limit", limitedStudent.value);
  }
  if (sessionInput.value != props.classData.session) {
    formData.append(
      "session",
      sessionInput.value || new Date(dateBeginInput.value).getFullYear()
    );
  }
  if (classTypeInput.value != props.classData.type) {
    formData.append("type", classTypeInput.value);
  }

  const response = await classService.updateClass(props.classData.id, formData);

  creating.value = false;

  if (!response.data.success) {
    emits("add-toast", {
      title: "Thất bại!",
      content: response.data.error,
      type: 1,
    });
    return;
  }

  emits("add-toast", {
    title: "Thành công!",
    content: response.data.message,
    type: 0,
  });

  emits("close");
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
  if (isEmpty(classSyllabusInput.value)) {
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
  if (isEmpty(sessionInput.value)) {
    invalid = true;
    messageOfSession.value = "Vui lòng nhập niên khóa";
  }

  if (isEmpty(classTypeInput.value)) {
    invalid = true;
    messageOfType.value = "Vui lòng nhập chọn loại lớp học";
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
        name: element.name,
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
        name: element.name,
        value: element.id,
      });
    }
  }
}

function fillValueInput(data) {
  avatarPath.value = data.avatar;
  classNameInput.value = data.name;
  dateBeginInput.value = new Date(data.start);
  dateFinishInput.value = new Date(data.end);
  limitedStudent.value = data.limitedMember;
  sessionInput.value = data.session;
  classLevelInput.value = data.level ? data.level.id : null;
  classSyllabusInput.value = data.syllabus ? data.syllabus.id : null;
  classTypeInput.value = data.type;
}

onMounted(async () => {
  await getLevels();
  await getSyllabus();
  if (props.classData) {
    fillValueInput(props.classData);
  }
});
</script>

<style scoped>
.invalid {
  border: 1px solid red;
}
.dp__theme_light {
  --dp-button-height: 35px;
  --dp-border-radius: 5px;
  --dp-input-padding: 12px 30px 11px 12px;
  --dp-border-color: #48484864;
  margin: 5px 0px;
}
</style>