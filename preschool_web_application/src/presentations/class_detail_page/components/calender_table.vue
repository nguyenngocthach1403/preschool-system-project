<template>
  <div>
    <EmptyBox v-if="!props.week" class="py-10" />
    <div v-else>
      <!--Header-->
      <div class="w-full flex items-center">
        <div class="schedule h-[70px]">
          <div
            class="min-w-32 h-[70px] content-center text-[15px] border border-gray-300"
          >
            NGÀY HỌC
          </div>
        </div>
        <div
          class="w-full h-[70px] schedule content-center border border-gray-300"
          v-for="day in props.week"
          :key="day.date"
          :class="{
            'current-date':
              day.date.toDateString() == new Date().toDateString(),
          }"
        >
          {{ day.name }}
          <div class="text-[13px] text-gray-300">
            {{ ddmmyyyyDateString(day.date.toLocaleDateString()) }}
          </div>
        </div>
      </div>
      <!--body-->
      <div class="w-full flex items-center">
        <div class="border-l min-w-32 time-slots">
          <div
            v-for="item in timeList"
            :key="item"
            class="time-slot border-b text-[14px] border-gray-300"
          >
            {{ item.startTime }} - {{ item.endTime }}
          </div>
        </div>
        <div
          class="border-l w-full relative"
          v-for="day in props.week"
          :key="day.date"
        >
          <div
            v-for="item in timeList"
            :key="item"
            class="h-[70px] border-b border-gray-300"
            :class="{
              select: isSelectTime({ start: item.startTime, date: day.date }),
            }"
          >
            <button
              @click="
                selectTimeInTable({
                  start: item.startTime,
                  end: item.endTime,
                  date: day.date,
                })
              "
              class="h-full w-full"
            ></button>
          </div>
          <div
            v-for="item in getEventByDate(day.date)"
            :key="item.id"
            :style="getEventStyle(item)"
            class="absolute bg-[#007bff] border border-white top-0 w-full text-white text-start rounded-md px-2 py-1"
          >
            <div class="w-full h-full relative">
              <div class="w-full text-[13px] flex justify-between">
                <span>{{ item.start }} - {{ item.end }}</span>
                <button
                  v-if="isShowEdit"
                  @click="onClickEdit(day.date, item.start, item.end)"
                  class="w-6 h-6 p-[2px] rounded-full hover:border hover:border-white"
                >
                  <img :src="edit_icon" alt="edit" class="w-full h-full" />
                </button>
              </div>
              <div class="w-full text-[15px] pr-10 overflow-hidden">
                <div v-for="activity in item.activities" :key="activity">
                  {{ activity.activity_name }}
                </div>
              </div>

              <div
                v-if="item.teachers.length != 0"
                @mouseleave="$emit('show-teacher')"
                class="absolute bottom-[1px] right-[-2px] flex"
              >
                <div
                  v-for="(teacher, index) in item.teachers"
                  :key="index"
                  @mouseenter="
                    $emit('show-teacher', {
                      event: $event,
                      teacher: teacher,
                    })
                  "
                  class="w-6 h-6 border rounded-full overflow-hidden drop-shadow-xl hover:border-black"
                >
                  <img
                    :src="teacher.teacher_avatar || avatar_default"
                    class="h-full w-full"
                  />
                </div>
              </div>
              <div
                v-if="isShowEdit && item.teachers.length == 0"
                @click="
                  $emit('add-teacher', {
                    date: item.date,
                    timeTable: {
                      id: item.timetableId,
                      start_time: item.start,
                      end_time: item.end,
                    },
                  })
                "
                class="w-5 h-5 p-[2px] border rounded-full overflow-hidden drop-shadow-xl absolute bottom-[1px] right-[-2px] hover:border-black"
              >
                <img :src="plus_icon" class="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import EmptyBox from "../../../components/empty_data.vue";
import { ddmmyyyyDateString } from "../../../utils/resources/format_date";
//icon
import edit_icon from "../../../assets/icons/Editwhite.svg";
import plus_icon from "../../../assets/icons/pls.svg";
import avatar_default from "../../../assets/img/avatar.jpg";

const times = ref({ startTime: "05:00", endTime: "24:00" });
const period = computed(() => {
  return props.period;
});

// const events = computed(() => {
//   return flatJsonSchedule(props.schedules);
// });

const timeSelected = ref([]);

const props = defineProps({
  week: {
    type: Object,
    require: true,
  },
  schedules: {
    type: Object,
    require: true,
  },
  period: {
    type: Number,
    require: false,
  },
  isShowEdit: {
    type: Boolean,
    require: false,
  },
});
const emits = defineEmits(["create", "show-teacher", "edit"]);

const timeList = computed(() => {
  return getTimeList(times.value.startTime, times.value.endTime, period.value);
});

