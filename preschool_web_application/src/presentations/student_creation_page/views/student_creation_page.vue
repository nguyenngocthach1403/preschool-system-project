<template>
  <form @submit.prevent="submitCreateStudent">
    <div
      class="bg-white ml-4 mt-[20px] rounded-xl mr-2 text-center h-fit pb-[60px]"
    >
      <div id="head">Chi tiết học sinh</div>
      <div id="site" class="flex px-[30px] py-[30px]">
        <div class="add-avatar w-fit h-fit rounded-md">
          <img
            :src="studentAvatarPath"
            class="w-[150px] h-[150px] object-cover bg-[#D9D9D9] rounded-md"
          />
          <div class="button-side flex my-4 gap-2">
            <input
              type="file"
              class="w-[150px] file:w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#3B44D1] file:text-white hover:file:text-black hover:file:bg-violet-100"
              accept=".png, .jpeg, .jpg"
              @change="handleUploadStudentImg"
            />
            <button
              @click.prevent
              class="w-[150px] border h-[35px] rounded-md hover:bg-red-100"
            >
              Xóa ảnh
            </button>
          </div>
        </div>
        <div id="input-side" class="w-full pl-[100px] pr-[20px]">
          <div id="input-side-1" class="flex w-full gap-5 mx-[20px]">
            <label class="w-full text-start">
              <span class="pl-2 text-gray-500">Họ và tên</span
              ><span class="text-red-600"> * </span>
              <input
                v-model="studentNameInput"
                type="text"
                placeholder="Họ và tên"
                class="input-text-default"
              />
              <div class="valid">
                <p class="h-5 mb-4 text-red-300">
                  {{ messageOfStudentName }}
                </p>
              </div>
            </label>
            <label class="w-full text-start">
              <span class="pl-2 text-gray-500">Giới tính</span>
              <select v-model="studentGenderInput" class="input-text-default">
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
              </select>
              <div class="h-5 valid">
                <p class="mb-4 text-red-300">{{ invalidGender }}</p>
              </div>
            </label>
          </div>
          <div id="input-side-2" class="flex w-full gap-5 mx-[20px] mb-[20px]">
            <label class="w-full text-start">
              <span class="pl-2 text-gray-500">Ngày sinh</span>
              <VueDatePicker
                v-model="studentBirthDayInput"
                :enable-time-picker="false"
              />
              <div class="h-5 valid">
                <p class="mb-4 text-red-300">
                  {{ invalidBirday }}
                </p>
              </div>
            </label>
            <label class="w-full text-start">
              <span class="pl-2 text-gray-500">Nơi sinh</span>
              <input
                v-model="studentPlaceOfBirthInput"
                type="text"
                placeholder="TP HCM"
                class="input-text-default"
              />
              <!-- <div class="h-[20px] valid">
              <p v-if="messageOfStudentName" class="mb-4 text-red-300">
                {{ messageOfStudentName }}
              </p>
            </div> -->
            </label>
          </div>
          <div id="input-side-3" class="flex w-full gap-5 mx-[20px] mb-[30px]">
            <!-- <div class="w-full flex gap-5"> -->
            <label class="w-full text-start">
              <span class="pl-2 text-gray-500">Dân tộc</span>
              <select v-model="studentForkInput" class="input-text-default">
                <option v-for="item in forkList" :key="item" :value="item.name">
                  {{ item.name }}
                </option>
              </select>
            </label>
            <label class="w-full text-start">
              <span class="pl-2 text-gray-500">Quốc tịch</span>
              <input
                v-model="nationInput"
                type="text"
                placeholder="Viet Nam"
                class="input-text-default"
              />
            </label>
            <!-- </div> -->
            <!-- <label class="w-full text-start">
              <span class="pl-2 text-gray-500">Phụ huynh</span>
              <input
                v-model="parentIdInput"
                type="text"
                placeholder="Mã phụ huynh"
                class="input-text-default"
              />
            </label> -->
          </div>
          <div id="input-side-4" class="flex w-full gap-5 mx-[20px] mb-[20px]">
            <label class="w-full text-start">
              <span class="pl-2 text-gray-500">Địa chỉ</span>
              <input
                v-model="addressInput"
                type="text"
                placeholder="23 abc/3123, Tp.Hồ Chí Minh, Việt Nam"
                class="input-text-default"
              />
            </label>

            <label class="w-full text-start">
              <span class="pl-2 text-gray-500">Nguyên quân</span>
              <input
                v-model="placeOfOriginInput"
                type="text"
                placeholder="Việt Nam"
                class="input-text-default"
              />
            </label>
          </div>
        </div>
      </div>
      <div id="button-side" class="w-full flex text-start mx-[50px] gap-5">
        <!-- <button
          @click.prevent="saveDrafValueInput"
          class="h-[48px] border border-[#3B44D1] hover:bg-[#3B44D1] hover:text-white px-[25px] rounded-md text-[20px]"
        >
          Save to Draf
        </button> -->
        <button
          v-if="!loading"
          type="submit"
          class="h-[48px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
        >
          Tạo học sinh
        </button>
        <button
          v-if="loading"
          type="button"
          class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
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
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, watch } from "vue";

