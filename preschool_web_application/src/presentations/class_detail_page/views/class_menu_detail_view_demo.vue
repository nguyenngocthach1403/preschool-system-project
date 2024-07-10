<template>
  <div>
    <PopupCreateMenu
      @close="closePopupCreateMenu($event)"
      class="absolute top-0 left-0"
      v-if="isShowCreateMenu"
      :data-to-create="isShowCreateMenu"
      :class-id="$router.currentRoute.value.query.classID"
      @add-toast="$emit('add-toast', $event)"
    />
    <PopupEditMenu
      @close="closePopupEditMenu($event)"
      class="absolute top-0 left-0"
      :menu-detail="isShowEditMenu"
      v-if="isShowEditMenu"
      @add-toast="$emit('add-toast', $event)"
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
    <MenuTable
      v-else
      :week="currentWeekDisplay"
      :meals="meals"
      :menus="menuList"
      @create-menu="createMenu($event)"
      @edit-menu="isShowEditMenu = $event"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

//component
import LoadingComp from "../../../components/loading_comp.vue";
import MenuTable from "../components/menu_table_demo.vue";
import PopupCreateMenu from "../components/create_menu_popup.vue";
import PopupEditMenu from "../../menu_page/components/popup_detail_menu.vue";
//icon
import forward from "../../../assets/icons/Forward.svg";
import back from "../../../assets/icons/Back.svg";
import avatar_default from "../../../assets/img/avatar.jpg";
//Service
import ClassService from "../../../services/class.service";
import MenuService from "../../../services/menu.service";
import { yyyymmddDateString } from "../../../utils/resources/format_date";

const router = useRouter();

const weekList = ref([]);
const currentWeekSelect = ref(null);
const currentWeekSelectIndex = ref(0);
const currentWeekDisplay = ref([]);

const loading = ref(false);
const isShowCreateMenu = ref(false);
const isShowEditMenu = ref(false);

//valliable
const classData = ref(null);
const meals = ref([]);
const menuList = ref([]);

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

// watch(meals, () => {
//   fetchMenuList(
//     classData.value.id,
//     currentWeekSelect.value.start,
//     currentWeekSelect.value.end
//   );
// });

watch(currentWeekSelect, async () => {
  currentWeekSelectIndex.value = weekList.value.findIndex(
    (e) => e.name == currentWeekSelect.value.name
  );
  currentWeekDisplay.value = getDayOfWeek(
    currentWeekSelect.value.start,
    currentWeekSelect.value.end
  );
  await fetchMenuList(
    classData.value.id,
    currentWeekSelect.value.start,
    currentWeekSelect.value.end
  );
});

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
      date: new Date(current),
    });
    current = new Date(current.setDate(current.getDate() + 1));
  }

  return days;
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
  let current = start;
  let weekIndex = 1;
  while (current <= end) {
    const weekStart = new Date(current);
    const weekEnd = new Date(current);
    const a = current.getDay();
    weekEnd.setDate(weekEnd.getDate() + (a != 1 ? 7 - a : 6));
    if (weekEnd > end) {
      weekEnd.setDate(end.getDate());
    }

    weeks.push({
      name: "Tuần " + weekIndex,
      start: yyyymmddDateString(weekStart.toLocaleDateString()),
      end: yyyymmddDateString(weekEnd.toLocaleDateString()),
    });

    current.setDate(current.getDate() + (a != 1 ? 8 - a : 7));
    weekIndex = weekIndex + 1;
  }

  return weeks;
}

function getDayOfDate(day) {
  switch (day) {
    case 0:
      return "Chủ nhật";
    case 1:
      return "Thứ 2";
    case 2:
      return "Thứ 3";
    case 3:
      return "Thứ 4";
    case 4:
      return "Thứ 5";
    case 5:
      return "Thứ 6";
    case 6:
      return "Thứ 7";
  }
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

async function fetchMeals() {
  try {
    const response = await MenuService.fetchMeals();
    const dataResponse = response.data;
    meals.value = dataResponse.data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchMenuList(classId, startDate, endDate) {
  try {
    loading.value = true;

    const response = await MenuService.fetchMenuList(
      classId,
      startDate,
      endDate
    );

    console.log("a", response.data.data);

    const dataResponse = response.data.data;
    menuList.value = dataResponse;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

async function closePopupCreateMenu(event) {
  isShowCreateMenu.value = null;

  if (!event) return;

  await fetchMenuList(
    classData.value.id,
    currentWeekSelect.value.start,
    currentWeekSelect.value.end
  );
}

function closePopupEditMenu(result) {
  if (result) {
    fetchMenuList(
      classData.value.id,
      currentWeekSelect.value.start,
      currentWeekSelect.value.end
    );
  }
  isShowEditMenu.value = null;
}

function createMenu(data) {
  data.classId = classData.value.id;
  isShowCreateMenu.value = data;
}
onMounted(async () => {
  const classId = router.currentRoute.value.query.classID;
  if (classId) classData.value = await fetchClassById(classId);
  await fetchMeals();
});
</script>

<style lang="scss" scoped>
</style>