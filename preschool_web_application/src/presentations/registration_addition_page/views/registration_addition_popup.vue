<template>
  <PopUpLayout
    :title="`Tạo thông tin đăng ký mới`"
    :width="800"
    class="absolute top-0 left-0">
    <template #content>
      <div
        v-if="enrollmentSession != null"
        class="relative">
        <div
          class="absolute bottom-0 z-40 bg-white w-full py-2 px-5 flex place-content-between">
          <div>
            <span class="text-gray-300 text-[14px]">Tạo bởi:</span>
            {{ user?.user_name || `--` }}
          </div>
          <div>
            <span class="text-gray-300 text-[14px]">Ngày tạo:</span>
            {{ new Date().toDateString() || `--` }}
          </div>
        </div>
        <form class="h-[650px] px-10 overflow-y-auto">
          <div class="border rounded-[10px] shadow-card">
            <div
              class="flex items-center bg-gray-100 rounded-tl-[10px] rounded-tr-[10px] py-3">
              <p class="w-[100px] text-[16px] text-blue-700">Thông tin</p>
            </div>
            <div class="my-5 mx-5">
              <div class="flex gap-5">
                <div class="flex-1 text-start">
                  <label>
                    <span class="pl-4 text-gray-500">Họ và tên</span
                    ><span class="text-red-600"> * </span>
                    <input
                      v-model="name"
                      type="text"
                      placeholder="Họ và tên"
                      class="input-text-default" />
                    <div
                      v-show="disabled[0]"
                      class="h-[15px]"></div>
                    <transition
                      enter-active-class="ease-in-out duration-300"
                      enter-from-class="h-0 opacity-0"
                      enter-to-class="h-[20px] opacity-1"
                      leave-active-class="ease-in-out duration-300"
                      leave-from-class="h-[20px] opacity-1"
                      leave-to-class="h-0 opacity-0">
                      <div
                        v-show="!disabled[0]"
                        class="px-3">
                        <p class="text-red-600 mt-2">
                          {{ msg["studentName"] }}
                        </p>
                      </div>
                    </transition>
                  </label>
                </div>
                <div class="flex-3 text-start">
                  <label>
                    <span class="pl-4 text-gray-500">Giới tính</span
                    ><span class="text-red-600"> * </span>
                    <SelectVue
                      class="mt-1"
                      :options="[`Nam`, `Nữ`]"
                      :placeholder="`Chọn giới tính`"
                      v-model:value="gender" />
                    <transition
                      enter-active-class="ease-in-out duration-300"
                      enter-from-class="h-0 opacity-0"
                      enter-to-class="h-[20px] opacity-1"
                      leave-active-class="ease-in-out duration-300"
                      leave-from-class="h-[20px] opacity-1"
                      leave-to-class="h-0 opacity-0">
                      <div
                        v-show="!disabled[1]"
                        class="px-3">
                        <p class="text-red-600 mt-2">
                          {{ msg["studentGender"] }}
                        </p>
                      </div>
                    </transition>
                  </label>
                </div>
              </div>
              <div class="flex gap-5">
                <label class="w-full text-start">
                  <span class="pl-4 text-gray-500">Ngày sinh</span
                  ><span class="text-red-600"> * </span>
                  <VueDatePicker
                    v-model="dateOfBirth"
                    class="mt-[5px]"
                    :enable-time-picker="false" />
                  <transition
                    enter-active-class="ease-in-out duration-300"
                    enter-from-class="h-0 opacity-0"
                    enter-to-class="h-[20px] opacity-1"
                    leave-active-class="ease-in-out duration-300"
                    leave-from-class="h-[20px] opacity-1"
                    leave-to-class="h-0 opacity-0">
                    <div
                      v-show="!disabled[2]"
                      class="px-3">
                      <p class="text-red-600 mt-2">
                        {{ msg["studentDateOfBirth"] }}
                      </p>
                    </div>
                  </transition>
                </label>
                <label class="w-full text-start">
                  <span class="pl-4 text-gray-500">Nơi sinh</span>
                  <input
                    type="text"
                    v-model="placeOfBirth"
                    placeholder="Nơi sinh"
                    class="input-text-default" />
                  <div class="px-3">
                    <p class="text-red-600 mt-5"></p>
                  </div>
                </label>
              </div>
              <div class="flex gap-5">
                <label class="w-full text-start">
                  <span class="pl-4 text-gray-500">Dân tộc</span>
                  <SelectVue
                    class="mt-1"
                    :placeholder="`Chọn dân tộc`"
                    :disapled="false"
                    v-model:value="fork"
                    :options="forkList" />
                  <div class="px-3">
                    <p class="text-red-600 mt-5"></p>
                  </div>
                </label>
                <label class="w-full text-start">
                  <span class="pl-4 text-gray-500">Quốc tịch</span>
                  <input
                    type="text"
                    v-model="nation"
                    placeholder="Quốc tịch"
                    class="input-text-default" />
                  <div class="px-3">
                    <p class="text-red-600 mt-5"></p>
                  </div>
                </label>
              </div>
              <div class="my-2 text-blue-700 flex items-center">
                <div class="h-[1px] w-full bg-gray-200"></div>
                <p class="w-full">Địa chỉ thường trú</p>
                <div class="h-[1px] w-full bg-gray-200"></div>
              </div>
              <div class="flex gap-5">
                <label class="w-full text-start">
                  <span class="pl-4 text-gray-500">Tỉnh/Thành phố</span
                  ><span class="text-red-600"> * </span>
                  <SelectVue
                    class="mt-1"
                    v-model:value="placeOfOriginCity"
                    :placeholder="`Thành phố`"
                    :options="cities.map((item) => item.Name)"
                    :disapled="false" />
                  <div class="px-3">
                    <p class="text-red-600 mt-5"></p>
                  </div>
                </label>
                <label class="w-full text-start">
                  <span class="pl-4 text-gray-500">Quận/Huyện</span
                  ><span class="text-red-600"> * </span>
                  <SelectVue
                    class="mt-1"
                    :placeholder="`Quận`"
                    v-model:value="placeOfOriginDistrist"
                    :options="districts.map((item) => item.Name)"
                    :disapled="placeOfOriginCity == null" />
                  <div class="px-3">
                    <p class="text-red-600 mt-5"></p>
                  </div>
                </label>
                <label class="w-full text-start">
                  <span class="pl-4 text-gray-500">Phường/Xã</span
                  ><span class="text-red-600"> * </span>
                  <SelectVue
                    class="mt-1"
                    :placeholder="`Phường/Xã`"
                    v-model:value="placeOfOriginWard"
                    :options="wards.map((item) => item.Name)"
                    :disapled="placeOfOriginDistrist == null" />
                  <div class="px-3">
                    <p class="text-red-600 mt-5"></p>
                  </div>
                </label>
              </div>
              <transition
                enter-active-class="ease-in-out duration-300"
                enter-from-class="h-0 opacity-0"
                enter-to-class="h-[20px] opacity-1"
                leave-active-class="ease-in-out duration-300"
                leave-from-class="h-[20px] opacity-1"
                leave-to-class="h-0 opacity-0">
                <div
                  v-show="!disabled[3]"
                  class="px-3 text-start">
                  <p class="text-red-600">{{ msg["studentPlaceOfOrigin"] }}</p>
                </div>
              </transition>
              <div class="my-2 text-blue-700 flex items-center">
                <div class="h-[1px] w-full bg-gray-200"></div>
                <p class="w-full">Địa chỉ hiện tại</p>
                <div class="h-[1px] w-full bg-gray-200"></div>
              </div>
              <div class="flex gap-5">
                <label class="w-full text-start">
                  <span class="pl-4 text-gray-500">Tỉnh/Thành phố</span
                  ><span class="text-red-600"> * </span>
                  <SelectVue
                    class="mt-1"
                    v-model:value="curResidenceCity"
                    :placeholder="`Thành phố`"
                    :options="cities.map((item) => item.Name)"
                    :disapled="false" />
                  <div class="px-3">
                    <p class="text-red-600 mt-5"></p>
                  </div>
                </label>
                <label class="w-full text-start">
                  <span class="pl-4 text-gray-500">Quận/Huyện</span
                  ><span class="text-red-600"> * </span>
                  <SelectVue
                    class="mt-1"
                    :placeholder="`Quận`"
                    v-model:value="curResidenceDistrist"
                    :options="districts.map((item) => item.Name)"
                    :disapled="curResidenceCity == null" />
                  <div class="px-3">
                    <p class="text-red-600 mt-5"></p>
                  </div>
                </label>
                <label class="w-full text-start">
                  <span class="pl-4 text-gray-500">Phường/Xã</span
                  ><span class="text-red-600"> * </span>
                  <SelectVue
                    class="mt-1"
                    :placeholder="`Phường/Xã`"
                    v-model:value="curResidenceWard"
                    :options="wards.map((item) => item.Name)"
                    :disapled="curResidenceDistrist == null" />
                  <div class="px-3">
                    <p class="text-red-600 mt-5"></p>
                  </div>
                </label>
              </div>
              <transition
                enter-active-class="ease-in-out duration-300"
                enter-from-class="h-0 opacity-0"
                enter-to-class="h-[20px] opacity-1"
                leave-active-class="ease-in-out duration-300"
                leave-from-class="h-[20px] opacity-1"
                leave-to-class="h-0 opacity-0">
                <div
                  v-show="!disabled[4]"
                  class="px-3 text-start">
                  <p class="text-red-600">
                    {{ msg["studentCurrentResidence"] }}
                  </p>
                </div>
              </transition>
            </div>
          </div>
          <div class="border rounded-[10px] shadow-card mt-5">
            <div
              class="flex items-center bg-gray-100 rounded-tl-[10px] rounded-tr-[10px] py-3">
              <p class="mx-3 text-[16px] text-blue-700">Thông tin người thân</p>
            </div>
            <div class="mt-5 mx-5">
              <div class="flex gap-5">
                <label class="w-full text-start">
                  <span class="pl-4 text-gray-500">Họ và tên</span
                  ><span class="text-red-600"> * </span>
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    class="input-text-default"
                    v-model="parentName" />
                  <div
                    v-show="disabled[5]"
                    class="h-[15px]"></div>
                  <transition
                    enter-active-class="ease-in-out duration-300"
                    enter-from-class="h-0 opacity-0"
                    enter-to-class="h-[20px] opacity-1"
                    leave-active-class="ease-in-out duration-300"
                    leave-from-class="h-[20px] opacity-1"
                    leave-to-class="h-0 opacity-0">
                    <div
                      v-show="!disabled[5]"
                      class="px-3 text-start my-2">
                      <p class="text-red-600">
                        {{ msg["parentName"] }}
                      </p>
                    </div>
                  </transition>
                </label>
                <label class="w-full text-start">
                  <span class="pl-4 text-gray-500">Quan hệ</span
                  ><span class="text-red-600"> * </span>
                  <SelectVue
                    :options="[`Bố`, `Mẹ`]"
                    :placeholder="`Quan hệ`"
                    v-model:value="relationship"
                    class="mt-1"></SelectVue>
                  <transition
                    enter-active-class="ease-in-out duration-300"
                    enter-from-class="h-0 opacity-0"
                    enter-to-class="h-[20px] opacity-1"
                    leave-active-class="ease-in-out duration-300"
                    leave-from-class="h-[20px] opacity-1"
                    leave-to-class="h-0 opacity-0">
                    <div
                      v-show="!disabled[6]"
                      class="px-3 text-start my-2">
                      <p class="text-red-600">
                        {{ msg["relationship"] }}
                      </p>
                    </div>
                  </transition>
                </label>
              </div>
              <div class="flex gap-5">
                <label class="w-full text-start">
                  <span class="pl-4 text-gray-500">Ngày sinh</span>
                  <VueDatePicker
                    class="mt-[5px]"
                    v-model="parentDateOfBirth" />
                  <div class="px-3">
                    <p class="text-red-600 mt-5"></p>
                  </div>
                </label>
                <label class="w-full text-start">
                  <span class="pl-4 text-gray-500">Nghề nghiệp</span>
                  <input
                    type="text"
                    placeholder="Điền nghề nghiệp"
                    class="input-text-default"
                    v-model="job" />
                  <div class="px-3">
                    <p class="text-red-600 mt-5"></p>
                  </div>
                </label>
              </div>
              <div class="flex gap-5">
                <label class="w-full text-start">
                  <span class="pl-4 text-gray-500">Số điện thoại</span
                  ><span class="text-red-600"> * </span>
                  <input
                    type="text"
                    placeholder="0xxx xxx xxx"
                    class="input-text-default"
                    v-model="phone" />
                  <div
                    v-show="disabled[7]"
                    class="h-[20px]"></div>
                  <transition
                    enter-active-class="ease-in-out duration-300"
                    enter-from-class="h-0 opacity-0"
                    enter-to-class="h-[20px] opacity-1"
                    leave-active-class="ease-in-out duration-300"
                    leave-from-class="h-[20px] opacity-1"
                    leave-to-class="h-0 opacity-0">
                    <div
                      v-show="!disabled[7]"
                      class="px-3 text-start my-2">
                      <p class="text-red-600">
                        {{ msg["phone"] }}
                      </p>
                    </div>
                  </transition>
                </label>
                <label class="w-full text-start">
                  <span class="pl-4 text-gray-500">Email (Nếu có)</span>
                  <input
                    type="text"
                    placeholder="example@gmail.com"
                    class="input-text-default"
                    v-model="email" />
                  <transition
                    enter-active-class="ease-in-out duration-300"
                    enter-from-class="h-0 opacity-0"
                    enter-to-class="h-[20px] opacity-1"
                    leave-active-class="ease-in-out duration-300"
                    leave-from-class="h-[20px] opacity-1"
                    leave-to-class="h-0 opacity-0">
                    <div
                      v-show="!disabled[8]"
                      class="px-3 text-start my-2">
                      <p class="text-red-600">
                        {{ msg["email"] }}
                      </p>
                    </div>
                  </transition>
                </label>
              </div>
            </div>
          </div>
          <div
            class="border rounded-[10px] shadow-card mt-5 mb-[50px] relative overflow-hidden">
            <div
              class="flex items-center bg-gray-100 rounded-tl-[10px] rounded-tr-[10px] py-3">
              <p class="mx-3 text-[16px] text-blue-700">Lớp đăng ký</p>
            </div>
            <div
              class="absolute w-full h-[30px] bottom-0 z-30 bg-gradient-to-b from-transparent to-gray-100/50"></div>
            <div class="py-5 px-5 overflow-y-auto max-h-96">
              <div class="w-full grid grid-cols-2 gap-3">
                <ClassItem
                  v-for="(item, idx) in sessionClasses"
                  :key="idx"
                  :value="item"
                  :selected="isSessionClassSelected(item.id)"
                  @click="chooseSessionClass(item)" />
              </div>
            </div>
          </div>
        </form>
      </div>
      <!-- {{ districts }} -->
      <div v-if="enrollmentSession == null">Vui lòng mở đợt dự tuyển mới</div>
    </template>
    <template #button>
      <div class="mt-1 ml-3">
        <ButtonCustom
          :width="36"
          :height="36"
          :title="`Xác nhận`"
          :icon="``"
          :radius="7"
          @click.prevent="handleSubmit()" />
      </div>
    </template>
  </PopUpLayout>
