<template>
  <PopupLayout :title="'Tạo đợt đánh giá mới'" @close="$emit('close')">
    <template #content>
      <div class="w-[1400px] h-[700px] px-8 flex gap-3 py-5">
        <div
          class="w-full bg-white drop-shadow-xl border px-5 py-5 rounded-md h-full overflow-y-auto"
        >
          <div class="w-full text-[23px] font-bold px-20">
            <span class="text-gray-600">Phiếu đánh giá </span>
            <span>{{ evaluationName || "..." }}</span>
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
            <span class="font-bold">
              {{
                props.classOb
                  ? props.classOb.name
                  : "........................................................................................."
              }}
            </span>
          </div>
          <div
            v-for="item in criteriasSelected"
            :key="item"
            class="border border-black px-3 py-2 my-2 rounded-md"
            :class="{ select: currentCriteriaSelected == item.id }"
          >
            <div class="w-full py-3 border rounded-md font-bold text-[18px]">
              <span>{{ item.name }}</span>
              <div
                @click="selectCriteriaToAddContent(item.id)"
                class="text-[12px] text-blue-500 hover:underline cursor-default"
              >
                Chọn để thêm nội dung cho tiêu chí
              </div>
            </div>
            <div
              class="py-2 my-1 text-start px-3 text-[17px] hover:bg-gray-100 relative drop-shadow-xl"
              v-for="(item, index) in criteriaContentsSelected.filter(
                (e) => e.evaluation_criteria_id == item.id
              )"
              :key="index"
            >
              <span>{{ item.name }}</span>
              <button
                class="absolute right-3 top-1/4 opacity-50 hover:opacity-100"
                @click="onRemoveItem(item)"
              >
                <img :src="close_icon" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div
          class="w-[50%] bg-white drop-shadow-xl border px-5 py-5 rounded-md"
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
            <span class="pl-2">Lớp</span>
            <span class="text-red-500"> (*)</span>
            <InputSearchSelectSingleComp
              :select="classSelected"
              :options="classes"
              :value="searchTextClass"
              @selected="classSelected = $event"
              :disabled="props.classOb ? true : false"
              class="h-[50px] mb-[20px]"
            />
          </div>
          <div class="text-start">
            <span class="pl-2"> Chọn các tiêu chi đánh giá</span>
            <span class="text-red-500"> (*)</span>
            <InputSearchSelectComp
              :options="evaluationCriterias"
              :value="searchTextCriterias"
              :loading="criteriasLoading"
              @selected="criteriasSelected = $event"
              @newValue="getSearchTextCriterias($event)"
              class="h-[50px]"
            />
            <div class="h-[20px] my-1 text-red-500">
              {{ messageOfEvaluationName }}
            </div>
          </div>
          <div class="text-start">
            <span class="pl-2">Chọn nội dung tiêu chi đánh giá</span>
            <span class="text-red-500"> (*)</span>
            <InputSearchSelectComp
              :options="criteriaContents"
              :value="searchTextCriteriaContents"
              @selected="criteriaContentsSelected = $event"
              @newValue="getSearchTextCriteriaContents($event)"
              class="h-[50px]"
            />
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
          @click="createEvaluation()"
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
import { computed, onMounted, ref, watch } from "vue";
import PopupLayout from "../../../components/popup_layout.vue";
import InputSearchSelectComp from "../../../components/input_search_select.vue";
import InputSearchSelectSingleComp from "../../../components/selects/input_search_single_select.vue";
//Service
import EvaluationService from "../../../services/evaluation.service";

//icon
import close_icon from "../../../assets/icons/close.svg";

const evaluationName = ref("");

const evaluationCriterias = ref([]);
const criteriasSelected = ref([]);
const searchTextCriterias = ref("");
const criteriaContents = ref([]);
const criteriaContentsSelected = ref([]);

const criteriaContentsPage = ref(0);
const searchTextCriteriaContents = ref("");
const hasDataCriteriaContents = ref(true);
const currentCriteriaSelected = ref(null);

const creating = ref(false);

const messageOfEvaluationName = ref("");
const criteriasLoading = ref(false);
// const messageOfEvaluationName = ref("");
const criteriaContentLoading = ref(false);

