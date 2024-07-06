<template>
  <div>
    <div class="flex justify-between">
      <SearchComp class="w-[450px]" />
      <CreateButton :title="'Tạo mới'" />
    </div>
    <div class="h-[600px] border"></div>
  </div>
</template>

<script setup>
///component
import SearchComp from "../../../components/search_form_comp.vue";
import CreateButton from "../../../components/create_button.vue";
</script>

<style lang="scss" scoped>
</style>