</template>
<script setup>
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
//Components
import PopUpLayout from "@/components/popup_layout.vue";
import ButtonCustom from "@/components/button.vue";
import SelectVue from "@/components/selects/dropdown_search_selected_box.vue";
import ClassItem from "../components/class_item.vue";
//Servives
import enrollmentService from "../../../services/enrollment.service";
import { isUser } from "../../../utils/resources/validator.js";
import axios from "axios";
import registrationService from "../../../services/registration.service";
import { yyyymmddDateString } from "../../../utils/resources/format_date.js";
import {
  isEmpty,
  isEmailValid,
  isPhoneValid,
} from "../../../utils/resources/check_valid.js";

const enrollmentSession = ref(null);
const user = ref(isUser());

const gender = ref(null);
const name = ref(null);
const dateOfBirth = ref(new Date());
const fork = ref(null);
const placeOfBirth = ref(null);
const nation = ref(null);
const curResidenceCity = ref(null);
const curResidenceDistrist = ref(null);
const curResidenceWard = ref(null);
const placeOfOriginCity = ref(null);
const placeOfOriginDistrist = ref(null);
const placeOfOriginWard = ref(null);
const parentName = ref(null);
const relationship = ref(null);
const parentDateOfBirth = ref(null);
const job = ref(null);
const phone = ref(null);
const email = ref(null);
//
const cities = ref([]);
const districts = ref([]);
const wards = ref([]);

