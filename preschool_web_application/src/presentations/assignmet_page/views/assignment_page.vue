<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-fit pb-[10px]">
    <div
      class="text-left px-6 text-[36px] py-4 mb-5 font-bold border border-b-1"
    >
      Quản lý phân công
    </div>
    <div class="flex justify-between px-5">
      <SearchComp class="w-[400px]" />
      <CreateButtonComp />
    </div>
    <ResultNumComp />
    <TableComp :data="data" class="mt-5"></TableComp>
    <div class="w-full mr-0 py-3">
      <PaginationComp class="m-auto" />
    </div>
  </div>
</template>

<script setup>
//component
import TableComp from "../components/table_comp.vue";
import SearchComp from "../../../components/search_form_comp.vue";
import CreateButtonComp from "../../../components/create_button.vue";
import ResultNumComp from "../../../components/result_comp.vue";
import PaginationComp from "../../../components/pagination.vue";

//store
import { useAssignmentStore } from "../../../stores/assignment_store";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const assignmentStore = useAssignmentStore();

const { assignment, page, limit } = storeToRefs(assignmentStore);

const data = ref([]);
//function
async function getAsignment() {
  await assignmentStore.getTeacherAssignment();
}

onMounted(async () => {
  await getAsignment();
  data.value = assignmentStore.asignment;
});
</script>

<style scoped>
</style>