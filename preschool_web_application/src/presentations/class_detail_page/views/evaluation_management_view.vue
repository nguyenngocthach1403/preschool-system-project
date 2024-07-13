<template>
  <div class="w-full h-full bg-white rounded-xl overflow-hidden">
    <PopupCreateEvaluation
      class="absolute top-0 left-0"
      v-if="isShowCreate"
      :class-ob="isShowCreate"
      @add-toast="$emit('add-toast', $event)"
      @close="closePopupCreate($event)"
    />
    <div class="py-4 px-7 text-start border-b flex justify-between">
      <span class="text-[20px] font-bold">Quản lý đánh giá</span>
    </div>
    <div class="w-full px-5 py-5">
      <!--Chức năng-->
      <div class="flex justify-between w-full">
        <SearchComp class="w-[450px]" />
        <CreateButtonComp
          @click="onShowCreateEvaluetion()"
          :title="'Tạo đợt đánh giá mới'"
        />
      </div>
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
import SearchComp from "../../../components/search_form_comp.vue";
import CreateButtonComp from "../../../components/create_button.vue";
import PopupCreateEvaluation from "../components/popup_create_evaluation.vue";
import EvaluationCardComp from "../components/evaluation_card.vue";
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

function onShowCreateEvaluetion() {
  if (classData.value) {
    isShowCreate.value = classData.value;
  } else {
    emits("add-toast", {
      title: "Dữ liệu lớp không tồn tại!",
      type: 1,
    });
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
async function closePopupCreate(result) {
  if (result) {
    //Load lại
    evaluations.value = await fetchEvaluation(classData.value.id);
  }
  isShowCreate.value = false;
}

function onClickEvaluationDetail(eva) {
  router.push({
    name: "EvaluattionDetailView",
    query: {
      classID: router.currentRoute.value.query.classID,
      evaluationId: eva.id,
    },
  });
}

onMounted(async () => {
  classData.value = await fetchClassById(
    router.currentRoute.value.query.classID
  );
});
</script>

<style lang="scss" scoped>
</style>