let msg = ref([]);
let disabled = ref([true, true, true, true, true, true, true, true, true]);

const sessionClassSelected = ref(null);
const sessionClasses = ref([]);
const forkList = ref([
  "Kinh",
  "Tày",
  "Thái",
  "Mường",
  "H'Mông",
  "Dao",
  "Khơ Me",
  "Nùng",
  "H'rê",
  "Gia Rai",
  "Ê Đê",
  "Ba Na",
  "Xơ Đăng",
  "Sán Chay",
  "Cơ Tu",
  "Chăm",
  "Sán Dìu",
  "Hà Nhì",
  "Ra Glai",
  "La Chí",
  "M'Nông",
  "Chứt",
  "Xê Đăng",
  "Bru-Vân Kiều",
  "Giáy",
  "Cơ Ho",
  "Tà Ôi",
  "Co",
  "Ta Oi",
  "Kháng",
  "Co Lao",
  "La Ha",
  "Pu Péo",
  "Lự",
  "Ngái",
  "Pa Thẻn",
  "Lô Lô",
  "Chơ Ro",
  "Mảng",
  "Cờ Lao",
  "Bố Y",
  "La Hu",
  "Pà Thẻn",
  "Lào",
  "Mông",
  "Pơng",
  "Cống",
  "Si La",
  "Ơ Đu",
  "Mảng",
  "M'ngông",
  "Thổ",
]);

