<template>
  <div>
    <div
      class="inf w-fit absolute top-0 z-30 flex bg-white drop-shadow-xl gap-5 px-5 py-3 rounded-md"
      :style="{ top: y - 80 + 'px', left: x + 4 + 'px' }"
      v-if="teacherHover"
    >
      <img
        :src="teacherHover.teacher_avatar || avatar_default"
        class="w-10 h-10 rounded-full"
      />
      <div>
        <div>{{ teacherHover.teacher_name }}</div>
      </div>
    </div>
    <PopupCreateTime
      v-if="isShowCreate"
      class="absolute top-0 left-0"
      :timetables="timetables"
      @close="closeCreate($event)"
      @add-toast="$emit('add-toast', $event)"
    />
    <PopupDeleteConfirm
      class="absolute top-0 left-0"
      :content="`Bạn có muốn xóa khoảng thời gian ${isShowDelete.startTime} - ${isShowDelete.endTime}`"
      :value="{}"
      v-if="isShowDelete"
      @confirm="confirmDeleteTimeTabe($event)"
    />
    <PopupUpdateTimeTable
      v-if="isShowEdit"
      class="absolute top-0 left-0"
      :timetable-data="isShowEdit"
      @close="closeEdit($event)"
      @add-toast="$emit('add-toast', $event)"
    />
    <PopupAddTeacherSchedule
      v-if="isShowTeacherSchedule"
      class="absolute top-0 left-0"
      :schedule-data="isShowTeacherSchedule"
      @close="closeCreateTeacherForSchedule($event)"
      @add-toast="$emit('add-toast', $event)"
    />
    <PopupCreateSchedule
      v-if="isShowCreateSchedule"
      class="absolute top-0 left-0"
      @close="closeCreateSchedule($event)"
      @add-toast="$emit('add-toast', $event)"
      :data-to-create="isShowCreateSchedule"
    />
    <div class="py-4 px-7 text-start border-b flex justify-between">
      <span class="text-[20px] font-bold">Thời khóa biểu</span>
    </div>
    <div class="w-full flex items-center gap-5 mx-5">
      <div class="content-center flex items-center">
        <button
          @click="previousWeek()"
          class="px-5 border rounded-md hover:border-black active:scale-95"
        >
          <img :src="back" class="w-10 h-10" />
        </button>
        <select
          v-model="currentWeekSelect"
          class="w-[120px] h-10 rounded-md my-5 px-3 py-2 outline-none focus:ring-1 border border-white hover:border-white"
        >
          <option v-for="week in weekList" :key="week" :value="week">
            {{ week.name }}
          </option>
        </select>
        <button
          @click="nextWeek()"
          class="px-5 border rounded-md hover:border-black active:scale-95"
        >
          <img :src="forward" class="w-10 h-10" />
        </button>
      </div>
    </div>
    <LoadingComp v-if="loading" class="py-[300px]" />
    <ScheduleTable
      v-else
      class="drop-shadow"
      :timetables="timetables"
      :schedules="schedules"
      @add-new-time="isShowCreate = true"
      :week="currentWeekDisplay"
      @create="createSchedule($event)"
      @show-teacher="onFocusTeacher($event)"
      @add-teacher="isShowTeacherSchedule = $event"
      @edit="isShowEdit = $event"
      @delete-timetable="onDeleteTimeTable($event)"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import ScheduleTable from "../components/schedule_table.vue";
import PopupCreateTime from "../components/popup_create_timetable.vue";
import LoadingComp from "../../../components/loading_comp.vue";
import PopupCreateSchedule from "../components/popup_create_schedule.vue";
import PopupAddTeacherSchedule from "../components/popup_add_teacher_schedule.vue";
import PopupUpdateTimeTable from "../components/popup_edit_timetable.vue";
import PopupDeleteConfirm from "../../../components/confirm_dialog.vue";

import forward from "../../../assets/icons/Forward.svg";
import back from "../../../assets/icons/Back.svg";
import avatar_default from "../../../assets/img/avatar.jpg";

