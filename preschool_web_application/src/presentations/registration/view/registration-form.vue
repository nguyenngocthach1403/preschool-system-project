<template>
  <div class="bg-white w-full overflow-x-hidden xl:h-full relative">
    <Popup v-if="registerSuccess" @close="$router.push({ name: 'LoginView' })">
      <template #content>
        <div class="flex justify-center gap-5">
          <div>
            <img
              :src="success_icon"
              alt=""
              @mouseenter="success_icon = checkmark_gif"
              @mouseout="success_icon = checkmark_icon"
              class="w-[100px]"
            />
          </div>
          <div>
            <div class="text-[24px] h-[100px] content-center">Thành công!</div>
            <span>Bạn đã đăng ký thành công</span>
          </div>
        </div>
      </template>
    </Popup>
    <div v-if="addmisstionPeriod && !registerSuccess" class="w-full">
      <Toast class="fixed top-5 right-10 z-30" :toast-list="toasts" />
      <div class="xl:m-auto mx-5 xl:w-[1000px] xl:py-10 py-10">
        <div class="name-school w-full text-center text-4xl font-bold">
          Preschool
        </div>
        <div class="title w-full text-center text-3xl font-bold">
          Đăng ký nhập học {{ addmisstionPeriod.name }}
        </div>
        <div class="timeline w-full text-center text-[15px]">
          Thời gian
          {{ new Date(addmisstionPeriod.start_date).toLocaleDateString() }} -
          {{ new Date(addmisstionPeriod.end_date).toLocaleDateString() }}
        </div>
        <div class="w-full py-2 mt-5 bg-violet-600 text-white px-3">
          Thông tin người đăng ký
        </div>
        <section class="md:flex gap-5 my-3">
          <div class="w-full mt-3">
            <label>
              <span class="pl-5">Tên người đăng ký</span>
              <span class="text-red-500"> * </span>
              <input
                type="text"
                v-model="name"
                placeholder="Nhập họ tên người đăng ký"
                class="input-text-default"
                :class="{ valid: messageOfName }"
              />
            </label>
            <div class="px-3">
              <p class="text-red-600 mt-1">{{ messageOfName }}</p>
            </div>
          </div>
          <div class="w-full my-3">
            <label>
              <span class="pl-5">Vai trò của người đăng ký</span>
              <span class="text-red-500"> * </span>
              <select
                v-model="relationship"
                class="mb-0 h-[45px] px-2 rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
              >
                <option value="0">Bố</option>
                <option value="1">Mẹ</option>
                <option value="2">Người giám hộ</option>
              </select>
            </label>
          </div>
        </section>
        <section class="md:flex gap-5">
          <div class="w-full my-3">
            <label>
              <span class="pl-5">Số điện thoại</span>
              <span class="text-red-500"> * </span>
              <input
                type="tel"
                v-model="phone"
                placeholder="0123456789"
                class="input-text-default"
                :class="{ valid: messageOfPhone }"
              />
            </label>
            <div class="px-3">
              <p class="text-red-600 mt-1">{{ messageOfPhone }}</p>
            </div>
          </div>
          <div class="w-full my-3">
            <label>
              <span class="pl-5">Email</span>
              <span class="italic"> (Nếu có)</span>
              <input
                type="email"
                v-model="email"
                placeholder="example@gmail.com"
                class="input-text-default"
                :class="{ valid: messageOfEmail }"
              />
            </label>
            <div class="px-3">
              <p class="text-red-600 mt-1">{{ messageOfEmail }}</p>
            </div>
          </div>
        </section>
        <div class="w-full py-2 mt-5 bg-violet-600 text-white px-3">
          Thông tin học sinh
        </div>
        <section class="md:flex gap-5">
          <div class="w-full mt-3">
            <label>
              <span class="pl-5">Tên học sinh</span>
              <span class="text-red-500"> * </span>
              <input
                v-model="studentName"
                type="text"
                placeholder="Nhập họ tên học sinh"
                class="input-text-default"
                :class="{ valid: messageOfStudentName }"
              />
            </label>
            <div class="px-3">
              <p class="text-red-600 mt-1">{{ messageOfStudentName }}</p>
            </div>
          </div>
          <div class="w-full my-3">
            <label>
              <span class="pl-5">Ngày sinh</span>
              <span class="text-red-500"> * </span>
              <VueDatePicker
                v-model="studentBirthday"
                :enable-time-picker="false"
                :class="{ valid: messageOfstudentBirthDay }"
                class="rounded-md"
              />
            </label>
            <div class="px-3">
              <p class="text-red-600 mt-1">{{ messageOfstudentBirthDay }}</p>
            </div>
          </div>
        </section>
        <section class="md:flex gap-5">
          <div class="w-full mt-3">
            <label>
              <span class="pl-5">Dân tộc</span>
              <select class="input-text-default" v-model="studentFork">
                <option v-for="item in forkList" :key="item" :value="item.name">
                  {{ item.name }}
                </option>
              </select>
            </label>
          </div>
          <div class="w-full my-3">
            <label>
              <span class="pl-5">Giới tính</span>
              <span class="text-red-500"> * </span>
              <select class="input-text-default" v-model="studentGender">
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
              </select>
            </label>
          </div>
        </section>
        <section class="md:flex gap-5">
          <div class="w-full mt-3">
            <label>
              <span class="pl-5">Nơi sinh</span>
              <select class="input-text-default" v-model="studentBirthOfOrigin">
                <option v-for="item in cities" :key="item" :value="item.Name">
                  {{ item.Name }}
                </option>
              </select>
            </label>
          </div>
          <div class="w-full my-3">
            <label>
              <span class="pl-5">Quốc tịch</span>
              <input
                type="text"
                class="input-text-default"
                placeholder="Nhập quốc tịch"
                v-model="studentNation"
              />
            </label>
          </div>
        </section>
        <div class="w-full py-2 mt-5 bg-violet-600 text-white px-3">
          Nhu cầu học
        </div>
        <section class="md:flex gap-5">
          <div class="w-full my-3">
            <label>
              <span class="pl-5">Cấp độ</span>
              <span class="text-red-500"> * </span>
              <select
                v-model="levels"
                class="mb-0 h-[45px] px-2 rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
              >
                <option
                  v-for="item in levelList"
                  :key="item"
                  :value="item.value"
                >
                  {{ item.name }}
                </option>
              </select>
            </label>
          </div>
          <div class="w-full my-3">
            <label>
              <span class="pl-5">Chương trình</span>
              <span class="text-red-500"> * </span>
              <select
                v-model="syllabus"
                class="mb-0 h-[45px] px-2 rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
              >
                <option
                  v-for="item in syllabusList"
                  :key="item"
                  :value="item.value"
                >
                  {{ item.name }}
                </option>
              </select>
            </label>
          </div>
        </section>
        <div class="w-full py-2 mt-5 bg-violet-600 text-white px-3">
          Địa chỉ thường trú
        </div>
        <section class="">
          <div class="md:flex w-full gap-5">
            <div class="w-full my-3">
              <label>
                <span class="pl-5">Thành phố/Tỉnh</span>
                <span class="text-red-500"> * </span>
                <select
                  v-model="city"
                  class="mb-0 h-[45px] px-2 rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
                  :class="{ valid: messageOfAddress }"
                >
                  <option v-for="item in cities" :key="item" :value="item.Name">
                    {{ item.Name }}
                  </option>
                </select>
              </label>
            </div>
            <div class="w-full my-3">
              <label>
                <span class="pl-5">Quận/Huyện</span>
                <span class="text-red-500"> * </span>
                <select
                  v-model="district"
                  class="mb-0 h-[45px] px-2 rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
                  :class="{ valid: messageOfAddress }"
                >
                  <option
                    v-for="item in districts"
                    :key="item"
                    :value="item.Name"
                  >
                    {{ item.Name }}
                  </option>
                </select>
              </label>
            </div>
            <div class="w-full my-3">
              <label>
                <span class="pl-5">Phường/Xã/Thị xã</span>
                <span class="text-red-500"> * </span>
                <select
                  v-model="town"
                  class="mb-0 h-[45px] px-2 rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
                  :class="{ valid: messageOfAddress }"
                >
                  <option v-for="item in towns" :key="item" :value="item.Name">
                    {{ item.Name }}
                  </option>
                </select>
              </label>
            </div>
          </div>
          <div class="px-3">
            <p class="text-red-600">{{ messageOfAddress }}</p>
          </div>
        </section>
        <section class="md:flex gap-5">
          <div class="w-full my-3">
            <label>
              <span class="pl-5">Địa chỉ chi tiết</span>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                type="text"
                v-model="address"
                placeholder="Mô tả chi tiết địa chỉ"
                class="input-text-default h-[200px] py-3"
              ></textarea>
            </label>
          </div>
        </section>
        <section class="w-full">
          <div class="w-full my-3">
            <label>
              <span class="pl-5">Hình ảnh đơn đăng ký</span>
              <div
                class="relative w-full content-center text-center gap-10 h-[300px] rounded-md border border-gray-400 border-dotted object-contain"
              >
                <img v-if="fileUpload" :src="imageUpload" class="h-full" />
                <input
                  type="file"
                  class="absolute top-0 w-full h-full opacity-0"
                  @change="handleUploadFile($event)"
                />
                <div v-if="!fileUpload">
                  <img :src="image_default" class="w-10 m-auto my-5" />
                  <span class="text-blue-700">Click</span>
                  <span> để thêm ảnh</span>
                </div>
              </div>
            </label>
          </div>
          <div>Tải mẫu đơn đăng ký:</div>
        </section>
        <div id="button-side" class="w-full text-center my-5">
          <button
            v-if="!loading"
            type="submit"
            @click="submit()"
            class="h-[48px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
          >
            Gửi đăng ký
          </button>
          <transition
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <button
              v-if="loading"
              class="h-[48px] border border-[#3B44D1] bg-[#3B44D1] m-auto hover:bg-blue-900 text-white px-[25px] rounded-md text-[15px] flex items-center relative"
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
          </transition>
        </div>
      </div>
    </div>
    <div
      class="h-screen content-center text-center text-2xl"
      v-if="!addmisstionPeriod"
    >
      Không có kỳ tuyển sinh nào đăng diễn ra. <br />
      Vui lòng chờ thông tin mới nhất
      <a href="" class="text-blue-700 hover:underline">Tại đây</a>
    </div>
  </div>
