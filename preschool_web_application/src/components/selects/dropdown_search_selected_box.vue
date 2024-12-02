<template>
  <div
    :style="{
      height: `${props.height + 1}px`,
      width: props.width == null ? `` : `${props.width}px`,
    }"
    class="relative">
    <button
      @focus.prevent="isShow = true"
      @focusout="closeList"
      @click.prevent=""
      :disabled="disapled"
      :style="{
        borderRadius: `${props.radius}px`,
        backgroundColor: disapled ? '#85898f' : ``,
        cursor: disapled ? `not-allowed` : `default`,
      }"
      class="w-full h-full border hover:border-gray-800 flex content-start items-center px-2 mr-5">
      <input
        type="text"
        @focusout="outFocusInput"
        @click.prevent="focusInput"
        @keydown="handleKeyDown"
        :disabled="disapled"
        :style="{
          cursor: disapled ? `not-allowed` : `default`,
        }"
        v-model="searchText"
        class="focus:outline-none w-full z-20 pr-5 h-full bg-transparent" />
      <div
        v-if="searchText.trim() == ''"
        :style="{
          top: `${props.height / 2 - 12}px`,
          color: isInputFocus ? `gray` : `black`,
          maxWidth: `${props.width * 2 - 30}px`,
        }"
        class="absolute left-2 overflow-hidden z-10">
        {{ value }}
      </div>
      <div
        v-if="value == null"
        :style="{
          top: `${props.height / 2 - 10}px`,
          color: disapled ? `white` : ``,
        }"
        class="absolute left-2 text-[14px] text-gray-400 overflow-hidden z-10">
        {{ props.placeholder }}
      </div>
    </button>
    <img
      :src="isShow ? searchIcon : iconSelect"
      alt=""
      width="14"
      :style="{
        top: `${props.height / 2 - 7}px`,
        rotate: isShow ? `90deg` : ``,
      }"
      class="absolute right-2 -rotate-90" />
    <transition
      enter-active-class="ease-in-out duration-300"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="ease-in-out duration-300"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95">
      <ul
        v-if="isShow"
        class="absolute z-30 mt-1 max-h-56 w-full overflow-y-scroll rounded-md bg-white py-1 text-base shadow-card ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <li
          v-for="(item, idx) in lstOption"
          :key="idx"
          @click.prevent="value = item"
          :class="{
            'bg-blue-600 text-white': idx === selectedIndex,
            'hover:bg-blue-600 hover:text-white': idx !== selectedIndex,
          }"
          class="text-gray-900 relative py-2 cursor-default select-none hover:bg-blue-600 hover:text-white flex place-content-start px-2">
          {{ item }}
        </li>
        <li v-if="lstOption.length == 0">
          <img
            :src="emptyIcon"
            width="30"
            class="m-auto" />
          <div class="text-gray-300 w-full text-center">Trống</div>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script setup>
import { computed, ref, watch } from "vue";
//Assets
import iconSelect from "@/assets/icons/back-black.svg";
import searchIcon from "@/assets/icons/search-black.svg";
import emptyIcon from "@/assets/icons/Empty Box.svg";

const isShow = ref(false);
let isInputFocus = ref(false);
let value = defineModel("value");
let searchText = ref("");
const selectedIndex = ref(-1);
const props = defineProps({
  width: {
    type: Number,
  },
  height: {
    type: Number,
    default: 45,
  },
  radius: {
    type: Number,
    default: 5,
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: `Chọn Item`,
  },
  disapled: {
    type: Boolean,
    default: false,
  },
});

const lstOption = computed(() => {
  return props.options.filter((item) => {
    if (!searchText.value) return true;
    return String(item).includes(searchText.value);
  });
});

watch(isInputFocus, () => {
  isShow.value = !isShow.value;
});
watch(searchText, () => {
  isShow.value = true;
});

function closeList() {
  setTimeout(() => {
    isShow.value = false;
  }, 50);
}

function outFocusInput() {
  searchText.value = "";
  isInputFocus.value = false;
}

function focusInput() {
  setTimeout(() => {
    isInputFocus.value = !isInputFocus.value;
  }, 100);
}

function handleKeyDown(event) {
  if (!isShow.value) return; // Nếu menu không mở, bỏ qua
  if (event.key === "ArrowDown") {
    // Di chuyển xuống
    selectedIndex.value = (selectedIndex.value + 1) % lstOption.value.length;
  } else if (event.key === "ArrowUp") {
    // Di chuyển lên
    selectedIndex.value =
      (selectedIndex.value - 1 + lstOption.value.length) %
      lstOption.value.length;
  } else if (event.key === "Enter") {
    // Chọn item
    if (selectedIndex.value >= 0) {
      value = lstOption.value[selectedIndex.value];
      isShow.value = false; // Đóng danh sách
    }
  }
}

// @focus="isShow = true"
//       @focusout="closeList"
//         @focus="isInputFocus = true"
</script>
<style scoped></style>
