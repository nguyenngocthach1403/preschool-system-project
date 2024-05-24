<template>
  <div id="list-box" class="relative">
    <button
      class="relative w-full cursor-default rounded-md bg-white h-full text-left text-gray-900 sm:text-sm sm:leading-6"
    >
      <input
        v-model="value"
        @keydown.down="
          focusItem < listfilter.length ? (focusItem += 1) : listfilter.length
        "
        @keydown.up="focusItem > 1 ? (focusItem -= 1) : 0"
        @keydown.enter="
          {
            if (focusItem !== 0) (value = list[focusItem - 1]), closeList();
          }
        "
        @click="show = !show"
        @focus="show = true"
        @focusout="closeList"
        type="text"
        class="w-full h-full py-1.5 pl-3 pr-10 focus:outline-none shadow-sm ring-1 rounded-md ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </button>

    <transition
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ul
        v-show="show"
        class="absolute z-10 mt-1 max-h-44 w-full overflow-y-scroll rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <li
          v-for="(item, index) in listfilter"
          :key="index"
          class="text-gray-900 relative cursor-default select-none hover:bg-blue-200"
          @click="
            (value = item),
              $emit('choose', listfilter.includes(value) ? value : undefined),
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
import { computed, onMounted, ref, watch } from "vue";

const list = ref([]);

onMounted(() => {
  if (props.active != undefined) {
    value.value = props.active;
  }
  list.value = props.listSelect;
  console.log("a", props.listSelect);
});
const props = defineProps({
  active: {
    type: String,
  },
  listSelect: {
    type: Array,
  },
});
const show = ref(false);
const value = ref("");

const emits = defineEmits(["choose"]);

watch(value, () => {
  show.value = true;
  setTimeout(() => {
    show.value = false;
  }, 5000);

  emits("choose", value.value);
});

const listfilter = computed(() => {
  return list.value.filter((e) => {
    return e.match(value.value);
  });
});

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