
<template>
  <div class="schedule w-full px-3 py-5 relative">
    <EmptyBox v-if="false" />
    <table v-else class="rounded-md overflow-hidden w-full h-full">
      <thead class="rounded-md">
        <th class="w-[120px]">Bữa ăn</th>
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
      </thead>
      <tbody>
        <tr v-for="meal in props.meals" :key="meal.id">
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
            v-for="day in props.week"
            :key="day.date"
            class="hover:bg-gray-200 relative"
            :class="{
              'cell-current-date':
                day.date.toDateString() == new Date().toDateString(),
            }"
          >
            <div v-if="getDishes(meal.meal, day.date).length != 0">
              <div
                @click="editMenu(meal, day.date)"
                class="w-6 h-6 border rounded-md absolute drop-shadow-xl content-center top-2 right-2 hover:border-black"
              >
                <img :src="menu_icon" class="m-auto drop-shadow-xl" />
              </div>
              <div
                v-for="dish in getDishes(meal.meal, day.date)"
                :key="dish.dish_id"
              >
                <div class="meal-info">
                  <div>{{ dish.dish_name }}</div>
                </div>
              </div>
            </div>
            <div v-else>
              <button
                @click="createMenu(meal.id, meal.meal, day.date, day.name)"
                class="border rounded-md hover:bg-gray-100 cursor-default w-fit px-3 py-1 m-auto"
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
//component
import { computed } from "vue";
import EmptyBox from "../../../components/empty_data.vue";
//icon
import menu_icon from "../../../assets/icons/edit.svg";

//service
import { ddmmyyyyDateString } from "../../../utils/resources/format_date";
//props
const props = defineProps({
  week: {
    type: Object,
    require: true,
  },
  meals: {
    type: Object,
    require: true,
  },
  menus: {
    type: Object,
    require: true,
  },
});

//emits
const emits = defineEmits(["create-menu", "edit-menu"]);

function getDishes(mealName, date) {
  // if (!props.menus) return;

  // if (!props.menus.daily_menu) return;

  // if (
  //   !props.menus.daily_menu[
  //     ddmmyyyyDateString(new Date(date).toLocaleDateString())
  //   ]
  // )
  //   return;

  // if (
  //   !props.menus.daily_menu[
  //     ddmmyyyyDateString(new Date(date).toLocaleDateString())
  //   ].meals
  // )
  //   return;

  // if (
  //   !props.menus.daily_menu[
  //     ddmmyyyyDateString(new Date(date).toLocaleDateString())
  //   ].meals[mealName]
  // )
  //   return;

  // if (
  //   !props.menus.daily_menu[
  //     ddmmyyyyDateString(new Date(date).toLocaleDateString())
  //   ].meals[mealName].menu
  // )
  //   return;

  // return props.menus.daily_menu[
  //   ddmmyyyyDateString(new Date(date).toLocaleDateString())
  // ].meals[mealName].menu;
  const dishes = props.menus.filter((e) => {
    return (
      new Date(e.date).toLocaleDateString() ==
        new Date(date).toLocaleDateString() && mealName == e.meal_name
    );
  });

  return dishes;
}

function getDailyId(date) {
  // if (!props.menus) return;

  // if (!props.menus.daily_menu) return;

  // if (
  //   !props.menus.daily_menu[
  //     ddmmyyyyDateString(new Date(date).toLocaleDateString())
  //   ]
  // )
  //   return;
  // return props.menus.daily_menu[
  //   ddmmyyyyDateString(new Date(date).toLocaleDateString())
  // ].daily_menu_id;
  const dishes = props.menus.filter((e) => {
    return (
      new Date(e.date).toLocaleDateString() ==
        new Date(date).toLocaleDateString() && mealName == e.meal_name
    );
  });
  console.log(dishes);
  return dishes[0] ? dishes[0].daily_menu_id : undefined;
}

function getMealMenuId(date, mealName) {
  // if (!props.menus) return;

  // if (!props.menus.daily_menu) return;

  // if (
  //   !props.menus.daily_menu[
  //     ddmmyyyyDateString(new Date(date).toLocaleDateString())
  //   ]
  // )
  //   return;

  // if (
  //   !props.menus.daily_menu[
  //     ddmmyyyyDateString(new Date(date).toLocaleDateString())
  //   ].meals
  // )
  //   return;

  // if (
  //   !props.menus.daily_menu[
  //     ddmmyyyyDateString(new Date(date).toLocaleDateString())
  //   ].meals[mealName]
  // )
  //   return;
  // return props.menus.daily_menu[
  //   ddmmyyyyDateString(new Date(date).toLocaleDateString())
  // ].meals[mealName].meal_menu_id;
  const dishes = props.menus.filter((e) => {
    return (
      new Date(e.date).toLocaleDateString() ==
        new Date(date).toLocaleDateString() && mealName == e.meal_name
    );
  });
  console.log(dishes);
  return dishes[0] ? dishes[0].meal_menu_id : undefined;
}

function createMenu(mealId, mealName, date, name) {
  const dailyMenuId = getDailyId(date);
  const mealMenuId = getMealMenuId(date, mealName);

  console.log(dailyMenuId, mealMenuId);
  emits("create-menu", {
    mealId: mealId,
    mealName: mealName,
    date: date,
    name: name,
    dailyMenuId,
    mealMenuId,
  });
}

function editMenu(meal, date) {
  const dishes = getDishes(meal.meal, date);

  const mealMenuId = getMealMenuId(date, meal.meal);

  console.log(mealMenuId);

  emits("edit-menu", {
    dishes,
    mealMenuId,
    meal,
  });
}
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
    
  
  