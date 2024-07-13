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
            class="w-full py-3 bg-white drop-shadow rounded-md text-start px-5 my-2"
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
        <div class="w-full py-3 bg-white drop-shadow rounded-md text-start">
          <form @submit="createSchedule()" action="" class="px-10">
            <div class="text-start">
              <span class="pl-2"> Chọn hoạt động</span>
              <span class="text-red-500"> (*)</span>
              <InputSearchSelect
                class="h-[50px] w-full rounded-md my-2"
                :options="activities"
                :enable-sub="false"
                :has-data="hasDataActivity"
                :loading="activityLoading"
                :value="searchTextAct"
                @selected="activitiesSelected = $event"
                @scrollEnd="handleScrollEnd()"
                @newValue="getSearchTextAct($event)"
                :class="{ invalid: messageOfSelected }"
              />
              <div class="h-[20px] my-1 text-red-500">
                {{ messageOfSelected }}
              </div>
            </div>
            <SearchForm
              @passSearchText="getSearchText($event)"
              :value="searchText"
            />
            <div class="border w-full rounded-md h-[200px]">
              <LoadingComp v-if="loading" />
              <div v-else class="h-full">
                <EmptyBox v-if="teachers.length == 0" />
                <div v-else class="h-full">
                  <ul
                    @scroll="handleScroll($event)"
                    class="w-full overflow-y-auto h-full"
                  >
                    <li
                      v-for="teacher in teachers"
                      :key="teacher"
                      class="px-5 py-2 flex justify-between items-center"
                      @click="onSelect(teacher)"
                      :class="{
                        selected: teacherSelected.some(
                          (e) => e.id == teacher.id
                        ),
                      }"
                    >
                      <div class="flex items-center gap-4">
                        <img
                          :src="teacher.avatar || avatar_default"
                          class="w-10 h-10 rounded-full"
                        />
                        <div>
                          {{ teacher.name }}
                        </div>
                      </div>
                      <svg
                        v-if="teacherSelected.some((e) => e.id == teacher.id)"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0,0,256,256"
                        class="w-5 h-5"
                      >
                        <g
                          fill="#000000"
                          fill-rule="nonzero"
                          stroke="none"
                          stroke-width="1"
                          stroke-linecap="butt"
                          stroke-linejoin="miter"
                          stroke-miterlimit="10"
                          stroke-dasharray=""
                          stroke-dashoffset="0"
                          font-family="none"
                          font-weight="none"
                          font-size="none"
                          text-anchor="none"
                          style="mix-blend-mode: normal"
                        >
                          <g transform="scale(8.53333,8.53333)">
                            <path
                              d="M26.98047,5.99023c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-15.29297,15.29297l-6.29297,-6.29297c-0.25082,-0.26124 -0.62327,-0.36647 -0.97371,-0.27511c-0.35044,0.09136 -0.62411,0.36503 -0.71547,0.71547c-0.09136,0.35044 0.01388,0.72289 0.27511,0.97371l7,7c0.39053,0.39037 1.02353,0.39037 1.41406,0l16,-16c0.29576,-0.28749 0.38469,-0.72707 0.22393,-1.10691c-0.16075,-0.37985 -0.53821,-0.62204 -0.9505,-0.60988z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </li>
                  </ul>
                </div>
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
import SearchForm from "../../../components/search_form_comp.vue";
import EmptyBox from "../../../components/empty_data.vue";
import LoadingComp from "../../../components/loading_comp.vue";
import InputSearchSelect from "../../../components/input_search_select.vue";
import { isEmpty, isValidTime } from "../../../utils/resources/check_valid";
//icon
import avatar_default from "../../../assets/img/avatar.jpg";
//Service
import ScheduleService from "../../../services/schedule.service";
import TeacherService from "../../../services/teacher.service";
import {
  ddmmyyyyDateString,
  getDayOfDate,
  yyyymmddDateString,
} from "../../../utils/resources/format_date";
//list
const activities = ref([]);
const activitiesSelected = ref([]);
const teachers = ref([]);
const teacherSelected = ref([]);
const creating = ref(false);

const page = ref(0);
const hasData = ref(true);
const loading = ref(false);
const searchTextAct = ref("");
const searchText = ref("");

const pageActivity = ref(0);
const activityLoading = ref(false);
const hasDataActivity = ref(true);
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
function getSearchTextAct(text) {
  if (searchText.value != text) {
    searchText.value = text;
    page.value = 0;
    hasData.value = true;
    activities.value = [];
    searchActivities(searchText.value, page.value);
  }
}
async function fetchActivities(page) {
  if (!hasDataActivity.value) return;
  try {
    activityLoading.value = true;
    const response = await ScheduleService.fetchActivities(10, page);

    const dataResponse = response.data.data;

    activities.value = [
      ...activities.value,
      ...(dataResponse.activities || []),
    ];

    if (!dataResponse.activities || dataResponse.activities.length < 10)
      hasDataActivity.value = false;

    console.log(dataResponse);
  } catch (error) {
    console.log(error);
  } finally {
    activityLoading.value = false;
  }
}
async function searchActivities(searchText, page) {
  if (!hasData.value) return;
  try {
    loading.value = true;
    const response = await ScheduleService.searchActivities(
      searchText,
      10,
      page
    );

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
  } finally {
    loading.value = false;
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
      teachers: teacherSelected.value,
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
    console.log("a", error.code);
    emits("add-toast", {
      title: "Thất bại!",
      content: error.response.data.error,
      type: 1,
    });
  } finally {
    creating.value = false;
  }
}
function handleScrollEnd() {
  if (!hasDataActivity.value) return;
  pageActivity.value += 1;
  if (searchText.value != "") {
    searchActivities(searchTextAct.value, page.value);
  } else {
    fetchActivities(pageActivity.value);
  }
}
function handleScroll() {
  console.log("aaaa");
}
function getSearchText(text) {
  if (searchText.value != text) {
    searchText.value = text;
    page.value = 0;
    hasData.value = true;
    teachers.value = [];
    if (searchText.value) {
      fetchSearchTeacher(page.value);
    } else {
      fetchTeacher(page.value);
    }
  }
}
async function fetchTeacher(page) {
  if (loading.value || !hasData.value) return;
  try {
    loading.value = true;

    const response = await TeacherService.getTeacher(page, 10);

    const dataResponse = response.data;

    teachers.value = [...teachers.value, ...dataResponse.data];

    if (dataResponse.data.length < 10) {
      hasData.value = false;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
async function fetchSearchTeacher(page) {
  if (loading.value || !hasData.value) return;
  try {
    loading.value = true;

    const response = await TeacherService.search(searchText.value, page, 10);

    const dataResponse = response.data;

    if (dataResponse.status != 404) {
      teachers.value = [...teachers.value, ...dataResponse.data];
    }

    if (dataResponse.data.length < 10) {
      hasData.value = false;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
function onSelect(teacher) {
  const index = teacherSelected.value.findIndex((tea) => tea.id == teacher.id);

  if (index != -1) {
    teacherSelected.value.splice(index, 1);
  } else {
    teacherSelected.value.push(teacher);
  }
}
onMounted(() => {
  fetchTeacher(page.value);
  fetchActivities(pageActivity.value);
});
</script>
      
      <style  scoped>
.invalid {
  border: 1px solid red;
}
.selected {
  background-color: rgb(226, 226, 226);
}
</style>