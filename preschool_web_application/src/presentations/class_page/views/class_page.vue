<template>
  <div
    class="bg-[#FFFFFF] h-dvh ml-4 rounded-3xl text-center pb-[200px] overflow-hidden"
  >
    <ClassCreationView
      class="w-screen h-screen bg-black absolute z-10 left-0 top-0"
      v-if="showCreateClass"
      @close="(showCreateClass = false), loadClass()"
      @add-toast="$emit('add-toast', $event)"
    />
    <ClassEditPopup
      class="w-screen h-screen bg-black absolute z-10 left-0 top-0"
      v-if="showEditClass"
      @close="(showEditClass = null), loadClass()"
      :class-data="showEditClass"
      @add-toast="$emit('add-toast', $event)"
    />
    <!-- Header -->
    <div class="text-left px-6 text-[36px] py-4 font-bold border border-b-1">
      Lớp học
    </div>

    <div class="mt-3 flex justify-between content-center mr-3">
      <div class="flex gap-5">
        <SearchFormComp
          class="w-[400px] ml-[20px]"
          v-on:passSearchText="searchText = $event"
        ></SearchFormComp>
        <select
          v-model="session"
          class="h-[45px] border rounded-md w-[150px] px-3"
        >
          <option value="">Tất cả</option>
          <option v-for="item in optionSession()" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
        <div class="flex gap-3 items-center">
          <ItemCheckBox
            v-for="item in statusList"
            :key="item"
            :content="item.name"
            :checked="item.checked"
            :id="item.id"
            :total="item.total"
            @change="changeChecked($event, item)"
            class="h-[30px]"
          />
        </div>
      </div>
      <CreateButtonComp
        class="active:scale-95"
        @click="showCreateClass = !showCreateClass"
      />
    </div>
    <ResultNumComp>{{ total }}</ResultNumComp>
    <div class="mx-[15px] pb-[20px]">
      <EmptyComp v-if="classes.length == 0 && status !== 'loading'" />
      <LoadingComp v-if="status == 'loading'" />
      <div
        v-if="classes.length != 0 && status !== 'loading'"
        class="w-full h-fit flex flex-wrap content-start"
      >
        <ClassCardComp
          v-for="item in classes"
          @edit-class="showEditClass = $event"
          :key="item"
          :class-data="item"
          class="hover:bg-gray-200"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
//component
import ClassCardComp from "../components//class_card.vue";
import SearchFormComp from "@/components/search_form_comp.vue";
import CreateButtonComp from "@/components/create_button.vue";
import ClassCreationView from "..//..//class_creation_page//views//class_creation_page.vue";
import ResultNumComp from "../../../components/result_comp.vue";
import ClassEditPopup from "../../class_creation_page/views/class_creation_page.vue";
import EmptyComp from "../../../components/empty_data.vue";
import LoadingComp from "../../../components/loading_comp.vue";
import ItemCheckBox from "../../registration_page/components/item_checkbox_filter.vue";
import { useClassStore } from "../../../stores/class_store";

import { storeToRefs } from "pinia";
const searchText = ref("");
const classStore = useClassStore();
const showCreateClass = ref(false);
const showEditClass = ref(null);
const session = ref("");

const statusList = ref([
  { id: 0, name: "Đang diễn ra", checked: false, total: 0 },
  { id: 1, name: "Kết thúc", checked: false, total: 0 },
  { id: 2, name: "Sắp diễn", checked: false, total: 0 },
]);

const { classes, limit, page, status, total } = storeToRefs(classStore);

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

//Watch
watch(session, () => {
  classStore.page = 0;
  if (classStore.session != session.value) {
    classStore.session = session.value;
    classStore.searchClasses();
  }
});
watch(searchText, () => {
  if (classStore.searchText != searchText.value) {
    classStore.page = 0;
    classStore.searchText = searchText.value;
    classStore.searchClasses();
  }
});

const emits = defineEmits(["add-toast"]);
const closeCreateClassPage = (event) => {
  showCreateClass.value = event;
};

function loadClass() {
  if (searchText.value !== "") {
    classStore.searchClasses(searchText.value);
  } else {
    classStore.fetchClass();
  }
}

async function changeChecked(event, item) {
  item.checked = event.target.checked;

  classStore.statusIds = statusList.value
    .filter((e) => e.checked)
    .flatMap((e) => e.id);

  classStore.searchClasses();
}

const optionSession = () => {
  let options = [];
  for (let index = 0; index < 20; index++) {
    options.push(new Date().getFullYear() - index);
  }
  return options;
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