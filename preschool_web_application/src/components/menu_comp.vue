<template>
  <div class="menu-section bg-transparent">
    <!-- Title app -->
    <div
      class="app-title text-center font-bold text-3xl bg-transparent h-20 mt-[5px]"
    >
      <div v-show="menuStyle === 'full-menu'" class="drop-shadow-md">
        Preschool
      </div>
    </div>

    <!-- User information -->
    <div id="user-inf" class="h-28 bg-white my-5 rounded-xl drop-shadow-xl">
      <div>
        <div class="avatar" :class="menuStyle"></div>
      </div>
    </div>

    <!-- Menu list -->
    <div class="menu-list my-10 bg-white py-1 rounded-15 drop-shadow-xl pb-20">
      <router-link v-for="item in menuItem" :key="item.name" :to="item.path">
        <div class="menu-item h-50 pl-[15px]">
          <div><img :src="item.icon" class="w-[25px]" /></div>
          <span class="pl-4" v-show="menuStyle === 'full-menu'">{{
            item.name
          }}</span>
        </div>
      </router-link>
      <button
        class="shadow-xl"
        :class="drops.menuStyle"
        @click="closeMenu"
      ></button>
    </div>
  </div>
</template>

<script setup>
import dash from "../assets/icons/dashboard.svg";
import student from "@/assets/icons/student.svg";
import parent from "@/assets/icons/extension.svg";
import classes from "@/assets/icons/class.svg";
import staff from "@/assets/icons/staff.svg";
import setting from "@/assets/icons/setting.svg";
import extension from "@/assets/icons/ex.svg";
import account from "@/assets/icons/account.svg";
import registration from "@/assets/icons/Registration.svg";

import { ref } from "vue";

const isMenuClose = ref(true);

const menuItem = ref([
  { name: "Dasboard", path: "/dashboard", icon: dash },
  { name: "Registration", path: "/registration_view", icon: registration },
  { name: "Students", path: "/students", icon: student },
  { name: "Parents", path: "/parents", icon: parent },
  { name: "Classes", path: "/classes", icon: classes },
  { name: "Staffs", path: "/registration_view", icon: staff },
  { name: "Account", path: "/dddd", icon: account },
  { name: "Settings", path: "/dddd", icon: setting },
  { name: "Extensions", path: "/dddd", icon: extension },
]);

const drops = defineProps({
  menuStyle: String,
});

const emits = defineEmits(["close-menu"]);
function closeMenu() {
  isMenuClose.value = !isMenuClose.value;
  emits("close-menu", isMenuClose.value);
}
</script>

<style scoped>
.app-title {
  transition: 0.5 ease;
}

/* user information css */
#user-inf {
  position: relative !important;
}
.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: rgb(9, 129, 129);
  position: absolute !important;
  top: -30%;
  left: 95px;
}
.hide-menu {
  left: 0px;
  transition: 0.5s ease;
}
.full-menu {
  left: 85px;
  transition: 0.5s ease;
}

/* menu css */
.router-link-active .menu-item {
  background-color: rgb(200, 200, 200);
  transition: 1s ease-in;
}
.menu-list {
  position: relative;
}
.menu-item {
  margin: 0px 5px 4px 4px;
  border-radius: 9px;
  display: flex;
  align-items: center;
}
.menu-item:hover {
  background-color: rgb(200, 200, 200);
}
button {
  width: 70px;
  height: 40px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  bottom: -30px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 999px;
  border-bottom-left-radius: 999px;
}
button:active {
  scale: 98%;
}
</style>