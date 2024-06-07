<template>
  <div
    :id="typeToast"
    class="toast-item container w-[300px] h-[80px] bg-white rounded-md"
    :class="{ 'leave-active': isCloseActive }"
  >
    <div class="w-full h-full content-center px-[10px]">
      <!--Ttitle Toast-->
      <div class="title-toast text-[15px]">{{ toastItemData.title }}</div>
      <div class="title-toast text-[13px] text-gray-500">
        {{ toastItemData.content }}
      </div>
    </div>
    <button
      class="absolute w-[15px] right-1 top-1 hover:bg-gray-200"
      @click="closeToast"
    >
      <img :src="close_icon" alt="" class="w-full" />
    </button>
    <div
      id="time-line"
      class="h-2 bg-black absolute bottom-0 left-0"
      :style="{ width: +widthOfTimeLine + 'px' }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import close_icon from "@/assets/icons/close.svg";

const timeToClose = ref(2000);

const widthOfTimeLine = ref(300);
const typeToast = ref("");
const isCloseActive = ref(false);

const drops = defineProps({
  toastItemData: {
    type: Object,
    required: true,
  },
});
onMounted(() => {
  if (drops.toastItemData.type === 0) {
    typeToast.value = "successful";
  }
  if (drops.toastItemData.type === 1) {
    typeToast.value = "error";
  }
  if (drops.toastItemData.type === 2) {
    typeToast.value = "warning";
  }
  if (drops.toastItemData.type === 3) {
    typeToast.value = "info";
  }
  timeline();
});

const emits = defineEmits(["close-toast"]);

function closeToast() {
  //close toast
  isCloseActive.value = true;
  setTimeout(() => {
    emits("close-toast", drops.toastItemData.id);
  }, 200);
}

function timeline() {
  const intervalId = setInterval(() => {
    widthOfTimeLine.value = widthOfTimeLine.value - 1;
  }, 5000 / 300);

  setTimeout(() => {
    clearInterval(intervalId);

    //close toast
    closeToast();
  }, 5600);
}

setTimeout(() => {
  clearInterval();
}, 5000);
</script>

<style scoped>
.toast-item {
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
  animation: enter 0.5s forwards normal;
}

@keyframes enter {
  0% {
    opacity: 0;
    translate: 20px 0;
  }
  100% {
    opacity: 1;
    translate: 0px 0;
  }
}
@keyframes leave {
  0% {
    opacity: 1;
    translate: 0px 0;
  }
  100% {
    opacity: 0;
    translate: 20px 0;
  }
}

#successful > #time-line {
  background-color: rgb(0, 255, 170) !important;
}
#error > #time-line {
  background-color: rgb(255, 0, 0) !important;
}
#warning > #time-line {
  background-color: rgb(255, 255, 0) !important;
}
#info > #time-line {
  background-color: rgb(0, 94, 255) !important;
}
.leave-active {
  animation: leave 0.2s forwards normal !important;
}
</style>