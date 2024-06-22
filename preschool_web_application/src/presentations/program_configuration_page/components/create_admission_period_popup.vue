<template>
  <LayoutPopup
    @close="exit"
    class="absolute top-0 right-0 z-40"
    :title="'Tạo kỳ tuyển sinh'"
  >
    <template #content>
      <form @submit.prevent="submitCreateAdmission()" class="px-20 text-start">
        <section>
          <label for=""
            ><span class="pl-2">Tên đợt</span>
            <input
              type="text"
              class="input-text-default"
              placeholder="Nhập tên đợt tuyển sinh"
          /></label>
        </section>
        <section class="flex gap-5 my-5">
          <div class="w-full">
            <label for=""
              ><span class="pl-2">Thời gian bắt đầu</span>
              <VueDatePicker></VueDatePicker>
            </label>
          </div>
          <div class="w-full">
            <label for=""
              ><span class="pl-2">Thời gian kết thúc</span>
              <VueDatePicker></VueDatePicker>
            </label>
          </div>
        </section>
      </form>
    </template>
    <template #bottom>
      <div
        id="button-side"
        class="w-full flex my-2 justify-center gap-5 basis-1/6 text-[14px]"
      >
        <button
          type="button"
          @click="exit()"
          class="h-[35px] my-[5px] border border-[#3B44D1] hover:bg-blue-400/50 hover:text-[#3B44D1] hover:border-white text-black px-[25px] rounded-md"
        >
          Hủy
        </button>
        <button
          v-if="!creating"
          @click="handleSubmitAddNewClass()"
          type="button"
          class="h-[35px] my-[5px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md ]"
        >
          Thêm
        </button>

        <button
          v-if="creating"
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
        </button>
      </div>
    </template>
  </LayoutPopup>
</template>

<script setup>
import { ref } from "vue";
import LayoutPopup from "../../../components/edit_and_create_layout.vue";
import { isEmpty } from "../../../utils/resources/check_valid";

const admissionName = ref("");
const admissionStartDate = ref(new Date());
const admissionEndDate = ref(new Date());

const messageOfAdmissionName = ref("");

//Statemanager
const creating = ref(false);

//emit
const emits = defineEmits(["add-toast", "close"]);

//Function
function checkValidInput() {
  let invalid = false;
  if (isEmpty(admissionName.value)) {
    invalid = true;
  }

  return invalid;
}

function submitCreateAdmission() {
  if (checkValidInput()) return;
  alert("created");
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