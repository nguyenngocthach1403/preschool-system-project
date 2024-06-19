<template>
  <div
    class="bg-gradient-to-r from-indigo-300/50 via-violet-100 via-40% to-blue-100 border w-[330px] h-[320px] rounded-[10px] grid shadow-card grid-rows-2 mt-[10px] mx-[10px]"
  >
    <!--Avatar & Status -->
    <div id="head" class="p-[8px] rounded-[16px] relative">
      <div
        class="status text-[10px] absolute top-[12px] left-[12px] px-[8px] rounded-[10px] h-[25px] content-center"
        :class="status(classData.status)"
      >
        {{ classData.status }}
      </div>
      <div class="absolute bottom-3 left-3 flex">
        <!--Class Type-->
        <div
          class="bg-white text-[13px] px-[8px] h-[20px] content-center rounded-[10px] border drop-shadow"
        >
          {{ classData.levels }}
        </div>
        <!--Session-->
        <div
          class="bg-white text-[13px] ml-1 px-[8px] h-[20px] content-center rounded-[10px] border drop-shadow"
        >
          {{ classData.session }}
        </div>
      </div>
      <div
        class="avatar w-full h-full rounded-[8px] border border-violet-400/25"
      >
        <img
          :src="classData.avatar || member_icon"
          class="rounded-[8px] h-full w-full object-cover"
          alt=""
        />
      </div>
    </div>
    <div id="body" class="px-[15px]">
      <div class="title text-[19px] w-full my-1 text-start">
        <span>{{ classData.name }}</span>
      </div>
      <div
        class="teacher flex text-[13px] text-gray-500 content-center h-[25px]"
      >
        <img
          src="https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7"
          class="rounded-[50px] h-[25px] w-[25px]"
        />
        <div class="ml-5 h-full content-center">
          Mr. {{ classData.teacher }}
        </div>
      </div>
      <div
        class="number-of-membver flex text-[13px] text-gray-500 h-[25px] my-1"
      >
        <img :src="member_icon" class="rounded-[50px] h-[25px] w-[25px]" />
        <span class="ml-5 h-full content-center"
          >Member: {{ classData.member ?? 0 }}/{{
            classData.limitedMember ?? 0
          }}</span
        >
      </div>
      <!-- <div class="number-of-membver flex text-[13px] text-gray-500 content-center h-[25px] my-1">
                <img :src="member_icon" class="rounded-[50px] h-[25px] w-[25px]">
                <span class="ml-5 h-full content-center">In class: 29/{{ classData.member }}</span>
            </div> -->
      <div class="divider h-[1px] w-full bg-[#B4B4B4]"></div>
      <!-- <div class="flex text-[13px] items-center">
        <div class="w-full h-2 border mr-2 rounded-md">
          <div
            class="h-2 rounded-md bg-[#3B44D1]"
            :style="{ width: 100 % -new Date() }"
          ></div>
        </div>
        <span> 100%</span>
      </div>
      {{ calculateDateProgress(classData.start, classData.end) }} -->
      <div
        class="number-of-membver flex text-[13px] text-gray-500 content-center h-[25px] mb-1"
      >
        <span class="ml-2 h-full content-center">{{
          new Date(classData.start).toLocaleDateString() ?? "1-1-1111"
        }}</span>
        <span class="ml-2 h-full content-center">-</span>
        <span class="ml-2 h-full content-center">{{
          new Date(classData.end).toLocaleDateString() ?? "1-1-1111"
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import member_icon from "@/assets/icons/member.svg";
import { ref } from "vue";

defineProps({
  classData: {
    type: Object,
    required: true,
  },
});

const status = (status) => {
  switch (status) {
    case "Đang hoạt động":
      return "in-progress";
    case "Kết thúc":
      return "end";
    case "Sắp bắt đầu":
      return "in-comming";
    default:
      return "none";
  }
};
</script>

<style scoped>
.in-progress {
  background-color: rgba(187, 247, 208);
  border: 1px solid rgb(134 239 172) !important;
  color: rgb(22 163 74);
}
.end {
  background-color: rgb(254 202 202);
  border: 1px solid rgb(252 165 165) !important;
  color: rgb(220 38 38);
}
.in-comming {
  background-color: rgb(186 230 253);
  border: 1px solid rgb(125 211 252) !important;
  color: rgb(14 165 233);
}
</style>