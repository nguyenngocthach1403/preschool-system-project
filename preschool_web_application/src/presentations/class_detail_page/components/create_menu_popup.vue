<template>
  <PopupLayout :title="'Tạo danh sách thực đơn'">
    <template #content>
      <div>
        <div>
          <p><span>Buổi: </span> {{ props.dataToCreate.mealName }}</p>
          <p><span>Ngày: </span> {{ props.dataToCreate.dateOfWeek }}</p>
        </div>
        <div class="text-start mx-[50px]">
          <span class="pl-2">Chọn món</span>
          <InputSearchSelect
            class="h-[50px] w-[500px]"
            :options="dishes"
            :value="[]"
            :enable-sub="false"
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
          v-if="true"
          type="button"
          class="h-[37px] my-[0px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md ]"
        >
          Thêm
        </button>
        <button
          v-if="false"
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
    </template>
  </PopupLayout>
</template>

<script setup>
//component
import PopupLayout from "../../../components/popup_layout.vue";
import InputSearchSelect from "../../../components/input_search_select.vue";

//service
import menuService from "../../../services/menu.service";
import { onMounted, ref } from "vue";

//valiable
const dishes = ref([]);

//
const page = ref(0);
const hasData = ref(true);

//props
const props = defineProps({
  dataToCreate: {
    type: Object,
    require: true,
  },
});

async function featchDishes({ limit = 10, page = 0, hasData = true }) {
  try {
    if (!hasData) return;
    const response = await menuService.featchDishes(limit, page);
    const dataReponse = response.data;

    if (!dataReponse.status) return;

    dishes.value = dataReponse.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  featchDishes({ limit: 10, page: page.value });
});
</script>

<style scoped>
</style>