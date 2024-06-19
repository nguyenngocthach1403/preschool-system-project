<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-fit pb-[10px] pt-5">
    <form @submit.prevent="createData()">
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
                class="w-[150px] border h-[35px] rounded-md hover:bg-red-100"
              >
                Xóa ảnh
              </button>
            </div>
          </div>
          <div id="input-side" class="w-full pr-[20px]">
            <div id="input-side-1" class="flex w-full gap-5 mx-[20px]">
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Họ và tên</span
                ><span class="text-red-600"> * </span>
                <input
                  v-model="studentNameInput"
                  type="text"
                  placeholder="Họ và tên"
                  class="h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                />
                <div class="valid">
                  <p class="h-5 mb-4 text-red-300">
                    {{ messageOfStudentName }}
                  </p>
                </div>
              </label>
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Lớp</span>
                <ListBox
                  @click.prevent
                  @choose-item="classInput = $event.id"
                  class="h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
                  :option-list="classList"
                  :value-active="classInput"
                />
              </label>
            </div>
            <div
              id="input-side-2"
              class="flex w-full gap-5 mx-[20px] mb-[10px]"
            >
              <div class="w-full flex gap-5">
                <label class="w-full text-start">
                  <span class="pl-4 text-blue-700">Ngày sinh</span>
                  <input
                    v-model="studentBirthDayInput"
                    type="date"
                    class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                  />
                  <div class="h-5 valid">
                    <p class="mb-4 text-red-300">
                      {{ invalidBirday }}
                    </p>
                  </div>
                </label>
                <label class="w-[200px] text-start">
                  <span class="pl-4 text-blue-700">Nơi sinh</span>
                  <input
                    v-model="studentPlaceOfBirthInput"
                    type="text"
                    placeholder="TP HCM"
                    class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                  />
                  <!-- <div class="h-[20px] valid">
              <p v-if="messageOfStudentName" class="mb-4 text-red-300">
                {{ messageOfStudentName }}
              </p>
            </div> -->
                </label>
              </div>
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Giới tính</span>
                <ListBox
                  @choose-item="studentGenderInput = $event.id"
                  :option-list="genderList"
                  :value-active="studentGenderInput"
                  @click.prevent
                  class="h-[45px] rounded-md my-[5px] w-full outline-none focus:border-blue-500"
                />
                <div class="h-5 valid">
                  <p class="mb-4 text-red-300">{{ invalidGender }}</p>
                </div>
              </label>
            </div>
            <div
              id="input-side-3"
              class="flex w-full gap-5 mx-[20px] mb-[20px]"
            >
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Dân tộc</span>
                <ListBox
                  @click.prevent
                  @choose-item="studentForkInput = $event.name"
                  class="h-[45px] rounded-md my-[5px] w-full outline-none focus:border-blue-500"
                  :option-list="forkList"
                  :value-active="studentForkInput"
                />
              </label>
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Quốc tịch</span>
                <input
                  v-model="nationInput"
                  type="text"
                  placeholder="Viet Nam"
                  class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                />
              </label>
            </div>
            <div
              id="input-side-4"
              class="flex w-full gap-5 mx-[20px] mb-[20px]"
            >
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Địa chỉ</span>
                <input
                  v-model="addressInput"
                  type="text"
                  placeholder="23 abc/3123, Tp.Hồ Chí Minh, Việt Nam"
                  class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                />
              </label>

              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Nguyên quân</span>
                <input
                  v-model="placeOfOriginInput"
                  type="text"
                  placeholder="Việt Nam"
                  class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                />
              </label>
            </div>
          </div>
        </div>
        <div
          class="bg-white ml-4 mt-[20px] rounded-xl mr-2 text-center h-fit pb-[60px]"
        >
          <div id="head">Tạo phụ huynh</div>
          <div id="site" class="flex px-[30px] py-[30px]">
            <div class="add-avatar w-fit h-fit rounded-md">
              <img
                :src="parentAvatarPath"
                class="w-[150px] h-[150px] object-cover bg-[#D9D9D9] rounded-md"
              />
              <div class="button-side flex my-4 gap-2">
                <input
                  type="file"
                  class="w-[150px] file:w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#3B44D1] file:text-white hover:file:text-black hover:file:bg-violet-100"
                  accept=".png, .jpeg, .jpg"
                  @change="handleUploadParentImg"
                />
                <button
                  class="w-[150px] border h-[35px] rounded-md hover:bg-red-100"
                >
                  Xóa ảnh
                </button>
              </div>
            </div>
            <div id="input-side" class="w-full pr-[20px]">
              <div id="input-side-1" class="flex w-full gap-5 mx-[20px]">
                <label class="w-full text-start">
                  <span class="pl-4 text-blue-700">Họ và tên</span
                  ><span class="text-red-600"> * </span>
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    class="input-text-default"
                    v-model="name_parent"
                    :class="{ 'in-valid': messageOfParentName }"
                  />
                  <div class="mt-1 mb-2 h-[25px] text-red-500">
                    <span>{{ messageOfParentName }}</span>
                  </div>
                </label>
                <label class="w-full text-start">
                  <span class="pl-4 text-blue-700">Giới tính</span>
                  <select
                    id="gender"
                    v-model="gender_parent"
                    class="input-text-default"
                  >
                    <option value="0">Nam</option>
                    <option value="1">Nữ</option>
                    <option value="2">Khác</option>
                  </select>
                </label>
              </div>
              <div
                id="input-side-2"
                class="flex w-full gap-5 mx-[20px] mb-[25px]"
              >
                <label class="w-full text-start">
                  <span class="pl-4 text-blue-700">Ngày sinh</span>
                  <input
                    v-model="birthday"
                    type="date"
                    class="input-text-default"
                  />
                </label>
                <label class="w-full text-start">
                  <span class="pl-4 text-blue-700">Nghề nghiệp</span>
                  <input
                    type="text"
                    placeholder="Nghề nghiệp"
                    class="h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                    v-model="job"
                  />
                </label>
              </div>
              <div id="input-side-3" class="flex w-full gap-5 mx-[20px]">
                <label class="w-full text-start">
                  <span class="pl-4 text-blue-700">Số điện thoại</span>
                  <input
                    type="text"
                    placeholder="0xxxxxxxx"
                    class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                    v-model="phone_parent"
                    :class="{ 'in-valid': messageOfParentPhone }"
                  />
                  <div class="mt-1 mb-2 h-[25px] text-red-500">
                    <span>{{ messageOfParentPhone }}</span>
                  </div>
                </label>
                <label class="w-full text-start">
                  <span class="pl-4 text-blue-700">Email</span>
                  <input
                    type="text"
                    placeholder="abc@abc.com"
                    class="input-text-default"
                    v-model="email_parent"
                    :class="{ 'in-valid': messageOfParentEmail }"
                  />
                  <div class="mt-1 mb-2 h-[25px] text-red-500">
                    <span>{{ messageOfParentEmail }}</span>
                  </div>
                </label>
              </div>
              <div id="input-side-4" class="flex w-full gap-5 mx-[20px]">
                <label class="w-full text-start">
                  <span class="pl-4 text-blue-700">Địa chỉ</span>
                  <input
                    v-model="address"
                    type="text"
                    placeholder="23 abc/3123, Tp.Hồ Chí Minh, Việt Nam"
                    class="input-text-default"
                  />
                </label>
                <label class="w-full text-start">
                  <span class="pl-4 text-blue-700">Vai trò</span>
                  <select
                    id="role"
                    v-model="role"
                    class="input-text-default"
                    :class="{ 'in-valid': messageOfParentRole }"
                  >
                    <option value="null">Chọn mối quan hệ</option>
                    <option value="0">Bố</option>
                    <option value="1">Mẹ</option>
                    <option value="2">Người giám hộ</option>
                  </select>
                  <div class="mt-1 mb-2 h-[25px] text-red-500">
                    <span>{{ messageOfParentRole }}</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div id="button-side" class="w-full flex text-start mx-[50px] gap-5">
          <button
            @click.prevent="saveDrafValueInput"
            class="h-[48px] border border-[#3B44D1] hover:bg-[#3B44D1] hover:text-white px-[25px] rounded-md text-[20px]"
          >
            Save to Draf
          </button>
          <button
            v-if="true"
            type="submit"
            class="h-[48px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
          >
            Save
          </button>
          <button
            v-if="false"
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
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, watch } from "vue";
import avatar_default from "@/assets/icons/avatar.svg";
import SaveButton from "../../../components/save_button.vue";

