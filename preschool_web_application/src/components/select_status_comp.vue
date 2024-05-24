
<template>
  <div id="statusList-box" class="relative">
    <button
      @keydown.down="
        focusItem < statusList.length ? (focusItem += 1) : statusList.length
      "
      @keydown.up="focusItem > 1 ? (focusItem -= 1) : 0"
      @keydown.enter="
        {
          if (focusItem !== 0)
            (value = statusList[focusItem - 1]), closestatusList();
        }
      "
      @focus="show = true"
      @click="show = !show"
      @focusout="closestatusList"
      :class="{
        'active-status': statusList.indexOf(value) == 1,
        'none-active': statusList.indexOf(value) == 0,
        'active-2': statusList.indexOf(value) == 2,
        'active-3': statusList.indexOf(value) == 3,
        'active-4': statusList.indexOf(value) == 4,
      }"
      class="relative w-full cursor-default rounded-md bg-white h-full py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
    >
      <span>{{ value }}</span>
      <span
        class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-3"
      >
        <svg
          class="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </button>

    <transition
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100 "
      leave-to-class="opacity-0"
    >
      <ul
        v-show="show"
        class="absolute z-10 mt-1 max-h-56 w-full overflow-y-scroll rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <li
          v-for="(item, index) in statusList"
          :key="index"
          class="text-gray-900 relative cursor-default select-none hover:bg-blue-200"
          @click="
            (value = item),
              $emit('choose', statusList.indexOf(value)),
              (show = false)
          "
        >
          <div
            v-if="item === value"
            :class="{ 'bg-focus': focusItem == index + 1 }"
            class="w-full bg-gray-200 h-full py-2 pl-3 pr-9"
          >
            {{ item }}
          </div>
          <div
            v-else
            :class="{ 'bg-focus': focusItem == index + 1 }"
            class="w-full h-full py-2 pl-3 pr-9"
          >
            {{ item }}
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>
  
<script setup>
/* Hướng dẫn sử dụng:
   Trạng thái khóa là 0
   Trạng thái hoạt động là 1
   Prop và là một mảng chuổi
   Active truyền vào là một số tương ứng với trạng thái trên
   Giá trị sau khi chọn là mọt số tương ứng với trạng thái

   Ví dụ:
   <SelectStatusComp
      class="h-[45px] rounded-md my-[5px] w-full outline-none focus:border-blue-500"
      @choose="statusAccount = $event" // Nhận dữ liejey khi chọn
      :active="1" //Truyền vào giá trị active hiện tại
    />
*/

import { onMounted, ref } from "vue";

const statusList = ref(["Đang khóa", "Đang hoạt động"]);

onMounted(() => {
  if (props.selectList != undefined) {
    statusList.value = props.selectList;
  }
  if (props.active != undefined) value.value = statusList.value[props.active];
});

const props = defineProps({
  selectList: {
    type: Array,
  },
  active: {
    type: Number,
  },
});
const show = ref(false);
const value = ref("Choose status");

const focusItem = ref(1);
function closestatusList() {
  setTimeout(() => {
    show.value = false;
  }, 50);
}
</script>
  
  <style scoped>
.bg-focus {
  background-color: #3b44d1 !important;
  color: white;
}
.active-status {
  background-color: rgba(187, 247, 208, 0.3);
  border: 1px solid rgb(134 239 172) !important;
  color: rgb(22 163 74);
}
.none-active {
  background-color: rgb(254 202 202);
  border: 1px solid rgb(252 165 165) !important;
  color: rgb(220 38 38);
}
.active-2 {
  background-color: rgb(186 230 253);
  border: 1px solid rgb(125 211 252) !important;
  color: rgb(14 165 233);
}
.active-3 {
  background-color: rgb(221 214 254);
  border: 1px solid rgb(196 181 253) !important;
  color: rgb(139 92 246);
}
.active-4 {
  background-color: rgb(217 249 157);
  border: 1px solid rgb(190 242 100) !important;
  color: rgb(132 204 22);
}
</style>