<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-fit pb-[10px] pt-5">
    <!-- <div
      class="text-left px-6 text-[36px] py-4 mb-5 font-bold border border-b-1"
    >
      Cấu hình
    </div> -->

    <!--List-->
    <section class="menu-list px-5">
      <ul class="w-fit flex border-b">
        <router-link
          v-for="(item, index) in menuList"
          :key="index"
          :to="{ name: item.name }"
        >
          <li
            class="menu-item h-[40px] content-center px-5 text-black hover:bg-gray-100 cursor-default relative text-center"
            :class="{ active: item.checked }"
            @click="changeActiveMenu(index)"
          >
            {{ item.title }}
          </li>
        </router-link>
      </ul>
    </section>
    <section class="px-5">
      <!--Router-->
      <router-view @add-toast="$emit('add-toast', $event)"></router-view>
    </section>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const emits = defineEmits(["add-toast"]);
//element
const TabLineElement = ref(null);
const TabElement = ref(null);

onMounted(() => {
  menuList.value.forEach((e) => {
    if (e.checked) {
      router.push({ name: e.name });
    }
  });
});

const menuList = ref([
  {
    title: "Quản lý trang chủ",
    checked: true,
    name: "HomePageSlideView",
  },
  {
    title: "Quản lý tin tức",
    checked: false,
    name: "NewsManagementView",
  },
  {
    title: "Quản lý thông tin trường ở website",
    checked: false,
    name: "SettingHomePageView",
  },
]);

function changeActiveMenu(index) {
  menuList.value.forEach((e) => (e.checked = false));
  menuList.value[index].checked = true;
}
</script>

<style scoped>
.active {
  color: #3b44d1;
}
.active::before {
  background-color: #3b44d1;

  content: "";
  height: 2px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: all 0.5s;
  animation: smoodth 0.5s ease-in-out forwards;
}
@keyframes smoodth {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