//Service
import ClassService from "../../../services/class.service";
import ScheduleService from "../../../services/schedule.service";
import {
  ddmmyyyyDateString,
  yyyymmddDateString,
} from "../../../utils/resources/format_date";
import { useRouter } from "vue-router";

const router = useRouter();

const weekList = ref([]);
const currentWeekSelect = ref(null);
const currentWeekSelectIndex = ref(0);
const currentWeekDisplay = ref([]);

//
const timetables = ref([
  { start_time: "13:00", end_time: "15:00" },
  { start_time: "10:00", end_time: "12:00" },
  { start_time: "08:00", end_time: "10:00" },
]);

const teacherHover = ref(null);

const x = ref(0);
const y = ref(0);

//
const isShowCreate = ref(false);
const loading = ref(false);
const isShowCreateSchedule = ref(false);
const isShowTeacherSchedule = ref(false);
const isShowEdit = ref(false);
const isShowDelete = ref(false);

//valliable
const classData = ref(null);
const schedules = ref([]);

const emits = defineEmits(["add-toast"]);

//watch
watch(classData, () => {
  weekList.value = getWeekList(
    classData.value.start_date,
    classData.value.end_date
  );
});

watch(weekList, () => {
  if (!currentWeekSelect.value) {
    currentWeekSelect.value =
      getCurrentWeekOfWeekList(weekList.value) || weekList.value[0];
  }
});

watch(currentWeekSelect, () => {
  currentWeekSelectIndex.value = weekList.value.findIndex(
    (e) => e.name == currentWeekSelect.value.name
  );
  currentWeekDisplay.value = getDayOfWeek(
    currentWeekSelect.value.start,
    currentWeekSelect.value.end
  );

  fetchSchedule(
    classData.value.id,
    currentWeekSelect.value.start,
    currentWeekSelect.value.end
  );
});

watch(schedules, () => {
  timetables.value = getTimesWithMostEntries(schedules.value);
});

const getTimesWithMostEntries = (schedule) => {
  let maxEntries = 0;
  let times = [];

  for (const date in schedule) {
    if (schedule[date].timetable) {
      const entries = Object.keys(schedule[date].timetable).length;
      if (entries > maxEntries) {
        maxEntries = entries;
        times = [];
        for (const period in schedule[date].timetable) {
          const { start_time, end_time, activities, teacher_name, id } =
            schedule[date].timetable[period];
          times.push({
            start_time,
            end_time,
          });
        }
      }
    }
  }

  return times;
};

function onFocusTeacher(event) {
  if (event) {
    teacherHover.value = event.teacher;
    x.value = event.event.clientX;
    y.value = event.event.clientY;
  } else {
    teacherHover.value = null;
  }
}

function createSchedule(data) {
  data.classId = router.currentRoute.value.query.classID;
  isShowCreateSchedule.value = data;
}
function getCurrentWeekOfWeekList(weekList) {
  return weekList.find(
    (e) => new Date(e.start) <= new Date() && new Date() <= new Date(e.end)
  );
}
function nextWeek() {
  if (currentWeekSelectIndex.value < weekList.value.length) {
    currentWeekSelectIndex.value = currentWeekSelectIndex.value + 1;
    currentWeekSelect.value = weekList.value[currentWeekSelectIndex.value];
  }
}
function previousWeek() {
  if (currentWeekSelectIndex.value > 0) {
    currentWeekSelectIndex.value = currentWeekSelectIndex.value - 1;
    currentWeekSelect.value = weekList.value[currentWeekSelectIndex.value];
  }
}

function getDayOfWeek(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const days = [];
  let current = new Date(start);

  while (current <= end) {
    console.log(current.getDay());
    days.push({
      name: getDayOfDate(current.getDay()),
      date: current,
    });
    current = new Date(current.setDate(current.getDate() + 1));
  }

  return days;
}

