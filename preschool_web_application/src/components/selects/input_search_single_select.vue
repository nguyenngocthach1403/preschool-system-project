<template>
  <div class="relative">
    <button
      :disabled="props.disabled"
      class="main w-full h-full bg-white overflow-hidden focus:ring-1 rounded-md border border-gray-400/75 hover:border hover:border-gray-500 p-[1px] flex items-center relative"
      @focusout="closeOptionList"
      @click.prevent
      :class="{ disabled: props.disabled }"
    >
      <div
        v-if="selected"
        @click="
          props.disabled == false ? (showOption = true) : (showOption = false)
        "
        class="w-full px-3 text-start text-[13px] overflow-hidden text-nowrap"
      >
        <span>{{ selected.name }}</span>
        <button
          :disabled="props.disabled"
          class="absolute w-4 h-4 top-1/4 right-2 opacity-40 hover:opacity-100"
          @click="deleteItem()"
        >
          <img :src="close_icon" alt="" />
        </button>
      </div>
      <input
        :disabled="props.disabled"
        v-else
        @focus="showOption = true"
        @click="showOption = true"
        type="text"
        v-model="value"
        class="w-full h-full px-3 outline-none rounded-md text-[15px]"
      />
    </button>
    <transition
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ul
        v-show="showOption"
        ref="ListElement"
        @scroll="handleScroll($event)"
        class="absolute z-10 mt-1 max-h-56 w-full overflow-y-scroll rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <li
          v-for="(item, index) in props.options"
          :key="index"
          class="text-start px-5 py-2 cursor-default flex justify-between items-center hover:bg-gray-200"
          @click="chooseItem(item)"
          :class="{ selected: selected == item }"
        >
          <div class="flex items-center gap-3">
            <img
              :src="item.avatar || ''"
              class="w-6 h-6 rounded-full border object-cover"
            />
            <div>
              <p>{{ item.name }}</p>
              <p v-if="props.enableSub" class="text-[12px] text-gray-500">
                MS{{ item.id }}
              </p>
            </div>
          </div>
          <!-- <img :src="complete_icon" class="w-5 h-5" alt="" /> -->
          <svg
            v-if="selected == item"
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
        <li
          v-if="!props.options || props.options.length == 0"
          class="empty text-center text-gray-400"
        >
          <img class="w-10 h-10 m-auto" :src="empty_icon" alt="" />
          <span>Không có dữ liệu</span>
        </li>
      </ul>
    </transition>
  </div>
</template>
  
  <script setup>
import { computed, ref, watch } from "vue";

//icon
import close_icon from "../../assets/icons/close.svg";
import complete_icon from "../../assets/icons/complete.svg";
import empty_icon from "../../assets/icons/Empty Box.svg";
//component
import LoadingComp from "../../components/loading_comp.vue";

//effect
const showOption = ref(false);
const enableSub = ref(true);

//model
const input = ref("");
const selected = ref(null);
const value = ref("");

//element
const ListElement = ref(null);

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
  select: {
    type: Object,
    require: false,
  },
  enableSub: {
    type: Boolean,
    require: false,
  },
  disabled: {
    type: Boolean,
    require: false,
  },
});

watch(props, () => {
  if (props.value != "") {
    value.value = props.value;
  }

  if (props.options.find((e) => e.id == props.select.id))
    selected.value = props.options.find((e) => e.id == props.select.id) || null;
  else {
    selected.value = props.select;
    console.log("a", selected.value);
  }
});

watch(value, () => {
  updateValue(value.value);
});
const emits = defineEmits(["selected", "newValue", "scrollEnd"]);

/**
 * Xóa dữ liệu đã chọn trước đó
 *
 */
function deleteItem() {
  selected.value = null;
}
/**
 * Phương thức lưu dữ liệu khi người dùng chọn
 * @param {Object} item
 */
function chooseItem(item) {
  selected.value = item;
  emits("selected", item);
}

function closeOptionList() {
  setTimeout(() => {
    showOption.value = false;
  }, 100);
}

function updateValue(newValue) {
  emits("newValue", newValue);
}
//handle
/**
 * Sự kiện scroll khi người dùng scroll option list và gửi đi sự kiện khi scroll đến cuối cùng
 * @param event
 */
function handleScroll(event) {
  if (
    event.target.scrollTop + event.target.clientHeight >=
    event.target.scrollHeight
  ) {
    emits("scrollEnd");
  }
}
</script>
  
  <style  scoped>
.delete {
  color: blue;
}
.selected {
  background-color: rgb(234, 234, 255);
}
.disabled {
  background-color: #cfcfcf83;
  color: #898989;
}
</style>