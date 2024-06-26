<template>
  <div
    class="bg-gradient-to-r from-indigo-300/50 via-violet-100 via-40% to-blue-100 border w-[400px] h-[400px] rounded-[10px] grid shadow-card grid-rows-2 mt-[10px] mx-[10px]"
  >
    <div
      v-if="showMenuOfClass"
      class="w-[150px] absolute rounded-md bg-white z-30 shadow overflow-hidden"
      :style="{ top: top + 'px', left: left + 'px' }"
    >
      <Transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ul
          @focusout="showMenuOfClass = false"
          class="w-full h-full text-start"
        >
          <li
            class="px-3 py-1 hover:bg-gray-200 flex justify-between"
            @click="$emit('edit-class', classData)"
          >
            Sửa <img :src="edit_icon" class="w-5" alt="" />
          </li>
          <li class="px-3 py-1 hover:bg-gray-200 flex justify-between">
            Xóa <img :src="delete_icon" class="w-5" alt="" />
          </li>
        </ul>
      </Transition>
    </div>
    <!--Avatar & Status -->
    <div id="head" class="p-[8px] rounded-[16px] relative">
      <div
        class="status text-[10px] absolute top-[12px] left-[12px] px-[8px] rounded-[10px] h-[25px] content-center"
        :class="status(classData.status)"
      >
        {{ classData.status }}
      </div>
      <div class="absolute top-3 right-3 z-10">
        <button
          @focusout="closeMenu"
          class="w-7 h-7 content-center bg-white rounded-xl hover:border hover:border-black"
          @click="displayMenu($event)"
        >
          <img class="w-5 m-auto" :src="dot" alt="" />
        </button>
      </div>
      <div
        class="avatar w-full h-full rounded-[8px] border border-violet-400/25"
        @click="
          $router.push({
            name: 'ClassDetailView',
            query: { classID: classData.id },
          })
        "
      >
        <img
          :src="classData.avatar || member_icon"
          class="rounded-[8px] h-full w-full object-cover"
          alt=""
        />
      </div>
    </div>
    <div
      id="body"
      class="px-[15px]"
      @click="
        $router.push({
          name: 'ClassDetailView',
          query: { classID: classData.id },
        })
      "
    >
      <div
        class="title flex items-center justify-between w-full my-1 text-start"
      >
        <span class="font-bold text-[20px]">{{ classData.name }}</span>
        <div class="px-3 py-2 rounded-md border border-black text-[11px]">
          {{ classData.session || "2020-2021" }}
        </div>
      </div>
      <div class="flex text-[13px] text-gray-500 content-center h-[25px]">
        <span class="h-full content-center">{{
          ddmmyyyyDateString(
            new Date(classData.start).toLocaleDateString() ?? "1111-1-1"
          )
        }}</span>
        <span class="ml-2 h-full content-center">-</span>
        <span class="ml-2 h-full content-center">{{
          ddmmyyyyDateString(
            new Date(classData.end).toLocaleDateString() ?? "1111-1-1"
          )
        }}</span>
      </div>
      <div
        class="teacher flex text-[13px] gap-2 items-center text-gray-500 content-center"
      >
        <span>Giáo viên:</span>
        <div class="h-full content-center">
          {{ classData.teacher || "Chưa có" }}
        </div>
      </div>
      <div
        class="number-of-membver gap-2 my-5 flex items-center text-[13px] text-gray-500 h-[25px] my-1"
      >
        <div class="px-3 py-2 rounded-md border border-black">
          {{ classData.type || "Không có" }}
        </div>
        <div class="px-3 py-2 rounded-md border border-black">
          {{ classData.levelName || "Không có" }}
        </div>
        <div class="px-3 py-2 rounded-md border border-black">
          {{ classData.syllabusName || "Không có" }}
        </div>
      </div>
      <div
        class="number-of-membver gap-2 flex items-center text-[13px] text-gray-500 h-[25px] my-1"
      >
        <img :src="member_icon" class="rounded-[50px] h-[30px] w-[30px]" />
        <span class="h-full content-center"
          >{{ classData.member ?? 0 }}/{{ classData.limitedMember ?? 0 }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import member_icon from "@/assets/icons/Graduation Cap.svg";
import dot from "../../../assets/icons/menu-vertical.svg";
import { ddmmyyyyDateString } from "../../../utils/resources/format_date";
//icon
import edit_icon from "../../../assets/icons/edit.svg";
import delete_icon from "../../../assets/icons/delete.svg";
import { ref } from "vue";

const top = ref(0);
const left = ref(0);
const showMenuOfClass = ref(null);

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

function displayMenu(event) {
  showMenuOfClass.value = !showMenuOfClass.value;
  top.value = event.clientY;
  left.value = event.clientX;
}

function closeMenu() {
  setTimeout(() => {
    showMenuOfClass.value = false;
  }, 100);
}
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