<template>
  <div class="h-fit w-full ml-4 mr-2 text-center flex gap-5">
    <!--Menu-->
    <div class="w-[350px] bg-white rounded-xl relative">
      <button
        class="py-4 w-full text-start px-6 ease-in-out duration-300 font-bold hover:bg-gray-200"
        v-for="(item, index) in menuList"
        :key="index"
        :class="{ active: item.active }"
        @click="selectTab($event, index)"
        ref="TabElement"
      >
        {{ item.title }}
      </button>
      <div
        ref="TabLineElement"
        class="bg-[#3b44d1] w-1 h-10 top-0 absolute right-0 rounded-md ease-in-out duration-300"
      ></div>
    </div>
    <div class="w-full h-full bg-white rounded-xl">
      <!--Body-->
      <StudentListView
        v-if="getCurrentActive(1)"
        :class-id="parseInt($router.currentRoute.value.query.classID)"
        @add-toast="$emit('add-toast', $event)"
      />
      <ClassTeacherView
        :class-id="parseInt($router.currentRoute.value.query.classID)"
        v-if="getCurrentActive(3)"
        @add-toast="$emit('add-toast', $event)"
      />
      <ClassMenuView
        :class-id="parseInt($router.currentRoute.value.query.classID)"
        v-if="getCurrentActive(4)"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import StudentListView from "../views/student_list_view.vue";
import ClassTeacherView from "../views/class_teachers_view.vue";
import ClassMenuView from "../views/class_menu_detail_view.vue";
import { useRouter } from "vue-router";

//router
const router = useRouter();

//element
const TabLineElement = ref(null);
const TabElement = ref(null);

const menuList = ref([
  {
    id: 0,
    title: "Lịch học",
    active: true,
  },
  {
    id: 1,
    title: "Danh sách các bé",
    active: false,
  },
  {
    id: 2,
    title: "Điểm danh",
    active: false,
  },
  {
    id: 3,
    title: "Giáo viên quản lý",
    active: false,
  },
  {
    id: 4,
    title: "Thực đơn",
    active: false,
  },
]);

onMounted(() => {
  initialActiveTab();
});

//effect function
function initialActiveTab() {
  const indexHasActive = menuList.value.findIndex((e) => e.active);
  if (indexHasActive !== undefined) {
    TabLineElement.value.style.height =
      TabElement.value[indexHasActive].offsetHeight + "px";
    TabLineElement.value.style.top =
      TabElement.value[indexHasActive].offsetTop + "px";
  }
}
function selectTab(event, index) {
  TabLineElement.value.style.height = event.target.offsetHeight + "px";
  TabLineElement.value.style.top = event.target.offsetTop + "px";

  //clear active
  menuList.value.forEach((el) => (el.active = false));

  //new active
  menuList.value[index].active = true;
}
function getCurrentActive(index) {
  return menuList.value[index].active;
}
</script>

<style scoped>
.active {
  color: #3b44d1;
}
</style>