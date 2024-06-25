<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-fit pb-[10px]">
    <div
      class="text-left px-6 text-[36px] py-4 mb-5 font-bold border border-b-1"
    >
      Tạo đơn đăng ký
    </div>

    <div
      class="bg-white ml-4 mt-[20px] px-20 rounded-xl mr-2 text-center h-fit pb-[60px]"
    >
      <div id="site" class="flex px-[30px] py-[30px]">
        <div id="input-side" class="w-full pr-[20px]">
          <div id="input-side-1" class="flex w-full gap-5 mx-[20px] mt-2">
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Họ và tên người đăng ký</span
              ><span class="text-red-600"> * </span>
              <input
                v-model="name"
                type="text"
                placeholder="Họ và tên"
                class="input-text-default"
                :class="{ valid: messageOfName }"
              />
              <div class="px-3">
                <p class="text-red-600 mt-1">{{ messageOfName }}</p>
              </div>
            </label>
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Vai trò của người đăng ký</span
              ><span class="text-red-600"> * </span>
              <select
                id="relationship"
                v-model="relationship"
                class="input-text-default"
              >
                <option value="0">Bố</option>
                <option value="1">Mẹ</option>
                <option value="2">Người giám hộ</option>
              </select>
            </label>
          </div>
          <div class="flex w-full gap-5 mx-[20px] mb-[20px] mt-2">
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Số điện thoại</span
              ><span class="text-red-600"> * </span>
              <input
                v-model="phone"
                type="text"
                placeholder="0xxxxxxxxx"
                class="input-text-default"
                :class="{ valid: messageOfPhone }"
              />
              <div class="px-3">
                <p class="text-red-600 mt-1">{{ messageOfPhone }}</p>
              </div>
            </label>
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Email</span
              ><span class="text-red-600"> * </span>
              <input
                v-model="email"
                type="email"
                placeholder="abc@abc.com"
                class="input-text-default"
                :class="{ valid: messageOfEmail }"
              />
              <div class="px-3">
                <p class="text-red-600 mt-1">{{ messageOfEmail }}</p>
              </div>
            </label>
          </div>
          <div class="flex w-full gap-5 mx-[20px] mb-[20px] mt-2">
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Cấp bậc</span
              ><span class="text-red-600"> * </span>
              <select id="levels" v-model="levels" class="input-text-default">
                <option
                  v-for="item in levelList"
                  :key="item"
                  :value="item.value"
                >
                  {{ item.name }}
                </option>
              </select>
            </label>
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Chương trình</span
              ><span class="text-red-600"> * </span>
              <select
                id="syllabus"
                v-model="syllabus"
                class="input-text-default"
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
          <div class="w-full mx-[20px] mb-[20px] mt-2 text-start">
            <div class="flex w-full gap-5">
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Thành phố</span
                ><span class="text-red-600"> * </span>
                <select
                  v-model="city"
                  @change="onCityChange"
                  class="input-text-default"
                  :class="{ valid: messageOfAddress }"
                >
                  <option value="" selected>Chọn thành phố</option>
                  <option
                    v-for="city in cities"
                    :value="city.Name"
                    :key="city.Id"
                  >
                    {{ city.Name }}
                  </option>
                </select>
              </label>
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Quận/Huyện</span
                ><span class="text-red-600"> * </span>
                <select
                  v-model="district"
                  @change="onDistrictChange"
                  class="input-text-default"
                  :class="{ valid: messageOfAddress }"
                >
                  <option value="" selected>Chọn quận/huyện</option>
                  <option
                    v-for="district in districts"
                    :value="district.Name"
                    :key="district.Id"
                  >
                    {{ district.Name }}
                  </option>
                </select>
              </label>
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Xã/Thị Xã</span
                ><span class="text-red-600"> * </span>
                <select
                  v-model="town"
                  @change="onWardChange"
                  class="input-text-default"
                  :class="{ valid: messageOfAddress }"
                >
                  <option value="" selected>Chọn phường/xã</option>
                  <option
                    v-for="ward in wards"
                    :value="ward.Name"
                    :key="ward.Id"
                  >
                    {{ ward.Name }}
                  </option>
                </select>
              </label>
            </div>
            <div class="px-3">
              <p class="text-red-600 mt-1">{{ messageOfAddress }}</p>
            </div>
          </div>
          <div id="input-side-4" class="flex w-full gap-5 mx-[20px] mb-[20px]">
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
              <span class="pl-4 text-blue-700">Trạng thái đơn</span
              ><span class="text-red-600"> * </span>
              <SelectStatusComp
                :select-list="[
                  'Đơn mới',
                  'Chờ duyệt',
                  'Chờ liên hệ',
                  'Đã liên hệ',
                  'Hoàn thành',
                  'Đã hủy',
                ]"
                @choose="status = $event"
                :active="status"
                class="mb-0 h-[50px] rounded-md my-[5px] w-full outline-none"
              />
            </label>
          </div>
          <section class="w-full text-start mx-[20px]">
            <div class="w-full my-3">
              <label>
                <span class="pl-5">Hình ảnh đơn đăng ký</span>
                <div
                  class="relative w-full content-center text-center gap-10 h-[300px] rounded-md border border-gray-400 border-dotted object-contain"
                >
                  <img
                    v-if="fileUpload || imageUpload"
                    :src="imageUpload"
                    class="h-full"
                  />
                  <input
                    type="file"
                    class="absolute top-0 w-full h-full opacity-0"
                    @change="handleUploadFile($event)"
                  />
                  <div v-if="!fileUpload && !imageUpload">
                    <img :src="image_default" class="w-10 m-auto my-5" />
                    <span class="text-blue-700">Click</span>
                    <span> để thêm ảnh</span>
                  </div>
                </div>
              </label>
            </div>
          </section>
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
          @click.prevent="handleSubmit"
          v-if="status !== 'creating'"
          type="submit"
          class="h-[48px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
        >
          Save
        </button>
        <button
          v-if="status === 'creating'"
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
  </div>
