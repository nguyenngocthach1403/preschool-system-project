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
      class="h-full bg-gray-200 border border-l-gray-300 relative"
    >
      <input
        type="number"
        v-model="pageActive"
        @keypress.enter.prevent="
          pageActive > props.pageNums || pageActive <= 0 || pageActive == null
            ? (pageActive = 1)
            : sendPageIndex(pageActive, $event)
        "
        :min="1"
        :max="props.pageNums"
        class="pl-2 pr-2 w-[50px] bg-transparent h-full outline-none"
      />
      <span class="h-full content-center mr-2">/{{ props.pageNums }}</span>
    </button>
    <!-- <button
      id="item"
      class="px-[10px] h-full bg-gray-200 hover:bg-[#3B44D1] active:scale-95 hover:text-white border border-l-gray-300"
      v-for="index in props.pageNums ?? 1"
      :key="index"
      @click="$emit('click-page', (pageActive = index))"
      :class="{ 'current-page-active': props.pageActive === index }"
    >
      {{ index }}
    </button> -->
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
import { onMounted, ref, watch } from "vue";

onMounted(() => {
  pageActive.value = props.pageActive || 1;
});

const pageActive = ref(1);
const props = defineProps({
  pageActive: {
    type: Number,
  },
  pageNums: {
    type: Number,
  },
});

const emits = defineEmits(["click-page"]);

function sendPageIndex(index, event) {
  emits("click-page", index);
  // Ngăn chặn focus và các hành vi mặc định khác
  event.preventDefault();
  event.target.blur();

  // Xác nhận rằng input đã bị unfocus
  console.log(event.target.onfocus);
}
</script>

<style scoped>
.current-page-active {
  background-color: #3b44d1;
  color: white;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Ẩn các nút tăng giảm trong trình duyệt Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
/* input[type="number"]:focus {
  position: absolute;
  width: 60%;
  background-color: azure;
  left: 20%;
  padding: 0 5px;
}
  */
#item:focus-within {
  border: 2px solid #3b44d1;
}
</style>