<template>
  <main v-bind:class="menuStyle" class="overflow-y-hidden h-screen">
    <ToastList class="absolute top-5 right-10 z-20" :toast-list="toasts" />
    <section class="menu h-full px-[10px]">
      <MenuComp :menu-style="menuStyle" @close-menu="closeMenu" />
    </section>
    <section class="view h-full overflow-y-scroll pb-[40px]">
      <header class="h-20 ml-3 rounded-xl"></header>
      <router-view
        @add-toast="addToast"
        @closeToast="deleteToast(item.id)"
      ></router-view>
    </section>
  </main>
</template>

<script setup>
import MenuComp from "@/components/menu_comp.vue";
import ToastList from "@/components/toast_list.vue";

import { ref } from "vue";

const toasts = ref([]);

const addToast = (newToast) => {
  console.log(toasts.value);
  toasts.value.push({
    id: toasts.value.length,
    title: newToast.title,
    content: newToast.content,
    type: newToast.type,
  });
};

const deleteToast = (toastID) => {
  toasts.value.splice(toastID, 1);
};

const menuStyle = ref("full-menu");

const isMenuClose = ref(true);

const closeMenu = (is) => {
  console.log(is);
  if (is) {
    menuStyle.value = "hide-menu";
    return;
  }
  menuStyle.value = "full-menu";
};
</script>

<style scoped>
.full-menu {
  display: grid;
  grid-template-columns: 250px auto;
  transition: 0.5s ease;
}
.hide-menu {
  display: grid;
  grid-template-columns: 90px auto;
  transition: 0.5s ease;
}
</style>