</template>

<script setup>
import { ref, watch, onBeforeMount, onMounted } from "vue";
import SelectStatusComp from "../../../components/select_status_comp.vue";
import axios from "axios";
import RegistrationService from "../../../services/registration.service";
import image_default from "../../../assets/img/image-default.png";
import levelService from "../../../services/levels.service";
import syllabusService from "../../../services/syllabus.service";
import { useRouter, useRoute } from "vue-router";
import { useRegistrionStore } from "../../../stores/registration_store";
import admissionService from "../../../services/admission_period.service";

import {
  isEmpty,
  isEmailValid,
  isPhoneValid,
} from "../../../utils/resources/check_valid";

const registrationStore = useRegistrionStore();
const admissionPeriodOpening = ref(null);

const fileUpload = ref();
const imageUpload = ref();

const levelList = ref([]);
const syllabusList = ref([]);

const cities = ref([]);
const districts = ref([]);
const wards = ref([]);

const name = ref("");
const phone = ref("");
const email = ref("");
const address = ref("");
const city = ref("");
const district = ref("");
const town = ref("");
const levels = ref(0);
const syllabus = ref(0);
const relationship = ref(0);
const status = ref(0);
const emits = defineEmits(["add-toast"]);
const router = useRouter();
const route = useRoute();

const messageOfName = ref();
const messageOfPhone = ref();
const messageOfEmail = ref();
const messageOfAddress = ref();

onBeforeMount(() => {
  fetchData();
  getLevel();
  getSyllabus();
});

onMounted(async () => {
  if (route.query.id) {
    //get Registration
    const response = await RegistrationService.getRegisterByID(route.query.id);
    console.log(response);
    if (response.status !== 200) {
      emits("add-toast", {
        title: "Thất bại.",
        content: "Tải dữ liệu đơn đăng ký thất bại.",
        type: 1,
      });
      return;
    }
    if (!response.data.success) {
      emits("add-toast", {
        title: "Thất bại.",
        content: response.data.message,
        type: 1,
      });
      return;
    }
    const register = response.data.data;
    fillValiable(register);
  }
});

function handleSubmit() {
  if (route.query.id) {
    updateRegister();
  } else {
    saveValueInput();
  }
}
function fillValiable(register) {
  name.value = register.name;
  phone.value = register.phone;
  email.value = register.email;
  address.value = register.address_detail;
  city.value = register.city;
  district.value = register.district;
  town.value = register.town;
  levels.value = register.level_id;
  syllabus.value = register.syllabus_id;
  relationship.value = register.relationship;
  status.value = register.status;
  imageUpload.value = register.register_img;
}

watch(city, () => {
  districts.value = [];
  wards.value = [];

  if (city.value != undefined) {
    districts.value = cities.value.find((e) =>
      e.Name.match(city.value)
    ).Districts;
  }
});
watch(district, () => {
  if (district.value != undefined) {
    wards.value = districts.value.find((e) =>
      e.Name.match(district.value)
    ).Wards;
  }
});

