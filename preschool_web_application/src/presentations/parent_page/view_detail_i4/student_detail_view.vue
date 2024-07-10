<template>
  <div class="w-full">
    <div
      v-for="(student, index) in studentData"
      :key="index"
      class="m-10 border rounded-md"
      @click="onClickStudent(student)"
    >
      <button
        class="w-full py-4 px-10 font-bold text-[18px] border-b text-start"
      >
        Thông tin cá nhân bé {{ student.StudentName }}
      </button>
      <!-- <div class="w-full px-10 py-5 content-center text-start">
        Each student's information 
        <section class="w-full my-5 flex gap-5">
          <div class="w-full">
            <label class="pl-2">
              <span>Họ và tên</span>
              <input
                type="text"
                class="input-text-default"
                :value="student.StudentName"
                disabled
              />
            </label>
          </div>
          <div class="w-full">
            <label class="pl-2">
              <span>Mã học sinh</span>
              <input
                type="text"
                class="input-text-default"
                :value="student.StudentId"
                disabled
              />
            </label>
          </div>
        </section>
        <section class="w-full my-5 flex gap-5">
          <div class="w-full">
            <label class="pl-2">
              <span>Ngày sinh</span>
              <VueDatePicker
                :enable-time-picker="false"
                v-model="student.birthday"
                disabled
              />
            </label>
          </div>
          <div class="w-full">
            <label class="pl-2">
              <span>Giới tính</span>
              <select
                class="input-text-default"
                v-model="student.gender"
                disabled
              >
                <option :value="0">Nam</option>
                <option :value="1">Nữ</option>
              </select>
            </label>
          </div>
        </section>
        <section class="w-full my-5 flex gap-5">
          <div class="w-full">
            <label class="pl-2">
              <span>Dân tộc</span>
              <input
                type="text"
                class="input-text-default"
                :value="student.fork"
                disabled
              />
            </label>
          </div>
          <div class="w-full">
            <label class="pl-2">
              <span>Nơi sinh</span>
              <input
                type="text"
                class="input-text-default"
                :value="student.place_of_birth"
                disabled
              />
            </label>
          </div>
        </section>
        <section class="w-full my-5 flex gap-5">
          <div class="w-full">
            <label class="pl-2">
              <span>Quốc tịch</span>
              <input
                type="text"
                class="input-text-default"
                :value="student.nation"
                disabled
              />
            </label>
          </div>
          <div class="w-full">
            <label class="pl-2">
              <span>Trạng thái học</span>
              <select
                class="input-text-default"
                v-model="student.study_status"
                disabled
              >
                <option value="0">Chờ xếp lớp</option>
                <option value="1">Đang học</option>
                <option value="2">Lên lớp</option>
                <option value="3">Bảo lưu</option>
                <option value="4">Tạm nghỉ</option>
              </select>
            </label>
          </div>
        </section>
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
        <section class="w-full my-5 flex gap-5">
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
        </section>
      </div> -->
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
const emits = defineEmits(["click-student"]);

onBeforeMount(() => {
  getStudentByParentId();
});
function onClickStudent(student) {
  emits("click-student", student.StudentId);
}

async function getStudentByParentId() {
  const accountId = JSON.parse(localStorage.getItem("user")).id;
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
