<template>
  <div
    :style="{ width: `${width}px` }"
    class="w-full">
    <form
      @submit.prevent="sendSearchText()"
      class="relative">
      <input
        type="text"
        v-model="searchText"
        placeholder="Search here"
        :style="{ height: `${props.height}px`, fontSize: `${fontSize}px` }"
        class="rounded-[8px] border-[1px] pl-3 w-full focus:outline-0 focus:ring-[#3B44D1] focus:border-[#3B44D1]" />
      <button
        type="submit"
        :style="{ height: `${props.height}px` }"
        class="active:scale-90 rounded-r-lg content-center bg-[#3B44D1] w-[45px] absolute bottom-0 right-0 hover:opacity-80">
        <img
          :src="search_white_icon"
          class="w-[25px] m-auto" />
      </button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
/* Inmport Icons */

import search_white_icon from "@/assets/icons/search-white.svg";

const searchText = ref("");

const props = defineProps({
  value: {
    type: String,
  },
  width: {
    type: Number,
    default: 300,
  },
  height: {
    type: Number,
    default: 45,
  },
  fontSize: {
    type: Number,
    default: 17,
  },
});
onMounted(() => {
  searchText.value = props.value;
});

function sendSearchText() {
  emits("passSearchText", searchText.value);
}

const emits = defineEmits(["passSearchText"]);
watch(searchText, () => {
  if (searchText.value == "") {
    emits("passSearchText", searchText.value);
  }
});
</script>

<style scoped></style>
