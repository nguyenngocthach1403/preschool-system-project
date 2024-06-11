<template>
  <Popup :title="'Liên kết phụ huynh'" @close="$emit('close')">
    <template #content>
      <div id="input-side-1" class="text-start mx-[20px] flex gap-5">
        <div v-if="loading" class="w-full h-[420px] rounded-md border p-2">
          <LoadingComp></LoadingComp>
        </div>
        <div
          v-if="!loading"
          class="w-full h-[400px] mt-10 flex gap-5 rounded-md border p-2 relative pt-[40px]"
        >
          <div
            class="absolute z-30 top-[-30px] flex items-center gap-4 text-[13px]"
          >
            <img
              :src="student.avatar"
              class="w-[60px] h-[60px] object-cover rounded-full"
            />
            <p class="bg-white p-2 border rounded-md">
              <span class="text-gray-400">Tên:</span>
              {{ student.name }}
            </p>
            <p class="bg-white p-2 border rounded-md">
              <span class="text-gray-400">Lớp:</span>
              {{ student.className }}
            </p>
          </div>
          <!--Parent list-->
          <div class="w-full h-full overflow-y-auto text-[12px]">
            <div
              v-for="parentItem in student.parents"
              :key="parentItem"
              class="w-full border relative h-fit py-2 rounded-md mb-3 flex items-center gap-4 px-3"
            >
              <img
                :src="parentItem.avatar"
                class="w-[45px] h-[45px] border object-cover rounded-full"
              />
              <div>
                <p>
                  <span class="text-gray-400">Tên:</span>
                  {{ parentItem.name }}
                </p>
                <p>
                  <span class="text-gray-400">sdt: </span>
                  {{ parentItem.phone }}
                </p>
              </div>
              <div
                class="absolute right-5 border rounded-md px-2 py-1"
                :class="{
                  'father-role': parentItem.relationship == 0,
                  'mother-role': parentItem.relationship == 1,
                  'other-role': parentItem.relationship == 2,
                }"
              >
                {{ convertParentRole(parentItem.relationship) }}
              </div>
            </div>
          </div>
        </div>
        <div class="w-full">
          <SearchForm
            class="w-full m-auto"
            @passSearchText="getSearchText($event)"
            :value="searchParentText"
          ></SearchForm>
          <div
            v-if="loadingParent"
            class="w-full h-[362px] rounded-md border p-2"
          >
            <LoadingComp></LoadingComp>
          </div>
          <ul
            v-if="!loadingParent"
            class="w-full border h-[362px] rounded-md p-2 overflow-y-auto"
            @scrollend="handleScrollEnd()"
          >
            <li
              v-for="parentItem in parentList"
              :key="parentItem"
              class="w-full border h-fit py-2 relative rounded-md mb-3 flex items-center gap-4 px-3 hover:bg-gray-200/50"
              :class="{
                selected: select !== null ? select.id == parentItem.id : false,
                isExist: props.studentData.parents.some(
                  (e) => e.id == parentItem.id
                ),
              }"
              :disabled="
                props.studentData.parents.some((e) => e.id == parentItem.id)
              "
              @click.prevent="selectParent(parentItem)"
            >
              <img
                :src="parentItem.avatar"
                class="w-[45px] h-[45px] border object-cover rounded-full"
              />
              <div>
                <p>
                  <span class="text-gray-400">Tên:</span>
                  {{ parentItem.name }}
                </p>
                <p>
                  <span class="text-gray-400">sdt: </span>
                  {{ parentItem.phone }}
                </p>
              </div>

              <div
                class="absolute right-5 border rounded-md px-2 py-1 text-[12px]"
                :class="{
                  'father-role': parentItem.role == 0,
                  'mother-role': parentItem.role == 1,
                  'other-role': parentItem.role == 2,
                }"
              >
                {{ convertParentRole(parentItem.role) }}
              </div>
            </li>
            <li v-if="hasParent">
              <LoadingComp></LoadingComp>
            </li>
          </ul>
          <div
            id="button-side"
            class="w-full flex my-2 justify-center gap-5 basis-1/6 text-[14px]"
          >
            <button
              type="button"
              @click="exit()"
              class="h-[35px] my-[5px] border border-[#3B44D1] hover:bg-blue-400 text-black px-[25px] rounded-md"
            >
              Hủy
            </button>
            <button
              v-if="!updating"
              type="button"
              @click="linkParentWithStudent()"
              class="h-[35px] my-[5px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md ]"
            >
              Thêm
            </button>

            <button
              v-if="updating"
              type="button"
              class="h-[35px] basis-1/11 rounded-md my-[5px] w-fit outline-none border-[0.12rem] focus:border-blue-500 px-4 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
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
      </div>
    </template>
  </Popup>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Popup from "../../../components/edit_and_create_layout.vue";
