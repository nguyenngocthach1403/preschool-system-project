<template>
  <PopupLayout
    :title="'Thêm hoạt động'"
    @close="$emit('close')"
    class="absolute top-0 left-0"
  >
    <template #content>
      <div class="w-[800px] px-5">
        <div>
          <div
            class="w-full py-3 bg-white drop-shadow-xl rounded-md text-start px-5 my-2"
          >
            <span class="text-[19px] font-bold">{{
              getDayOfDate(new Date(props.dataToCreate.date).getDay())
            }}</span>
            <p>
              Ngày:
              <span class="font-bold">
                {{
                  ddmmyyyyDateString(
                    new Date(props.dataToCreate.date).toLocaleDateString()
                  )
                }}
              </span>
            </p>
            <p>
              Thời gian:
              <span class="font-bold">
                {{ props.dataToCreate.startTime }} -
                {{ props.dataToCreate.endTime }}
              </span>
            </p>
          </div>
        </div>
        <div class="w-full py-3 bg-white drop-shadow-xl rounded-md text-start">
          <form @submit="createSchedule()" action="" class="px-10">
            <div class="text-start">
              <span class="pl-2"> Chọn hoạt động</span>
              <span class="text-red-500"> (*)</span>
              <InputSearchSelect
                class="h-[50px] w-full rounded-md my-2"
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
      </div>
    </template>
    <template #button>
      <div
        id="button-side"
        class="w-full flex justify-center gap-5 basis-1/6 text-[14px]"
      >
        <button
          v-if="!creating"
          @click="createSchedule()"
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
import { onMounted, ref } from "vue";
import PopupLayout from "../../../components/popup_layout.vue";
import InputSearchSelect from "../../../components/input_search_select.vue";
import { isEmpty, isValidTime } from "../../../utils/resources/check_valid";

//Service
import ScheduleService from "../../../services/schedule.service";
import {
  ddmmyyyyDateString,
  getDayOfDate,
  yyyymmddDateString,
} from "../../../utils/resources/format_date";
//list
const activities = ref([]);
const activitiesSelected = ref([]);

const creating = ref(false);

const page = ref(0);
const hasData = ref(true);

//   //Message Valid
const messageOfSelected = ref(null);

//emits
const emits = defineEmits(["add-toast", "close"]);

const props = defineProps({
  dataToCreate: {
    type: Object,
    require: true,
  },
});

async function fetchActivities(page) {
  if (!hasData.value) return;
  try {
    const response = await ScheduleService.fetchActivities(10, page);

    const dataResponse = response.data.data;

    activities.value = [
      ...activities.value,
      ...(dataResponse.activities || []),
    ];

    if (!dataResponse.activities || dataResponse.activities.length < 10)
      hasData.value = false;

    console.log(dataResponse);
  } catch (error) {
    console.log(error);
  }
}

async function createSchedule() {
  try {
    if (activitiesSelected.value.length == 0) {
      emits("add-toast", { title: "Vui lòng chọn hoạt động", type: 1 });
      return;
    }
    creating.value = true;
    const dataToCreate = {
      dateId: props.dataToCreate.dateID,
      timetableId: props.dataToCreate.timetableId,
      date: yyyymmddDateString(
        new Date(props.dataToCreate.date).toLocaleDateString()
      ),
      startTime: props.dataToCreate.startTime,
      endTime: props.dataToCreate.endTime,
      activities: activitiesSelected.value,
    };

    const response = await ScheduleService.createSchedule(
      props.dataToCreate.classId,
      dataToCreate
    );

    emits("add-toast", { title: "Thành công!", type: 0 });
    setTimeout(() => {
      emits("close", true);
    }, 200);
  } catch (error) {
    emits("add-toast", { title: "Thất bại!", type: 1 });
  } finally {
    creating.value = false;
  }
}
function handleScrollEnd() {
  if (!hasData.value) return;
  page.value += 1;
  fetchActivities(page.value);
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