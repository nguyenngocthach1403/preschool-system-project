<template>
  <main v-bind:class="menuStyle" class="overflow-y-hidden h-screen">
    <ToastList class="absolute top-5 right-10 z-30" :toast-list="toasts" />
    <section class="menu h-full bg-white drop-shadow-xl relative">
      <button
        class="bg-white rounded-full w-8 h-8 absolute top-24 right-[-15px] z-20"
        @click="closeMenu((isMenuClose = !isMenuClose))"
      >
        <img :src="menuIcon" class="w-[20px] m-auto" alt="" />
      </button>
      <MenuParent :menu-style="menuStyle" />
    </section>
    <section class="view h-full overflow-y-scroll pb-[40px]">
      <header
        class="h-16 bg-transparent sticky fixed absolute top-0 shadow z-20"
      >
        <div class="h-full bg-white"></div>
      </header>
      <router-view
        class="mt-5"
        @add-toast="addToast"
        @closeToast="deleteToast(item.id)"
      ></router-view>
    </section>
  </main>
</template>

<script setup>
import MenuParent from "@/components/menu_parent.vue";
import ToastList from "@/components/toast_list.vue";
import next_icon from "@/assets/icons/Right.svg";
import pre_icon from "@/assets/icons/Left Arrow.svg";
import { onMounted, ref, watch } from "vue";

const toasts = ref([]);

const menuIcon = ref(pre_icon);

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

function closeMenu(is) {
  console.log(is);
  if (is) {
    menuStyle.value = "hide-menu";
    menuIcon.value = next_icon;
    return;
  }
  menuStyle.value = "full-menu";
  menuIcon.value = pre_icon;
}
</script>

<style scoped>
.full-menu {
  display: grid;
  grid-template-columns: 250px auto;
  transition: 0.5s ease;
}
.hide-menu {
  display: grid;
  grid-template-columns: 100px auto;
  transition: 0.5s ease;
}
</style>
