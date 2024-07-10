<template>
  <PopupLayout @close="$emit('close')" :title="'Tạo danh sách thực đơn'">
    <template #content>
      <div class="px-10 text-[16px]">
        <div
          class="w-full py-3 bg-white drop-shadow-xl rounded-md text-start px-5 my-2"
        >
          <span class="font-bold"> {{ props.dataToCreate.name }}</span>
          <div>
            <p>
              <span>Buổi: </span>
              <span class="font-bold">{{ props.dataToCreate.mealName }}</span>
            </p>
            <p>
              <span>Ngày: </span>
              <span class="font-bold">{{
                ddmmyyyyDateString(
                  new Date(props.dataToCreate.date).toLocaleDateString()
                )
              }}</span>
            </p>
          </div>
        </div>
        <div
          class="w-full pt-5 pb-10 bg-white drop-shadow-xl rounded-md text-start px-1 my-2"
        >
          <div class="text-start mx-[50px]">
            <span class="pl-2">Chọn món</span>
            <InputSearchSelect
              class="h-[50px] w-[500px]"
              :options="dishes"
              :enable-sub="false"
              :has-data="hasData"
              :value="searchText"
              :loading="loading"
              @selected="dishesSelected = $event"
              @scrollEnd="handleScrollEnd()"
              @newValue="getSearchText($event)"
            />
          </div>
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
    </template>
  </PopupLayout>
</template>

<script setup>
//component
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
const searchText = ref("");
const loading = ref(false);

//props
const props = defineProps({
  dataToCreate: {
    type: Object,
    require: true,
  },
});

const emits = defineEmits(["add-toast", "close"]);

async function fetchDishes(limit, page) {
  try {
    loading.value = true;
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
  } finally {
    loading.value = false;
  }
}

function getSearchText(text) {
  if (text != searchText.value) {
    searchText.value = text;
    hasData.value = true;
    page.value = 0;
    dishes.value = [];
    searchDishes(text, 10, page.value);
  }
}

async function searchDishes(searchText, limit, page) {
  try {
    loading.value = true;
    if (!hasData.value) return;
    const response = await menuService.searchDishes(searchText, limit, page);
    const dataReponse = response.data;

    if (!dataReponse.status) return;

    dishes.value = [...dishes.value, ...dataReponse.data.dishes];

    if (dataReponse.data.dishes.length < 10) {
      hasData.value = false;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

async function createMenu() {
  try {
    creating.value = true;
    const user = JSON.parse(localStorage.getItem("user"));
    if (
      isEmpty(props.dataToCreate.classId) ||
      isEmpty(props.dataToCreate.mealId) ||
      isEmpty(props.dataToCreate.date) ||
      dishesSelected.value.length == 0 ||
      isEmpty(user.id)
    ) {
      return emits("add-toast", {
        title: "Dữ liệu không phụ hợp!",
        type: 1,
      });
    }

    const dataToCreate = {
      date: yyyymmddDateString(
        new Date(props.dataToCreate.date).toLocaleDateString()
      ),
      createBy: user.id,
      mealId: props.dataToCreate.mealId,
      dishes: dishesSelected.value,
      mealMenuId: props.dataToCreate.mealMenuId,
      dailyMenuId: props.dataToCreate.dailyMenuId,
    };
    console.log(dataToCreate);
    const response = await menuService.createMenu(
      props.dataToCreate.classId,
      dataToCreate
    );

    emits("add-toast", {
      title: "Thành công!",
      type: 0,
    });

    emits("close", true);
  } catch (error) {
    console.log(error);
    emits("add-toast", {
      title: "Thất bại!",
      content: error.response.data.error,
      type: 1,
    });
  } finally {
    creating.value = false;
  }
}

function handleScrollEnd() {
  if (!hasData.value) return;
  page.value += 1;
  if (searchText.value != "") searchDishes(searchText.value, 10, page.value);
  else fetchDishes(10, page.value);
}

onMounted(() => {
  fetchDishes(10, page.value);
});
</script>

<style scoped>
</style>