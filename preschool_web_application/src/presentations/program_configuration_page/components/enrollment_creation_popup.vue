<template>
  <LayoutPopup
    @close="exit()"
    class="absolute top-0 right-0 z-20"
    :title="'Tạo kỳ tuyển sinh'"
    :width="currentWidth - 1000">
    <template #content>
      <div>
        <form class="px-20 text-start">
          <section>
            <label for=""
              ><span class="pl-2">Tên đợt</span>
              <span class="text-red-600"> (*) </span>
              <input
                type="text"
                class="input-text-default"
                v-model="enrollmentName"
                placeholder="Nhập tên đợt tuyển sinh"
            /></label>
            <div class="h-5 pt-1 text-red-600 text-[14px]">
              <span>{{ msg["name"] }}</span>
            </div>
          </section>
          <section class="mt-3">
            <div class="flex gap-5">
              <div class="w-full">
                <label for=""
                  ><span class="pl-2">Thời gian bắt đầu</span
                  ><span class="text-red-600"> (*) </span>
                  <VueDatePicker
                    :enable-time-picker="false"
                    v-model="enrollmentStartDate"></VueDatePicker>
                </label>
              </div>
              <div class="w-full">
                <label for=""
                  ><span class="pl-2">Thời gian kết thúc</span
                  ><span class="text-red-600"> (*) </span>
                  <VueDatePicker
                    :enable-time-picker="false"
                    v-model="enrollmentEndDate"></VueDatePicker>
                </label>
              </div>
            </div>
            <div class="text-red-600 text-[14px]">
              <span>{{ msg["time"] }}</span>
            </div>
          </section>
          <section class="flex gap-5 mt-3">
            <div class="w-full">
              <label for=""
                ><span class="pl-2">Trạng thái</span
                ><span class="text-red-600"> (*) </span>
                <select
                  class="input-text-default"
                  v-model="enrollmentStatus">
                  <option value="0">Đóng</option>
                  <option value="1">Mở</option>
                </select>
              </label>
            </div>
          </section>
          <section class="mt-3">
            <div class="w-full h-fit">
              <div
                class="flex justify-end gap-2 content-center h-[45px] mb-2 items-center relative text-[14px] font-[350]">
                <div
                  class="absolute left-0 text-center border rounded-[5px] py-2 px-3 flex items-center gap-2">
                  <CheckBox
                    v-model:value="isSelectClasses"
                    :disabled="true" />
                  <span>{{ classesSelected.length }} Selected</span>
                </div>
                <Search
                  :height="35"
                  :fontSize="14" />
                <Button
                  :title="`Filter`"
                  :height="35"
                  :width="35"
                  :icon="filterIcon"
                  @click.prevent="" />
                <AddButton
                  :height="35"
                  :width="35"
                  @click.prevent="" />
              </div>
              <div class="text-red-600 text-[14px]">
                <span>{{ msg["sessionClasses"] }}</span>
              </div>
              <div class="w-full h-[310px] mt-2">
                <LoadingComp v-if="fetchClassState" />
                <ClassTable
                  v-if="!fetchClassState"
                  :classes="classes"
                  :classes-selected="classesSelected"
                  @select="getClassesSelected($event)" />
              </div>
            </div>
          </section>
        </form>
      </div>
    </template>
    <template #button
      ><button
        v-if="!loading"
        @click="onSubmitAction()"
        type="button"
        class="h-[35px] my-[5px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md">
        Thêm
      </button>
      <button
        v-if="loading"
        type="button"
        class="h-[35px] basis-1/11 rounded-md my-[5px] w-fit outline-none border-[0.12rem] focus:border-blue-500 px-4 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
        disabled>
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing...
      </button></template
    >
  </LayoutPopup>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

//Asset
import filterIcon from "@/assets/icons/fillter_white.svg";

//Components
import Search from "@/components/search_form_comp.vue";
import LayoutPopup from "../../../components/popup_layout.vue";
import AddButton from "@/components/create_button.vue";
import Button from "@/components/button.vue";
import ClassTable from "../components/class _table.vue";
import LoadingComp from "../../../components/loading_comp.vue";
import CheckBox from "@/components/checkbox.vue";

//service
import classesService from "../../../services/class.service.js";
import admissionService from "../../../services/enrollment.service.js";
import { yyyymmddDateString } from "../../../utils/resources/format_date.js";
import { isUser } from "../../../utils/resources/validator.js";
import { isEmpty } from "../../../utils/resources/check_valid.js";

//Model
const enrollmentName = ref("");
const enrollmentStartDate = ref(new Date());
const enrollmentEndDate = ref(new Date());
const enrollmentStatus = ref(0);

let classesSelected = ref([]);
//Message invalid
let msg = ref([]);
let disabled = ref([true, true, true]);

//Statemanager
let loading = ref(false);
let fetchClassState = ref(false);
let isSelectClasses = ref(classesSelected.value.length != 0);