import parentService from "../../../services/parent.service";
import studentService from "../../../services/student.service";
import { convertParentRole } from "../../../utils/resources/converter";
import SearchForm from "../../../components/search_form_comp.vue";
import relationshipService from "../../../services/relationship.service";
import LoadingComp from "../../../components/loading_comp.vue";

const loading = ref(true);
const loadingParent = ref(true);
const student = ref();
const page = ref(0);
const limit = ref(10);
const hasParent = ref(true);
const updating = ref(false);

const select = ref(null);
onMounted(() => {
  setTimeout(() => {
    getStudent();
    getParents();
  }, 1000);
});

const parentList = ref([]);

const searchParentText = ref("");

const props = defineProps({
  studentData: {
    type: Object,
    require: true,
  },
});

function getSearchText(searchText) {
  if (loadingParent.value) return;
  hasParent.value = true;
  searchParentText.value = searchText;
  loadingParent.value = true;
  parentList.value = [];
  page.value = 0;
  searchParents(searchText);
}

async function searchParents(searchText) {
  const response = await parentService.searchParent(
    searchText,
    page.value,
    limit.value
  );
  console.log("search", response);

  if (response.status !== 200) {
    emits("add-toast", {
      title: "Lỗi tải dữ liệu hãy thử lại sau",
      content: response.statusText,
      type: 1,
    });
    return;
  }

  if (response.data.data.length < limit.value) {
    hasParent.value = false;
  }

  parentList.value = [...parentList.value, ...response.data.data];

  loadingParent.value = false;
}

async function getParents() {
  const response = await parentService.getParent(page.value, limit.value);

  if (response.status !== 200) {
    emits("add-toast", {
      title: "Lỗi tải dữ liệu hãy thử lại sau",
      content: response.statusText,
      type: 1,
    });
    return;
  }

  if (response.data.data.length < limit.value) {
    hasParent.value = false;
  }

  parentList.value = [...parentList.value, ...response.data.data];

  loadingParent.value = false;
}
function selectParent(parentItem) {
  if (props.studentData.parents.some((e) => e.id == parentItem.id)) {
    return;
  }
  if (select.value == null) {
    select.value = parentItem.id;
  }
  if (select.value.id == parentItem.id) {
    select.value = null;
  } else {
    select.value = parentItem;
  }
}
const emits = defineEmits(["add-toast", "close"]);

async function linkParentWithStudent() {
  if (select.value === null) {
    emits("add-toast", {
      title: "Vui lòng chọn phụ huynh",
      type: 3,
    });
    return;
  }

  updating.value = true;

  const response = await relationshipService.createRelationship({
    parentId: select.value.id,
    studentId: props.studentData.id,
    relationship: `${select.value.role}`,
  });

  if (response.status !== 200) {
    emits("add-toast", {
      title: "Thất bại.",
      content: `Liên kết học sinh ${props.studentData.name} và phụ huynh ${select.value.name} thất bại.`,
      type: 1,
    });
    return;
  }

  updating.value = false;

  if (!response.data.success) {
    emits("add-toast", {
      title: "Thất bại.",
      content: response.data.error || response.data.message,
      type: 1,
    });
    return;
  }

  emits("add-toast", {
    title: "Thành công",
    content: response.data.message,
    type: 0,
  });

  getStudent();
}

async function getStudent() {
  const response = await studentService.getStudentById(props.studentData.id);

  if (response.status !== 200) {
    emits("add-toast", {
      title: "Lỗi tải dữ liệu hãy thử lại sau",
      content: response.statusText,
      type: 1,
    });
    return;
  }
  if (!response.data.success) {
    emits("add-toast", {
      title: "Lỗi tải dữ liệu hãy thử lại sau",
      content: response.data.message,
      type: 1,
    });
    return;
  }

  student.value = response.data.data;

  loading.value = false;
}
const valueInput = ref("");

function exit() {
  emits("close");
}

function handleScrollEnd() {
  if (!hasParent.value) return;
  page.value += 1;
  if (searchParentText.value == "") {
    getParents();
  } else {
    searchParents(searchParentText.value);
  }
}
</script>

<style scoped>
.father-role {
  border: 1px rgba(255, 0, 0, 0.402) solid;
  background-color: rgba(255, 0, 0, 0.184);
  color: rgb(208, 5, 5);
}
.mother-role {
  border: 1px rgba(251, 0, 255, 0.402) solid;
  background-color: rgba(251, 0, 255, 0.184);
  color: rgb(251, 0, 255);
}
.other-role {
  border: 1px rgba(0, 136, 255, 0.402) solid;
  background-color: rgba(0, 136, 255, 0.184);
  color: rgb(0, 136, 255);
}
.selected {
  background-color: rgb(232, 232, 232);
}
.isExist {
  background-color: rgb(228, 254, 229);
}
</style>