</template>
<script setup>
import Toast from "../../../components/toast_list.vue";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import RegistrationService from "../../../services/registration.service";
import image_default from "../../../assets/img/image-default.png";
import levelService from "../../../services/levels.service";
import syllabusService from "../../../services/syllabus.service";
import studentService from "../../../services/student.service";
import checkmark_icon from "../../../assets/icons/checkmark.svg";
import checkmark_gif from "../../../assets/icons/checkmark.gif";
const success_icon = ref(checkmark_icon);
import Popup from "../../../components/edit_and_create_layout.vue";
import {
  isEmpty,
  isEmailValid,
  isPhoneValid,
} from "../../../utils/resources/check_valid";
import axios from "axios";
import { useRouter } from "vue-router";
import addmissionPeriodService from "../../../services/admission_period.service";
import { yyyymmddDateString } from "../../../utils/resources/format_date";
import registrationService from "../../../services/registration.service";

const router = useRouter();
const addmisstionPeriod = ref(null);

const toasts = ref([]);

const levelList = ref([]);
const syllabusList = ref([]);
const cities = ref([]);
const districts = ref([]);
const towns = ref([]);

const name = ref("");
const email = ref("");
const phone = ref("");
const address = ref("");
const city = ref("");
const district = ref("");
const town = ref("");
const levels = ref(0);
const syllabus = ref(0);
const relationship = ref(0);
const uploadedFiles = ref([]);
const emits = defineEmits(["add-toast"]);

