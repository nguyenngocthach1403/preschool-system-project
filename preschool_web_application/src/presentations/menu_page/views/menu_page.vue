<template>
  <div class="flex px-5">
    <div class="w-[300px] bg-white rounded-xl relative">
      <button
        v-for="(item, index) in menuList"
        :key="index"
        class="w-full h-[50px] text-start px-6 ease-in-out duration-300 font-bold hover:bg-gray-200"
        ref="TabElement"
        @click="changeActiveMenu($event, index)"
      >
        {{ item.title }}
      </button>
      <div
        ref="TabLineElement"
        class="line bg-[#3b44d1] w-1 h-10 top-0 absolute right-0 rounded-md ease-in-out duration-300"
      ></div>
    </div>
    <div class="bg-white w-full ml-4 rounded-3xl text-center h-fit pb-[10px]">
      <div class="text-left px-6 text-[36px] py-4 mb-5 font-bold border-b">
        Quản lý thực đơn
      </div>
      <section class="px-5">
        <!--Router-->
        <router-view @add-toast="$emit('add-toast', $event)"></router-view>
      </section>
    </div>
  </div>
</template>
  
  <script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const TabLineElement = ref(null);
const TabElement = ref(null);

onMounted(() => {
  initialActiveTab();
});

const menuList = ref([
  { title: "Danh sách món", checked: true, name: "DishesView" },
  { title: "Danh các buổi ăn", checked: false, name: "MealView" },
  { title: "Quản lý thực đơn", checked: false, name: "ClassMenuManagement" },
]);

function changeActiveMenu(event, index) {
  TabLineElement.value.style.height = event.target.offsetHeight + "px";
  TabLineElement.value.style.top = event.target.offsetTop + "px";
  menuList.value.forEach((e) => (e.checked = false));
  menuList.value[index].checked = true;

  router.push({ name: menuList.value[index].name });
}

// //effect function
function initialActiveTab() {
  const indexHasActive = menuList.value.findIndex((e) => e.checked);
  if (indexHasActive !== undefined) {
    router.push({ name: menuList.value[indexHasActive].name });
    TabLineElement.value.style.height =
      TabElement.value[indexHasActive].offsetHeight + "px";
    TabLineElement.value.style.top =
      TabElement.value[indexHasActive].offsetTop + "px";
  }
}
// function getCurrentActive(index) {
//   return menuList.value[index].active;
// }
</script>
  
  <style scoped>
.active > line {
  color: #3b44d1;
}
</style>
  