import ListBox from "../../../components/select_comp.vue";
import classSercive from "../../../services/class.service";

import parentService from "../../../services/parent.service";
import studentService from "../../../services/student.service";
import relationshipService from "../../../services/relationship.service";
import {
  isEmpty,
  isEmailValid,
  isPhoneValid,
} from "../../../utils/resources/check_valid";
import { useRouter } from "vue-router";

const router = useRouter();

onBeforeMount(() => {
  if (router.currentRoute.value.query.register_id == null) {
    router.back();
  }
  getDrafValue();
  // console.log(studentForkInput);
});
onMounted(async () => {
  studentAvatarPath.value = avatar_default;
  fetchClass();
});

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

const name_parent = ref("");
const gender_parent = ref("");
const birthday = ref("");
const address = ref("");
const job = ref("");
const email_parent = ref("");
const phone_parent = ref("");
const role = ref("");
const creating = ref(false);
const fileParentUpload = ref(null);
const parentAvatarPath = ref(null);

const messageOfParentName = ref("");
const messageOfParentPhone = ref("");
const messageOfParentEmail = ref("");
const messageOfParentRole = ref("");

const genderList = ref([
  { id: 0, name: "Nam" },
  { id: 1, name: "Nữ" },
]);
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
  let invalid = false;
  if (studentNameInput.value === null || studentNameInput.value == "") {
    messageOfStudentName.value = "Không được bỏ trống tên.";
    invalid = true;
  }
  if (
    studentBirthDayInput.value === null ||
    studentBirthDayInput.value === ""
  ) {
    invalidBirday.value = "Không được bỏ trống ngày sinh.";
    invalid = true;
  }

  if (!studentGenderInput.value === 1 || !studentGenderInput.value === 0) {
    invalidGender.value = "Vui lòng chọn giới tính.";
    invalid = true;
  }
  if (isEmpty(phone_parent.value)) {
    invalid = true;
    messageOfParentPhone.value = "Vui lòng nhập số điện thoại phụ huynh.";
  }

  if (!isEmpty(phone_parent.value) && !isPhoneValid(phone_parent.value)) {
    invalid = true;
    messageOfParentPhone.value =
      "Số điện thoại phụ huynh không đúng định dạng.";
  }

  if (!isEmpty(email_parent.value) && !isEmailValid(email_parent.value)) {
    invalid = true;
    messageOfParentEmail.value = "Email phụ huynh sai định dạng.";
  }

  if (isEmpty(name_parent.value)) {
    invalid = true;
    messageOfParentName.value = "Không được đển trống tên phụ huynh.";
  }

  if (isEmpty(role.value)) {
    invalid = true;
    messageOfParentRole.value = "Vui lòng chọn vai trò của phụ huynh.";
  }

  return invalid;
}

