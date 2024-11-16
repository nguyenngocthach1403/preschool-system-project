<template lang="">
  <div class="text-left px-6 text-[36px] py-4 font-bold border border-b-1">
    {{ props.title }}
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
});
</script>
<style lang=""></style>
