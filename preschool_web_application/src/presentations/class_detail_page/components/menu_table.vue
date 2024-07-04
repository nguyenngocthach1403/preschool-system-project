
<template>
  <div
    class="schedule w-full rounded-xl overflow-hidden border border-gray-300"
  >
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
          <td class="meal bg-gray-300">
            {{ meal.meal }}<br />{{ meal.start_time.slice(0, 5) }} -
            {{ meal.end_time.slice(0, 5) }}
          </td>
          <td v-for="day in calculatedDays" :key="day.date">
            <div
              v-if="
                weeklyMenu.days[day.date] &&
                weeklyMenu['days'][`${day.date}`]['meals'] != null &&
                weeklyMenu['days'][`${day.date}`]['meals'][`${meal.meal}`]
              "
            >
              <div
                v-for="dish in weeklyMenu['days'][`${day.date}`]['meals'][
                  `${meal.meal}`
                ]['menu']"
                :key="dish.dish_id"
              >
                <div class="meal-info">
                  <div>{{ dish.dish_name }}</div>
                </div>
              </div>
            </div>
            <div v-else class="meal-info">
              <button
                @click="
                  chooseMealOfDayToCreateMenu(meal.id, day.index, meal.meal)
                "
                class="add-dish-button"
              >
                Thêm
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script setup>
import moment from "moment";
import { computed, onMounted, ref, watch } from "vue";
//service
import menuService from "../../../services/menu.service";
const weeklyMenu = ref({});
const meals = ref([]);
const loading = ref(false);

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

//emits
const emits = defineEmits(["create-meal-of-day-menu"]);

//function
function chooseMealOfDayToCreateMenu(mealId, dateOfWeek, mealName) {
  emits("create-meal-of-day-menu", {
    mealId: mealId,
    dateOfWeek: dateOfWeek,
    mealName: mealName,
    weeklyMenuId: 1,
  });
}
const calculatedDays = computed(() => {
  if (!weeklyMenu.value) return;
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
      index: current.format("YYYY-MM-DD"),
      date: current.format("DD/MM/YYYY"),
      label: dayNames[current.isoWeekday() % 7],
      isNow: isCurrent,
    });
    current = current.add(1, "days");
  }

  return days;
});

//watch
// watch(props, (newVal) => {
//   console.log(newVal.meals);
//   meals.value = props.meals;
//   weeklyMenu.value = props.weeklyMenu;
// });

//function
/**
 *
 * @param
 */
async function getMenuById() {
  try {
    loading.value = true;
    const response = await menuService.getWeeklyMenubById(1);

    const dataResponse = response.data;

    meals.value = dataResponse.data.meals;

    weeklyMenu.value = dataResponse.data.menu;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await getMenuById();
});
</script>
  
  <style>
.meal {
  padding: 0px 0px !important;
  margin: 0px !important;
}
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
  