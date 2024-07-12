<template>
  <div class="calendar bg-white rounded-lg shadow-lg p-4 w-[1250px]">
    <div
      class="calendar-header flex justify-between items-center mb-4 bg-[#6EC2F7] h-[50px]"
    >
      <button
        @click="prevMonth"
        class="text-white bg-[#3399FF] rounded-md px-3 py-1 h-[50px] w-[40px]"
      >
        &lt;
      </button>
      <h2 class="text-xl font-semibold text-white">
        Tháng {{ currentMonth + 1 }} / {{ currentYear }}
      </h2>
      <button
        @click="nextMonth"
        class="text-white bg-[#3399FF] rounded-md px-3 py-1 h-[50px] w-[40px]"
      >
        &gt;
      </button>
    </div>
    <div class="calendar-body">
      <div class="weekdays grid grid-cols-7 gap-1 mb-4">
        <span class="text-center">Thứ 2</span>
        <span class="text-center">Thứ 3</span>
        <span class="text-center">Thứ 4</span>
        <span class="text-center">Thứ 5</span>
        <span class="text-center">Thứ 6</span>
        <span class="text-center">Thứ 7</span>
        <span class="text-center">Chủ nhật</span>
      </div>
      <div class="days grid grid-cols-7 gap-1 h-full">
        <div
          v-for="(day, index) in DaysInMonth"
          :key="index"
          class="day bg-white rounded-lg shadow-md p-2 text-center border border-gray-200 text-end"
        >
          <div v-if="day.date">
            <p>{{ day.date }}</p>
            <div
              v-for="cls in day.classes"
              :key="cls.ScheduleId"
              class="class-item text-[14px] text-left mt-1"
            >
              <div class="items-center">
                <div>
                  <span class="font-semibold">{{ cls.ClassName }}</span>
                  <p>{{ cls.start_time }} - {{ cls.end_time }}</p>
                </div>
                <div class="mt-1">
                  <p v-if="cls.activities.length > 0">
                    <span class="font-semibold">Công việc: </span>
                    <span
                      v-for="(activity, activityIndex) in cls.activities"
                      :key="activity.ActivityID"
                    >
                      {{ activity.ActivitiName
                      }}{{
                        activityIndex < cls.activities.length - 1 ? ", " : ""
                      }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import teacherService from "../../../services/teacher.service";
import accountService from "../../../services/account.service";
import ScheduleService from "../../../services/schedule.service";
const ClassData = ref([]);
const currentDate = new Date();
const currentMonth = ref(currentDate.getMonth());
const currentYear = ref(currentDate.getFullYear());
const teacherId = ref("");
onMounted(async () => {
  // await getSchedule();
  await getTeacher();
  await fetchSchedule(teacherId.value);
});

async function fetchSchedule(teacherId, startDate, endDate) {
  try {
    const response = await ScheduleService.fetchSchedulesTeacherLogin(
      teacherId
    );
    // console.log(response.data);
    ClassData.value = response.data.data;
    console.log(ClassData.value);
  } catch (error) {
    console.log(error);
  }
}

async function getTeacher() {
  // const accountId = window.user.id;
  const accountId = JSON.parse(localStorage.getItem("user")).id;
  const response = await accountService.getTeacherById(accountId);

  console.log(response);

  const result = response.data[0];
  teacherId.value = result.TeacherId;
}

const DaysInMonth = computed(() => {
  const days = [];
  const firstDayOfMonth = new Date(
    currentYear.value,
    currentMonth.value,
    1
  ).getDay();
  const daysInMonth = new Date(
    currentYear.value,
    currentMonth.value + 1,
    0
  ).getDate();

  let emptyDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  for (let i = 0; i < emptyDays; i++) {
    days.push({
      date: null,
      classes: [],
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = new Date(currentYear.value, currentMonth.value, i);
    const classes = getClassesForDate(currentDate);
    days.push({
      date: i,
      classes: classes,
    });
  }

  return days;
});

function getClassesForDate(date) {
  // const classes = ClassData.value.filter((cls) => {
  //   const startDate = new Date(cls.start_date);
  //   const endDate = new Date(cls.end_date);
  //   return date >= startDate && date <= endDate;
  // });

  // return classes;
  const formattedDate = date.toISOString().split("T")[0];

  // Unwrap the actual array from the Proxy
  const classes = ClassData.value.map((item) => item);

  // Now you can safely filter the array
  const filteredClasses = classes.filter((cls) => {
    return cls.Date.split("T")[0] === formattedDate;
  });

  return filteredClasses;
}

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else {
    currentMonth.value -= 1;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }
};
</script>

<style scoped>
.class-item {
  margin-bottom: 1rem; /* Khoảng cách giữa các lớp học */
}

.class-item:not(:last-child) {
  border-bottom: 1px dashed #ccc; /* Đường kẻ mờ */
  padding-bottom: 1rem; /* Khoảng cách từ đường kẻ mờ đến lớp học tiếp theo */
  margin-bottom: 1rem; /* Khoảng cách giữa các lớp học */
}

.items-center > :not(:last-child) {
  margin-right: 0.5rem;
}
.day {
  min-height: 150px;
}
</style>