//Class
const searchTextClass = ref("");
const classPage = ref(0);
const classes = ref([]);
const classLoading = ref(false);
const classSelected = ref();
const classData = computed(() => {
  return props.classData;
});

const emits = defineEmits(["close", "add-toast"]);

const props = defineProps({
  classOb: {
    type: Object,
    require: false,
  },
});

function getSearchTextCriterias(text) {
  if (text != searchTextCriterias.value) {
    searchTextCriterias.value = text;
    fetchEvaluationCriterias(searchTextCriterias.value);
  }
}
function getSearchTextCriteriaContents(text) {
  if (
    text != searchTextCriteriaContents.value &&
    currentCriteriaSelected.value
  ) {
    searchTextCriteriaContents.value = text;
    hasDataCriteriaContents.value = true;
    criteriaContents.value = [];

    fetchCriteriasContent(
      criteriaContentsPage.value,
      text,
      currentCriteriaSelected.value
    );
  }
}

function selectCriteriaToAddContent(item) {
  if (item != currentCriteriaSelected.value) {
    currentCriteriaSelected.value = item;
    hasDataCriteriaContents.value = true;
    criteriaContents.value = [];
    criteriaContentsPage.value = 0;
    searchTextCriteriaContents.value = "";
    fetchCriteriasContent(
      criteriaContentsPage.value,
      searchTextCriteriaContents.value,
      currentCriteriaSelected.value
    );
  }
}

function onRemoveItem(item) {
  const index = criteriaContentsSelected.value.findIndex(
    (e) => e.id == item.id
  );

  if (index !== -1) {
    criteriaContentsSelected.value.splice(index, 1);
  }
}

//function
async function fetchEvaluationCriterias(searchText) {
  criteriasLoading.value = true;

  try {
    const response = await EvaluationService.getEvaluationCriterias(searchText);

    const dataResponse = response.data.data;

    evaluationCriterias.value = dataResponse;
  } catch (error) {
    console.log(error);
  } finally {
    criteriasLoading.value = false;
  }
}
async function fetchCriteriasContent(page, searchText, criteria_id) {
  if (!hasDataCriteriaContents.value) return;
  criteriaContentLoading.value = true;

  try {
    const response = await EvaluationService.getCriteriasContents(
      10,
      page,
      searchText,
      criteria_id
    );

    const dataResponse = response.data.data;
    if (response.data.data.length < 10) {
      hasDataCriteriaContents.value = false;
    }

    criteriaContents.value = [...criteriaContents.value, ...dataResponse];
  } catch (error) {
    console.log(error);
  } finally {
    criteriaContentLoading.value = false;
  }
}
import ClassService from "../../../services/class.service";
import { isUser } from "../../../utils/resources/validator";

async function fetchClasses(page, searchText) {
  try {
    classLoading.value = true;
    const response = await ClassService.searchClass(
      searchText,
      null,
      null,
      10,
      page
    );
    const dataResponse = response.data.data;
    classes.value = dataResponse.map((clss) => {
      const { class_name, class_img, ...rest } = clss;
      return { name: class_name, avatar: class_img, ...rest };
    });
  } catch (error) {
    console.log(error);
  }
}

async function createEvaluation() {
  const user = isUser();

  if (!classSelected.value || !user?.id) return;
  try {
    creating.value = true;
    const dataToCreate = {
      evaluationName: evaluationName.value,
      criteriasContents:
        criteriaContentsSelected.value.length > 0
          ? criteriaContentsSelected.value
          : [],
      createBy: user.id,
    };

    const response = await EvaluationService.createEvaluation(
      classSelected.value.id,
      dataToCreate
    );

    console.log(response);

    emits("add-toast", { title: "Thành công!", type: 0 });
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

onMounted(() => {
  fetchEvaluationCriterias("");
  fetchClasses(classPage.value, searchTextClass.value);
  classSelected.value = props.classOb;
});
</script>

<style scoped>
.select {
  border: solid 1px blue;
  background-color: rgba(0, 106, 255, 0.208);
}
.select > div {
  border: none;
}
</style>