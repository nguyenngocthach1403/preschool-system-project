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
              <SelectReturnNumComp
                class="h-[45px] mb-7 rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
                :list-select="roleList"
                @choose="role = $event"
              ></SelectReturnNumComp>
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
              <SelectReturnNumComp
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
                :list-select="levelList"
                @choose="level = $event"
                :active="level"
              />
            </label>
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Chương trình</span
              ><span class="text-red-600"> * </span>
              <SelectReturnNumComp
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
                :list-select="syllabusList"
                @choose="syllabus = $event"
                :active="syllabus"
              />
            </label>
          </div>
          <div class="flex w-full gap-5 mx-[20px] mb-[20px]">
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Xã/Thị Xã</span
              ><span class="text-red-600"> * </span>
              <SelectSearchComp
                :list-select="townList"
                @choose="town = $event"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
              />
            </label>
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Quận/Huyện</span
              ><span class="text-red-600"> * </span>
              <SelectSearchComp
                :list-select="districtList"
                @choose="district = $event"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
              /> </label
            ><label class="w-full text-start">
              <span class="pl-4 text-blue-700">Thành phố</span
              ><span class="text-red-600"> * </span>
              <SelectSearchComp
                :list-select="cityList"
                @choose="city = $event"
                :active="'Hà Nội'"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
              />
            </label>
          </div>
          <div id="input-side-4" class="flex w-full gap-5 mx-[20px] mb-[20px]">
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
                :active="0"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
              />
            </label>
          </div>
          <div class="text-start w-full gap-5 mx-[20px] mb-[20px]">
            <span class="my-2">Hình ảnh đơn đăng ký</span>

            <div
              class="w-full my-3 border border-dotted border-2 border-gray-500 ob rounded-xl h-[500px] max-h-68"
            >
              <img
                src="https://th.bing.com/th/id/OIP.pRc56eeZPk-f1ticsni6YwHaEK?w=326&h=183&c=7&r=0&o=5&pid=1.7"
                alt=""
                class="object-contain w-full h-full"
              />
            </div>
            <input clas="mx-3" type="file" name="" id="" />
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
import { ref, watch, onBeforeMount } from "vue";
import SelectReturnNumComp from "../../../components/select_return_num_comp.vue";
import SelectSearchComp from "../../../components/select_search_input.vue";
import SelectStatusComp from "../../../components/select_status_comp.vue";
import axios from "axios";

const roleList = ref(["Bố", "Mẹ", "Người giám hộ"]);
const cityList = ref([]);
const districtList = ref([]);
const townList = ref([]);
const addressList = ref([]);
const levelList = ref(["Mầm", "Chồi", "Lá"]);
const syllabusList = ref(["Phổ thông", "Nâng cao"]);

const role = ref(null);
const name = ref(null);
const phone = ref(null);
const email = ref(null);
const address = ref(null);
const city = ref(null);
const district = ref(null);
const town = ref(null);
const level = ref(null);
const syllabus = ref(null);
const status = ref(null);

watch(city, () => {
  if (addressList.value.some((e) => e.Name == city.value)) {
    console.log("ýe");
    const index = addressList.value.findIndex((e) => e.Name == city.value);
    addressList.value[index].Districts.forEach((e) => {
      districtList.value.push(e.Name);
    });
  }
});

watch(district, () => {
  if (addressList.value.some((e) => e.Name == city.value)) {
    const indexCity = addressList.value.findIndex((e) => e.Name == city.value);
    console.log(indexCity);
    if (
      addressList.value[indexCity].Districts.some(
        (districtItem) => districtItem.Name == district.value
      )
    ) {
      const indexDistrict = addressList.value[indexCity].Districts.findIndex(
        (e) => e.Name == district.value
      );
      addressList.value[indexCity].Districts[indexDistrict].Wards.forEach(
        (ward) => townList.value.push(ward.Name)
      );
    }
  }
});
onBeforeMount(() => {
  fetchData();
});

async function fetchData() {
  axios
    .get(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    )
    .then((response) => {
      addressList.value = response.data;
      addressList.value.forEach((e) => cityList.value.push(e.Name));
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
</script>

<style lang="scss" scoped>
</style>