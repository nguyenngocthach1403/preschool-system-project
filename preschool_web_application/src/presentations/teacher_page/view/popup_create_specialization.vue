<template>
  <Layout :title="'Thêm chuyên môn'">
    <template #content>
      <form class="w-full h-full px-[40px] text-start">
        <div class="gap-5 flex mt-4">
          <div id="Specialization" class="w-full">
            <label
              v-for="(specialization, index) in specializations"
              :key="index"
            >
              <span class="pl-3">Chuyên môn {{ index + 1 }}</span>
              <span class="text-red-500"> * </span>
              <select v-model="specialization.value" class="input-text-default">
                <option value="null" selected disabled>Selected</option>
                <option
                  v-for="item in specializationList"
                  :key="item"
                  :value="item.value"
                >
                  {{ item.name }}
                </option>
              </select>
              <div class="flex space-x-2">
                <div
                  class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(206,44,44)] content-center"
                  @click.prevent="removeSpecialization(index)"
                >
                  <img :src="delete_icon" class="w-[14px] m-auto" />
                </div>
                <div
                  class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(53,61,186)] content-center"
                  @click.prevent="addSpecialization"
                >
                  <img :src="plus_icon" class="w-[14px] m-auto" />
                </div>
              </div>
            </label>
          </div>
        </div>
      </form>
    </template>
    <template #bottom>
      <div>
        <button
          v-if="!creating"
          @click="createSpecialization"
          type="button"
          class="px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 active:scale-95"
        >
          Save
        </button>
        <button
          v-if="creating"
          type="button"
          class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
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
  </Layout>
</template>

<script setup>
import Layout from "@/components/edit_and_create_layout.vue";
import { ref, onMounted } from "vue";
import delete_icon from "@/assets/icons/delete.svg";
import plus_icon from "@/assets/icons/plus.svg";
import SpecializationService from "../../../services/specialization.service";
import teacherSpecializationService from "../../../services/teacher_specialization.service";

const creating = ref(false);
const emits = defineEmits(["add-toast"]);
const specializationList = ref([]);
const specializations = ref([{ value: "" }]);

const drops = defineProps({
  teacherId: {
    type: Object,
    require: false,
  },
});
onMounted(async () => {
  await getSpecialization();
});

function addSpecialization() {
  specializations.value.push({ value: "" });
}

function removeSpecialization(index) {
  specializations.value.splice(index, 1);
}
async function getSpecialization() {
  const response = await SpecializationService.getSpecialization();
  if (response.status == 200 && response.data.success) {
    for (let index = 0; index < response.data.data.length; index++) {
      const element = response.data.data[index];
      specializationList.value.push({
        name: element.name,
        value: element.id,
      });
    }
  }
}

async function createSpecialization() {
  const selectedSpecializations = specializations.value.filter(
    (spec) => spec.value !== ""
  );
  if (selectedSpecializations.length === 0) {
    emits("add-toast", {
      title: "Vui lòng chọn ít nhất một chuyên môn.",
      type: 2,
    });
    return;
  }
  for (const spec of selectedSpecializations) {
    const SpecializationToCreate = {
      specialization_id: spec.value,
      teacher_id: drops.teacherId.id,
    };
    const response =
      await teacherSpecializationService.createTeacherSpecialization(
        SpecializationToCreate
      );

    if (response.status !== 200) {
      emits("add-toast", {
        title: "Thêm chuyên môn thất bại.",
        type: 1,
      });
      return;
    }
    emits("add-toast", {
      title: "Thêm chuyên môn thành công.",
      type: 0,
    });
  }
}
</script>

<style lang="scss" scoped></style>
