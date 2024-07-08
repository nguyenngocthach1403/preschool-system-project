<template>
  <PopupLayout
    :title="'Tạo món ăn'"
    @close="$emit('close')"
    class="absolute top-0 left-0"
  >
    <template #content>
      <div class="w-[600px]">
        <form @submit="createTimetable()" action="" class="px-10">
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
          <div class="text-start">
            <span>Thời gian kết thúc</span><span class="text-red-500"> (*)</span
            ><input
              v-model="endTime"
              type="time"
              class="input-text-default"
              :class="{ invalid: messageOfEndTime }"
            />
            <div class="h-[20px] my-1 text-red-500">{{ messageOfEndTime }}</div>
          </div>
          <div class="text-start">
            <span class="pl-2"> Chọn hoạt động</span>
            <span class="text-red-500"> (*)</span>
            <InputSearchSelect
              class="h-[50px] w-full rounded-md"
              :options="activities"
              :enable-sub="false"
              :has-data="hasData"
              @selected="activitiesSelected = $event"
              @scrollEnd="handleScrollEnd()"
              :class="{ invalid: messageOfSelected }"
            />
            <div class="h-[20px] my-1 text-red-500">
              {{ messageOfSelected }}
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
          @click="createTimetable()"
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
  </PopupLayout>
</template>
      
      <script setup>
import { onMounted, ref, watch } from "vue";
import PopupLayout from "../../../components/popup_layout.vue";
import InputSearchSelect from "../../../components/input_search_select.vue";
import { isEmpty, isValidTime } from "../../../utils/resources/check_valid";

//Service
import ScheduleService from "../../../services/schedule.service";
//list
const activities = ref([]);
const activitiesSelected = ref([]);

//   //model
const startTime = ref("");
const endTime = ref("");

const page = ref(0);
const hasData = ref(true);

const creating = ref(false);

//   //Message Valid
const messageOfStartTime = ref(null);
const messageOfEndTime = ref(null);
const messageOfSelected = ref(null);

//emits
const emits = defineEmits(["add-toast", "close"]);

//watch
watch(activitiesSelected, () => {
  if (activitiesSelected.value.length != 0) {
    messageOfSelected.value = null;
  }
});

watch(startTime, () => {
  if (!isEmpty(startTime.value)) {
    messageOfStartTime.value = null;
  }
});

watch(endTime, () => {
  if (!isEmpty(endTime.value)) {
    messageOfEndTime.value = null;
  }
});
//
async function fetchActivities(page) {
  if (!hasData.value) return;
  try {
    const response = await ScheduleService.fetchActivities(10, page);

    const dataResponse = response.data.data;

    activities.value = [
      ...(dataResponse.activities || []),
      ...activities.value,
    ];

    if (!dataResponse.activities || dataResponse.activities.length < 10)
      hasData.value = false;

    console.log(dataResponse);
  } catch (error) {
    console.log(error);
  }
}

function handleScrollEnd() {
  if (!hasData.value) return;
  page.value += 1;
  fetchActivities(page.value);
}

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
  if (activitiesSelected.value.length == 0) {
    messageOfSelected.value = "Vui lòng chọn hoạt động cho thời gian biểu.";
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

  return invalid;
}

////funciton
async function createTimetable() {
  if (checkValid()) return;

  creating.value = true;
  try {
    const timetableToCreate = {
      startTime: startTime.value,
      endTime: endTime.value,
      activities: activitiesSelected.value,
    };

    const reponse = ScheduleService.createTimetable(timetableToCreate);

    console.log(reponse);

    setTimeout(() => {
      emits("add-toast", {
        title: "Thành công!",
        type: 0,
      });

      emits("close", true);
    }, 1000);
  } catch (error) {
    emits("add-toast", {
      title: "Thất bại!",
      type: 1,
    });
  } finally {
    setTimeout(() => {
      creating.value = false;
    }, 1000);
  }
}

onMounted(async () => {
  await fetchActivities(page.value);
});
</script>
      
      <style  scoped>
.invalid {
  border: 1px solid red;
}
</style>