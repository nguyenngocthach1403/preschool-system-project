<template>
  <div class="z-20 h-screen w-screen bg-gray-500/75 content-center text-[15px]">
    <div
      class="body w-[1000px] h-fit bg-white m-auto relative rounded-[15px]"
      :class="{ 'leave-active': isLeave }"
    >
      <!--Header-->
      <div
        class="heade w-full p-[10px] py-[10px] flex justify-between border-b-2 mb-5"
      >
        <span class="text-[19px]">{{ title }}</span>
        <button
          class="px-[10px] rounded-md active:ring active:ring-[#3B44D1]"
          @click="closeView"
        >
          <img :src="close_icon" class="w-[20px]" />
        </button>
      </div>
      <slot name="content"></slot>
      <slot name="bottom"></slot>
      <div class="h-[15px] w-[10px]"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import close_icon from "@/assets//icons//close.svg";

const isLeave = ref(false);

const emits = defineEmits(["close"]);
const closeView = () => {
  isLeave.value = true;
  setTimeout(() => {
    emits("close");
  }, 200);
};

defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.body {
  animation: enter 0.5s forwards normal;
}

.leave-active {
  animation: leave 0.5s forwards normal !important;
}

@keyframes leave {
  0% {
    opacity: 1;
    translate: 100px 0;
  }
  100% {
    opacity: 0;
    translate: -100px 0;
  }
}

@keyframes enter {
  0% {
    opacity: 0;
    translate: -100px 0;
  }
  100% {
    opacity: 1;
    translate: 100px 0;
  }
}
</style>