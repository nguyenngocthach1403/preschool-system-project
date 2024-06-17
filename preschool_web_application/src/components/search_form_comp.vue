<template>
  <div class="flex">
    <div class="relative mb-[10px] w-full">
      <form @submit.prevent="sendSearchText()">
        <input
          type="text"
          v-model="searchText"
          placeholder="Search here"
          class="rounded-[8px] border-[1px] h-[45px] pl-3 text-[17px] w-full focus:outline-0 focus:ring-[#3B44D1] focus:border-[#3B44D1]"
        />
        <button
          type="submit"
          class="h-[45px] active:scale-90 rounded-r-lg content-center bg-[#3B44D1] w-[45px] absolute bottom-0 right-0 hover:opacity-80"
        >
          <img :src="search_white_icon" class="w-[25px] m-auto" />
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
/* Inmport Icons */
import search_white_icon from "@/assets/icons/search-white.svg";

const searchText = ref("");

import { onMounted, ref, watch } from "vue";

const props = defineProps(["value"]);
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

<style scoped>
</style>