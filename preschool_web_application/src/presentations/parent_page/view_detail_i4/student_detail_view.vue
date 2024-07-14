<template>
  <div class="w-full">
    <div class="flex flex-wrap -mx-3">
      <div
        v-for="(student, index) in studentData"
        :key="index"
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-3 mb-6"
        @click="onClickStudent(student)"
      >
        <div class="border rounded-md overflow-hidden">
          <div class="ml-4 mt-3">
            <img
              v-if="student.avatar"
              :src="student.avatar"
              alt="Avatar"
              class="w-fit h-fit rounded-t-md"
            />
          </div>
          <div class="py-3 px-5 text-[18px] border-b text-start bg-white">
            <p class="font-bold">Họ tên: {{ student.StudentName }}</p>
            <p class="mt-2">Lớp: {{ student.ClassName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import studentService from "../../../services/student.service";
import parentService from "../../../services/parent.service";
import accountService from "../../../services/account.service";
import { isUser } from "../../../utils/resources/validator";
const studentName = ref("");
const studentID = ref("");
const studentGender = ref("");
const studentBirtday = ref(new Date());
const studentFork = ref("");
const studentBirthOrigin = ref("");
const studentNation = ref("");
const studentStudyStatus = ref(0);

// const studentData = ref(null);
const studentData = ref({ data: [] });
const emits = defineEmits(["click-student"]);

onBeforeMount(() => {
  getStudentByParentId();
});
function onClickStudent(student) {
  emits("click-student", student.StudentId);
}

async function getStudentByParentId() {
  // const accountId = JSON.parse(localStorage.getItem("user")).id;
  const user = isUser();
  if (!user) return;
  const accountId = user.id;
  const response = await accountService.getParentById(accountId);
  console.log(response.data[0].ParentID);
  const result = await parentService.getStudentByParentId(
    response.data[0].ParentID
  );
  console.log(result);
  if (result.status !== 200) {
    return;
  }
  if (!result.data.success) {
    return;
  }
  studentData.value = result.data.data;
}
</script>

<style scoped>
.dp__theme_light {
  --dp-button-height: 35px;
  --dp-border-radius: 5px;
  --dp-input-padding: 11px 30px 10px 12px;
  margin: 7px 0px;
}
</style>
