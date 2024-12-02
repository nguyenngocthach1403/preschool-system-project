<template lang="">
  <div
    :style="{
      borderColor: props.selected ? 'blue' : 'gray',
    }"
    class="h-[160px] w-full p-2 overflow-hidden border cursor-pointer rounded-[10px] bg-white hover:drop-shadow-xl active:drop-shadow-md relative">
    <CheckBox
      :border-color="`gray`"
      class="absolute top-2 right-2"
      v-model:value="props.selected" />
    <div class="flex gap-2">
      <div class="w-32 border h-[80px] rounded-md bg-blue-300">
        <img
          :src="props.value?.class_img || classImgDefault"
          class="w-full h-full" />
      </div>
      <div class="w-full wrap text-start overflow-hidden">
        <p class="mr-5 font-[500]">
          Lớp: {{ props.value?.className || "----" }}
        </p>
        <p class="font-[300] text-[13px]">
          Số lượng: {{ props.value?.member_limit || `--` }}
        </p>
        <p class="font-[300] text-[13px]">
          Số lượng hiện tại: {{ props.value?.current_quantity || `0` }}
        </p>
      </div>
    </div>
    <div class="font-[300] text-[13px] my-1 w-full">
      Lớp dành cho học sinh 3 tuổi với chương trình phổ thông Lớp dành cho học
      sinh 3 tuổi với chương trình phổ thông ...
    </div>
  </div>
</template>
<script setup>
import CheckBox from "@/components/checkbox.vue";
import classImgDefault from "@/assets/img/image-default.png";

const props = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  value: {
    type: Object,
    required: true,
  },
});
</script>
<style></style>
