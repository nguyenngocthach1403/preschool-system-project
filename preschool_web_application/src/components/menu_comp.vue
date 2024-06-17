<template>
  <div class="menu-section h-full bg-transparent">
    <!-- Title app -->
    <div
      class="app-title text-center font-bold text-3xl flex justify-center py-4 bg-transparent h-[60px] content-center"
    >
      <div v-show="menuStyle === 'full-menu'" class="drop-shadow-md">
        Preschool
      </div>
    </div>

    <!-- User information -->
    <div
      id="user-inf"
      class="h-fit bg-white my-5 border-t-[1px] border-b-[1px] px-3"
    >
      <!--Avatar & Username-->

      <div class="flex w-full content-center h-[50px] gap-3 my-3 relative">
        <div class="avatar rounded-full w-[50px] h-[50px] bg-blue-500"></div>
        <div class="user">
          <p class="text-[16px]">{{ username }}</p>
          <p class="text-gray-500 text-[14px]">Admin</p>
        </div>
        <!-- <div class="change-account h-5 w-5 bg-black"></div> -->
      </div>
    </div>

    <div class="menu-list bg-white text-gray-600 py-1 px-3">
      <span class="text-[15px] text-gray-500">Trung tâm</span>
      <router-link
        v-for="item in menu"
        :key="item.name"
        :to="{ name: item.name }"
      >
        <div class="menu-item h-50 pl-[25px]">
          <div><img :src="item.icon" class="w-[20px]" /></div>
          <span class="pl-4" v-show="menuStyle === 'full-menu'">{{
            item.title
          }}</span>
        </div>
      </router-link>
    </div>
    <!-- Menu list -->
    <div class="menu-list bg-white py-1 text-gray-600 pb-20 px-3">
      <span class="text-[15px] text-gray-500">Quản lý</span>
      <router-link
        v-for="item in managerItem"
        :key="item.name"
        :to="{ name: item.name }"
      >
        <div class="menu-item h-[45px] pl-[25px]">
          <div><img :src="item.icon" class="w-[20px]" /></div>
          <span class="pl-4" v-show="menuStyle === 'full-menu'">{{
            item.title
          }}</span>
        </div>
      </router-link>
    </div>

    <div
      class="menu-list bg-white w-full py-1 text-gray-600 px-3 absolute bottom-0"
    >
      <span class="text-[15px] text-gray-500">Hỗ trợ</span>
      <div
        v-for="item in settingItem"
        :key="item.name"
        class="menu-item h-50 pl-[25px]"
        @click="logout"
      >
        <div><img :src="item.icon" class="w-[20px]" /></div>
        <span class="pl-4" v-show="menuStyle === 'full-menu'">{{
          item.title
        }}</span>
      </div>
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
import logoutIcon from "@/assets/icons/Logout.svg";
import category from "../assets/icons/Diversity.svg";

import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isMenuClose = ref(true);

const username = ref(Window.user);

function logout() {
  if (localStorage.getItem("user")) {
    localStorage.setItem("user", null);
  }
  window.user = null;
  router.push({ path: "/" });
}

const menu = ref([{ title: "Thông kê", name: "DashBoardView", icon: dash }]);
const managerItem = ref([
  { title: "Khách hàng", name: "RegistrationView", icon: registration },
  { title: "Học sinh", name: "StudentView", icon: student },
  { title: "Phụ huynh", name: "ParentView", icon: parent },
  { title: "Lớp học", name: "ClassView", icon: classes },
  // { title: "Nhân viên", name: "/ddd", icon: staff },
  { title: "Tài khoản", name: "AccountView", icon: account },
  { title: "Danh mục", name: "CategoryView", icon: category },
  // { title: "Cài đặt", name: "/dddd", icon: setting },
  // { title: "Danh mục", name: "/dddd", icon: extension },
]);

const settingItem = ref([{ name: "Đăng xuất", icon: logoutIcon }]);

const drops = defineProps({
  menuStyle: String,
});

// const emits = defineEmits(["close-menu"]);
// function closeMenu() {
//   isMenuClose.value = !isMenuClose.value;
//   emits("close-menu", isMenuClose.value);
// }
</script>

<style scoped>
.app-title {
  transition: 0.5 ease;
}

/* user information css */
.menu-list {
  font-size: 14px;
}
.hide-menu {
  left: 0px;
  transition: 0.5s ease;
}

.hide-menu .user {
  display: none;
}
.hide-menu .change-account {
  display: none;
}
.hide-menu .avatar {
  margin: auto;
}
.full-menu {
  left: 85px;
  transition: 0.5s ease;
}

/* menu css */
.router-link-active .menu-item {
  /* background-color: rgb(231, 231, 231); */
  /* background-color: #3b44d1; */
  transition: 0.18s ease-in;
  border-radius: 5px !important;
  color: black !important ;
  /* color: white; */
  font-size: 15px;
  position: relative;
  display: flex;
}

.router-link-active .menu-item::before {
  animation: active 0.5s forwards normal;
  content: "";
  background-color: #3b44d1;
  width: 100%;
  position: absolute;
  height: 3px;
  left: 0;
  bottom: 0;
}

.menu-item {
  margin: 0px 0px 4px 0px;
  border-radius: 9px;
  display: flex;
  align-items: center;
}
.menu-item:hover {
  background-color: rgb(231, 231, 231);
}

@keyframes active {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
button {
  position: absolute;
  top: 100%;
  left: 100px;
}
#user-inf {
  position: relative !important;
}
</style>