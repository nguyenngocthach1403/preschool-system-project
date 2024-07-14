<template>
  <div class="w-full h-full bg-white rounded-xl overflow-hidden">
    <div class="w-full px-5 py-5">
      <!--Chức năng-->
      <!--Body-->
      <div class="w-full grid grid-cols-3 gap-4 my-10">
        <EvaluationCardComp
          v-for="eva in evaluations"
          :key="eva"
          :eva="eva"
          @click="onClickEvaluationDetail(eva)"
        />
      </div>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
//component

import EvaluationCardComp from "../../class_detail_page/components/evaluation_card.vue";
//icon
import avatar_default from "../../../assets/img/avartar_default.jpg";
import { useRouter } from "vue-router";

//service
import ClassService from "../../../services/class.service";
import evaluationService from "../../../services/evaluation.service";
import { ddmmyyyyDateString } from "../../../utils/resources/format_date";

//router
const router = useRouter();

const isShowCreate = ref(null);
const loading = ref(false);
const classData = ref(null);

const evaluations = ref([]);

const emits = defineEmits(["add-toast"]);

watch(classData, async () => {
  evaluations.value = await fetchEvaluation(classData.value.id);
});
async function fetchClassById(classId) {
  loading.value = true;
  try {
    const response = await ClassService.getClassById(classId);

    const dataResponse = response.data;

    console.log(dataResponse);

    return dataResponse.data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

async function fetchEvaluation(classId) {
  try {
    loading.value = true;
    const response = await evaluationService.getEvaluations(classId);

    const dataReponse = response.data.data;
    return dataReponse || [];
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

//funciton
/**
 *
 * @param {Boolean} result
 * @returns TRUE or False
 */

function onClickEvaluationDetail(eva) {
  router.push({
    name: "TeacherEvalutionDetailView",
    query: {
      classID: router.currentRoute.value.params.id,
      evaluationId: eva.id,
    },
  });
}

onMounted(async () => {
  classData.value = await fetchClassById(router.currentRoute.value.params.id);
});
</script>

<style lang="scss" scoped></style>
