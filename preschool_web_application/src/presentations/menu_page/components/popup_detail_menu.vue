<template>
  <PopupLayout
    @close="$emit('close')"
    :title="'Tạo bữa ăn'"
    class="absolute top-0 left-0"
  >
    <template #content>
      <div class="w-[600px] px-[20px]">
        <ul class="rounded-md border max-h-64 overflow-y-auto">
          <li v-for="dish in props.menuDetail.menu_detail" :key="dish">
            <div class="w-full py-2 px-3 text-start hover:bg-gray-200 relative">
              {{ dish.dish_id }}-{{ dish.dish_name }}
              <button
                class="absolute right-3"
                @click="
                  $emit('delete', {
                    meal_menu_id: props.menuDetail.meal_menu_id,
                    dish_id: dish.dish_id,
                    dish_name: dish.dish_name,
                  })
                "
              >
                <img
                  :src="close_icon"
                  class="w-5 opacity-50 hover:opacity-100"
                />
              </button>
            </div>
          </li>
        </ul>
        <div class="text-start my-5">
          <span class="pl-2">Chọn món</span>
          <InputSearchSelect
            class="h-[50px] w-full"
            :options="dishes"
            :enable-sub="false"
            :has-data="hasData"
            @selected="dishesSelected = $event"
            @scrollEnd="handleScrollEnd()"
          />
        </div>
      </div>
    </template>
    <template #button>
      <div
        id="button-side"
        class="w-full flex my-1 justify-center gap-5 basis-1/6 text-[14px]"
      >
        <button
          v-if="!creating"
          @click="createMenu()"
          type="button"
          class="h-[37px] my-[0px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md ]"
        >
          Thêm
        </button>
        <button
          v-if="creating"
          type="button"
          class="h-[35px] basis-1/11 rounded-md my-[5px] w-fit outline-none border-[0.12rem] focus:border-blue-500 px-4 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
          disabled
        >
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </button>
      </div>
    </template></PopupLayout
  >
</template>

<script setup>
import close_icon from "../../../assets/icons/close.svg";
import PopupLayout from "../../../components/popup_layout.vue";

import InputSearchSelect from "../../../components/input_search_select.vue";

//service
import menuService from "../../../services/menu.service";
import { isEmpty } from "../../../utils/resources/check_valid";
import {
  ddmmyyyyDateString,
  yyyymmddDateString,
} from "../../../utils/resources/format_date";
import { onMounted, ref } from "vue";

//valiable
const dishes = ref([]);

const dishesSelected = ref([]);
//
const page = ref(0);
const hasData = ref(true);
const creating = ref(false);

const props = defineProps({
  menuDetail: {
    type: Object,
    require: true,
  },
});

async function fetchDishes(limit, page) {
  try {
    if (!hasData.value) return;
    const response = await menuService.featchDishes(limit, page);
    const dataReponse = response.data;

    if (!dataReponse.status) return;

    dishes.value = [...dishes.value, ...dataReponse.data.dishes];

    if (dataReponse.data.dishes.length < 10) {
      hasData.value = false;
    }
  } catch (error) {
    console.log(error);
  }
}

function handleScrollEnd() {
  if (!hasData.value) return;
  page.value += 1;
  fetchDishes(10, page.value);
}

onMounted(() => {
  fetchDishes(10, page.value);
});
</script>

<style lang="scss" scoped>
</style>