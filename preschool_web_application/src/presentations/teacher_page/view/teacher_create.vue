<template>
  <div>
    <form>
      <div
        class="bg-white ml-4 mt-[20px] rounded-xl mr-2 text-center h-fit pb-[60px]"
      >
        <div id="head">Tạo giáo viên</div>
        <div id="site" class="flex px-[30px] py-[30px]">
          <div class="add-avatar w-fit h-fit rounded-md">
            <img
              :src="teacherAvatarPath"
              class="w-[150px] h-[150px] object-cover bg-[#D9D9D9] rounded-md"
            />
            <div class="button-side flex my-4 gap-2">
              <input
                type="file"
                class="w-[150px] file:w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#3B44D1] file:text-white hover:file:text-black hover:file:bg-violet-100"
                accept=".png, .jpeg, .jpg"
                @change="handleUploadTeacherImg"
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
                <span class="pl-4 text-gray-500">Họ và tên</span
                ><span class="text-red-600"> (*) </span>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  class="input-text-default"
                  v-model="name"
                  :class="{ 'in-valid': messageOfTeacherName }"
                />
                <div class="mt-1 mb-2 h-[25px] text-red-500">
                  <span>{{ messageOfTeacherName }}</span>
                </div>
              </label>
              <label class="w-full text-start">
                <span class="pl-4 text-gray-500">Giới tính</span>
                <span class="text-red-600"> (*) </span>
                <select id="gender" v-model="gender" class="input-text-default">
                  <option value="0">Nam</option>
                  <option value="1">Nữ</option>
                </select>
              </label>
            </div>
            <div
              id="input-side-2"
              class="flex w-full gap-5 mx-[20px] mb-[25px]"
            >
              <label class="w-full text-start">
                <span class="pl-4 text-gray-500">Ngày sinh</span>
                <span class="text-red-600"> (*) </span>
                <VueDatePicker
                  :enable-time-picker="false"
                  v-model="birthday"
                  class="rounded-md"
                  :class="{ 'in-valid': messageOfTeacherBirthday }"
                />
                <div class="mt-1 mb-2 h-[25px] text-red-500">
                  <span>{{ messageOfTeacherBirthday }}</span>
                </div>
              </label>
              <label class="w-full text-start">
                <span class="pl-4 text-gray-500">Thâm niên</span>
                <input
                  type="text"
                  v-model="selectedYear"
                  class="input-text-default"
                />
              </label>
            </div>
            <div id="input-side-3" class="flex w-full gap-5 mx-[20px]">
              <label class="w-full text-start">
                <span class="pl-4 text-gray-500">Số điện thoại</span>
                <span class="text-red-600"> (*) </span>
                <input
                  type="text"
                  placeholder="0xxxxxxxx"
                  class="input-text-default"
                  v-model="phone"
                  :class="{ 'in-valid': messageOfTeacherPhone }"
                />
                <div class="mt-1 mb-2 h-[25px] text-red-500">
                  <span>{{ messageOfTeacherPhone }}</span>
                </div>
              </label>
              <label class="w-full text-start">
                <span class="pl-4 text-gray-500">Email (nếu có)</span>

                <input
                  type="text"
                  placeholder="abc@abc.com"
                  class="input-text-default"
                  v-model="email"
                  :class="{ 'in-valid': messageOfTeacherEmail }"
                />
                <div class="mt-1 mb-2 h-[25px] text-red-500">
                  <span>{{ messageOfTeacherEmail }}</span>
                </div>
              </label>
            </div>
            <div id="input-side-4" class="flex w-full gap-5 mx-[20px]">
              <label class="w-full text-start">
                <span class="pl-4 text-gray-500">Địa chỉ</span>
                <input
                  v-model="address"
                  type="text"
                  class="input-text-default"
                />
              </label>

              <label class="w-full text-start">
                <span class="pl-4 text-gray-500">Tỉnh/Thành phố</span>
                <select class="input-text-default" v-model="city">
                  <option v-for="item in cities" :key="item" :value="item.Name">
                    {{ item.Name }}
                  </option>
                </select>
              </label>
            </div>
            <div id="input-side-4" class="flex w-full mt-8 gap-5 mx-[20px]">
              <label class="w-full text-start">
                <span class="pl-4 text-gray-500">Quận/Huyện</span>
                <select v-model="district" class="input-text-default">
                  <option
                    v-for="item in districts"
                    :key="item"
                    :value="item.Name"
                  >
                    {{ item.Name }}
                  </option>
                </select>
              </label>
              <label class="w-full text-start">
                <span class="pl-4 text-gray-500">Phường/Thị xã</span>
                <select v-model="town" class="input-text-default">
                  <option v-for="item in towns" :key="item" :value="item.Name">
                    {{ item.Name }}
                  </option>
                </select>
              </label>
            </div>
            <div id="input-side-4" class="flex w-full mt-8 gap-5 mx-[20px]">
              <label class="w-full text-start">
                <span class="pl-4 text-gray-500">Chuyên môn</span>
                <SelectSearchComp
                  class="h-[50px]"
                  :enable-sub="false"
                  :options="filterSpecializationList"
                  :value="searchSpecialization"
                  @newValue="searchSpecialization = $event"
                  @selected="specializations = $event"
                />
              </label>
              <label class="w-full text-start">
                <span class="pl-4 text-gray-500">Văn bằng</span>
                <SelectSearchComp
                  class="h-[50px]"
                  :enable-sub="false"
                  :options="filterCertificateList"
                  :value="searchCertificates"
                  @newValue="searchCertificates = $event"
                  @selected="certificates = $event"
                />
              </label>
            </div>
            <div
              id="input-side-4"
              class="w-full text-start mt-8 gap-5 mx-[20px]"
            >
              <label class="w-full text-start">
                <span class="pl-4 text-gray-500">Giới thiệu thêm</span>
                <textarea
                  v-model="description"
                  cols="30"
                  rows="10"
                  class="w-full border border-gray-300 rounded-md focus:ring-1 px-2 py-2 text-[18px] hover:border-black outline-none"
                ></textarea>
              </label>
            </div>
          </div>
        </div>
        <div id="button-side" class="w-full flex text-start mx-[50px] gap-5">
          <button
            @click.prevent="createTeacher()"
            v-if="!creating"
            type="submit"
            class="h-[48px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
          >
            Lưu
          </button>
          <button
            v-if="creating"
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
    <!--<div
      class="bg-white ml-4 mt-[20px] rounded-xl mr-2 text-center h-fit pb-[60px]"
    >
      <div id="head">Các chuyên môn</div>
      <div class="flex flex-wrap w-full gap-5 mx-[20px] mb-[20px]">
        <label
          class="w-[500px] text-start"
          v-for="(specialization, index) in specializations"
          :key="index"
        >
          <span class="pl-4 text-gray-500">Chuyên môn {{ index + 1 }}</span>
          <select
            id="status_account"
            v-model="specialization.value"
            class="input-text-default"
            :class="{ 'in-valid': messageOfTeacherSpecialization }"
          >
            <option value="null" selected disabled>Selected</option>
            <option
              v-for="item in specializationList"
              :key="item"
              :value="item.value"
            >
              {{ item.name }}
            </option>
          </select>
          <div class="mt-1 mb-2 h-[25px] text-red-500">
            <span>{{ messageOfTeacherSpecialization }}</span>
          </div>
          <div class="flex space-x-2">
            <div
              v-if="specializations.length > 1"
              class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(206,44,44)] content-center"
              @click.prevent="removeSpecialization(index)"
            >
              <img :src="delete_icon" class="w-[14px] m-auto" />
            </div>
            <div
              class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(53,61,186)] content-center"
              @click.prevent="addSpecialization"
            >
              <img :src="plus_icon" class="w-[14px] m-auto" />
            </div>
          </div>
        </label>
      </div>
    </div>
    <div
      class="bg-white ml-4 mt-[20px] rounded-xl mr-2 text-center h-fit pb-[60px]"
    >
      <div id="head">Các văn bằng</div>
      <div class="flex flex-wrap w-full gap-5 mx-[20px] mb-[20px]">
        <label
          class="w-[500px] text-start"
          v-for="(certificate, index) in certificates"
          :key="index"
        >
          <span class="pl-4 text-gray-500"
            >Chứng chỉ, văn bằng {{ index + 1 }}</span
          >
          <select
            id="status_account"
            v-model="certificate.value"
            class="input-text-default"
            :class="{ 'in-valid': messageOfTeacherCertificate }"
          >
            <option value="null" selected disabled>Selected</option>
            <option
              v-for="item in certificateList"
              :key="item"
              :value="item.value"
            >
              {{ item.name }}
            </option>
          </select>
          <div class="mt-1 mb-2 h-[25px] text-red-500">
            <span>{{ messageOfTeacherCertificate }}</span>
          </div>
          <div class="flex space-x-2">
            <div
              v-if="certificates.length > 1"
              class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(206,44,44)] content-center"
              @click.prevent="removeCertificate(index)"
            >
              <img :src="delete_icon" class="w-[14px] m-auto" />
            </div>
            <div
              class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(53,61,186)] content-center"
              @click.prevent="addCertificate"
            >
              <img :src="plus_icon" class="w-[14px] m-auto" />
            </div>
          </div>
        </label>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
