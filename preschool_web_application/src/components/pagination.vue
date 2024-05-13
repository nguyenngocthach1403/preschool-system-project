<template>
  <div
    id="pagination-section"
    class="bg-gray-100 rounded-[5px] w-fit h-[37px] mx-[20px]"
  >
    <button
      id="prev"
      class="px-[10px] w-[90px] h-full bg-gray-200 hover:bg-[#3B44D1] active:scale-95 hover:text-white rounded-tl-[5px] rounded-bl-[5px]"
      @click="$emit('click-page', pageActive > 1 ? (pageActive -= 1) : 1)"
    >
      Previous
    </button>
    <button
      id="item"
      class="px-[10px] h-full bg-gray-200 hover:bg-[#3B44D1] active:scale-95 hover:text-white border border-l-gray-300"
      v-for="index in props.pageNums ?? 1"
      :key="index"
      @click="$emit('click-page', (pageActive = index))"
      :class="{ 'current-page-active': pageActive === index }"
    >
      {{ index }}
    </button>
    <button
      id="prev"
      class="w-[90px] px-[10px] h-full bg-gray-200 hover:bg-[#3B44D1] active:scale-95 hover:text-white rounded-tr-[5px] rounded-br-[5px] border border-l-gray-300"
      @click="
        $emit(
          'click-page',
          pageActive < props.pageNums ? (pageActive += 1) : pageActive
        )
      "
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const pageActive = ref(1);
const props = defineProps({
  pageNums: {
    type: Number,
  },
});
</script>

<style scoped>
.current-page-active {
  background-color: #3b44d1;
  color: white;
}
</style>