<template>
  <div class="my-2 w-[400px] text-start px-6">
    Hiển thị
    <select
      id="show-num-student"
      v-model="value"
      @change="$emit('change-limit', $event.target.value)"
      class="w-fit h-[30px] border rounded-md outline-none border-black px-2"
    >
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="40">40</option>
      <option value="50">50</option>
      <option value="60">60</option>
      <option value="70">70</option>
      <option value="100">100</option>
    </select>
    Danh mục
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const value = ref(10);
onMounted(() => {
  value.value = props.numbShow;
});
const props = defineProps({
  numbShow: {
    type: Number,
    require: true,
  },
});
</script>

<style lang="scss" scoped>
</style>