import avatar_default from "@/assets/icons/avatar.svg";
import { useStudentStore } from "../../../stores/student_store";
import { storeToRefs } from "pinia";
import SaveButton from "../../../components/save_button.vue";

import ListBox from "../../../components/select_comp.vue";
import classSercive from "../../../services/class.service";
import { yyyymmddDateString } from "../../../utils/resources/format_date";
//service
import studentService from "../../../services/student.service";

onBeforeMount(() => {
  getDrafValue();
  // console.log(studentForkInput);
});
onMounted(async () => {
  studentAvatarPath.value = avatar_default;
  // fetchClass();
});
const loading = ref(false);

const studentStore = useStudentStore();

const status = storeToRefs(studentStore).status;

const studentAvatarPath = ref(null);
const fileUpload = ref(null);

const studentNameInput = ref(null);
const classInput = ref(0);
const studentBirthDayInput = ref(null);
const studentPlaceOfBirthInput = ref("");
const studentGenderInput = ref(1);
const studentForkInput = ref(0);
const nationInput = ref("");
const parentIdInput = ref("");
const addressInput = ref("");
const placeOfOriginInput = ref("");
const messageOfStudentName = ref("");
const invalidBirday = ref("");
const invalidGender = ref("");
const forkList = ref([
  { name: "Select item", id: 0 },
  { name: "Kinh", id: 1 },
  { name: "Tày", id: 2 },
  { name: "Thái", id: 3 },
  { name: "Mường", id: 4 },
  { name: "H'Mông", id: 5 },
  { name: "Dao", id: 7 },
  { name: "Khơ Me", id: 8 },
  { name: "Nùng", id: 9 },
  { name: "H'rê", id: 10 },
  { name: "Gia Rai", id: 11 },
  { name: "Ê Đê", id: 12 },
  { name: "Ba Na", id: 13 },
  { name: "Xơ Đăng", id: 14 },
  { name: "Sán Chay", id: 15 },
  { name: "Cơ Tu", id: 16 },
  { name: "Chăm", id: 17 },
  { name: "Sán Dìu", id: 18 },
  { name: "Hà Nhì", id: 19 },
  { name: "Ra Glai", id: 20 },
  { name: "La Chí", id: 21 },
  { name: "M'Nông", id: 22 },
  { name: "Chứt", id: 23 },
  { name: "Xê Đăng", id: 24 },
  { name: "Bru-Vân Kiều", id: 25 },
  { name: "Giáy", id: 26 },
  { name: "Cơ Ho", id: 27 },
  { name: "Tà Ôi", id: 28 },
  { name: "Co", id: 29 },
  { name: "Ta Oi", id: 30 },
  { name: "Kháng", id: 31 },
  { name: "Co Lao", id: 32 },
  { name: "La Ha", id: 33 },
  { name: "Pu Péo", id: 34 },
  { name: "Lự", id: 35 },
  { name: "Ngái", id: 36 },
  { name: "Pa Thẻn", id: 37 },
  { name: "Lô Lô", id: 38 },
  { name: "Chơ Ro", id: 39 },
  { name: "Mảng", id: 40 },
  { name: "Cờ Lao", id: 41 },
  { name: "Bố Y", id: 42 },
  { name: "La Hu", id: 43 },
  { name: "Pà Thẻn", id: 44 },
  { name: "Lào", id: 45 },
  { name: "Mông", id: 46 },
  { name: "Pơng", id: 47 },
  { name: "Cống", id: 48 },
  { name: "Si La", id: 49 },
  { name: "Ơ Đu", id: 50 },
  { name: "Mảng", id: 51 },
  { name: "M'ngông", id: 52 },
  { name: "Thổ", id: 53 },
]);

const data = ref([]);

watch(studentNameInput, () => {
  if (studentNameInput.value !== "") {
    messageOfStudentName.value = null;
  }
});

watch(studentBirthDayInput, () => {
  if (
    studentBirthDayInput.value !== "" ||
    studentBirthDayInput.value !== null
  ) {
    invalidBirday.value = null;
  }
});

watch(studentGenderInput, () => {
  if (studentGenderInput.value == 1 || studentGenderInput.value == 0) {
    invalidGender.value = null;
  }
});

const emits = defineEmits(["add-toast"]);