//service
import axios from "axios";
import teacherService from "../../../services/teacher.service";
import SpecializationService from "../../../services/specialization.service";
import CertificateService from "../../../services/certificate.service";
import {
  isEmpty,
  isPhoneValid,
  isEmailValid,
} from "../../../utils/resources/check_valid";
import { yyyymmddDateString } from "../../../utils/resources/format_date";

//component
import SelectSearchComp from "../../../components/input_search_select.vue";

//list
const cities = ref([]);
const districts = ref([]);
const towns = ref([]);
onMounted(async () => {
  await getSpecialization();
  await getCertificate();
  await getAddress();
});
//search model
const searchSpecialization = ref("");
const searchCertificates = ref("");

const filterSpecializationList = computed(() => {
  return specializationList.value.filter((e) => {
    return e.name.match(searchSpecialization.value);
  });
});
const filterCertificateList = computed(() => {
  return certificateList.value.filter((e) => {
    return e.name.match(searchCertificates.value);
  });
});

const specializationList = ref([]);
const specializations = ref([]);
const certificateList = ref([]);
const certificates = ref([]);

function addSpecialization() {
  specializations.value.push({ value: "" });
}
function removeSpecialization(index) {
  specializations.value.splice(index, 1);
}
function addCertificate() {
  certificates.value.push({ value: "" });
}
function removeCertificate(index) {
  certificates.value.splice(index, 1);
}

