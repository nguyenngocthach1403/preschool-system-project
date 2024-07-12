<template>
  <PopupLayout
    :title="'Sửa thời gian biểu'"
    @close="$emit('close')"
    class="absolute top-0 left-0"
  >
    <template #content>
      <div class="w-[1200px] px-10 text-[17px]">
        <div
          class="w-full bg-white drop-shadow-xl border px-5 py-5 rounded-md h-full overflow-y-auto"
        >
          <div class="w-full text-[23px] font-bold px-20">
            <span class="text-gray-600">Phiếu đánh giá </span>
            <span>{{ props.evaluationForm.evaluation_name || "..." }}</span>
          </div>
          <div class="w-full text-start my-5 tracking-[.2em]">
            Họ tên trẻ:
            <span class="font-bold">
              {{
                props.evaluationForm
                  ? props.evaluationForm.student_name
                  : "........................................................................................."
              }}
            </span>
          </div>
          <div class="w-full text-start my-5 tracking-[.2em]">
            Ngày sinh:
            .........................................................................................
          </div>
          <div class="w-full text-start my-5 tracking-[.2em]">
            Lớp:
            <span class="font-bold">
              {{
                props.evaluationForm
                  ? props.evaluationForm.class_name
                  : "........................................................................................."
              }}
            </span>
          </div>
          <div
            v-for="item in evaluationCriterias"
            :key="item"
            class="border border-black px-3 py-2 my-2 rounded-md"
            :class="{ select: evaluationCriterias == item.id }"
          >
            <div class="w-full py-3 rounded-md font-bold text-[18px]">
              <span>{{ item.name }}</span>
            </div>
            <div
              class="py-2 my-1 text-start px-3 text-[17px] hover:bg-gray-100 relative drop-shadow-xl"
              v-for="(
                item, index
              ) in props.evaluationForm.evaluationContents.filter(
                (e) => e.evaluation_criteria_id == item.id
              )"
              :key="index"
            >
              <span>{{ item.criteria_content_name }}</span>
              <button
                class="absolute right-3 top-1/4 opacity-50 hover:opacity-100"
                @click="onRemoveItem(item)"
              >
                <img :src="close_icon" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #button>
      <div
        id="button-side"
        class="w-full flex justify-center gap-5 basis-1/6 text-[14px]"
      >
        <button
          v-if="!creating"
          type="button"
          class="h-[35px] my-[5px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md ]"
        >
          Cập nhật
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
import { computed, onMounted, ref, watch } from "vue";
import PopupLayout from "../../../components/popup_layout.vue";
import close_icon from "../../../assets/icons/close.svg";

const creating = ref(false);

const props = defineProps({
  evaluationForm: {
    type: Object,
    require: true,
  },
});

const evaluationCriterias = computed(() => {
  const result = props.evaluationForm.evaluationContents.flatMap((e) => {
    return { id: e.evaluation_criteria_id, name: e.evaluation_criteria_name };
  });
  return Array.from(new Map(result.map((item) => [item.id, item])).values());
});
</script>
            
<style  scoped>
</style>