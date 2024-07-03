<template>
  <div class="calendar bg-white rounded-lg shadow-lg p-4 w-[1250px]">
    <div class="calendar-header flex justify-between items-center mb-4">
      <button
        @click="prevMonth"
        class="text-white bg-blue-500 rounded-md px-3 py-1"
      >
        &lt;
      </button>
      <h2 class="text-xl font-semibold">
        {{ currentMonth + 1 }} / {{ currentYear }}
      </h2>
      <button
        @click="nextMonth"
        class="text-white bg-blue-500 rounded-md px-3 py-1"
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
          v-for="day in DaysInMonth"
          :key="day.date"
          class="day bg-white rounded-lg shadow-md p-2 text-center border border-gray-200"
        >
          {{ day.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const currentDate = new Date();
const currentMonth = ref(currentDate.getMonth());
const currentYear = ref(currentDate.getFullYear());

const DaysInMonth = computed(() => {
  const days = [];
  const firstDayOfMonth = new Date(
    currentYear.value,
    currentMonth.value,
    1
  ).getDay(); // Lấy ngày trong tuần của ngày đầu tiên trong tháng
  const daysInMonth = new Date(
    currentYear.value,
    currentMonth.value + 1,
    0
  ).getDate();

  // Đếm ngày trống ở đầu tháng (nếu ngày đầu tiên không phải là Chủ Nhật)
  let emptyDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Thêm các ngày trống vào đầu tháng
  for (let i = 0; i < emptyDays; i++) {
    days.push({
      date: null,
    });
  }

  // Thêm các ngày trong tháng
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: i,
    });
  }

  return days;
});

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
