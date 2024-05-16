<template>
  <div
    id="list-box"
    class="relative"
    :style="{
      cursor: drops.disable ? 'not-allowed' : 'default',
    }"
  >
    <button
      :style="{
        'pointer-events': drops.disable ? 'none' : 'auto',
        'background-color': drops.disable ? '#ECECEC' : 'transpanent',
      }"
      @focus="showList = true"
      @focusout="closeList"
      class="relative w-full cursor-default rounded-md bg-white h-full py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
    >
      <span>{{ value.name ?? value }}</span>
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
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ul
        v-show="showList"
        class="absolute z-10 mt-1 max-h-56 w-full overflow-y-scroll rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <li
          v-for="item in drops.optionList"
          :key="item.id"
          class="text-gray-900 relative cursor-default select-none hover:bg-blue-200"
          @click="
            (value = item), $emit('choose-item', value), (showList = false)
          "
        >
          <div
            v-if="value.id == item.id"
            class="bg-gray-200 w-full h-full py-2 pl-3 pr-9"
          >
            {{ item.name }}
          </div>
          <div v-else class="w-full h-full py-2 pl-3 pr-9">
            {{ item.name }}
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
  console.log(drops.valueActive);

  if (drops.disable) {
    drops.optionList = [drops.valueActive];
  }

  for (let index = 0; index < drops.optionList.length; index++) {
    const element = drops.optionList[index];
    if (
      element.id === drops.valueActive ||
      element.name.match(drops.valueActive)
    ) {
      value.value = element;

      console.log(value.value);
    }
  }
  console.log(drops.optionList);
});

const showList = ref(false);

const value = ref({
  id: 0,
  name: "Selected",
});

function closeList() {
  setTimeout(() => {
    showList.value = false;
  }, 50);
}

const drops = defineProps(["optionList", "valueActive", "disable"]);
</script>

<style lang="scss" scoped>
</style>
