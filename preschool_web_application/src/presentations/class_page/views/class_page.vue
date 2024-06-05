<template>
  <div
    class="bg-[#FFFFFF] h-dvh ml-4 rounded-3xl text-center pb-[200px] overflow-hidden"
  >
    <ClassCreationView
      class="w-screen h-screen bg-black absolute z-10 left-0 top-0"
      v-if="showCreateClass"
      @close="showCreateClass = false"
    />
    <!-- Header -->
    <div class="text-left px-6 text-[36px] py-4 font-bold border border-b-1">
      Class
    </div>

    <div class="my-3 flex justify-between content-center mr-3">
      <SearchFormComp
        v-on:passSearchText="getSearchText($event)"
      ></SearchFormComp>
      <CreateButtonComp
        class="active:scale-95"
        @click="showCreateClass = !showCreateClass"
      />
    </div>

    <div class="w-full h-fit flex flex-wrap content-start mx-[15px] pb-[20px]">
      <ClassCardComp
        v-for="item in classes"
        :key="item"
        :class-data="item"
        class="hover:bg-gray-200"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import ClassCardComp from "../components//class_card.vue";
import SearchFormComp from "@/components/search_form_comp.vue";
import CreateButtonComp from "@/components/create_button.vue";
import ClassCreationView from "..//..//class_creation_page//views//class_creation_page.vue";
import { useClassStore } from "@/stores//class_store.js";
import { storeToRefs } from "pinia";
const searchText = ref("");
const classStore = useClassStore();
const showCreateClass = ref(false);

const { classes, limit, page, status } = storeToRefs(classStore);

onMounted(async () => {
  classDataDemo.value = classStore.classes;

  const result = await classStore.fetchClass();

  if (!result.success) {
    emits("add-toast", {
      title: "Load data faild",
      content: result.message,
      type: 1,
    });
  }
});

const emits = defineEmits(["add-toast"]);

const getSearchText = (event) => {
  searchText.value = event;
};

const closeCreateClassPage = (event) => {
  showCreateClass.value = event;
};

// const filteredClass = computed(() => {
//   return classDataDemo.value.filter((e) => {
//     return (
//       e.name.match(searchText.value) ||
//       e.teacher.match(searchText.value) ||
//       e.type.match(searchText.value) ||
//       e.status.match(searchText.value) ||
//       e.session.match(searchText.value)
//     );
//   });
// });

const classDataDemo = ref([]);
</script>

<style scoped>
</style>