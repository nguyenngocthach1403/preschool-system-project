<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-dvh">
    <div class="text-left px-[20px] text-[36px] font-bold">Parent</div>
    <div class="flex justify-between content-center mr-3">
      <SearchForm @passSearchText="getSearchText"></SearchForm>

      <router-link to="/students/create">
        <CreateButtonComp></CreateButtonComp>
      </router-link>
    </div>
    <TableData></TableData>
  </div>
</template>

<script setup>
import TableData from "../data/table_parent.vue";
import SearchForm from "../../../components/search_form_comp.vue";
import CreateButtonComp from "../../../components/create_button.vue";
</script>

<style scoped>
</style>