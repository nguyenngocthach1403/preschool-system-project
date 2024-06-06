<!-- Confirm snack bar -->
<template>
  <div class="w-screen h-screen bg-gray-600/75 content-center z-20">
    <!--Body-->
    <!--Pass content to ask-->
    <div
      id="dialog"
      :class="{ 'leave-active': isLeave }"
      class="body w-fit px-[20px] bg-white m-auto rounded-[10px]"
    >
      <div class="content py-[10px]">{{ content }}</div>
      <div class="button flex justify-center">
        <button id="no" @click="returnConfirm(false)">Hủy</button>
        <button id="yes" @click="returnConfirm(true)">Xác nhận</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isLeave = ref(false);

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  value: {
    type: Object,
    require: false,
  },
});

const emits = defineEmits(["confirm"]);

const returnConfirm = (event) => {
  isLeave.value = true;
  if (event) {
    setTimeout(() => {
      emits("confirm", props.value);
    }, 200);
  } else {
    setTimeout(() => {
      emits("confirm", false);
    }, 200);
  }
};
</script>

<style  scoped>
button {
  padding: 5px 12px 5px 12px;
  background-color: rgb(83, 43, 226);
  border-radius: 5px;
  margin: 10px 5px 10px 5px;
  color: white;
}
button:active {
  scale: 98%;
}
#no {
  background-color: white;
  color: black;
  border: solid 1px rgb(169, 169, 169);
}

#dialog {
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