async function submitCreateStudent(parentId) {
  const formData = new FormData();
  formData.append("files", fileUpload.value);
  formData.append("name", studentNameInput.value);
  formData.append("gender", studentGenderInput.value);
  formData.append("placeOfOrigin", placeOfOriginInput.value);
  formData.append("nation", nationInput.value);
  formData.append("birthday", studentBirthDayInput.value);
  formData.append("placeOfBirth", studentPlaceOfBirthInput.value);
  formData.append("fork", studentForkInput.value);
  formData.append("status", classInput.value != undefined ? 1 : 0);
  formData.append("register_id", router.currentRoute.value.query.register_id);
  if (!isEmpty(parentId)) {
    formData.append("parentId", parentId);
  }
  if (classInput.value !== 0) {
    formData.append("classId", classInput.value);
  }

  const response = await studentService.createStudent(formData);

  console.log("create student", response);

  if (response.status !== 200) {
    emits("add-toast", {
      title: "Tạo học sinh thất bại",
      content: response.data.error,
      type: 1,
    });
    return;
  }

  emits("add-toast", {
    title: "Create Successful!",
    content: `Tạo bé ${studentNameInput.value} thành công.`,
    type: 0,
  });
  resetInput();

  return response.data.data || false;
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

watch(name_parent, () => {
  if (!isEmpty(name_parent.value)) {
    messageOfParentName.value = "";
  }
});

watch(phone_parent, () => {
  if (!isEmpty(phone_parent.value) && isPhoneValid(phone_parent.value)) {
    messageOfParentPhone.value = "";
  }
});

watch(email_parent, () => {
  if (!isEmpty(email_parent.value) && isEmailValid(email_parent.value)) {
    messageOfParentEmail.value = "";
  }
});

watch(role, () => {
  if (!isEmpty(role.value)) {
    messageOfParentRole.value = "";
  }
});

async function createParent() {
  const formData = new FormData();
  if (fileParentUpload.value !== null) {
    formData.append("files", fileParentUpload.value);
  }
  formData.append("name", name_parent.value);
  formData.append("gender", gender_parent.value);
  if (!isEmpty(birthday.value)) formData.append("birthday", birthday.value);
  if (!isEmpty(address.value)) formData.append("address", address.value);
  if (!isEmpty(job.value)) formData.append("job", job.value);
  if (!isEmpty(email_parent.value))
    formData.append("email", email_parent.value);
  formData.append("phone", phone_parent.value);
  formData.append("role", role.value);

  const response = await parentService.createParent(formData);

  console.log("create parent", response);

  if (response.status !== 500 && response.status != 200) {
    emits("add-toast", {
      title: "Thất bại.",
      content: response.data.error,
      type: 1,
    });
    return;
  }

  if (response.status === 500) {
    emits("add-toast", {
      title: "Tạo thất bại",
      content: response.data.error,
      type: 3,
    });
    return;
  }
  if (!response.data.success) {
    emits("add-toast", {
      title: "Tạo thất bại",
      content: response.data.message,
      type: 2,
    });
    return;
  }

  emits("add-toast", {
    title: "Tạo thành công",
    content: `Tạo phụ huynh ${name_parent.value} thành công.`,
    type: 0,
  });

  return response.data.data || false;
}
// Sử lý và ràn buộc lấy hình ảnh
const handleUploadParentImg = (event) => {
  //Lấy hình
  fileParentUpload.value = event.target.files[0];

  //Kiểm tra tồn tại
  if (!fileParentUpload) return;

  //Kiểm tra size
  if (fileParentUpload.value.size / 1024 > 5120) {
    //Bỏ nếu quá dung lượng cho phếp
    fileParentUpload.value = null;
    return;
  }

  //Tạo đường dẫn của ảnh
  parentAvatarPath.value = URL.createObjectURL(fileParentUpload.value);
  console.log(URL.createObjectURL(fileParentUpload.value));
};

async function createData() {
  if (checkVadlidInput()) {
    return;
  }
  creating.value = true;
  const parentCreated = await createParent();
  const studentCreated = await submitCreateStudent(parentCreated.id);
  creating.value = false;
}
</script>

<style scoped>
#head {
  border: 1px solid rgba(128, 128, 128, 0.28);
  width: 200px;
  margin: 10px 5px;
  padding: 10px 5px;
  border-radius: 10px;
}
</style>