const emits = defineEmits(["add-toast", "close"]);

async function getEnrollmentSessionOpenning() {
  const response = await enrollmentService.getEnrollmentSessionsOpenning();

  console.log(response);

  if (response.status !== 200) {
    emits("add-toast", {
      title: "Tải trang thất bại.",
      type: 1,
    });
    return;
  }

  if (response.data.success) {
    enrollmentSession.value = response.data.data;
  }
}
async function getSessionClasses(value) {
  try {
    const response = await enrollmentService.getSessionClasses(value);
    sessionClasses.value = response.data.data;
    console.log(sessionClasses.value);
  } catch (error) {
    console.log(error);
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

function isSessionClassSelected(classId) {
  return sessionClassSelected.value?.id == classId;
}

function chooseSessionClass(value) {
  if (isSessionClassSelected(value.id)) {
    sessionClassSelected.value = null;
    return;
  }
  sessionClassSelected.value = value;
}

function validateStudentName(name) {
  if (isEmpty(name)) {
    msg.value["studentName"] = "Nhập tên học sinh";
    disabled.value[0] = false;
    return;
  }
  msg.value["studentName"] = "";
  disabled.value[0] = true;
}

function validateStudentGender(value) {
  if (isEmpty(value)) {
    msg.value["studentGender"] = "Chọn giới tính";
    disabled.value[1] = false;
    return;
  }
  msg.value["studentGender"] = "";
  disabled.value[1] = true;
}

function validateStudentDateOfBirth(value) {
  if (isEmpty(value)) {
    msg.value["studentDateOfBirth"] = "Vui lòng chọn ngày sinh";
    disabled.value[2] = false;
    return;
  }
  msg.value["studentDateOfBirth"] = "";
  disabled.value[2] = true;
}

function validateStudentPlaceOfOrigin(city, distrist, ward) {
  if (isEmpty(city) || isEmpty(distrist) || isEmpty(ward)) {
    msg.value["studentPlaceOfOrigin"] =
      "Vui lòng nhập đầy đủ thông tin địa chỉ";
    disabled.value[3] = false;
    return;
  }
  msg.value["studentPlaceOfOrigin"] = "";
  disabled.value[3] = true;
}

function validateStudentCurrentResidence(city, distrist, ward) {
  if (isEmpty(city) || isEmpty(distrist) || isEmpty(ward)) {
    msg.value["studentCurrentResidence"] =
      "Vui lòng nhập đầy đủ thông tin địa chỉ";
    disabled.value[4] = false;
    return;
  }
  msg.value["studentCurrentResidence"] = "";
  disabled.value[4] = true;
}

function validateParentName(parentName) {
  if (isEmpty(parentName)) {
    msg.value["parentName"] = "Nhập tên người thân!";
    disabled.value[5] = false;
    return;
  }
  msg.value["parentName"] = "";
  disabled.value[5] = true;
}

function validateRelationShip(value) {
  if (isEmpty(value)) {
    msg.value["relationship"] = "Vui lòng chọn";
    disabled.value[6] = false;
    return;
  }
  msg.value["relationship"] = "";
  disabled.value[6] = true;
}

function validatePhone(value) {
  if (isEmpty(value)) {
    msg.value["phone"] = "Vui lòng nhập số điện thoại liên hệ.";
    disabled.value[7] = false;
    return;
  }
  if (!isPhoneValid(value)) {
    msg.value["phone"] = "Số điện thoại không đúng định dạng.";
    disabled.value[7] = false;
    return;
  }
  msg.value["phone"] = "";
  disabled.value[7] = true;
}

function validateEmail(value) {
  if (isEmpty(value)) {
    msg.value["email"] = "";
    disabled.value[8] = true;
    return;
  }
  if (!isEmailValid(value)) {
    msg.value["email"] = "Email không đúng định dạng.";
    disabled.value[8] = false;
    console.log("false", disabled.value[8]);
    return;
  }
  msg.value["email"] = "";
  disabled.value[8] = true;
}

function checkValidation() {
  validateStudentName(name.value);
  validateStudentGender(gender.value);
  validateStudentDateOfBirth(dateOfBirth.value);
  validateStudentPlaceOfOrigin(
    placeOfOriginCity.value,
    placeOfOriginDistrist.value,
    placeOfOriginWard.value
  );
  validateStudentCurrentResidence(
    curResidenceCity.value,
    curResidenceDistrist.value,
    curResidenceWard.value
  );
  validateParentName(parentName.value);
  validateRelationShip(relationship.value);
  validatePhone(phone.value);
  validateEmail(email.value);

  return disabled.value.every((i) => i === true);
}

function handleSubmit() {
  if (!checkValidation()) return;
  handleCreateRegistration();
}

async function handleCreateRegistration() {
  try {
    const dataToSubmit = {
      student: {
        name: name.value,
        fork: fork.value,
        gender: gender.value == "Nam" ? 1 : 0,
        date_of_birth: yyyymmddDateString(
          new Date(dateOfBirth.value).toLocaleDateString()
        ),
        nation: nation.value,
        place_of_birth: placeOfBirth.value,
        address: `${curResidenceWard.value}, ${curResidenceDistrist.value}, ${curResidenceCity.value}`,
        place_of_origin: `${placeOfOriginWard.value}, ${placeOfOriginDistrist.value}, ${placeOfOriginCity.value}`,
      },
      parent: {
        name: parentName.value,
        relationship: relationship.value == "Bố" ? 0 : 1,
        date_of_birth: yyyymmddDateString(
          new Date(parentDateOfBirth.value).toLocaleDateString()
        ),
        phone: phone.value,
        email: email.value,
        job: job.value,
      },
      registration: {
        class_id: sessionClassSelected.value.id,
        session_id: enrollmentSession.value.id,
      },
    };
    console.log(dataToSubmit);

    const response = await registrationService.createRegistration(dataToSubmit);

    if (response.status != 200) {
      emits("add-toast", {
        title: "Thất bại!",
        type: 1,
        content: error.data.error || "Vui lòng thử lại.",
      });
      return;
    }
    emits("add-toast", { title: "Thành công!", type: 0 });
    emits("close");
  } catch (error) {
    emits("add-toast", {
      title: "Thất bại!",
      type: 1,
      content: error.data.error || "Vui lòng thử lại.",
    });
  }
}

watch(name, () => {
  validateStudentName(name.value);
});

watch(gender, () => {
  validateStudentGender(gender.value);
});

watch(dateOfBirth, () => {
  validateStudentDateOfBirth(dateOfBirth.value);
});

watch(phone, () => {
  validatePhone(phone.value);
});

watch(email, () => {
  validateEmail(email.value);
});

watch(parentName, () => {
  validateParentName(parentName.value);
});

watch(relationship, () => {
  validateRelationShip(relationship.value);
});

watch(curResidenceCity, () => {
  if (curResidenceCity.value == "" || !curResidenceCity.value) return;
  districts.value = cities.value.find(
    (item) => item.Name == curResidenceCity.value
  ).Districts;
  curResidenceDistrist.value = null;
  curResidenceWard.value = null;
});

watch(curResidenceDistrist, () => {
  if (curResidenceDistrist.value == "" || !curResidenceDistrist.value) return;
  wards.value = districts.value.find(
    (item) => item.Name == curResidenceDistrist.value
  ).Wards;
  curResidenceWard.value = null;
});

watch(curResidenceWard, () => {
  validateStudentCurrentResidence(
    curResidenceCity.value,
    curResidenceDistrist.value,
    curResidenceWard.value
  );
});

watch(placeOfOriginCity, () => {
  if (placeOfOriginCity.value == "" || !placeOfOriginCity.value) return;
  districts.value = cities.value.find(
    (item) => item.Name == placeOfOriginCity.value
  ).Districts;
  placeOfOriginDistrist.value = null;
  placeOfOriginWard.value = null;
});

watch(placeOfOriginDistrist, () => {
  if (placeOfOriginDistrist.value == "" || !placeOfOriginDistrist.value) return;
  wards.value = districts.value.find(
    (item) => item.Name == placeOfOriginDistrist.value
  ).Wards;
  placeOfOriginWard.value = null;
});

watch(placeOfOriginWard, () => {
  validateStudentPlaceOfOrigin(
    placeOfOriginCity.value,
    placeOfOriginDistrist.value,
    placeOfOriginWard.value
  );
});

onBeforeMount(async () => {
  await getEnrollmentSessionOpenning();
  await getSessionClasses(enrollmentSession.value?.id);
});
onMounted(async () => {
  await getAddress();
});
</script>
<style scoped>
.adada {
  position: relative;
}
.adada::before {
  content: "";
  background-color: aqua;
  width: 100%;
  height: 30px;
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 1;
}
.dp__theme_light {
  --dp-button-height: 45px;

  --dp-highlight-color: rgba(21, 117, 207, 0.2);
  --dp-border-radius: 5px;
  --dp-input-padding: 9px 30px 10px 12px;
  width: 350px;
}
</style>