function getDayOfDate(day) {
  switch (day) {
    case 6:
      return "Chủ nhật";
    case 0:
      return "Thứ 2";
    case 1:
      return "Thứ 3";
    case 2:
      return "Thứ 4";
    case 3:
      return "Thứ 5";
    case 4:
      return "Thứ 6";
    case 5:
      return "Thứ 7";
  }
}

/**
 * Phương thức lấy danh sách các tuần
 * @param {String} startDate
 * @param {String} endDate
 */
function getWeekList(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const weeks = [];
  let current = new Date(start);
  let weekIndex = 1;
  while (current <= end) {
    const weekStart = new Date(current);
    const weekEnd = new Date(current);
    const a = weekStart.getDay();
    weekEnd.setDate(weekEnd.getDate() + (a != 0 ? 7 - a : 6));
    if (weekEnd > end) {
      weekEnd.setDate(end.getDate());
    }

    weeks.push({
      name: "Tuần " + weekIndex,
      start: weekStart.toISOString().split("T")[0],
      end: weekEnd.toISOString().split("T")[0],
    });

    current.setDate(current.getDate() + (a != 0 ? 8 - a : 7));
    weekIndex = weekIndex + 1;
  }

  return weeks;
}

//funciton
function closeCreate(result) {
  if (result) {
    timetables.value.push(result);
  }
  isShowCreate.value = false;
}
function closeCreateTeacherForSchedule(result) {
  if (result) {
    fetchSchedule(
      classData.value.id,
      currentWeekSelect.value.start,
      currentWeekSelect.value.end
    );
  }
  isShowTeacherSchedule.value = false;
}
/**
 * Phương thức lấy lớp học theo mã lớp
 * @param {interger} classId
 */
async function fetchClassById(classId) {
  loading.value = true;
  try {
    const response = await ClassService.getClassById(classId);

    const dataResponse = response.data;

    console.log(dataResponse);

    return dataResponse.data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

async function confirmDeleteTimeTabe(result) {
  if (result) {
    const dataToDelete = {
      startTime: isShowDelete.value.startTime,
      endTime: isShowDelete.value.endTime,
      startDate: yyyymmddDateString(
        new Date(currentWeekDisplay.value[0].date).toLocaleDateString()
      ),
      endDate: yyyymmddDateString(
        new Date(
          currentWeekDisplay.value[currentWeekDisplay.value.length - 1].date
        ).toLocaleDateString()
      ),
    };

    deleTimetable(dataToDelete);
  }
  isShowDelete.value = false;
}

async function deleTimetable(dataToDelete) {
  if (!classData.value.id) return;
  try {
    await ScheduleService.deleteTimetableOfWeek(
      classData.value.id,
      dataToDelete
    );
    emits("add-toast", {
      title: "Thành công!",
      type: 0,
    });
  } catch (error) {
    console.log(error);
    emits("add-toast", {
      title: "Thất bại!",
      content: error,
      type: 1,
    });
  }
}
async function fetchSchedule(classId, startDate, endDate) {
  try {
    if (loading.value) return;
    loading.value = true;
    const response = await ScheduleService.fetchSchedules(
      classId,
      startDate,
      endDate
    );

    const dataresponse = response.data.data;

    schedules.value = dataresponse.schedules || [];
    console.log(response);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

function onDeleteTimeTable(timetable) {
  isShowDelete.value = timetable;
}

function closeCreateSchedule(result) {
  if (result) {
    fetchSchedule(
      classData.value.id,
      currentWeekSelect.value.start,
      currentWeekSelect.value.end
    );
  }
  isShowCreateSchedule.value = false;
}
function closeEdit(result) {
  if (result) {
    fetchSchedule(
      classData.value.id,
      currentWeekSelect.value.start,
      currentWeekSelect.value.end
    );
  }
  isShowEdit.value = false;
}

onMounted(async () => {
  const classId = router.currentRoute.value.query.classID;
  if (classId) classData.value = await fetchClassById(classId);
});
</script>

<style scoped>
th,
td {
  border: 1px solid;
  padding: 10px 10px;
}
</style>