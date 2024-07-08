
<template>
  <div class="schedule w-full px-3 py-5 relative">
    <EmptyBox v-if="!menuList" />
    <div v-else>
      <div class="flex">
        <div class="menu-navigation">
          <button
            class="text-white bg-[#3f51b5] my-3 px-3 py-2 hover:bg-blue-900 rounded-tl-md rounded-bl-md"
            @click="previousWeek()"
          >
            Tuần trước
          </button>
          <button
            @click="currentWeek()"
            class="text-black bg-white my-3 px-3 py-2 hover:bg-blue-900 hover:text-white"
          >
            Hiện tại
          </button>
          <button
            class="text-white bg-[#3f51b5] my-3 px-3 py-2 hover:bg-blue-900 rounded-tr-md rounded-br-md"
            @click="nextWeek()"
          >
            Tuần sau
          </button>
        </div>
      </div>
      <table class="rounded-md overflow-hidden w-full h-full">
        <thead class="rounded-md">
          <tr>
            <th>Bữa ăn</th>
            <th
              v-for="day in week"
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
          <tr v-for="meal in meals" :key="meal.id">
            <td
              class="meal bg-gray-200 h-[100px] hover:border hover:border-black"
            >
              <span class="text-[16px] font-bold"> {{ meal.meal }}</span
              ><br /><span class="text-[13px] text-gray-500"
                >{{ meal.start_time.slice(0, 5) }} -
                {{ meal.end_time.slice(0, 5) }}</span
              >
            </td>
            <td
              v-for="day in week"
              :key="day.date"
              class="hover:bg-gray-200 relative"
              @click.right.prevent="handleRightClick(meal.id, day.date)"
              :class="{
                'cell-current-date':
                  day.date.toDateString() == new Date().toDateString(),
              }"
            >
              <div
                v-if="checkShowEdit(isShowEdit, meal.id, day.date, meal.meal)"
                class="absolute top-0 left-0 w-full h-full bg-blue-800 text-white content-center"
              >
                <button
                  @click="handleEditMenu(day.date, meal.meal)"
                  class="border px-3 rounded-md py-1 hover:bg-blue-900 flex items-center justify-center gap-3 m-auto"
                >
                  <img :src="edit_icon" class="w-5" />
                  Sửa
                </button>
              </div>
              <div
                v-if="
                  getDetailMenuByDateAndMeal(
                    ddmmyyyyDateString(day.date.toLocaleDateString()),
                    meal.meal
                  )
                "
              >
                <div
                  v-if="
                    getDetailMenuByDateAndMeal(
                      ddmmyyyyDateString(day.date.toLocaleDateString()),
                      meal.meal
                    ).menu
                  "
                >
                  <div
                    v-for="dish in getDetailMenuByDateAndMeal(
                      ddmmyyyyDateString(day.date.toLocaleDateString()),
                      meal.meal
                    ).menu"
                    :key="dish.dish_id"
                  >
                    <div class="meal-info">
                      <div>{{ dish.dish_name }}</div>
                    </div>
                  </div>
                </div>
                <button
                  v-else
                  @click="createMenu(meal.id, meal.meal, day.date, day.name)"
                  class="border rounded-md hover:bg-gray-100 cursor-default w-fit px-3 py-1 m-auto"
                >
                  Thêm món
                </button>
              </div>
              <button
                v-else
                @click="createMenu(meal.id, meal.meal, day.date, day.name)"
                class="border rounded-md hover:bg-gray-100 cursor-default w-fit px-3 py-1 m-auto"
              >
                Thêm
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
<script setup>
import { computed, onMounted, ref, watch } from "vue";
//component
import EmptyBox from "../../../components/empty_data.vue";
///icon
import edit_icon from "../../../assets/icons/edit.svg";
//service
import menuService from "../../../services/menu.service";
import { ddmmyyyyDateString } from "../../../utils/resources/format_date";
const meals = ref([]);
const loading = ref(false);
const isShowEdit = ref(null);
const currentWeekStart = ref(getStartOfWeek(new Date()));
const weekDays = ref([
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ nhật",
]);

const isShowCreate = ref(false);

//props
const props = defineProps({
  menuList: {
    type: Object,
    require: true,
  },
  classId: {
    type: Number,
    require: true,
  },
});

const week = computed(() => {
  return weekDays.value.map((day, index) => {
    const date = new Date(currentWeekStart.value);
    date.setDate(currentWeekStart.value.getDate() + index);
    return { name: day, date };
  });
});

//emits
const emits = defineEmits(["create-meal-of-day-menu", "edit-menu"]);

async function fetchMeals() {
  try {
    const response = await menuService.fetchMeals();
    const dataResponse = response.data;
    meals.value = dataResponse.data;
  } catch (error) {
    //
  }
}

function getStartOfWeek(date) {
  const start = new Date(date);

  start.setDate(date.getDate() - date.getDay() + 1);
  if (start > new Date(date)) {
    start.setDate(start.getDate() - 7);
  }
  return start;
}

/**
 * Phương thức để chuyển sáng tuần tiếp theo
 *
 */
function nextWeek() {
  const newDate = new Date(currentWeekStart.value);
  newDate.setDate(newDate.getDate() + 7);
  currentWeekStart.value = newDate;
}
/**
 * Phương thức để chuyển về tuần trước
 *
 */
function previousWeek() {
  const newDate = new Date(currentWeekStart.value);
  newDate.setDate(newDate.getDate() - 7);
  currentWeekStart.value = newDate;
}

function currentWeek() {
  const newDate = getStartOfWeek(new Date());
  console.log(new Date());
  newDate.setDate(newDate.getDate());
  currentWeekStart.value = newDate;
}

function getDetailMenuByDateAndMeal(date, meal) {
  if (!props.menuList) return undefined;

  const dailyMenu = props.menuList.daily_menu.daily_menu[date];

  if (!dailyMenu) return undefined;

  const meals = dailyMenu.meals;

  if (!meals) return undefined;

  const detail = meals[meal];

  return detail;
}

function checkShowEdit(isShowEdit, mealId, date, mealName) {
  if (isShowEdit) {
    const menu = getDetailMenuByDateAndMeal(
      ddmmyyyyDateString(new Date(date).toLocaleDateString()),
      mealName
    );
    if (
      isShowEdit.mealId == mealId &&
      isShowEdit.date == date &&
      menu !== undefined
    )
      return true;
  }
  return false;
}

function createMenu(mealId, mealName, date, name) {
  emits("create-meal-of-day-menu", {
    mealId: mealId,
    mealName: mealName,
    date: date,
    name: name,
  });
}

function handleRightClick(mealId, date) {
  if (isShowEdit.value) {
    if (isShowEdit.value.mealId == mealId && isShowEdit.value.date == date) {
      isShowEdit.value = null;
      return;
    }
  }

  isShowEdit.value = { mealId: mealId, date: date };
}

function handleEditMenu(date, mealName) {
  const mealMenu = getDetailMenuByDateAndMeal(
    ddmmyyyyDateString(new Date(date).toLocaleDateString()),
    mealName
  );

  emits("edit-menu", {
    meal_menu_id: mealMenu.meal_menu_id,
    menu_detail: mealMenu.menu,
  });
}

onMounted(async () => {
  await fetchMeals();
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
  border: 1px solid #b8b8b8;
  padding: 10px;
  border-collapse: collapse;
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
  background-color: rgb(70, 68, 169) !important;
}
</style>
  