const messageOfName = ref();
const messageOfPhone = ref();
const messageOfEmail = ref();
const messageOfAddress = ref();
const messageOfStudentName = ref();
const messageOfstudentBirthDay = ref();

const fileUpload = ref(null);
const imageUpload = ref(null);

//Model For Student
const studentName = ref("");
const studentBirthday = ref(new Date());
const studentFork = ref("");
const studentGender = ref("");
const studentBirthOfOrigin = ref("");
const studentNation = ref("");

const registerSuccess = ref(false);

const loading = ref(false);

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

onBeforeMount(() => {
  getAddmissionPeriod();
});

onMounted(() => {
  getLevel();
  getSyllabus();
  getAddress();
});

async function getAddmissionPeriod() {
  const response = await addmissionPeriodService.getAddmissionPeriodOpenning();

  console.log(response);

  if (response.status !== 200) {
    emits("add-toast", {
      title: "Tải trang thất bại.",
      type: 1,
    });
    return;
  }

  if (response.data.success) {
    addmisstionPeriod.value = response.data.data;
  }
}

watch(city, () => {
  districts.value = [];
  towns.value = [];

  if (city.value != undefined) {
    districts.value = cities.value.find((e) =>
      e.Name.match(city.value)
    ).Districts;
  }
});
watch(district, () => {
  if (district.value != undefined) {
    towns.value = districts.value.find((e) =>
      e.Name.match(district.value)
    ).Wards;
  }
});