let classes = ref([]);

let currentWidth = ref(window.innerWidth);

onMounted(async () => {
  await getSessionClasses();
});

//emit watch
const emits = defineEmits(["add-toast", "close"]);

onMounted(() => {
  window.addEventListener("resize", () => {
    currentWidth.value = window.innerWidth;
  });
});

watch(enrollmentName, () => {
  validateEnrollmentName(enrollmentName.value);
});

watch(enrollmentStartDate, () => {
  validateEnrollmentTime(enrollmentStartDate.value, enrollmentEndDate.value);
});

watch(enrollmentEndDate, () => {
  validateEnrollmentTime(enrollmentStartDate.value, enrollmentEndDate.value);
});

watch(classesSelected, (newVal, oldVal) => {
  console.log("asdasdsgfgdgs");
  isSelectClasses.value = classesSelected.value.length != 0;
  validateSessionClasses(classesSelected.value);
});

//Action
function onSubmitAction() {
  if (!checkValidation()) {
    return;
  }
  console.log("submit");

  submitCreatingEnrollmentSessions();
}

//Function
async function getSessionClasses() {
  fetchClassState.value = true;
  try {
    let response = await classesService.fetchClass(10, 0);
    let classesData = response.data;
    classes.value = classesData.data;
    console.log(classes.value);
  } catch (error) {
    console.log(error);
  } finally {
    fetchClassState.value = false;
  }
}

function setLoadingState(value) {
  loading.value = value;
}

function validateEnrollmentName(value) {
  if (isEmpty(value)) {
    msg.value["name"] = "Không được bỏ trống.";
    disabled.value = [false, disabled.value[1], disabled.value[2]];
  } else {
    msg.value["name"] = null;
    disabled.value = [true, disabled.value[1], disabled.value[2]];
  }
}

function validateEnrollmentTime(startDate, endDate) {
  if (isEmpty(startDate) || isEmpty(endDate)) {
    msg.value["time"] = "Không được bỏ trống.";
    disabled.value = [disabled.value[0], false, disabled.value[2]];
    return;
  }
  if (startDate.getUTCDate() >= endDate.getUTCDate()) {
    msg.value["time"] = "Ngày kết thúc phải lớn hơn ngày bắt đầu.";
    disabled.value = [disabled.value[0], false, disabled.value[2]];
    return;
  }
  if (endDate < new Date() || startDate.getUTCDate < new Date().getUTCDate) {
    msg.value["time"] = "Thời gian phải lớn hơn ngày hiện tại.";
    disabled.value = [disabled.value[0], false, disabled.value[2]];
    return;
  }
  msg.value["time"] = null;
  disabled.value = [disabled.value[0], true, disabled.value[2]];
}
function validateSessionClasses(classes) {
  console.log(classes);

  if (classes.length == 0) {
    msg.value["sessionClasses"] = "Vui lòng chọn lớp cần tuyển sinh";
    disabled.value = [disabled.value[0], disabled.value[1], false];
    return;
  }
  msg.value["sessionClasses"] = null;
  disabled.value = [disabled.value[0], disabled.value[1], true];
}

function checkValidation() {
  validateEnrollmentName(enrollmentName.value);
  validateEnrollmentTime(enrollmentStartDate.value, enrollmentEndDate.value);
  validateSessionClasses(classesSelected.value);

  return disabled.value.every((i) => i === true);
}

async function submitCreatingEnrollmentSessions() {
  setLoadingState(true);

  try {
    const dataToCreate = {
      name: enrollmentName.value,
      startDate: yyyymmddDateString(
        new Date(enrollmentStartDate.value).toLocaleDateString()
      ),
      endDate: yyyymmddDateString(
        new Date(enrollmentEndDate.value).toLocaleDateString()
      ),
      status: enrollmentStatus.value,
      enrollmentClasses: classesSelected.value.map((item) => item.id),
    };

    console.log(`Data to create ${dataToCreate}`);

    const response = await admissionService.createEnrollmentSessions(
      dataToCreate
    );

    console.log(response);

    emits("add-toast", {
      title: "Tạo thành công.",
      type: 0,
    });
    exit();
  } catch (error) {
    console.log(error);

    emits("add-toast", {
      title: "Tạo thất bại.",
      content: error.response.error || "Thất bại",
      type: 1,
    });
  } finally {
    setLoadingState(false);
  }
}

function getClassesSelected(classes) {
  classesSelected.value = classes;
  isSelectClasses.value = classesSelected.value.length != 0;
  validateSessionClasses(classesSelected.value);
}

function exit() {
  setTimeout(() => {
    emits("close");
  }, 200);
}
</script>

<style scoped>
.dp__theme_light {
  --dp-button-height: 35px;
  --dp-border-radius: 5px;
  --dp-input-padding: 8px 30px 10px 12px;
  width: 100%;
  margin: 8px 0px;
}
</style>
