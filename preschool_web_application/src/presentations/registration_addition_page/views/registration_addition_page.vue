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
          <div id="input-side-1" class="flex w-full gap-5 mx-[20px]">
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Họ và tên người đăng ký</span
              ><span class="text-red-600"> * </span>
              <input
                v-model="name"
                type="text"
                placeholder="Họ và tên"
                class="h-[45px] mb-7 rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              />
            </label>
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Vai trò của người đăng ký</span
              ><span class="text-red-600"> * </span>
              <!-- <SelectReturnNumComp
                class="h-[45px] mb-7 rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
                :list-select="roleList"
                @choose="role = $event"
              ></SelectReturnNumComp> -->
              <select
                id="relationship"
                v-model="relationship"
                class="h-[45px] mb-7 rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
              >
                <option value="0">Chọn mối quan hệ</option>
                <option value="1">Bố</option>
                <option value="2">Mẹ</option>
                <option value="3">Anh, Chị</option>
                <option value="4">Ông, Bà</option>
                <option value="5">Người giám hộ</option>
              </select>
            </label>
          </div>
          <div class="flex w-full gap-5 mx-[20px] mb-[20px]">
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Số điện thoại</span
              ><span class="text-red-600"> * </span>
              <input
                v-model="phone"
                type="text"
                placeholder="0xxxxxxxxx"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              />
            </label>
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Email</span
              ><span class="text-red-600"> * </span>
              <input
                v-model="email"
                type="text"
                placeholder="abc@abc.com"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              />
            </label>
          </div>
          <div class="flex w-full gap-5 mx-[20px] mb-[20px]">
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Cấp bậc</span
              ><span class="text-red-600"> * </span>
              <!-- <SelectReturnNumComp
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
                :list-select="levelList"
                @choose="level = $event"
                :active="level"
              /> -->
              <select
                id="levels"
                v-model="levels"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
              >
                <option value="0">Chọn cấp bậc học</option>
                <option value="1">Mầm</option>
                <option value="2">Chồi</option>
                <option value="3">Lá</option>
              </select>
            </label>
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Chương trình</span
              ><span class="text-red-600"> * </span>
              <!-- <SelectReturnNumComp
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
                :list-select="syllabusList"
                @choose="syllabus = $event"
                :active="syllabus"
              /> -->
              <select
                id="syllabus"
                v-model="syllabus"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
              >
                <option value="0">Chọn loại chương trình học</option>
                <option value="1">Chương trình phổ thông</option>
                <option value="2">Chương trình nâng cao</option>
              </select>
            </label>
          </div>
          <div class="flex w-full gap-5 mx-[20px] mb-[20px]">
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Thành phố</span
              ><span class="text-red-600"> * </span>
              <!-- <SelectSearchComp
                :list-select="cityList"
                @choose="city = $event"
                :active="'Hà Nội'"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
              /> -->
              <select
                v-model="selectedCity"
                @change="onCityChange"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
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
              <!-- <SelectSearchComp
                :list-select="districtList"
                @choose="district = $event"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
              /> -->
              <select
                v-model="selectedDistrict"
                @change="onDistrictChange"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
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
              <!-- <SelectSearchComp
                :list-select="townList"
                @choose="town = $event"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
              /> -->
              <select
                v-model="selectedWard"
                @change="onWardChange"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
              >
                <option value="" selected>Chọn phường/xã</option>
                <option v-for="ward in wards" :value="ward.Name" :key="ward.Id">
                  {{ ward.Name }}
                </option>
              </select>
            </label>
          </div>
          <div id="input-side-4" class="flex w-full gap-5 mx-[20px] mb-[20px]">
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Địa chỉ</span>
              <input
                v-model="address"
                type="text"
                placeholder="23 abc/3123, Tp.Hồ Chí Minh, Việt Nam"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
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
                :active="0"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
              />
            </label>
          </div>
          <div class="text-start w-full gap-5 mx-[20px] mb-[20px]">
            <span class="my-2">Hình ảnh đơn đăng ký</span>

            <!-- <div
              class="w-full my-3 border border-dotted border-2 border-gray-500 ob rounded-xl h-[500px] max-h-68"
            >
              <img
                src="https://th.bing.com/th/id/OIP.pRc56eeZPk-f1ticsni6YwHaEK?w=326&h=183&c=7&r=0&o=5&pid=1.7"
                alt=""
                class="object-contain w-full h-full"
              />
            </div>
            <input clas="mx-3" type="file" name="" id="" /> -->
            <div class="file-uploader">
              <div class="upload-area">
                <div class="dropzone">
                  <h2>Choose files or drag and drop</h2>
                </div>
                <input type="file" @change="handleFileSelect" multiple />
              </div>

              <div class="uploaded-files">
                <div v-for="file in uploadedFiles" :key="file.name">
                  <div class="file-info">
                    <span class="filename">{{ file.name }}</span>
                    <span
                      ><button @click="removeFile(file)">
                        <img :src="delete_icon" alt="" /></button
                    ></span>
                  </div>
                  <!-- <div class="progress-bar">
            <div class="progress" :style="{ width: file.progress + '%' }"></div>
          </div> -->
                </div>
              </div>
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
          @click.prevent="saveValueInput"
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
import SelectReturnNumComp from "../../../components/select_return_num_comp.vue";
import SelectSearchComp from "../../../components/select_search_input.vue";
import SelectStatusComp from "../../../components/select_status_comp.vue";
import axios from "axios";
import delete_icon from "@/assets/icons/delete.svg";
import RegistrationService from "../../../services/registration.service";
import { useRouter } from "vue-router";

