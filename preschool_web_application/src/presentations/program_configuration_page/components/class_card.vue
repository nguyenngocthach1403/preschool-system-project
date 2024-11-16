<template>
  <div
    class="flex w-full h-[150px] hover:bg-gray-100 rounded-[10px] p-1 mb-2 border-[1px] relative"
    :style="{
      border: isSelected ? `1px solid blue` : ``,
    }">
    <CheckBox
      :height="18"
      :width="18"
      :borderColor="`gray`"
      class="mt-1 mx-1 absolute top-2 right-2"
      v-model:value="checkBoxValue"
      @click="$emit('choose')" />
    <div class="w-[130px] h-full border rounded-[10px]">
      <img
        :src="props.classData.class_image || classImage"
        width="100%"
        height="100%" />
    </div>
    <div class="ml-5">
      <div
        class="font-medium text-[17px] mt-2 h-[30px] flex items-center gap-3">
        <div>{{ props.classData?.class_name || "unknow" }}</div>
        <button
          :class="
            getCssClassState(
              convertClassStatus(
                props.classData.start_date,
                props.classData.end_date
              )
            )
          "
          class="comingsoon h-fit rounded-[10px] w-fit px-2 text-center text-[12px]">
          {{
            convertClassStatus(
              props.classData.start_date,
              props.classData.end_date
            )
          }}
        </button>
      </div>
      <div class="text-gray-500 text-[14px] mt-2 flex gap-2">
        <img
          :src="calenderIcon"
          class="w-5 h-5"
          :style="{ color: `black` }" />
        <span>{{
          ddmmyyyyDateString(
            new Date(props.classData.start_date).toLocaleDateString()
          )
        }}</span>
        -
        <span>{{
          ddmmyyyyDateString(
            new Date(props.classData.end_date).toLocaleDateString()
          )
        }}</span>
      </div>
      <div class="flex gap-2 mt-2">
        <div
          class="w-[100px] border border-[#536076] text-[#536076] rounded-md text-center text-[13px] py-1">
          {{ props.classData?.level_name || "----" }}
        </div>
        <div
          class="w-[100px] border border-[#536076] text-[#536076] rounded-md text-center text-[13px] py-1">
          {{ props.classData?.syllabus_name || "----" }}
        </div>
        <div
          class="w-[100px] border border-[#536076] text-[#536076] rounded-md text-center text-[13px] py-1">
          {{ props.classData?.type || "----" }}
        </div>
      </div>
      <div class="flex gap-2 mt-2 text-[14px]">
        <div>
          <span class="text-[#536076]">Số lượng hiện tại: </span>
          <span>
            {{ props.classData?.members }}/{{
              props.classData?.member_limit
            }}</span
          >
        </div>
      </div>
    </div>
    <div class="absolute bottom-2 right-2 text-[12px] text-[#536076]">
      Ngày tạo:
      {{
        props.classData?.created
          ? new Date(props.classData?.created).toDateString()
          : "--/--/----"
      }}
    </div>
  </div>
</template>
<script setup>
//Asset
import classImage from "../../../assets/img/1.png";
import calenderIcon from "../../../assets/icons/Calendar.svg";
//Service
import { ddmmyyyyDateString } from "../../../utils/resources/format_date";
import { convertClassStatus } from "../../../utils/resources/converter";

//Component
import CheckBox from "@/components/checkbox.vue";
import { ref } from "vue";
let props = defineProps({
  classData: {
    type: Object,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});

const checkBoxValue = ref(props.isSelected);

function getCssClassState(value) {
  switch (value) {
    case "Sắp bắt đầu":
      return "comingsoon";
    case "Kết thúc":
      return "end";
    case "Đang hoạt động":
      return "in-progress";
  }
}
</script>

<style scoped>
.comingsoon {
  border: 1px solid rgba(125, 212, 252, 0.866) !important;
  color: rgb(14 165 233);
}
.in-progress {
  border: 1px solid rgb(134 239 172) !important;
  color: rgb(22 163 74);
}
.end {
  border: 1px solid rgb(252 165 165) !important;
  color: rgb(220 38 38);
}
</style>