watch(name, () => {
  if (!isEmpty(name.value)) {
    messageOfName.value = "";
  }
});

watch(city, () => {
  if (!isEmpty(city.value)) {
    messageOfAddress.value = "";
  }
});

watch(phone, () => {
  if (!isEmpty(phone.value) && isPhoneValid(phone.value)) {
    messageOfPhone.value = "";
  }
});

watch(email, () => {
  if (isEmailValid(email.value) || isEmpty(email.value)) {
    messageOfEmail.value = "";
  }
});

function checkValid() {
  let valid = false;
  if (isEmpty(name.value)) {
    valid = true;
    messageOfName.value = "Họ tên không được để trống";
  }

  if (isEmpty(phone.value)) {
    valid = true;
    messageOfPhone.value = "Số điện thoại không được phép để trống.";
  }

  if (!isPhoneValid(phone.value) && !isEmpty(phone.value)) {
    valid = true;
    messageOfPhone.value = "Số điện thoại phải có 10 số.";
  }

  if (!isEmailValid(email.value) && !isEmpty(email.value)) {
    valid = true;
    messageOfEmail.value = "Email không hợp lệ.";
  }

  if (isEmpty(city.value) || isEmpty(district.value) || isEmpty(town.value)) {
    valid = true;
    messageOfAddress.value = "Vui lòng nhập địa chỉ thường trú";
  }

  if (isEmpty(studentName.value)) {
    valid = true;
    messageOfStudentName.value = "Vui lòng nhập họ và tên của học sinh.";
  }
  if (isEmpty(studentBirthday.value)) {
    valid = true;
    messageOfstudentBirthDay.value = "Vui lòng chọn ngày sinh của học sinh.";
  }
  return valid;
}

async function createStudent(register_id) {
  const formData = new FormData();
  formData.append("name", studentName.value);
  formData.append(
    "birthday",
    yyyymmddDateString(new Date(studentBirthday.value).toLocaleDateString())
  );
  formData.append("fork", studentFork.value);
  if (!isEmpty(studentGender.value))
    formData.append("gender", studentGender.value);
  formData.append("birthOfOrigin", studentBirthOfOrigin.value);
  formData.append("nation", studentNation.value);
  formData.append("status", 0);
  formData.append("register_id", register_id);

  const response = await studentService.createStudent(formData);
  console.log("student", response);

  if (response.status != 200) {
    toasts.value.push({
      title: "Đăng ký thất bại.",
      type: 1,
    });
    return false;
  }

  if (!response.data.success) {
    toasts.value.push({
      title: "Đăng ký thất bại.",
      type: 1,
    });
    return false;
  }

  return true;
}