function checkVadlidInput() {
  const invalid = ref(false);
  if (studentNameInput.value === null || studentNameInput.value == "") {
    messageOfStudentName.value = "Không được bỏ trống tên.";
    invalid.value = true;
  }
  if (
    studentBirthDayInput.value === null ||
    studentBirthDayInput.value === ""
  ) {
    invalidBirday.value = "Không được bỏ trống ngày sinh.";
    invalid.value = true;
  }

  if (!studentGenderInput.value === 1 || !studentGenderInput.value === 0) {
    invalidGender.value = "Vui lòng chọn giới tính.";
    invalid.value = true;
  }

  return invalid.value;
}

async function submitCreateStudent() {
  if (checkVadlidInput()) {
    return;
  }

  try {
    loading.value = true;
    const formData = new FormData();
    formData.append("files", fileUpload.value);
    formData.append("name", studentNameInput.value);
    formData.append("gender", studentGenderInput.value);
    formData.append("placeOfOrigin", placeOfOriginInput.value);
    formData.append("nation", nationInput.value);
    formData.append(
      "birthday",
      yyyymmddDateString(
        new Date(studentBirthDayInput.value).toLocaleDateString()
      )
    );
    formData.append("placeOfBirth", studentPlaceOfBirthInput.value);
    formData.append("fork", studentForkInput.value);
    formData.append("status", 1);

    const response = await studentService.createStudent(formData);

    console.log(response);

    if (!response.data.success) {
      emits("add-toast", {
        title: "Thất bại!",
        content: response.message,
        type: 1,
      });
      return;
    }
    emits("add-toast", {
      title: "Thành công",
      content: `Tạo bé ${studentNameInput.value} thành công.`,
      type: 0,
    });
    resetInput();
  } catch (error) {
    emits("add-toast", {
      title: "Thất bại",
      content: error,
      type: 1,
    });
  } finally {
    loading.value = false;
  }
}

function saveDrafValueInput() {
  const darfValue = {
    nameInput: studentNameInput.value,
    classInput: classInput.value,
    birthdayInput: studentBirthDayInput.value,
    placeOfBirth: studentPlaceOfBirthInput.value,
    genderInput: studentGenderInput.value,
    forkInput: studentForkInput.value,
    nationInput: nationInput.value,
    parentInput: parentIdInput.value,
    addressInput: addressInput.value,
    placeOfOriginInput: placeOfOriginInput.value,
  };

  localStorage.setItem("StudentDetail", JSON.stringify(darfValue));

  emits("add-toast", {
    title: "Save student on draf successdfuly!",
    type: 0,
  });
}

const classList = ref([]);
async function fetchClass() {
  classSercive.fetchClass(20, 0).then((value) => {
    value.data.data.forEach((element) => {
      classList.value.push({
        id: element.classID,
        name: element.className,
      });
    });
  });
}

function getDrafValue() {
  const studentInput = JSON.parse(localStorage.getItem("StudentDetail"));
  if (studentInput == undefined) return;
  studentNameInput.value = studentInput.nameInput;
  classInput.value = studentInput.classInput;
  studentBirthDayInput.value = studentInput.birthdayInput;
  studentPlaceOfBirthInput.value = studentInput.placeOfBirth;
  studentGenderInput.value = studentInput.genderInput;
  studentForkInput.value = studentInput.forkInput;
  nationInput.value = studentInput.nationInput;
  parentIdInput.value = studentInput.parentInput;
  addressInput.value = studentInput.addressInput;
  placeOfOriginInput.value = studentInput.placeOfOriginInput;
}

// Sử lý và ràn buộc lấy hình ảnh
const handleUploadStudentImg = (event) => {
  //Lấy hình
  fileUpload.value = event.target.files[0];

  //Kiểm tra tồn tại
  if (!fileUpload) return;

  //Kiểm tra size
  if (fileUpload.value.size / 1024 > 5120) {
    //Bỏ nếu quá dung lượng cho phếp
    fileUpload.value = null;
    return;
  }

  //Tạo đường dẫn của ảnh
  studentAvatarPath.value = URL.createObjectURL(fileUpload.value);
  console.log(URL.createObjectURL(fileUpload.value));
};

function resetInput() {
  studentAvatarPath.value = avatar_default;
  studentNameInput.value = "";
  classInput.value = null;
  studentBirthDayInput.value = "";
  studentPlaceOfBirthInput.value = "";
  studentGenderInput.value = "";
  studentForkInput.value = 0;
  nationInput.value = "";
  parentIdInput.value = "";
  addressInput.value = "";
  placeOfOriginInput.value = "";

  localStorage.removeItem("StudentDetail");
}
</script>

<style scoped>
#head {
  text-align: start;
  padding: 20px;
  font-size: large;
  font-weight: 600;
  border-bottom: solid 1px rgb(221, 221, 221);
}
.dp__theme_light {
  --dp-button-height: 35px;
  --dp-border-radius: 5px;
  --dp-input-padding: 11px 30px 10px 12px;
  --dp-border-color: #48484864;
  margin: 7px 0px;
}
</style>
