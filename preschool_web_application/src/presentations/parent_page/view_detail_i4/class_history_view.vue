<!-- <template>
  <div class="w-full">
    <div
      v-for="(student, index) in studentData.data"
      :key="index"
      class="m-10 border rounded-md"
    >
      <div class="w-full py-4 px-10 font-bold text-[18px] border-b text-start">
        Lịch sử học của {{ student.StudentName }}
      </div>
      <div class="w-full px-10 py-5 content-center text-start">
        <section class="w-full my-5 flex gap-5">
          <div class="w-full">
            <label class="pl-2">
              <span>Lớp học</span>
              <input
                type="text"
                class="input-text-default"
                :value="student.ClassName"
                disabled
              />
            </label>
          </div>
          <div class="w-full">
            <label class="pl-2">
              <span>Ngày bắt đầu lớp học</span>
              <VueDatePicker
                :enable-time-picker="false"
                v-model="student.start_date"
                disabled
              />
            </label>
          </div>
        </section>
        <section class="w-full my-5 flex gap-5">
          <div class="w-full">
            <label class="pl-2">
              <span>Ngày kết thúc lớp học</span>
              <VueDatePicker
                :enable-time-picker="false"
                v-model="student.end_date"
                disabled
              />
            </label>
          </div>
          <div class="w-full">
            <label class="pl-2">
              <span>Niên khoá</span>
              <input
                type="text"
                class="input-text-default"
                :value="student.session"
                disabled
              />
            </label>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import studentService from "../../../services/student.service";
import parentService from "../../../services/parent.service";
import accountService from "../../../services/account.service";

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

onBeforeMount(() => {
  getStudentByParentId();
});

async function getStudentByParentId() {
  const accountId = window.user.id;
  const response = await accountService.getParentById(accountId);
  console.log(response.data[0].ParentID);
  const result = await parentService.getHistoryClassStudentByTeacherId(
    response.data[0].ParentID
  );
  console.log(result);
  if (result.status !== 200) {
    return;
  }
  if (!result.data.success) {
    return;
  }
  studentData.value = result.data;
  console.log(studentData.value);
}
</script>

<style scoped>
.dp__theme_light {
  --dp-button-height: 35px;
  --dp-border-radius: 5px;
  --dp-input-padding: 11px 30px 10px 12px;
  margin: 7px 0px;
}
</style> -->

<template>
  <div class="w-full">
    <div
      v-for="(studentGroup, studentId) in groupedStudents"
      :key="studentId"
      class="m-10 border rounded-md"
    >
      <div class="w-full py-4 px-10 font-bold text-[18px] border-b text-start">
        Lịch sử học của {{ studentGroup[0].StudentName }}
      </div>
      <div class="w-full px-10 py-5 content-center text-start">
        <div v-for="(student, index) in studentGroup" :key="index">
          <section class="w-full my-5 flex gap-5">
            <div class="flex-1">
              <label class="flex flex-col items-start space-y-1">
                <span>Lớp học</span>
                <input
                  type="text"
                  class="input-text-default"
                  :value="student.ClassName"
                  disabled
                />
              </label>
            </div>
            <div class="flex-1">
              <label class="flex flex-col items-start space-y-1">
                <span>Ngày bắt đầu lớp học</span>
                <VueDatePicker
                  :enable-time-picker="false"
                  v-model="student.start_date"
                  disabled
                />
              </label>
            </div>
            <div class="flex-1">
              <label class="flex flex-col items-start space-y-1">
                <span>Ngày kết thúc lớp học</span>
                <VueDatePicker
                  :enable-time-picker="false"
                  v-model="student.end_date"
                  disabled
                />
              </label>
            </div>
            <div class="flex-1">
              <label class="flex flex-col items-start space-y-1">
                <span>Niên khoá</span>
                <input
                  type="text"
                  class="input-text-default"
                  :value="student.session"
                  disabled
                />
              </label>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, computed } from "vue";
import studentService from "../../../services/student.service";
import parentService from "../../../services/parent.service";
import accountService from "../../../services/account.service";
import { isUser } from "../../../utils/resources/validator";

const studentData = ref({ data: [] });

onBeforeMount(() => {
  getStudentByParentId();
});

async function getStudentByParentId() {
  const user = isUser();
  if (!user) return;
  const accountId = user.id;
  const response = await accountService.getParentById(accountId);
  console.log(response.data[0].ParentID);
  const result = await parentService.getHistoryClassStudentByTeacherId(
    response.data[0].ParentID
  );
  console.log(result);
  if (result.status !== 200) {
    return;
  }
  if (!result.data.success) {
    return;
  }
  studentData.value = result.data;
  console.log(studentData.value);
}

const groupedStudents = computed(() => {
  const grouped = {};
  studentData.value.data.forEach((student) => {
    const studentId = student.StudentId;
    if (!grouped[studentId]) {
      grouped[studentId] = [];
    }
    grouped[studentId].push(student);
  });
  return grouped;
});
</script>

<style scoped>
.dp__theme_light {
  --dp-button-height: 35px;
  --dp-border-radius: 5px;
  --dp-input-padding: 11px 30px 10px 12px;
  margin: 7px 0px;
}
</style>
