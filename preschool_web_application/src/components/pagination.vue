<template>
  <div
    id="pagination-section"
    class="bg-gray-100 rounded-[5px] w-fit h-[37px] mx-[20px]">
    <button
      id="prev"
      @click.prevent="handlePrevious"
      class="px-[10px] w-[90px] h-full bg-gray-200 hover:bg-[#3B44D1] active:scale-95 hover:text-white rounded-tl-[5px] rounded-bl-[5px]">
      Previous
    </button>
    <button
      id="item"
      class="h-full bg-gray-200 border border-l-gray-300 relative">
      <input
        type="number"
        @keypress.enter.prevent="handleSetValue($event.target.value)"
        v-model="pageActiveModel"
        :min="1"
        :max="props.total"
        class="pl-2 pr-2 w-[50px] bg-transparent h-full outline-none" />
      <span class="h-full content-center mr-2">/{{ props.total }}</span>
    </button>
    <button
      id="prev"
      @click.prevent="handleNext"
      class="w-[90px] px-[10px] h-full bg-gray-200 hover:bg-[#3B44D1] active:scale-95 hover:text-white rounded-tr-[5px] rounded-br-[5px] border border-l-gray-300">
      Next
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

onMounted(() => {
  pageActiveModel.value = props.pageActive || 1;
});

const emits = defineEmits(["page-active"]);
const pageActiveModel = ref(1);
const props = defineProps({
  pageActive: {
    type: Number,
  },
  total: {
    type: Number,
    default: 0,
  },
});

function handlePagChange(value) {
  emits("page-active", value);
}

function handleSetValue(inputVal) {
  if (inputVal < 1) {
    pageActiveModel.value = 0;
    handlePagChange(pageActiveModel.value);
    return;
  }
  if (inputVal > props.total) {
    pageActiveModel.value = props.total;
    handlePagChange(pageActiveModel.value);
    return;
  }
  pageActiveModel.value = inputVal;
  handlePagChange(pageActiveModel.value);
}
function handleNext() {
  if (pageActiveModel.value == props.total) return;
  pageActiveModel.value = pageActiveModel.value + 1;

  handlePagChange(pageActiveModel.value);
}

function handlePrevious() {
  if (pageActiveModel.value == 1) return;
  pageActiveModel.value -= 1;

  handlePagChange(pageActiveModel.value);
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