async function getSpecialization() {
  const response = await SpecializationService.getSpecialization();
  if (response.status == 200 && response.data.success) {
    for (let index = 0; index < response.data.data.length; index++) {
      const element = response.data.data[index];
      specializationList.value.push({
        name: element.name,
        id: element.id,
      });
    }
  }
}
async function getCertificate() {
  const response = await CertificateService.getCertificate();
  if (response.status == 200 && response.data.success) {
    for (let index = 0; index < response.data.data.length; index++) {
      const element = response.data.data[index];
      certificateList.value.push({
        name: element.name,
        id: element.id,
      });
    }
  }
}

const city = ref("");
const district = ref("");
const town = ref("");

const name = ref("");
const gender = ref(0);
const birthday = ref("");
const address = ref("");
const email = ref("");
const phone = ref("");
const experience = ref("");
const account_id = ref(null);
const emits = defineEmits(["add-toast"]);
const creating = ref(false);
const fileUpload = ref(null);
const teacherAvatarPath = ref(null);
const selectedYear = ref("");
const description = ref("");

const messageOfTeacherName = ref("");
const messageOfTeacherPhone = ref("");
const messageOfTeacherEmail = ref("");
const messageOfTeacherCertificate = ref("");
const messageOfTeacherSpecialization = ref("");
const messageOfTeacherBirthday = ref("");

//watch
watch(city, (newCity) => {
  districts.value = [];
  towns.value = [];

  if (newCity) {
    districts.value = cities.value.find((e) => e.Name.match(newCity)).Districts;
  }
});

watch(district, (newDistrict) => {
  towns.value = [];

  if (newDistrict) {
    towns.value = districts.value.find((e) => e.Name.match(newDistrict)).Wards;
  }
});

watch(phone, (newValue) => {
  if (!isEmpty(newValue) && isPhoneValid(newValue)) {
    messageOfTeacherPhone.value = "";
  }
});

watch(email, (newValue) => {
  if (!isEmpty(newValue) && isEmailValid(newValue)) {
    messageOfTeacherEmail.value = "";
  }
});

