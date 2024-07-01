<template>
  <Layout :title="'Tạo chương trình'">
    <template #content>
      <form class="w-full h-full px-[40px] text-start">
        <div class="gap-5 flex mt-4">
          <div id="Username" class="w-full">
            <label for="">
              <span class="pl-3">Tên chương trình</span
              ><span class="text-red-500"> * </span>
              <input
                v-model="name"
                type="text"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              />
            </label>
          </div>
          <div id="Password" class="w-full">
            <label for="">
              <span class="pl-3">Mô tả</span>
              <input
                v-model="description"
                type="text"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              />
            </label>
          </div>
        </div>
      </form>
    </template>
    <template #bottom>
      <div>
        <button
          v-if="!creating"
          @click="createSyllabus"
          type="button"
          class="px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 active:scale-95 mt-4"
        >
          Lưu
        </button>
        <button
          v-if="creating"
          type="button"
          class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed mt-4"
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
import { onMounted, ref } from "vue";
import SelectComp from "../../../components/select_comp.vue";
import syllabusService from "../../../services/syllabus.service";
const role = ref(null);

const creating = ref(false);

const emits = defineEmits(["add-toast"]);

const name = ref(null);
const description = ref(null);

async function createSyllabus() {
  creating.value = true;

  const SyllabusToCreate = {
    name: name.value,
    description: description.value,
    created_by: window.user.role,
  };

  const response = await syllabusService.createSyllabus(SyllabusToCreate);
  console.log(response);
  creating.value = false;

  if (response.status !== 200) {
    emits("add-toast", {
      title: "Tạo chương trình.",
      type: 1,
    });
    return;
  }

  if (!response.data.success) {
    emits("add-toast", {
      title: "Tạo chương trình.",
      content: response.data.message,
      type: 1,
    });

    return;
  }

  emits("add-toast", {
    title: "Tạo chương trình thành công.",
    content: response.data.message,
    type: 0,
  });
}
</script>

<style lang="scss" scoped></style>
