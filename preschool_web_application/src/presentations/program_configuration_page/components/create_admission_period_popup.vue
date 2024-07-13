<template>
  <LayoutPopup
    @close="exit()"
    class="absolute top-0 right-0 z-20"
    :title="'Tạo kỳ tuyển sinh'"
  >
    <template #content>
      <div class="w-[700px]">
        <form class="px-20 text-start">
          <section>
            <label for=""
              ><span class="pl-2">Tên đợt</span>
              <span class="text-red-600"> (*) </span>
              <input
                type="text"
                class="input-text-default"
                v-model="admissionName"
                placeholder="Nhập tên đợt tuyển sinh"
            /></label>
            <div class="h-5 pt-1 text-red-600">
              <span>{{ messageOfAdmissionName }}</span>
            </div>
          </section>
          <section class="my-5">
            <div class="flex gap-5">
              <div class="w-full">
                <label for=""
                  ><span class="pl-2">Thời gian bắt đầu</span
                  ><span class="text-red-600"> (*) </span>
                  <VueDatePicker
                    :enable-time-picker="false"
                    v-model="admissionStartDate"
                  ></VueDatePicker>
                </label>
              </div>
              <div class="w-full">
                <label for=""
                  ><span class="pl-2">Thời gian kết thúc</span
                  ><span class="text-red-600"> (*) </span>
                  <VueDatePicker
                    :enable-time-picker="false"
                    v-model="admissionEndDate"
                  ></VueDatePicker>
                </label>
              </div>
            </div>
            <div class="h-5 pt-1 text-red-600">
              <span>{{ messageOfAdmissionDate }}</span>
            </div>
          </section>
          <section class="flex gap-5 my-5">
            <div class="w-full">
              <label for=""
                ><span class="pl-2">Trạng thái</span
                ><span class="text-red-600"> (*) </span>
                <select class="input-text-default" v-model="admissionStatus">
                  <option value="0">Đóng</option>
                  <option value="1">Mở</option>
                </select>
              </label>
            </div>
          </section>
        </form>
      </div>
    </template>
    <template #button
      ><button
        v-if="!loading"
        @click="submitCreateAdmission()"
        type="button"
        class="h-[35px] my-[5px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md"
      >
        Thêm
      </button>
      <button
        v-if="loading"
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
      </button></template
    >
  </LayoutPopup>
</template>

<script setup>
import { ref, watch } from "vue";
import LayoutPopup from "../../../components/popup_layout.vue";
import { isEmpty } from "../../../utils/resources/check_valid";

//service
import admissionService from "../../../services/admission_period.service";
import { yyyymmddDateString } from "../../../utils/resources/format_date";
import { isUser } from "../../../utils/resources/validator";

//Model
const admissionName = ref("");
const admissionStartDate = ref(new Date());
const admissionEndDate = ref(new Date());
const admissionStatus = ref(0);
//Message invalid
const messageOfAdmissionName = ref("");
const messageOfAdmissionDate = ref("");

//Statemanager
const loading = ref(false);

//emit watch
const emits = defineEmits(["add-toast", "close"]);

watch(admissionName, (newValue) => {
  if (!isEmpty(newValue)) {
    messageOfAdmissionName.value = "";
  }
});

watch(admissionStartDate, () => {
  if (
    !isEmpty(admissionStartDate.value) &&
    !isEmpty(admissionStartDate.value)
  ) {
    if (admissionEndDate.value <= admissionStartDate.value) {
      return;
    }
    if (
      admissionEndDate.value < new Date() ||
      admissionStartDate.value.getUTCDate < new Date().getUTCDate
    ) {
      return;
    }
    messageOfAdmissionDate.value = "";
  }
});

watch(admissionEndDate, () => {
  if (
    !isEmpty(admissionStartDate.value) &&
    !isEmpty(admissionStartDate.value)
  ) {
    if (admissionEndDate.value <= admissionStartDate.value) {
      return;
    }
    if (
      admissionEndDate.value < new Date() ||
      admissionStartDate.value.getUTCDate < new Date().getUTCDate
    ) {
      return;
    }
    messageOfAdmissionDate.value = "";
  }
});

//Function
function checkValidInput() {
  let invalid = false;
  if (isEmpty(admissionName.value)) {
    invalid = true;
    messageOfAdmissionName.value = "Tên đợt không được bỏ trống.";
  }
  if (
    isEmpty(admissionStartDate.value) &&
    isEmpty(admissionEndDate.value) &&
    admissionEndDate.value <= admissionStartDate.value
  ) {
    invalid = true;
    messageOfAdmissionDate.value = "Không được bỏ trống.";
  }
  if (!isEmpty(admissionStartDate.value) && !isEmpty(admissionEndDate.value)) {
    if (admissionEndDate.value <= admissionStartDate.value) {
      invalid = true;
      messageOfAdmissionDate.value = "Ngày kết thúc phải lớn hơn ngày bắt đầu.";
    } else if (
      admissionEndDate.value < new Date() ||
      admissionStartDate.value.getUTCDate < new Date().getUTCDate
    ) {
      invalid = true;
      messageOfAdmissionDate.value = "Thời gian phải lớn hơn ngày hiện tại.";
    }
  }
  return invalid;
}

async function submitCreateAdmission() {
  if (checkValidInput()) {
    return;
  }
  const user = isUser();
  loading.value = true;

  const dataToCreate = {
    name: admissionName.value,
    startDate: yyyymmddDateString(
      new Date(admissionStartDate.value).toLocaleDateString()
    ),
    endDate: yyyymmddDateString(
      new Date(admissionEndDate.value).toLocaleDateString()
    ),
    status: admissionStatus.value,
    accountId: user.id,
  };

  const response = await admissionService.createAddmissionPeriod(dataToCreate);

  alert("a");
  loading.value = false;

  console.log(response);

  if (!response.data.success) {
    emits("add-toast", {
      title: "Tạo thất bại.",
      content: response.data.error,
      type: 1,
    });
    return;
  }

  emits("add-toast", {
    title: "Tạo thành công.",
    type: 0,
  });
  exit();
}

function exit() {
  setTimeout(() => {
    emits("close");
  }, 200);
}
</script>

<style  scoped>
.dp__theme_light {
  --dp-button-height: 35px;
  --dp-border-radius: 5px;
  --dp-input-padding: 8px 30px 10px 12px;
  width: 100%;
  margin: 8px 0px;
}
</style>