watch(name, (newValue) => {
  if (!isEmpty(newValue)) {
    messageOfTeacherName.value = "";
  }
});

function checkValidTeacher() {
  let invalid = false;

  if (isEmpty(phone.value)) {
    invalid = true;
    messageOfTeacherPhone.value = "Vui lòng nhập số điện thoại giáo viên";
  }

  if (!isEmpty(phone.value) && !isPhoneValid(phone.value)) {
    invalid = true;
    messageOfTeacherPhone.value =
      "Số điện thoại giáo viên không đúng định dạng.";
  }
  if (!isEmpty(email.value) && !isEmailValid(email.value)) {
    invalid = true;
    messageOfTeacherEmail.value = "Email giáo viên không đúng định dạng.";
  }

  if (isEmpty(name.value)) {
    invalid = true;
    messageOfTeacherName.value = "Vui lòng nhập họ và tên";
  }
  if (isEmpty(birthday.value)) {
    invalid = true;
    messageOfTeacherBirthday.value = "Vui lòng chọn ngày sinh.";
  }
  // const hasEmptySpecialization = specializations.value.some(
  //   (spec) => spec.value === ""
  // );
  // if (hasEmptySpecialization) {
  //   invalid = true;
  //   messageOfTeacherSpecialization.value = "Vui lòng chọn ít nhất 1 chuyên môn";
  // }
  // const hasEmptyCertificate = certificates.value.some(
  //   (cert) => cert.value === ""
  // );
  // if (hasEmptyCertificate) {
  //   invalid = true;
  //   messageOfTeacherCertificate.value = "Vui lòng chọn ít nhất 1 văn bằng";
  // }
  return invalid;
}

async function createTeacher() {
  if (checkValidTeacher()) {
    return;
  }
  const selectedSpecializations = specializations.value.filter(
    (spec) => spec.id !== ""
  );
  const selectedCertificate = certificates.value.filter(
    (spec) => spec.id !== ""
  );
  try {
    console.log(selectedSpecializations);

    creating.value = true;
    const formData = new FormData();
    if (fileUpload.value !== null) {
      formData.append("files", fileUpload.value);
    }
    formData.append("name", name.value);
    formData.append("gender", gender.value);
    if (!isEmpty(birthday.value))
      formData.append(
        "birthday",
        yyyymmddDateString(new Date(birthday.value).toLocaleDateString())
      );
    if (!isEmpty(address.value)) formData.append("address", address.value);
    if (!isEmpty(email.value)) formData.append("email", email.value);
    if (!isEmpty(description.value))
      formData.append("description", description.value);
    formData.append("phone", phone.value);
    formData.append("account_id", account_id.value);
    formData.append("city", city.value);
    formData.append("district", district.value);
    formData.append("town", town.value);
    if (selectedYear.value) formData.append("seniority", selectedYear.value);
    if (specializations.value.length > 0) {
      for (const spec of selectedSpecializations) {
        formData.append("spec", spec.id);
        // console.log(spec.value);
      }
    }
    if (certificates.value.length > 0) {
      for (const cer of selectedCertificate) {
        formData.append("cer", cer.id);
        // console.log(cer.value);
      }
    }

    const response = await teacherService.createTeacher(formData);

    creating.value = false;

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
      content: `Tạo giáo viên ${name.value} thành công.`,
      type: 0,
    });
  } catch (error) {
    console.log(error);

    emits("add-toast", {
      title: "Emai hoặc số điện thoại đã tồn tại",
      content: error.response.data.error,
      type: 1,
    });
  }
}
// Sử lý và ràn buộc lấy hình ảnh
const handleUploadTeacherImg = (event) => {
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
  teacherAvatarPath.value = URL.createObjectURL(fileUpload.value);
  console.log(URL.createObjectURL(fileUpload.value));
};

//Function
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
</script>
<style scoped>
#head {
  text-align: start;
  padding: 20px;
  font-size: large;
  font-weight: 600;
  border-bottom: solid 1px rgb(221, 221, 221);
}
.in-valid {
  border: red 1px solid;
}
.dp__theme_light {
  --dp-button-height: 35px;
  --dp-border-radius: 5px;
  --dp-input-padding: 12px 30px 12px 12px;
  --dp-border-color: #48484864;
  margin: 5px 0px;
}
</style>
