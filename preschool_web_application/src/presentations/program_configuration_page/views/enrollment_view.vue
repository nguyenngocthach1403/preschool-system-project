<template lang="">
  <div class="h-full w-full mt-5">
    <CreateAdmissionPopUp
      v-if="showCreateAdmissionPopup"
      @close="closePopCreateAdmission()"
      @add-toast="$emit('add-toast', $event)" />
    <div class="flex gap-3 h-[500px] w-full items-stretch">
      <div class="border rounded-[10px] w-full ml-3 overflow-hidden">
        <EnrollmentTable />
      </div>
      <div class="border rounded-[10px] w-full mr-3"></div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
//Component
import CreateAdmissionPopUp from "../components/enrollment_creation_popup.vue";
import EnrollmentTable from "../components/enrollment_table.vue";

//Variables
const showCreateAdmissionPopup = ref(false);

//Functions
function closePopCreateAdmission() {
  showCreateAdmissionPopup.value = null;
  //   getAdmission();
}
</script>
<style lang=""></style>
