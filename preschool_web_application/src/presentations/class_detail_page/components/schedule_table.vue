<template>
  <div class="">
    <EmptyBox v-if="!props.week" class="py-10" />
    <table v-else class="w-full schedule">
      <thead>
        <tr>
          <th>NGÀY HỌC</th>
          <th
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
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="time in timetable" :key="time">
          <td class="text-center px-3 py-1 w-[160px] bg-gray-300 relative">
            {{ time.start_time }} - {{ time.end_time }}
            <div
              @click="onClickDeleteTimetable(time.start_time, time.end_time)"
              class="w-6 h-6 p-[4px] rounded-md overflow-hidden drop-shadow-xl absolute top-1 right-1 active:scale-95 hover:border hover:border-black"
            >
              <img :src="delete_icon" class="h-full w-full" />
            </div>
          </td>
          <td
            v-for="day in props.week"
            :key="day"
            class="hover:bg-gray-200 max-w-32"
          >
            <div
              v-if="getSchedule(day.date, time.start_time, time.end_time)"
              class="flex justify-center gap-3 flex-wrap relative h-[80px] items-center"
            >
              <div
                @click="onClickEdit(day.date, time.start_time, time.end_time)"
                class="w-6 h-6 border rounded-md absolute drop-shadow-xl content-center top-[-5px] right-[-5px] hover:border-black"
              >
                <img :src="menu_icon" class="m-auto" />
              </div>
              <div
                v-if="getTeacher(day.date, time.start_time, time.end_time)"
                class="absolute bottom-[-5px] left-0 flex"
                @mouseleave="$emit('show-teacher')"
              >
                <div
                  v-for="teacher in getTeacher(
                    day.date,
                    time.start_time,
                    time.end_time
                  )"
                  :key="teacher"
                  @mouseenter="
                    $emit('show-teacher', {
                      event: $event,
                      teacher: teacher,
                    })
                  "
                  class="w-7 h-7 border rounded-full overflow-hidden drop-shadow-xl hover:border-black"
                >
                  <img
                    :src="teacher.teacher_avatar || avatar_default"
                    class="h-full w-full"
                  />
                </div>
              </div>
              <div
                v-else
                @click="
                  onClickAddTeacherForSchedule(
                    day.date,
                    time.start_time,
                    time.end_time
                  )
                "
                class="w-7 h-7 p-2 border rounded-full overflow-hidden drop-shadow-xl absolute bottom-[-5px] left-0 hover:border-black"
              >
                <img :src="plus_icon" class="h-full w-full" />
              </div>
              <span
                v-for="item in getSchedule(
                  day.date,
                  time.start_time,
                  time.end_time
                )"
                :key="item"
              >
                {{ item.activity_name + " " }}
              </span>
            </div>
            <div v-else class="h-[90px] rounded-md">
              <button
                @click="onClickCell(day.date, time.start_time, time.end_time)"
                class="w-full h-full bg-gray-200 cursor-default active:bg-gray-100"
              >
                Thêm
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <td
            class="text-center opacity-50 hover:opacity-100"
            @click="$emit('add-new-time')"
            colspan="8"
          >
            <img :src="plus_icon" class="w-4 m-auto" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
  <script setup>
import { computed, ref } from "vue";
//component
import PopCreateTime from "../components/popup_create_timetable.vue";
import EmptyBox from "../../../components/empty_data.vue";

//icon
import plus_icon from "../../../assets/icons/plus.svg";
import menu_icon from "../../../assets/icons/edit.svg";
import avatar_default from "../../../assets/img/avatar.jpg";
import delete_icon from "../../../assets/icons/delete.svg";

const a = ref([]);

//service
import { ddmmyyyyDateString } from "../../../utils/resources/format_date";

const props = defineProps({
  schedules: {
    type: Object,
    require: true,
  },
  timetables: {
    type: Object,
    require: true,
  },
  week: {
    type: Object,
    require: true,
  },
});

const emits = defineEmits([
  "create",
  "add-teacher",
  "edit",
  "delete-timetable",
]);

