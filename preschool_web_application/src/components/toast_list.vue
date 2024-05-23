<template>
  <div id="toast-list" class="w-[300px] h-fit flex flex-wrap">
    <div class="spacing my-2" v-for="item in toastList" :key="item.id">
      <Toast :toast-item-data="item" @close-toast="deleteToast(item.id)" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Toast from "@/components/toast_item.vue";

const drops = defineProps({
  toastList: {
    type: Array,
  },
});

const deleteToast = (toastID) => {
  drops.toastList.splice(toastID, 1);
};
</script>

<style scoped>
#toast-list {
  transition: 0.5s ease;
}
</style>