<template>
  <div class="calendar bg-white rounded-lg shadow-lg p-4 w-[1250px]">
    <div
      class="calendar-header flex justify-between items-center mb-4 bg-[#CCFFFF] h-[50px]"
    >
      <button
        @click="prevMonth"
        class="text-white bg-[#6EC2F7] rounded-md px-3 py-1"
      >
        &lt;
      </button>
      <h2 class="text-xl font-semibold">
        {{ currentMonth + 1 }} / {{ currentYear }}
      </h2>
      <button
        @click="nextMonth"
        class="text-white bg-[#6EC2F7] rounded-md px-3 py-1"
      >
        &gt;
      </button>
    </div>
    <div class="calendar-body">
      <div class="weekdays grid grid-cols-7 gap-1 mb-4">
        <span class="text-center">Mon</span>
        <span class="text-center">Tue</span>
        <span class="text-center">Wed</span>
        <span class="text-center">Thu</span>
        <span class="text-center">Fri</span>
        <span class="text-center">Sat</span>
        <span class="text-center">Sun</span>
      </div>
      <div class="days grid grid-cols-7 gap-1 h-[800px]">
        <div
          v-for="(day, index) in DaysInMonth"
          :key="index"
          class="day bg-white rounded-lg shadow-md p-2 text-center border border-gray-200 text-end"
        >
          {{ day.date }}
          <div v-if="day.classes.length > 0" class="mt-4 text-center">
            <div v-for="cls in day.classes" :key="cls.id">
              <p>{{ cls.name }}</p>
            </div>
          </div>
          <div v-else>
            {{ day.date }}
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
import { isUser } from "../../../utils/resources/validator";

const ClassData = ref([]);
const currentDate = new Date();
const currentMonth = ref(currentDate.getMonth());
const currentYear = ref(currentDate.getFullYear());

onMounted(async () => {
  await getSchedule();
});

async function getSchedule() {
  const user = isUser();
  if (!user) return;

  const accountId = user.id;
  const response = await accountService.getTeacherById(accountId);
  const teacherId = response.data[0].TeacherId;
  const result = await teacherService.getSchedule(teacherId);
  ClassData.value = result.data.data;
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
  const classes = ClassData.value.filter((cls) => {
    const startDate = new Date(cls.start_date);
    const endDate = new Date(cls.end_date);
    return date >= startDate && date <= endDate;
  });

  return classes;
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

<style scoped></style>
