<template>
  <div class="relative">
    <button
      class="main w-full h-full overflow-hidden focus:ring-1 rounded-md border hover:border hover:border-gray-500 p-[1px] flex items-center relative"
      @focus="showOption = true"
      @focusout="closeOptionList"
    >
      <div class="list flex text-[12px]">
        <div
          v-for="(item, index) in selectedList"
          :key="index"
          class="ml-1 border rounded-md pl-2 pr-1 py-2 h-full w-fit flex items-center justify-between gap-2 inline-block"
          v-show="index < 2"
        >
          <p class="text-gray-500 text-nowrap">{{ item.name }}</p>
          <button
            class="rounded-full hover:bg-gray-200 text-center content-center h-4 w-4"
            @click="deleteItem(index)"
          >
            <img :src="close_icon" class="w-[10px] h-[10px] m-auto" alt="" />
          </button>
        </div>
        <div
          class="ml-1 border rounded-md px-2 py-2 h-full w-fit flex items-center justify-between gap-2 inline-block"
          v-show="selectedList.length > 2"
        >
          <p class="text-gray-500 text-nowrap">
            + {{ selectedList.length - 2 }}
          </p>
        </div>
      </div>
      <input
        @focus="showOption = true"
        type="text"
        v-model="value"
        class="w-full h-full px-3 pr-10 outline-none rounded-md text-[16px]"
      />
      <button
        class="absolute w-5 h-5 top-[15px] right-2 opacity-0"
        :class="{ 'hover-show': selectedList.length != 0 }"
        @click="selectedList = []"
      >
        <img :src="close_icon" alt="" />
      </button>
    </button>
    <transition
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ul
        v-show="showOption"
        ref="ListElemnt"
        @scroll="handleScroll($event)"
        class="absolute z-10 mt-1 max-h-56 w-full overflow-y-scroll rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <li
          v-for="(item, index) in props.options"
          :key="index"
          class="text-start px-5 py-2 cursor-default flex justify-between items-center"
          @click="chooseItem(item)"
          :class="{ selected: getSelectedItems(item) }"
        >
          <div>
            <p>{{ item.name }}</p>
            <p class="text-[13px] text-gray-500">HS{{ item.id }}</p>
          </div>
          <!-- <img :src="complete_icon" class="w-5 h-5" alt="" /> -->
          <svg
            v-if="getSelectedItems(item)"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0,0,256,256"
            class="w-5 h-5"
          >
            <g
              fill="#000000"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode: normal"
            >
              <g transform="scale(8.53333,8.53333)">
                <path
                  d="M26.98047,5.99023c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-15.29297,15.29297l-6.29297,-6.29297c-0.25082,-0.26124 -0.62327,-0.36647 -0.97371,-0.27511c-0.35044,0.09136 -0.62411,0.36503 -0.71547,0.71547c-0.09136,0.35044 0.01388,0.72289 0.27511,0.97371l7,7c0.39053,0.39037 1.02353,0.39037 1.41406,0l16,-16c0.29576,-0.28749 0.38469,-0.72707 0.22393,-1.10691c-0.16075,-0.37985 -0.53821,-0.62204 -0.9505,-0.60988z"
                ></path>
              </g>
            </g>
          </svg>
        </li>
        <li v-if="props.hasData"><LoadingComp /></li>
        <li v-if="props.options.length == 0" class="empty text-gray-400">
          <img class="w-10 h-10 m-auto" :src="empty_icon" alt="" />
          <span>Không có dữ liệu</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

//icon
import close_icon from "../assets/icons/close.svg";
import complete_icon from "../assets/icons/complete.svg";
import empty_icon from "../assets/icons/Empty Box.svg";
//component
import LoadingComp from "../components/loading_comp.vue";

//effect
const showOption = ref(false);

//model
const input = ref("");
const selectedList = ref([]);
const value = ref("");

//element
const ListElemnt = ref(null);

//props emits watch
const props = defineProps({
  options: {
    type: Array,
    require: true,
  },
  value: {
    type: String,
    required: true,
  },
  hasData: {
    type: Boolean,
    require: true,
  },
});
watch(props, () => {
  if (props.value != "") {
    value.value = props.value;
  }
});

watch(value, () => {
  updateValue(value.value);
});
const emits = defineEmits(["selected", "newValue", "scrollEnd"]);

//function
function deleteItem(index) {
  selectedList.value.splice(index, 1);
  emits("selected", selectedList.value);
}

function getSelectedItems(item) {
  const isSelected = selectedList.value.find((e) => e.id == item.id);
  if (isSelected != undefined) return true;

  return false;
}
function chooseItem(item) {
  const itemSelected = selectedList.value.findIndex((e) => e.id == item.id);
  if (itemSelected != -1) {
    deleteItem(itemSelected);
    return;
  }
  selectedList.value.push(item);
  emits("selected", selectedList.value);
}

function closeOptionList() {
  setTimeout(() => {
    showOption.value = false;
  }, 100);
}
function keepShow() {
  setTimeout(() => {
    showOption.value = false;
  }, 101);
}
function updateValue(newValue) {
  emits("newValue", newValue);
}
//handle
function handleScroll(event) {
  console.log(
    "scroll",
    event.target.scrollTop + event.target.clientHeight >=
      event.target.scrollHeight
  );
  if (
    event.target.scrollTop + event.target.clientHeight >=
    event.target.scrollHeight
  ) {
    emits("scrollEnd");
  }
}
</script>

<style  scoped>
button:hover > .hover-show {
  opacity: 1 !important;
}
.delete {
  color: blue;
}
.selected {
  background-color: rgb(234, 234, 255);
}
</style>