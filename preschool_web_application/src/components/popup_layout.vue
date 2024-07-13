<template>
  <div class="z-20 h-screen w-dvw bg-gray-500/75 text-[15px] content-center">
    <div
      class="body h-fit w-fit bg-[#F8F8F8] relative rounded-[15px]"
      :class="{ 'leave-active': isLeave }"
    >
      <!--Header-->
      <div
        class="head w-full p-[10px] py-[10px] flex justify-between border-b-2 mb-5"
      >
        <span class="text-[19px]">{{ props.title }}</span>
        <button
          class="px-[10px] rounded-md active:ring active:ring-[#3B44D1]"
          @click="closeView"
        >
          <img :src="close_icon" class="w-[20px]" />
        </button>
      </div>
      <slot name="content"></slot>
      <div
        id="button-side"
        class="w-full flex my-2 justify-center gap-1 basis-1/6 text-[14px]"
      >
        <button
          type="button"
          @click="closeView"
          class="h-[35px] my-[5px] border border-[#3B44D1] hover:bg-blue-400/50 hover:text-[#3B44D1] hover:border-white text-black px-[25px] rounded-md"
        >
          Hủy
        </button>
        <slot name="button"></slot>
      </div>
      <div class="h-[1px] w-[10px]"></div>
    </div>
  </div>
</template>
  
  <script setup>
import { onMounted, ref, watch } from "vue";

import close_icon from "@/assets//icons//close.svg";

const isLeave = ref(false);

//element
const mainLayout = ref();

const emits = defineEmits(["close"]);
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
});

const closeView = () => {
  isLeave.value = true;
  setTimeout(() => {
    emits("close");
  }, 200);
};
</script>
  
  <style scoped>
.body {
  animation: enter 0.5s forwards normal;
  margin: auto;
}

.leave-active {
  animation: leave 0.5s forwards normal !important;
}

@keyframes leave {
  0% {
    opacity: 1;
    translate: 0 0;
  }
  100% {
    opacity: 0;
    translate: -150px 0;
  }
}

@keyframes enter {
  0% {
    opacity: 0;
    translate: -150px 0;
  }
  100% {
    opacity: 1;
    translate: 0 0;
  }
}
</style>