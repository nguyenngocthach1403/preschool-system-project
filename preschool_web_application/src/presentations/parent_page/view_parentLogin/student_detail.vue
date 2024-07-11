<template>
  <div class="ml-4 rounded-3xl text-center h-fit pb-[10px]">
    <div class="m-auto w-[1300px] rounded-xl bg-white overflow-hidden relative">
      <div class="mx-10 my-5 flex border-b relative">
        <button
          class="px-5 py-3 h-fit"
          v-for="(tab, index) in tabList"
          :key="index"
          @click="selectTab($event, index)"
          :class="{ active: tab.active }"
          ref="TabElement"
        >
          {{ tab.title }}
        </button>
        <div
          ref="TabLineElement"
          class="h-1 bg-[#3b44d1] absolute bottom-0 rounded-md ease-in-out duration-300"
        ></div>
      </div>
      <StudentInformationView
        v-if="getTabActive(0)"
        :student-data="studentData"
        @click-student="$emit('click-student', $event)"
      />
      <ClassHistory v-if="getTabActive(1)" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import studentService from "../../../services/student.service";
import parentService from "../../../services/parent.service";
import accountService from "../../../services/account.service";
import { convertGender } from "../../../utils/resources/converter";
import { ddmmyyyyDateString } from "../../../utils/resources/format_date";
import StudentInformationView from "../../parent_page/view_detail_i4/student_detail_view.vue";
import ClassHistoryView from "../../student_detail_page/views/class_history_view.vue";
import MenuFoodStudent from "../view_detail_i4/menu_food_weekly.vue";
import ClassHistory from "../view_detail_i4/class_history_view.vue";
const router = useRouter();

const studentData = ref(null);

//element
const TabLineElement = ref(null);
const TabElement = ref(null);

const tabList = ref([
  {
    title: "Chi tiết",
    active: true,
  },
  {
    title: "Lịch sử lớp học của các bé",
    active: false,
  },
]);

onMounted(() => {
  initialActiveTab();
  // getStudentByParentId();
});

//effect function
function initialActiveTab() {
  const indexHasActive = tabList.value.findIndex((e) => e.active);
  if (indexHasActive !== undefined) {
    TabLineElement.value.style.width =
      TabElement.value[indexHasActive].offsetWidth + "px";
    TabLineElement.value.style.left =
      TabElement.value[indexHasActive].offsetLeft + "px";
  }
}
function selectTab(event, index) {
  TabLineElement.value.style.width = event.target.offsetWidth + "px";
  TabLineElement.value.style.left = event.target.offsetLeft + "px";

  //clear active
  tabList.value.forEach((el) => (el.active = false));

  //new active
  tabList.value[index].active = true;
}
function getTabActive(index) {
  return tabList.value[index].active;
}
</script>

<style scoped>
.active {
  color: #3b44d1;
}
</style>
