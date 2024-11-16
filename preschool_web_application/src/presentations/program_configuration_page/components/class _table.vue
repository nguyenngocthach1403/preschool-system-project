<template lang="">
  <div class="h-full overflow-y-auto overflow-x-hidden">
    <EmptyBox
      v-if="!props.classes"
      class="border rounded-[10px]" />
    <ClassCard
      v-for="(classItem, index) in props.classes"
      :key="index"
      :classData="classItem"
      :isSelected="isSelected(classItem)"
      @choose="selectClasses(classItem)" />
  </div>
</template>
<script setup>
//Import
import ClassCard from "./class_card.vue";
import EmptyBox from "@/components/empty_data.vue";
//handle
import { ref } from "vue";

let props = defineProps({
  classes: {
    type: Array,
    default: [],
  },
  classesSelected: {
    type: Array,
  },
});

let classesSelectModel = ref(props.classesSelected);

function isSelected(classItem) {
  let classFound = classesSelectModel.value.find(
    (item) => classItem.id == item.id
  );
  return classFound ? true : false;
}

const emit = defineEmits(["select"]);

function addClassToSelected(classItem) {
  classesSelectModel.value.push(classItem);
}

function removeClassToSelected(classItem) {
  classesSelectModel.value = classesSelectModel.value.filter(
    (item) => item.id != classItem.id
  );
}

function isExistInSelectedById(classId) {
  return classesSelectModel.value.find((item) => item.id === classId);
}

function selectClasses(classItem) {
  if (isExistInSelectedById(classItem.id)) {
    removeClassToSelected(classItem);
  } else {
    addClassToSelected(classItem);
  }

  emit("select", classesSelectModel.value);
}
</script>
<style></style>
