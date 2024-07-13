<template>
  <PopupLayout
    :title="'Tạo món ăn'"
    @close="$emit('close')"
    class="absolute top-0 left-0"
  >
    <template #content>
      <div class="w-[600px]">
        <form @submit="createActivity()" action="" class="px-10">
          <div class="text-start">
            <span class="my-1">Tên hoạt động</span
            ><span class="text-red-500"> (*)</span
            ><input
              v-model="activityName"
              type="text"
              class="input-text-default"
              :class="{ invalid: messageOfName }"
            />
            <div class="h-[20px] my-1 text-red-500">{{ messageOfName }}</div>
          </div>
          <div class="text-start">
            <span>Mô tả</span>
            <div class="mt-1">
              <textarea
                cols="30"
                rows="10"
                class="h-[100px] w-full py-2 border border-gray-400 px-3 outline-none focus:ring-1 focus:border-none rounded-md hover:border hover:border-black"
                v-model="activityDescription"
              ></textarea>
            </div>
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
          @click="createActivity()"
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
import ScheduleService from "../../../services/schedule.service";
import { isUser } from "../../../utils/resources/validator";
//list

//   //model
const activityName = ref("");
const activityDescription = ref("");

const creating = ref(false);

//   //Message Valid
const messageOfName = ref(null);

//emits
const emits = defineEmits(["add-toast", "close"]);

////funciton
async function createActivity() {
  if (isEmpty(activityName.value)) {
    messageOfName.value = "Vui lòng nhập tên hoạt động.";
    return;
  }

  const user = isUser();
  if (!user) {
    return;
  }

  creating.value = true;
  try {
    const acitivityToCreate = {
      name: activityName.value,
      description: activityDescription.value,
      createBy: user.id,
    };
    const reponse = ScheduleService.createActivity(acitivityToCreate);

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