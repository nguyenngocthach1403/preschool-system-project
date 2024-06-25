<template>
  <div class="relative">
    <button
      class="main w-full h-full overflow-hidden focus:ring-1 rounded-md border hover:border hover:border-gray-500 p-[1px] flex items-center relative"
      @focus="showOption = true"
      @focusout="closeOptionList"
    >
      <div
        class="w-full h-full content-center rounded-md"
        :class="{
          'status-0': getCurrentValue() === 0,
          'status-1': getCurrentValue() === 1,
          'status-2': getCurrentValue() === 2,
          'status-3': getCurrentValue() === 3,
          'status-4': getCurrentValue() === 4,
          'status-5': getCurrentValue() === 5,
        }"
      >
        <span>{{ value ? value.name : "Chọn trạng thái" }}</span>
      </div>
    </button>
    <transition
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ul
        v-show="showOption"
        ref="ListElemnt"
        @scroll="handleScroll($event)"
        class="absolute z-10 mt-1 max-h-56 w-full overflow-y-scroll rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <li
          v-for="(item, index) in options"
          :key="index"
          class="text-start px-5 py-2 cursor-default flex justify-between items-center hover:bg-gray-200 cursor-default"
          @click="(value = item), closeOptionList(), $emit('choose', item)"
        >
          <div>
            <p>{{ item.name }}</p>
          </div>
        </li>
        <li v-if="options.length == 0" class="empty text-gray-400">
          <img class="w-10 h-10 m-auto" :src="empty_icon" alt="" />
          <span>Không có dữ liệu</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import empty_icon from "../../../assets/icons/Empty Box.svg";
const value = ref(null);
const options = ref([]);
const showOption = ref(false);

//props
const props = defineProps({
  options: {
    type: Array,
    require: false,
  },
});

onMounted(() => {
  options.value = props.options;
});

watch(props, () => {
  options.value = props.options;
});

function getCurrentValue() {
  if (!value.value) {
    return -1;
  }
  return value.value.id;
}
function closeOptionList() {
  setTimeout(() => {
    showOption.value = false;
  }, 100);
}
</script>

<style  scoped>
.status-0 {
  background-color: rgb(186 230 253);
  border: 1px solid rgb(125 211 252) !important;
  color: rgb(14 165 233);
}
.status-1 {
  background-color: rgb(221 214 254) !important;
  border: 1px solid rgb(196 181 253) !important;
  color: rgb(139 92 246) !important;
}
.status-2 {
  color: rgb(142, 73, 8) !important;
  background-color: rgba(162, 103, 7, 0.2);
  border: solid 1px rgb(246, 199, 105);
}
.status-3 {
  background-color: rgb(254, 254, 202);
  border: 1px solid rgb(252, 230, 165) !important;
  color: rgb(220, 162, 38);
}
.status-4 {
  background-color: rgb(217 249 157);
  border: 1px solid rgb(190 242 100) !important;
  color: rgb(132 204 22);
}
.status-5 {
  background-color: rgba(252, 165, 165, 0.3) !important;
  border: 1px solid rgb(252 165 165) !important;
  color: rgb(220 38 38);
}
</style>