async function createRegister() {
  try {
    const formData = new FormData();
    if (fileUpload.value) {
      formData.append("files", fileUpload.value);
    }
    formData.append("admission_period_id", addmisstionPeriod.value.id);
    formData.append("name", name.value);
    if (!isEmpty(email.value)) formData.append("email", email.value);
    formData.append("phone", phone.value);
    if (!isEmpty(address.value)) formData.append("address", address.value);
    formData.append("city", city.value);
    formData.append("district", district.value);
    formData.append("town", town.value);
    if (!isEmpty(levels.value)) formData.append("levels", levels.value);
    if (!isEmpty(syllabus.value)) formData.append("syllabus", syllabus.value);
    formData.append("relationship", relationship.value);
    formData.append("informationState", 0);
    formData.append("status", 0);

    const response = await RegistrationService.createRegister(formData);

    console.log(response);

    if (response.status != 200) {
      toasts.value.push({
        title: "Đăng ký thất bại.",
        type: 1,
      });
      return false;
    }

    if (response.data.isExist) {
      toasts.value.push({
        title: "Đơn đã tồn tại.",
        content: "Số điện thoại đã được đăng ký.",
        type: 1,
      });
      return false;
    }

    if (!response.data.success) {
      toasts.value.push({
        title: "Đăng ký thất bại.",
        type: 1,
      });
      return false;
    }

    return response.data.data;
  } catch (e) {
    toasts.value.push({
      title: "Đăng ký không thành công.",
      content: "Quá trình đăng ký bị lỗi. Thử lại sau.",
      type: 1,
    });
    console.error(e);
    return false;
  }
}

async function getLevel() {
  const response = await levelService.getLevels();
  for (let index = 0; index < response.data.data.length; index++) {
    const element = response.data.data[index];
    levelList.value.push({
      value: element.id,
      name: element.name,
    });
  }
}

async function getSyllabus() {
  const response = await syllabusService.getSyllabus();
  for (let index = 0; index < response.data.data.length; index++) {
    const element = response.data.data[index];
    syllabusList.value.push({
      value: element.id,
      name: element.name,
    });
  }
}

async function getAddress() {
  axios
    .get(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    )
    .then((response) => {
      cities.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

async function submit() {
  if (checkValid()) return;

  loading.value = true;
  //Tạo đơn đăng ký
  const register = await createRegister();

  //Thất bại hủy
  if (!register) return;

  console.log(register.id);

  //Tạo học sinh
  const student = await createStudent(register.id);

  if (!student) {
    loading.value = false;
    return;
  }

  emits("add-toast", {
    title: "Đăng ký thành công.",
    content: `Đã đăng ký với số điện thoại ${register.phone}`,
  });
  loading.value = false;
  setTimeout(() => {
    registerSuccess.value = true;
  }, 500);
}

async function linkStudentWithRegister(register_id, student_id) {
  const formDataToUpDateRegister = new FormData();
  formDataToUpDateRegister.append("student_id", student_id);
  const response = await registrationService.updateRegister(
    register_id,
    formDataToUpDateRegister
  );
  console.log(response);

  if (response.status != 200) {
    toasts.value.push({
      title: "Đăng ký thất bại.",
      type: 1,
    });
    return false;
  }

  if (!response.data.success) {
    toasts.value.push({
      title: "Đăng ký thất bại.",
      type: 1,
    });
    return false;
  }

  return true;
}

function handleUploadFile(event) {
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
  imageUpload.value = URL.createObjectURL(fileUpload.value);
}
</script>
<style scoped>
.valid {
  border: solid red 1px;
}
.dp__theme_light {
  --dp-button-height: 35px;
  --dp-border-radius: 5px;
  --dp-input-padding: 12px 30px 11px 12px;
  width: 100%;
  margin: 5px 0px;
}
</style>
