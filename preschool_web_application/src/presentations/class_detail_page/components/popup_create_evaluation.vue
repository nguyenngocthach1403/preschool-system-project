<template>
  <PopupLayout :title="'Tạo đợt đánh giá mới'" @close="$emit('close')">
    <template #content>
      <div class="w-[1300px] px-8 flex gap-3 py-5">
        <div class="w-full bg-white drop-shadow-xl border px-5 py-5 rounded-md">
          <div class="w-full text-[23px] font-bold">
            Phiếu đánh giá {{ evaluationName || "..." }}
          </div>
          <div class="w-full text-start my-5 tracking-[.2em]">
            Họ tên trẻ:
            .........................................................................................
          </div>
          <div class="w-full text-start my-5 tracking-[.2em]">
            Ngày sinh:
            .........................................................................................
          </div>
          <div class="w-full text-start my-5 tracking-[.2em]">
            Lớp:
            .........................................................................................
          </div>
        </div>
        <div
          class="w-[45%] bg-white drop-shadow-xl border px-5 py-5 rounded-md"
        >
          <div class="text-start">
            <span class="pl-2"> Tên đợt đánh giá</span>
            <span class="text-red-500"> (*)</span>
            <input
              type="text"
              v-model="evaluationName"
              class="input-text-default drop"
            />
            <div class="h-[20px] my-1 text-red-500">
              {{ messageOfEvaluationName }}
            </div>
          </div>
          <div class="text-start">
            <span class="pl-2"> Chọn các tiêu chi đánh giá</span>
            <span class="text-red-500"> (*)</span>
            <InputSearchSelectComp class="h-[50px]" />
            <div class="h-[20px] my-1 text-red-500">
              {{ messageOfEvaluationName }}
            </div>
          </div>
          <div class="text-start">
            <span class="pl-2"> Chọn các tiêu chi đánh giá</span>
            <span class="text-red-500"> (*)</span>
            <InputSearchSelectComp class="h-[50px]" />
            <div class="h-[20px] my-1 text-red-500">
              {{ messageOfEvaluationName }}
            </div>
          </div>
        </div>
      </div></template
    >
    <template #button>
      <div
        id="button-side"
        class="w-full flex justify-center gap-5 basis-1/6 text-[14px]"
      >
        <button
          v-if="!creating"
          type="button"
          class="h-[35px] my-[5px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md"
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
import InputSearchSelectComp from "../../../components/input_search_select.vue";

const evaluationName = ref("");

const creating = ref(false);

const messageOfEvaluationName = ref("");

const emits = defineEmits(["close"]);
</script>

<style lang="scss" scoped>
</style>