async function getAdmissionPeriodOpenning() {
  const response = await admissionService.getAddmissionPeriodOpenning();

  console.log(response);

  if (response.status !== 200) {
    emits("add-toast", {
      title: "Cập nhật không thành công",
      content: response.data.error,
      type: 1,
    });
    return false;
  }

  if (!response.data.success) {
    emits("add-toast", {
      title: "Cập nhật không thành công",
      content: response.data.message,
      type: 1,
    });
    return false;
  }

  return {
    success: true,
    admission_id: response.data.data.id,
  };
}

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
  return valid;
}

watch(name, () => {
  if (!isEmpty(name.value)) {
    messageOfName.value = "";
  }
});

watch(town, () => {
  if (!isEmpty(town.value)) {
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

function fetchData() {
  axios
    .get(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    )
    .then((response) => {
      cities.value = response.data;
      // console.log(cities.value);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
function onCityChange() {
  districts.value = [];
  wards.value = [];
  const cityData = cities.value.find((e) => e.Name.match(city.value));
  if (cityData) {
    districts.value = cityData.Districts;
    console.log(districts.value);
  }
}
function onDistrictChange() {
  wards.value = [];
  const districtData = districts.value.find((e) =>
    e.Name.match(district.value)
  );
  console.log(districtData);
  if (districtData) {
    wards.value = districtData.Wards;
  }
}

async function updateRegister() {
  if (checkValid()) return;
  try {
    const formData = new FormData();
    if (fileUpload.value) {
      formData.append("files", fileUpload.value);
    }
    formData.append("name", name.value);
    if (!isEmpty(email.value)) formData.append("email", email.value);
    formData.append("phone", phone.value);
    if (isEmpty(address.value)) formData.append("address", address.value);
    formData.append("city", city.value);
    formData.append("district", district.value);
    formData.append("town", town.value);
    if (!isEmpty(levels.value)) formData.append("levels", levels.value);
    if (!isEmpty(syllabus.value)) formData.append("syllabus", syllabus.value);
    formData.append("relationship", relationship.value);
    formData.append("status", status.value);

    const response = await RegistrationService.updateRegister(
      route.query.id,
      formData
    );

    if (response.status !== 200) {
      emits("add-toast", {
        title: "Cập nhật không thành công",
        content: response.data.error,
        type: 1,
      });
      return;
    }

    if (!response.data.success) {
      emits("add-toast", {
        title: "Cập nhật không thành công",
        content: response.data.message,
        type: 1,
      });
      return;
    }

    emits("add-toast", {
      title: "Cập nhật thành công",
      content: response.data.message,
      type: 0,
    });
  } catch (e) {
    emits("add-toast", {
      title: "Cập nhật không thành công",
      content: e,
      type: 1,
    });
  }
}
const saveValueInput = async () => {
  if (checkValid()) return;
  try {
    const hasAdmission = await getAdmissionPeriodOpenning();
    if (!hasAdmission) return;
    const formData = new FormData();
    if (fileUpload.value) {
      formData.append("files", fileUpload.value);
    }
    formData.append("name", name.value);
    if (isEmpty(email.value)) formData.append("email", email.value);
    formData.append("phone", phone.value);
    if (isEmpty(address.value)) formData.append("address", address.value);
    formData.append("city", city.value);
    formData.append("district", district.value);
    formData.append("town", town.value);
    if (!isEmpty(levels.value)) formData.append("levels", levels.value);
    if (!isEmpty(syllabus.value)) formData.append("syllabus", syllabus.value);
    formData.append("relationship", relationship.value);
    formData.append("admission_period_id", hasAdmission.admission_id);
    formData.append("status", status.value);

    const response = await RegistrationService.createRegister(formData);

    if (response.data.isExist) {
      emits("add-toast", {
        title: "Đơn đã tồn tại.",
        content: "Số điện thoại đã được đăng ký.",
        type: 1,
      });
      return;
    }

    if (response.status !== 200) {
      emits("add-toast", {
        title: "Đăng ký không thành công",
        type: 1,
      });
      return;
    }

    if (!response.data.success) {
      emits("add-toast", {
        title: "Đăng ký không thành công",
        content: response.data.error,
        type: 1,
      });
      return;
    }

    emits("add-toast", {
      title: "Đăng ký thành công",
      type: 0,
    });
    router.push({ name: "RegistrationView" });
  } catch (e) {
    emits("add-toast", {
      title: "Đăng ký không thành công",
      content: e,
      type: 1,
    });
  }
};

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
</script>

<style scoped>
.valid {
  border: solid red 1px;
}
</style>
