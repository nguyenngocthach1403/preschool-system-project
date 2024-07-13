<template>
  <PopupLayout
    @close="$emit('close')"
    :title="'Tạo bữa ăn'"
    class="absolute top-0 left-0"
  >
    <template #content>
      <div class="w-[600px]">
        <form @submit="createMeal()" action="" class="px-10">
          <div class="text-start">
            <span>Tên buổi</span><span class="text-red-500"> (*)</span
            ><input
              type="text"
              class="input-text-default"
              v-model="meal"
              :class="{ invalid: messageOfName }"
            />
            <div class="h-[20px] my-1 text-red-500">{{ messageOfName }}</div>
          </div>
          <div class="text-start">
            <span>Thời gian bắt đầu</span><span class="text-red-500"> (*)</span
            ><input
              v-model="startTime"
              type="time"
              class="input-text-default"
              :class="{ invalid: messageOfStartTime }"
            />
            <div class="h-[20px] my-1 text-red-500">
              {{ messageOfStartTime }}
            </div>
          </div>
          <div class="text-start">
            <span>Thời gian kết thúc</span><span class="text-red-500"> (*)</span
            ><input
              v-model="endTime"
              type="time"
              class="input-text-default"
              :class="{ invalid: messageOfEndTime }"
            />
            <div class="h-[20px] my-1 text-red-500">{{ messageOfEndTime }}</div>
          </div>
        </form>
      </div>
    </template>
    <template #button>
      <div
        id="button-side"
        class="w-full flex justify-center gap-5 basis-1/6 text-[14px]"
      >
        <button
          v-if="!creating"
          @click="createMeal()"
          type="button"
          class="h-[35px] my-[5px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md ]"
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
import { ref } from "vue";
import PopupLayout from "../../../components/popup_layout.vue";
import { isEmpty, isValidTime } from "../../../utils/resources/check_valid";

//Service
import MenuService from "../../../services/menu.service";
import { isUser } from "../../../utils/resources/validator";

//model
const startTime = ref(null);
const endTime = ref(null);
const meal = ref("");

const creating = ref(false);

//Message Valid
const messageOfName = ref(null);
const messageOfStartTime = ref(null);
const messageOfEndTime = ref(null);

//emits
const emits = defineEmits(["add-toast", "close"]);

/**
 * Phương thức kiểm tra các giá trị nhập của người dùng
 * @return True or False
 */
function checkValid() {
  let invalid = false;
  if (isEmpty(meal.value)) {
    invalid = true;
    messageOfName.value = "Vui lòng nhập tên bữa ăn";
  }

  if (!isValidTime(startTime.value)) {
    invalid = true;
    messageOfStartTime.value = "Vui lòng thời gian";
  }
  if (!isValidTime(endTime.value)) {
    invalid = true;
    messageOfEndTime.value = "Vui lòng thời gian";
  }
  return invalid;
}

async function createMeal() {
  if (checkValid()) return;

  try {
    const user = isUser();

    if (!user) return;
    creating.value = true;
    const response = await MenuService.addMeals({
      meal: meal.value,
      start_time: startTime.value,
      end_time: endTime.value,
      create_by: user.id,
    });

    emits("add-toast", {
      title: "Thành công!",
      type: 0,
    });
    emits("close", true);
  } catch (error) {
    emits("add-toast", {
      title: "Thất bại!",
      type: 1,
    });
  } finally {
    creating.value = false;
  }
}
</script>

<style  scoped>
.invalid {
  border: 1px solid red;
}
</style>