function selectTimeInTable(item) {
  const a = timeSelected.value.findIndex(
    (el) =>
      new Date(el.date).toDateString() == new Date(item.date).toDateString() &&
      getTotalMinute(el.start) == getTotalMinute(item.start)
  );
  if (a != -1) {
    const compareTime = (time1, time2) => {
      const [hours1, minutes1] = time1.split(":").map(Number);
      const [hours2, minutes2] = time2.split(":").map(Number);
      if (hours1 !== hours2) return hours1 - hours2;
      return minutes1 - minutes2;
    };

    // Tìm phần tử có start nhỏ nhất
    const earliestStart = timeSelected.value.reduce(
      (earliest, current) =>
        compareTime(current.start, earliest.start) < 0 ? current : earliest,
      timeSelected.value[0]
    ).start;

    // Tìm phần tử có end lớn nhất
    const latestEnd = timeSelected.value.reduce(
      (latest, current) =>
        compareTime(current.end, latest.end) > 0 ? current : latest,
      timeSelected.value[0]
    ).end;
    // const firstStartSelect = timeSelected.value.fin
    onClickCell(item.date, earliestStart, latestEnd);
  } else {
    const b = timeSelected.value.findIndex(
      (el) =>
        new Date(el.date).toDateString() ==
          new Date(item.date).toDateString() &&
        (getTotalMinute(el.start) == getTotalMinute(item.end) ||
          getTotalMinute(el.end) == getTotalMinute(item.start))
    );
    if (b == -1 && timeSelected.value.length !== 0) {
      timeSelected.value = [];
      timeSelected.value.push(item);
    } else {
      timeSelected.value.push(item);
    }
  }
}

function getDateIds(date) {
  return (
    props.schedules[ddmmyyyyDateString(new Date(date).toLocaleDateString())] ||
    undefined
  );
}
function getTimetableIds(date, start_time, end_time) {
  const timetable = props.schedules.find(
    (e) =>
      new Date(e.date).toDateString() == new Date(date).toDateString() &&
      e.start == start_time &&
      e.end == end_time
  );

  return timetable || undefined;
}

function onClickEdit(date, startTime, endTime) {
  const timeTable = getTimetableIds(date, startTime, endTime);
  emits("edit", {
    date,
    timeTable,
  });
}
function onClickCell(date, startTime, endTime) {
  const dateId = getDateIds(date);
  const timetableId = getTimetableIds(date, startTime, endTime);
  emits("create", {
    date,
    startTime,
    endTime,
    dateID: dateId ? dateId.id : undefined,
    timetableId: timetableId ? timetableId.id : undefined,
  });
}

function isSelectTime(item) {
  const a = timeSelected.value.find(
    (el) =>
      new Date(el.date).toDateString() == new Date(item.date).toDateString() &&
      getTotalMinute(el.start) == getTotalMinute(item.start)
  );

  if (a) {
    return true;
  }
  return false;
}

function getTotalMinute(time) {
  const [startHour, startMinute] = time.split(":").map(Number);
  const totalStartMinute = startHour * 60 + startMinute;
  return totalStartMinute;
}

function getTimeList(startTime, endTime, period) {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const totalStartMinute = startHour * 60 + startMinute;

  const [endHour, endMinute] = endTime.split(":").map(Number);

  const totalEndMinute = endHour * 60 + endMinute;

  let current = totalStartMinute;

  let timeList = [];
  let index = 0;

  while (current < totalEndMinute) {
    const newStartHours = Math.floor(current / 60) % 24;
    const newStartMinutes = current % 60;

    let startTime = getFormatTime(newStartHours, newStartMinutes);

    current += period;

    const newEndHours = Math.floor(current / 60) % 24;
    const newEndMinutes = current % 60;

    let endTime = getFormatTime(newEndHours, newEndMinutes);

    timeList.push({ startTime, endTime });
  }

  return timeList;
}
function getEventByDate(date) {
  return props.schedules.filter(
    (e) => new Date(date).toDateString() == new Date(e.date).toDateString()
  );
}
function getEventStyle(item) {
  const [startHour, startMinute] = item.start.split(":").map(Number);
  const [endHour, endMinute] = item.end.split(":").map(Number);

  // Mỗi 15 phút là 50px
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  const [startCalendarHour, startCalendarMinute] = times.value.startTime
    .split(":")
    .map(Number);
  const startCalenderTotalMinutes =
    startCalendarHour * 60 + startCalendarMinute;

  const top =
    (startTotalMinutes * 70) / period.value -
    (startCalenderTotalMinutes / period.value) * 70;
  const height = ((endTotalMinutes - startTotalMinutes) / period.value) * 70;

  return {
    top: `${top}px`,
    height: `${height}px`,
  };
}

function getFormatTime(newHours, newMinutes) {
  const formattedHours = newHours.toString().padStart(2, "0");
  const formattedMinutes = newMinutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

/**
 *
 * @param {Object} schedules
 */
function flatJsonSchedule(schedules) {
  let events = [];
  for (const schedule in schedules) {
    const timetables = schedules[schedule].timetable;
    if (timetables) {
      for (const timetable in timetables) {
        events.push({
          scheduleId: schedules[schedule].id,
          date: schedules[schedule].date,
          start: timetables[timetable].start_time,
          end: timetables[timetable].end_time,
          activities: timetables[timetable].activities || [],
          teachers: timetables[timetable].teachers || [],
          timetableId: timetables[timetable].id,
        });
      }
    } else {
      events.push({
        scheduleId: schedules[schedule].id,
        date: schedules[schedule].date,
        activities: [],
        teachers: [],
      });
    }
  }
  return events;
}

onMounted(() => {});
</script>

<style scoped>
.time-slot {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.schedule {
  background-color: #3b44d1;
  color: #fff;
}
.events {
  flex-grow: 1;
  position: relative;
}

.time-slots {
  width: 50px;
  border-right: 1px solid #ccc;
}

.time-slot {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
.current-date {
  background-color: rgb(70, 68, 169) !important;
}
.select {
  background-color: rgb(46, 45, 133) !important;
  border: none;
  box-shadow: 7px 7px 15px 2px rgba(0, 0, 0, 0.3);
}
.select::before {
  content: "";
}
</style>