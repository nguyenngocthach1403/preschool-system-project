<template>
  <PopupLayout
    :title="'Chi tiết phiếu đánh giá'"
    @close="$emit('close')"
    class="absolute top-0 left-0"
  >
    <template #content>
      <div class="w-[1200px] px-10 text-[17px]">
        <div
          class="w-full bg-white drop-shadow-xl border px-5 py-5 rounded-md h-full overflow-y-auto"
          :class="{ disabled: disabled }"
        >
          <div
            class="absolute right-5 px-3 rounded-md py-1"
            :class="{
              status_0: props.evaluationForm.status == 0,
              status_1: props.evaluationForm.status == 1,
              status_2: props.evaluationForm.status == 2,
            }"
          >
            {{
              props.evaluationForm
                ? convertStatusEvaluationForm(props.evaluationForm.status)
                : ""
            }}
          </div>
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
            {{
              props.evaluationForm
                ? ddmmyyyyDateString(
                    new Date(
                      props.evaluationForm.student_birthday
                    ).toLocaleDateString()
                  )
                : "........................................................................................."
            }}
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
          <form @submit.prevent="updateEvaluationForm()">
            <div class="h-[500px]">
              <div
                v-for="(item, evaCrIdx) in evaluationCriterias"
                :key="evaCrIdx"
                class="border border-black px-3 py-2 my-2 rounded-md"
                :class="{ select: evaluationCriterias == item.id }"
              >
                <div class="w-full py-3 rounded-md font-bold text-[18px]">
                  <span>{{ item.name }}</span>
                </div>
                <table class="w-full">
                  <thead>
                    <tr>
                      <th class="text-start p-5">Tiêu chí</th>
                      <th class="text-center p-5">Đạt</th>
                      <th class="text-center p-5">Chưa đạt</th>
                      <th class="p-5">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in evaluationContents.filter(
                        (e) => e.evaluation_criteria_id == item.id
                      )"
                      :key="index"
                      class="hover:bg-gray-100 z-10"
                    >
                      <td class="text-start p-5">
                        {{ item.criteria_content_name }}
                      </td>
                      <td class="text-center px-7 py-5">
                        <input
                          class="w-5 h-5"
                          ref="checkBoxA"
                          :checked="
                            item.achieve != 0 && item.achieve ? true : false
                          "
                          :disabled="disabled"
                          @change="
                            changeAchieve(item, $event.target.checked, 0)
                          "
                          type="checkbox"
                          name=""
                          id=""
                        />
                      </td>
                      <td class="text-center px-7 py-5">
                        <input
                          class="w-5 h-5"
                          :checked="
                            item.achieve != 1 && item.achieve ? true : false
                          "
                          ref="checkBoxB"
                          :disabled="disabled"
                          @change="
                            changeAchieve(item, $event.target.checked, 1)
                          "
                          type="checkbox"
                          name=""
                          id=""
                        />
                      </td>
                      <td class="relative">
                        <textarea
                          :value="item.description || ''"
                          @change="getDescInput(item, $event)"
                          :disabled="disabled"
                          ref="descInput"
                          class="rounded-md h-[50px] border w-full px-4 py-2 focus:border-none focus:ring-1 outline-none focus:absolute focus:h-[120px] focus:top-0 focus:left-0 focus:z-40 z-10"
                          cols="30"
                          rows="10"
                        ></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
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
          @click.prevent="updateEvaluationForm()"
          type="submit"
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
import { ddmmyyyyDateString } from "../../../utils/resources/format_date";
import { convertStatusEvaluationForm } from "../../../utils/resources/converter";
import evaluationService from "../../../services/evaluation.service";

const creating = ref(false);

const evaluationContents = computed(() => {
  return props.evaluationForm.evaluationContents;
});

const props = defineProps({
  evaluationForm: {
    type: Object,
    require: true,
  },
});
const evaluationFormChanged = computed(() => {
  return props.evaluationForm.evaluationContents.filter(
    (el) => el.achieve !== null || el.description
  );
});

const checkBoxA = ref();
const checkBoxB = ref();
const descInput = ref();

const disabled = computed(() => {
  return props.evaluationForm.status == 2;
});

const evaluationCriterias = computed(() => {
  if (evaluationContents.value) {
    const result =
      evaluationContents?.value?.flatMap((e) => {
        return {
          id: e.evaluation_criteria_id,
          name: e.evaluation_criteria_name,
        };
      }) || [];
  }
  return Array.from(new Map(result.map((item) => [item.id, item])).values());
});

function changeAchieve(item, value, index) {
  const evaluationContentIdx = evaluationContents.value.findIndex(
    (e) => e.criteria_content_id == item.criteria_content_id
  );

  if (evaluationContentIdx == -1) {
    return;
  }
  if (!value) {
    evaluationContents.value[evaluationContentIdx].achieve = null;
    return;
  }

  if (index == 1) {
    checkBoxA.value[evaluationContentIdx].checked = false;
    evaluationContents.value[evaluationContentIdx].achieve = false;
  } else {
    checkBoxB.value[evaluationContentIdx].checked = false;
    evaluationContents.value[evaluationContentIdx].achieve = true;
  }
}

async function updateEvaluationForm() {
  if (!props?.evaluationForm?.evaluation_form_id) return;
  if (!evaluationFormChanged.value) return;
  try {
    creating.value = true;
    const dataToUpDate = evaluationFormChanged.value.map((el) => {
      return {
        id: el.criteria_content_id,
        achieve: el.achieve,
        description: el.description,
      };
    });
    console.log(props.evaluationForm.evaluation_form_id);

    const response = await evaluationService.updateEvaluationForm(
      props.evaluationForm.evaluation_form_id,
      { evaluationContents: dataToUpDate }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  } finally {
    creating.value = false;
  }
}

function getDescInput(item, value) {
  console.log(value.target.value);
  const evaluationContentIdx =
    props.evaluationForm.evaluationContents.findIndex(
      (e) => e.criteria_content_id == item.criteria_content_id
    );
  if (evaluationContentIdx == -1) {
    return;
  }
  props.evaluationForm.evaluationContents[evaluationContentIdx].description =
    value.target.value;
}
</script>
            
<style  scoped>
.disabled {
  background-color: rgb(235, 235, 235);
}
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