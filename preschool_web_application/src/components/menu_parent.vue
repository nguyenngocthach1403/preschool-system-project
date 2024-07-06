<template>
  <div class="menu-section h-full bg-transparent">
    <div
      class="app-title text-center font-bold text-3xl flex justify-center py-4 bg-transparent h-[60px] content-center"
    >
      <div v-show="menuStyle === 'full-menu'" class="drop-shadow-md">
        Preschool
      </div>
    </div>

    <div
      id="user-inf"
      class="h-fit bg-white my-5 border-t-[1px] border-b-[1px] px-3"
    >
      <div class="flex w-full content-center h-[50px] gap-3 my-3 relative">
        <div class="avatar rounded-full w-[50px] h-[50px] bg-blue-500"></div>
        <div class="user">
          <p class="text-[16px]">
            {{ user != null ? user["username"] : null }}
          </p>
          <p class="text-gray-500 text-[14px]">
            {{ user != null ? convertAccountRole(user["role"]) : null }}
          </p>
        </div>
      </div>
    </div>
    <div class="menu-list bg-white py-1 text-gray-600 pb-20 px-3">
      <span class="text-[15px] text-gray-500">Hiển thị</span>
      <router-link
        v-for="(item, index) in menu.filter((e) => e.type == 1)"
        :key="index"
        :to="{ name: item.name }"
        :class="{ active: item.active }"
        @click="selectActive(item.id)"
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
import parent from "@/assets/icons/extension.svg";
import { convertAccountRole } from "../utils/resources/converter";
import logoutIcon from "@/assets/icons/Logout.svg";
import info from "@/assets/icons/member.svg";
import child from "@/assets/icons/child.svg";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

onMounted(() => {
  user.value = window.user;
});

const router = useRouter();
const isMenuClose = ref(true);

const user = ref(null);

function logout() {
  localStorage.removeItem("user");
  window.user = null;
  router.push({ path: "/sign" });
}

const menu = ref([
  {
    id: 1,
    title: "Thông tin",
    name: "ParentDetailView",
    icon: info,
    active: false,
    type: 1,
  },
  {
    id: 2,
    title: "Thông tin các bé",
    name: "StudentDetailParentView",
    icon: child,
    active: false,
    type: 1,
  },
]);

const settingItem = ref([{ name: "Đăng xuất", icon: logoutIcon }]);

const drops = defineProps({
  menuStyle: String,
});

function selectActive(index) {
  menu.value.forEach((e) => (e.active = false));
  menu.value.find((e) => e.id == index).active = true;
}
</script>

<style scoped>
.app-title {
  transition: 0.5 ease;
}

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

.active .menu-item {
  transition: 0.18s ease-in;
  border-radius: 5px !important;
  color: black !important ;

  font-size: 15px;
  position: relative;
  display: flex;
}

.active .menu-item::before {
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
