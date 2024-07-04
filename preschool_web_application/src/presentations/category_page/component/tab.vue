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
      <!-- <ClassCurrentView v-if="getTabActive(0)" /> -->
      <NewsView
        v-if="getTabActive(1)"
        @add-toast="$emit('add-toast', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import NewsView from "../../news/view.vue";
const router = useRouter();
const emits = defineEmits(["add-toast"]);
//element
const TabLineElement = ref(null);
const TabElement = ref(null);

const tabList = ref([
  {
    title: "Quản lý trang chủ",
    active: true,
  },
  {
    title: "Quản lý tin tức",
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
