<template>
  <div
    class="bg-white ml-4 mt-[20px] rounded-xl mr-2 text-center h-full pb-[60px]"
  >
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
          class="h-1 bg-[#6EC2F7] absolute bottom-0 rounded-md ease-in-out duration-300"
        ></div>
      </div>
      <!-- <CalenderDetail v-if="getTabActive(0)" /> -->
      <ClassCurrentView v-if="getTabActive(1)" />
      <ClassHistoryView v-if="getTabActive(2)" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ClassCurrentView from "../../teacher_login/view_info_class_detail/class_current_view.vue";
import ClassHistoryView from "../view_info_class_detail/class_history_view.vue";
import CalenderDetail from "../view_info_class_detail/calender_detail.vue";
const router = useRouter();

//element
const TabLineElement = ref(null);
const TabElement = ref(null);

const tabList = ref([
  {
    title: "Thời khoá biểu",
    active: true,
  },
  {
    title: "Lớp đang giảng dạy",
    active: false,
  },
  {
    title: "Lớp đã giảng dạy",
    active: false,
  },
]);

onMounted(() => {
  initialActiveTab();
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
