<template>
  <div class="w-full">
    <PopupFormDetail
      v-if="isShowDetailForm"
      :evaluation-form="isShowDetailForm"
      class="absolute top-0 left-0"
      @close="isShowDetailForm = null"
    />
    <div v-if="evaluation">
      <div class="w-full py-2 px-5 text-start">
        <p class="text-[22px] font-bold">
          Đợt đánh giá {{ evaluation?.name || "" }}
        </p>
      </div>
      <div class="w-full flex flex-wrap gap-3 justify-start my-5 px-5">
        <div
          v-for="item in evaluationForm"
          :key="item"
          @click="isShowDetailForm = item"
          class="w-[32%] rounded-md drop-shadow-xl text-start bg-white border hover:ring-1 py-3 px-3"
        >
          <div class="flex items-center relative">
            <img
              :src="item.student_avatar || avatar_default"
              class="w-[60px] h-[60px] rounded-full border"
            />
            <p class="text-[18px] font-bold py-1 px-3">
              {{ item.student_name }}
            </p>
            <div
              class="absolute bottom-0 right-0 text-[12px] px-2 py-1 rounded-md"
              :class="{
                status_0: item.status == 0,
                status_1: item.status == 1,
                status_2: item.status == 2,
              }"
            >
              {{ convertStatusEvaluationForm(item.status) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
//component
import PopupFormDetail from "../components/popup_evaluaiton_form_detail.vue";
//service
import EvaluationService from "../../../services/evaluation.service";
import { convertStatusEvaluationForm } from "../../../utils/resources/converter";
import avatar_default from "../../../assets/img/avartar_default.jpg";

const router = useRouter();
const evaluationForm = computed(() => {
  return evaluation.value ? evaluation.value.evaluationForms : [];
});
const evaluation = ref();

const isShowDetailForm = ref(null);

/**
 * Phuương thức lấy evaluation theo id
 * @param {interger} evalationId
 */
async function fetchEvaluationById(evalationId) {
  try {
    const response = await EvaluationService.getEvaluationById(evalationId);
    const dataResponse = response.data.data;
    evaluation.value = dataResponse;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  fetchEvaluationById(router.currentRoute.value.query.evaluationId);
});
</script>


<style  scoped>
.status_0 {
  background-color: rgb(254, 254, 202);
  border: 1px solid rgb(252, 230, 165) !important;
  color: rgb(220, 162, 38);
}
.status_2 {
  background-color: rgb(217 249 157);
  border: 1px solid rgb(190 242 100) !important;
  color: rgb(132 204 22);
}
.status_1 {
  background-color: rgb(186 230 253);
  border: 1px solid rgb(125 211 252) !important;
  color: rgb(14 165 233);
}
</style>