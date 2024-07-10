<template>
  <PopupLayout
    :title="'Tạo món ăn'"
    @close="$emit('close')"
    class="absolute top-0 left-0"
  >
    <template #content>
      <div class="w-[700px]">
        <form @submit="addNewTime()" action="" class="px-10">
          <div class="text-start">
            <span>Thời gian bắt đầu</span><span class="text-red-500"> (*)</span
            ><input
              v-model="startTime"
              type="time"
              class="input-text-default"
              :class="{ invalid: messageOfStartTime }"
            />
            <div class="h-[20px] my-1 text-red-500">
              {{ messageOfStartTime }}
            </div>
          </div>
          <div class="flex gap-3">
            <div class="text-start w-full">
              <span>Thời gian kết thúc</span
              ><span class="text-red-500"> (*)</span
              ><input
                v-model="endTime"
                type="time"
                class="input-text-default"
                :class="{ invalid: messageOfEndTime }"
              />
              <div class="h-[20px] my-1 text-red-500">
                {{ messageOfEndTime }}
              </div>
            </div>
            <div class="text-start w-[200px]">
              <span>Phút</span
              ><input type="number" class="input-text-default" v-model="min" />
            </div>
          </div>
        </form>
      </div>
    </template>
    <template #button>
      <div
        id="button-side"
        class="w-full flex justify-center gap-5 basis-1/6 text-[14px]"
      >
        <button
          v-if="!creating"
          @click.prevent="addNewTime()"
          type="submy"
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
  </PopupLayout>
</template>
        
        <script setup>
import { onMounted, ref, watch } from "vue";
import PopupLayout from "../../../components/popup_layout.vue";

//Service
import { isEmpty, isValidTime } from "../../../utils/resources/check_valid";

//   //model
const startTime = ref("");
const endTime = ref("");
const min = ref(0);

const creating = ref(false);

//
const messageOfEndTime = ref("");
const messageOfStartTime = ref("");

//emits
const emits = defineEmits(["add-toast", "close"]);

//watch
watch(startTime, () => {
  if (!isEmpty(startTime.value)) {
    messageOfStartTime.value = null;
  }
});
watch(min, () => {
  if (startTime.value && min.value != 0) {
    const [hours, minutes] = startTime.value.split(":").map(Number);

    console.log(hours, minutes);
    let totalMinutes = hours * 60 + minutes;
    // Bước 2: Cộng thêm số phút vào tổng số phút
    totalMinutes += min.value;
    // Bước 3: Chuyển đổi lại tổng số phút thành định dạng "hh:mm"
    const newHours = Math.floor(totalMinutes / 60) % 24; // Sử dụng % 24 để đảm bảo giờ không vượt quá 24
    const newMinutes = totalMinutes % 60;
    // Định dạng lại thành "hh:mm"
    const formattedHours = newHours.toString().padStart(2, "0");
    const formattedMinutes = newMinutes.toString().padStart(2, "0");
    endTime.value = `${formattedHours}:${formattedMinutes}`;
    console.log(`${formattedHours}:${formattedMinutes}`);
  } else {
    endTime.value = null;
  }
});
watch(endTime, () => {
  if (!isEmpty(endTime.value)) {
    messageOfEndTime.value = null;
  }
});
const props = defineProps({
  timetables: {
    type: Object,
    require: false,
  },
});

function checkValid() {
  let invalid = false;
  if (isEmpty(startTime.value)) {
    messageOfStartTime.value = "Vui lòng chọn thời gian bắt đầu.";
    invalid = true;
  }
  if (isEmpty(endTime.value)) {
    messageOfEndTime.value = "Vui lòng chọn thời gian kết thúc.";
    invalid = true;
  }
  if (!isValidTime(startTime.value) && !isEmpty(startTime.value)) {
    messageOfStartTime.value = "Thời gian chọn không hợp lệ!";
    invalid = true;
  }
  if (!isValidTime(endTime.value) && !isEmpty(endTime.value)) {
    messageOfEndTime.value = "Thời gian chọn không hợp lệ!";
    invalid = true;
  }

  if (
    endTime.value <= startTime.value &&
    !isEmpty(endTime.value) &&
    !isEmpty(startTime.value)
  ) {
    messageOfEndTime.value = "Thời gian chọn không hợp lệ!";
    messageOfStartTime.value = "Thời gian chọn không hợp lệ!";
    invalid = true;
  }

  if (props.timetables != undefined) {
    const isExitTime = props.timetables.some(
      (el) =>
        (el.start_time < startTime.value && el.end_time > startTime.value) ||
        (el.start_time < endTime.value && el.end_time > endTime.value) ||
        (el.start_time > startTime.value && el.end_time < endTime.value) ||
        (el.start_time < startTime.value && el.end_time > endTime.value)
    );

    if (isExitTime) {
      emits("add-toast", { title: "Khoảng thời gian đã tồn tại!", type: 1 });
      invalid = true;
    }
  }

  return invalid;
}

function addNewTime() {
  if (checkValid()) return;

  emits("close", { start_time: startTime.value, end_time: endTime.value });
}
onMounted(() => {
  if (props.timetables.length != 0)
    startTime.value = props.timetables[props.timetables.length - 1].end_time;
});
</script>
        
<style  scoped>
.invalid {
  border: 1px solid red;
}
</style>