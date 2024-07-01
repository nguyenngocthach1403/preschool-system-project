
<template>
  <div class="schedule rounded-xl overflow-hidden border border-gray-300">
    <table>
      <thead>
        <tr>
          <th>Bữa ăn</th>
          <th
            v-for="day in calculatedDays"
            :key="day.date"
            :class="{ 'current-date': day.isNow }"
          >
            {{ day.label }}
            <div class="text-[13px] text-gray-300">{{ day.date }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="meal in meals" :key="meal.id">
          <td class="bg-blue-800 text-white">
            {{ meal.name }}<br />{{ meal.start_time }} - {{ meal.end_date }}
          </td>
          <td v-for="day in calculatedDays" :key="day.date">
            <div
              v-if="
                weeklyMenu.daily_menu[day.date] &&
                weeklyMenu.daily_menu[day.date].meals
              "
            >
              <div
                v-for="dish in weeklyMenu.daily_menu[day.date].meals[
                  `${meal.id}`
                ].menu"
                :key="dish.dish_id"
              >
                <div class="meal-info">
                  <div>{{ dish.dish_name }}</div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="meal-info">
                <div>Chưa có</div>
                <button
                  @click="addDish(day.label, meal.id)"
                  class="add-dish-button"
                >
                  Thêm món ăn
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script setup>
import moment from "moment";
import { computed, ref } from "vue";
const weeklyMenu = ref({
  id: 1,
  daily_menu: {
    "01/07/2024": {
      meals: {
        1: {
          menu: [
            {
              dish_id: 1,
              dish_name: "Phở",
            },
            {
              dish_id: 2,
              dish_name: "Cơm gà",
            },
            {
              dish_id: 3,
              dish_name: "Bánh ngọt",
            },
          ],
          meal_name: "Sáng",
          meal_end_time: "08:00",
          meal_start_time: "07:00",
        },
        2: {
          menu: [
            {
              dish_id: 1,
              dish_name: "Phở",
            },
            {
              dish_id: 2,
              dish_name: "Cơm tấm",
            },
            {
              dish_id: 3,
              dish_name: "Bánh ngọt",
            },
          ],
          meal_name: "Trưa",
          meal_end_time: "13:00",
          meal_start_time: "12:00",
        },
        3: {
          menu: [
            {
              dish_id: 1,
              dish_name: "Phở",
            },
            {
              dish_id: 2,
              dish_name: "Cơm gà",
            },
            {
              dish_id: 3,
              dish_name: "Bánh ngọt",
            },
          ],
          meal_name: "Chiều",
          meal_end_time: "16:00",
          meal_start_time: "15:40",
        },
      },
    },
    "02/07/2024": {
      meals: {
        1: {
          menu: [
            {
              dish_id: 4,
              dish_name: "Bún chả",
            },
            {
              dish_id: 5,
              dish_name: "Cơm sườn",
            },
            {
              dish_id: 6,
              dish_name: "Chè đậu",
            },
          ],
          meal_name: "Sáng",
          meal_end_time: "08:00",
          meal_start_time: "07:00",
        },
        2: {
          menu: [
            {
              dish_id: 4,
              dish_name: "Bún chả",
            },
            {
              dish_id: 5,
              dish_name: "Cơm sườn",
            },
            {
              dish_id: 6,
              dish_name: "Chè đậu",
            },
          ],
          meal_name: "Trưa",
          meal_end_time: "13:00",
          meal_start_time: "12:00",
        },
        3: {
          menu: [
            {
              dish_id: 4,
              dish_name: "Bún chả",
            },
            {
              dish_id: 5,
              dish_name: "Cơm sườn",
            },
            {
              dish_id: 6,
              dish_name: "Chè đậu",
            },
          ],
          meal_name: "Chiều",
          meal_end_time: "16:00",
          meal_start_time: "15:40",
        },
      },
    },
    "03/07/2024": {
      meals: null,
    },
    "2024-07-04": {
      meals: null,
    },
    "2024-07-05": {
      meals: null,
    },
    "2024-07-06": {
      meals: null,
    },
    "2024-07-07": {
      meals: null,
    },
  },
  type: "Standard",
  created: "2024-07-01 18:50:09.000000",
  end_date: "2024-07-07",
  created_by: 1,
  start_date: "2024-07-01",
});

const meals = ref([
  {
    id: 1,
    name: "Sáng",
    end_date: "08:00",
    start_time: "07:00",
  },
  {
    id: 2,
    name: "Trưa",
    end_date: "13:00",
    start_time: "12:00",
  },
  {
    id: 3,
    name: "Chiều",
    end_date: "16:00",
    start_time: "15:40",
  },
]);

const calculatedDays = computed(() => {
  const start = moment(weeklyMenu.value.start_date);
  const end = moment(weeklyMenu.value.end_date);
  const days = [];
  let current = start;

  const dayNames = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  while (current <= end) {
    const isCurrent = current.isSame(moment(), "day");
    days.push({
      date: current.format("DD/MM/YYYY"),
      label: dayNames[current.isoWeekday() % 7],
      isNow: isCurrent,
    });
    current = current.add(1, "days");
  }

  return days;
});

//props
const props = defineProps({
  meals: {
    type: Array,
    require: true,
  },
  weeklyMenu: {
    type: Object,
    require: true,
  },
});
</script>
  
  <style>
.schedule table {
  width: 100%;
  border-collapse: collapse;
}

.schedule th,
.schedule td {
  border: 1px solid #000;
  padding: 10px;
  text-align: center;
  position: relative;
}

.schedule th {
  background-color: #3b44d1;
  color: #fff;
}
/* 
.meal-info {
  padding: 0px 15px;
} */

.add-dish-button {
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #3f51b5;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 7px;
}
.current-date {
  background-color: rgb(107, 104, 255) !important;
}
</style>
  