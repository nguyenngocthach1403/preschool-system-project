<template>
  <div id="list-box" class="relative">
    <!-- {{ props.active }} -->
    <!-- {{ props.listSelect }} -->
    <button
      @keydown.down="focusItem < list.length ? (focusItem += 1) : list.length"
      @keydown.up="focusItem > 1 ? (focusItem -= 1) : 0"
      @keydown.enter="
        {
          if (focusItem !== 0) (value = list[focusItem - 1]), closeList();
        }
      "
      @focus="show = true"
      @click="show = !show"
      @focusout="closeList"
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
          v-for="(item, index) in list"
          :key="index"
          class="text-gray-900 relative cursor-default select-none hover:bg-blue-200"
          @click="
            (value = item), $emit('choose', list.indexOf(value)), (show = false)
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
import { onBeforeMount, onMounted, ref, watch } from "vue";

const props = defineProps({
  active: {
    type: Number,
  },
  listSelect: {
    type: Array,
    require: true,
  },
});
const list = ref(["Nam", "Nữ"]);
onMounted(() => {
  list.value = props.listSelect;
  // console.log("aactive", props.active);
  // console.log("lisst", props.listSelect);
  // console.log(props.listSelect[1]);
  if (props.active != undefined) {
    value.value = props.listSelect[props.active];
    // console.log(list.value[props.active]);
  }
});
watch(props.active, () => {
  value.value = props.listSelect[props.active];
});

const show = ref(false);
const value = ref("Choose item");

const focusItem = ref(1);
function closeList() {
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
</style>
