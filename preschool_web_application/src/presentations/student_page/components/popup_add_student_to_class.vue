<template>
  <Popup :title="'Thêm học sinh vào lớp học'" @close="$emit('close')">
    <template #content>
      <div id="input-side-1" class="text-start mx-[20px]">
        <label class="w-full text-start">
          <span class="pl-4 text-blue-700">Tìm lớp học</span>
          <div class="flex flex-row gap-5">
            <input
              v-model="classSelected"
              type="text"
              placeholder="Nhập mã lớp hoặc tên lớp"
              class="h-[45px] basis-1/11 rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
            />
            <div id="button-side" class="w-full flex basis-1/6">
              <button
                v-if="status !== 'updating'"
                @click="addStudentIntoClas"
                type="submit"
                class="h-[45px] my-[5px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
              >
                Save
              </button>
              <button
                v-if="status === 'updating'"
                type="button"
                class="h-[45px] basis-1/11 rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
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
          </div>
        </label>
      </div>
      <!--Danh sach lop hoc-->
      <div class="h-60 border mx-[20px] rounded-md p-1">
        <div
          class="w-full hover:bg-gray-200 flex rounded-[3px] content-center"
          v-for="classItem in classes"
          :class="{ selected: classSelected == classItem.id }"
          :key="classItem"
          @click="selectClass(classItem)"
        >
          <ClassListItem :class-item="classItem"></ClassListItem>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import Popup from "../../../components/edit_and_create_layout.vue";
import ClassListItem from "../../class_page/components/class_list_item.vue";

import { useClassStore } from "../../../stores/class_store";
import { storeToRefs } from "pinia";
import { useStudentStore } from "../../../stores/student_store";

onMounted(() => {
  classStore.fetchClass();
});

const drops = defineProps({
  studentData: {
    type: Object,
    require: true,
  },
});
const classSelected = ref(null);
const classStore = useClassStore();
const studentStore = useStudentStore();

const { classes } = storeToRefs(classStore);
const { status } = storeToRefs(studentStore);

function selectClass(classItem) {
  classSelected.value = classItem.id;
}

watch(classSelected, () => {
  classStore.searchClasses(classSelected.value);
});

const emits = defineEmits(["add-toast", "close"]);

async function addStudentIntoClas() {
  if (classSelected.value == null || drops.studentData == null) {
    alert("Bạn chưa chọn lớp");
    return;
  }
  const formData = new FormData();

  formData.append("classId", classSelected.value);

  const result = await studentStore.updateStudent(
    drops.studentData.id,
    formData
  );

  if (!result.success) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      content: result.message,
      type: 1,
    });
  }

  emits("add-toast", {
    title: "Cập nhật thành công",
    content: result.message,
    type: 0,
  });

  emits("close");
}
</script>

<style scoped>
.selected {
  background-color: rgb(220, 222, 245);
}
</style>