const timetable = computed(() => {
  return props.timetables.sort((a, b) => {
    return a.start_time.localeCompare(b.start_time);
  });
});

function getTeacher(date, startTime, endTime) {
  if (props.schedules.length == 0) return;

  if (!props.schedules[ddmmyyyyDateString(new Date(date).toLocaleDateString())])
    return;

  if (
    !props.schedules[ddmmyyyyDateString(new Date(date).toLocaleDateString())]
      .timetable
  )
    return;

  if (
    !props.schedules[ddmmyyyyDateString(new Date(date).toLocaleDateString())]
      .timetable[startTime + "-" + endTime]
  )
    return;
  if (
    !props.schedules[ddmmyyyyDateString(new Date(date).toLocaleDateString())]
      .timetable[startTime + "-" + endTime].teachers
  )
    return;

  return props.schedules[
    ddmmyyyyDateString(new Date(date).toLocaleDateString())
  ].timetable[startTime + "-" + endTime].teachers;
  // return {
  //   teacherId:
  //     props.schedules[ddmmyyyyDateString(new Date(date).toLocaleDateString())]
  //       .timetable[startTime + "-" + endTime].teacher_id,
  //   teacherName:
  //     props.schedules[ddmmyyyyDateString(new Date(date).toLocaleDateString())]
  //       .timetable[startTime + "-" + endTime].teacher_name,
  //   teacherAvatar:
  //     props.schedules[ddmmyyyyDateString(new Date(date).toLocaleDateString())]
  //       .timetable[startTime + "-" + endTime].teacher_avatar,
  // };
}
function getSchedule(date, start_time, end_time) {
  if (props.schedules.length == 0) return;

  if (!props.schedules[ddmmyyyyDateString(new Date(date).toLocaleDateString())])
    return;

  if (
    !props.schedules[ddmmyyyyDateString(new Date(date).toLocaleDateString())]
      .timetable
  )
    return;

  if (
    !props.schedules[ddmmyyyyDateString(new Date(date).toLocaleDateString())]
      .timetable[start_time + "-" + end_time]
  )
    return;
  if (
    !props.schedules[ddmmyyyyDateString(new Date(date).toLocaleDateString())]
      .timetable[start_time + "-" + end_time].activities
  )
    return;
  return props.schedules[
    ddmmyyyyDateString(new Date(date).toLocaleDateString())
  ].timetable[start_time + "-" + end_time].activities;
}

function getDateIds(date) {
  return (
    props.schedules[ddmmyyyyDateString(new Date(date).toLocaleDateString())] ||
    undefined
  );
}

function getTimetableIds(date, start_time, end_time) {
  if (!props.schedules) return;

  if (!props.schedules[ddmmyyyyDateString(new Date(date).toLocaleDateString())])
    return undefined;

  if (
    !props.schedules[ddmmyyyyDateString(new Date(date).toLocaleDateString())]
      .timetable
  )
    return;

  if (
    !props.schedules[ddmmyyyyDateString(new Date(date).toLocaleDateString())]
      .timetable[start_time + "-" + end_time]
  )
    return;

  return props.schedules[
    ddmmyyyyDateString(new Date(date).toLocaleDateString())
  ].timetable[start_time + "-" + end_time];
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

function onClickAddTeacherForSchedule(date, startTime, endTime) {
  const timeTable = getTimetableIds(date, startTime, endTime);
  emits("add-teacher", {
    date,
    timeTable,
  });
}
function onClickDeleteTimetable(startTime, endTime) {
  emits("delete-timetable", {
    startTime: startTime,
    endTime: endTime,
  });
}

function onClickEdit(date, startTime, endTime) {
  const timeTable = getTimetableIds(date, startTime, endTime);
  emits("edit", {
    date,
    timeTable,
  });
}
</script>
  
  <style scoped>
th,
td {
  border: 1px solid;
  padding: 10px 10px;
}
.schedule th {
  background-color: #3b44d1;
  color: #fff;
}
</style>