const role = ref(0);
const name = ref(null);
const phone = ref(null);
const email = ref(null);
const address = ref(null);
const cities = ref([]);
const districts = ref([]);
const wards = ref([]);
const selectedCity = ref("");
const selectedDistrict = ref("");
const selectedWard = ref("");
const levels = ref(0);
const syllabus = ref(0);
const relationship = ref(0);
const status = ref(null);
const uploadedFiles = ref([]);
const emits = defineEmits(["add-toast"]);
const router = useRouter();
onMounted(() => {
  fetchData();
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
  const selectedCityData = cities.value.find(
    (city) => city.Name === selectedCity.value
  );
  if (selectedCityData) {
    districts.value = selectedCityData.Districts;
  }
}
function onDistrictChange() {
  wards.value = [];
  const selectedCityData = cities.value.find(
    (city) => city.Name === selectedCity.value
  );
  if (selectedCityData) {
    const selectedDistrictData = selectedCityData.Districts.find(
      (district) => district.Name === selectedDistrict.value
    );
    if (selectedDistrictData) {
      wards.value = selectedDistrictData.Wards;
    }
  }
}
function onWardChange() {}
const handleFileSelect = (event) => {
  const files = event.target.files;
  for (const file of files) {
    uploadedFiles.value.push(file);
  }
};

const removeFile = (file) => {
  const index = uploadedFiles.value.indexOf(file);
  if (index !== -1) {
    uploadedFiles.value.splice(index, 1);
  }
};
const saveValueInput = async () => {
  try {
    const formData = new FormData();
    for (const file of uploadedFiles.value) {
      formData.append("files", file);
    }
    formData.append("name", name.value);
    formData.append("email", email.value);
    formData.append("phone", phone.value);
    formData.append("address", address.value);
    formData.append("city", selectedCity.value);
    formData.append("district", selectedDistrict.value);
    formData.append("town", selectedWard.value);
    formData.append("levels", levels.value);
    formData.append("syllabus", syllabus.value);
    formData.append("relationship", relationship.value);
    formData.append("status", status.value);
    //Kiểm tra đơn đăng ký đã tồn tại.

    //Nếu đơn đã tồn tại thông báo 'Số điện thoại đã được đăng ký với tên ...'
    //Thoát khỏi function

    //Ngược lại tiếp tục.
    //Tạo đơn đăng ký
    const response = await RegistrationService.createRegister(formData);

    if (response.data.status === 400) {
      emits("add-toast", {
        title: "Đăng ký không thành công",
        type: 1,
      });
    } else {
      emits("add-toast", {
        title: "Đăng ký thành công",
        type: 0,
      });
      router.push({ name: "RegistrationView" });
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<style scoped>
.file-uploader {
  width: 100%;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 20px;
}

.upload-area {
  text-align: center;
  padding: 10px;
  border: 1px dashed #ccc;
}

.dropzone {
  cursor: pointer;
}

.uploaded-files {
  margin-top: 20px;
}

.file-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.file-info img {
  width: 20px;
  height: 20px;
}
</style>
