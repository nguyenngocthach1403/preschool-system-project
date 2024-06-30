<!-- <template>
  <div class="w-full">
    <div class="m-10 border rounded-md">
      <div class="w-full py-4 px-10 font-bold text-[18px] border-b text-start">
        Thông tin cá nhân
      </div>
      <div class="w-full px-10 py-5 content-center text-start">
        <section class="w-full my-5 flex gap-5">
          <div class="w-full">
            <label class="pl-2">
              <span>Họ và tên</span>
              <input
                type="text"
                class="input-text-default"
                v-model="studentName"
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
                disabled
                v-model="studentID"
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
                v-model="studentBirtday"
                disabled
              />
            </label>
          </div>
          <div class="w-full">
            <label class="pl-2">
              <span>Giới tính</span>
              <select
                type="text"
                class="input-text-default"
                v-model="studentGender"
                disabled
              >
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
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
                v-model="studentFork"
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
                v-model="studentBirthOrigin"
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
                v-model="studentNation"
                disabled
              />
            </label>
          </div>
          <div class="w-full">
            <label class="pl-2">
              <span>Trạng thái học</span>
              <select
                type="text"
                class="input-text-default"
                v-model="studentStudyStatus"
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
      </div>
    </div>
  </div>
</template> -->
<template>
  <div class="w-full">
    <div
      v-for="(student, index) in studentData.data"
      :key="index"
      class="m-10 border rounded-md"
    >
      <div class="w-full py-4 px-10 font-bold text-[18px] border-b text-start">
        Thông tin cá nhân bé thứ {{ index + 1 }}
      </div>
      <div class="w-full px-10 py-5 content-center text-start">
        <!-- Each student's information -->
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

// const props = defineProps({
//   studentData: {
//     type: Object,
//     require: true,
//   },
// });
onBeforeMount(() => {
  getStudentByParentId();
});

// const forkList = ref([
//   { name: "Select item", id: 0 },
//   { name: "Kinh", id: 1 },
//   { name: "Tày", id: 2 },
//   { name: "Thái", id: 3 },
//   { name: "Mường", id: 4 },
//   { name: "H'Mông", id: 5 },
//   { name: "Dao", id: 7 },
//   { name: "Khơ Me", id: 8 },
//   { name: "Nùng", id: 9 },
//   { name: "H'rê", id: 10 },
//   { name: "Gia Rai", id: 11 },
//   { name: "Ê Đê", id: 12 },
//   { name: "Ba Na", id: 13 },
//   { name: "Xơ Đăng", id: 14 },
//   { name: "Sán Chay", id: 15 },
//   { name: "Cơ Tu", id: 16 },
//   { name: "Chăm", id: 17 },
//   { name: "Sán Dìu", id: 18 },
//   { name: "Hà Nhì", id: 19 },
//   { name: "Ra Glai", id: 20 },
//   { name: "La Chí", id: 21 },
//   { name: "M'Nông", id: 22 },
//   { name: "Chứt", id: 23 },
//   { name: "Xê Đăng", id: 24 },
//   { name: "Bru-Vân Kiều", id: 25 },
//   { name: "Giáy", id: 26 },
//   { name: "Cơ Ho", id: 27 },
//   { name: "Tà Ôi", id: 28 },
//   { name: "Co", id: 29 },
//   { name: "Ta Oi", id: 30 },
//   { name: "Kháng", id: 31 },
//   { name: "Co Lao", id: 32 },
//   { name: "La Ha", id: 33 },
//   { name: "Pu Péo", id: 34 },
//   { name: "Lự", id: 35 },
//   { name: "Ngái", id: 36 },
//   { name: "Pa Thẻn", id: 37 },
//   { name: "Lô Lô", id: 38 },
//   { name: "Chơ Ro", id: 39 },
//   { name: "Mảng", id: 40 },
//   { name: "Cờ Lao", id: 41 },
//   { name: "Bố Y", id: 42 },
//   { name: "La Hu", id: 43 },
//   { name: "Pà Thẻn", id: 44 },
//   { name: "Lào", id: 45 },
//   { name: "Mông", id: 46 },
//   { name: "Pơng", id: 47 },
//   { name: "Cống", id: 48 },
//   { name: "Si La", id: 49 },
//   { name: "Ơ Đu", id: 50 },
//   { name: "Mảng", id: 51 },
//   { name: "M'ngông", id: 52 },
//   { name: "Thổ", id: 53 },
// ]);

async function getStudentByParentId() {
  const accountId = window.user.id;
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

  //   studentData.value = result.data.data[0];
  //   console.log(studentData.value);
  studentData.value = result.data;
  console.log(studentData.value);
  // const dataStudent = result.data.data[0];
  // console.log(dataStudent);
  // if (dataStudent) {
  //   studentName.value = dataStudent.StudentName;
  //   studentID.value = dataStudent.id;
  //   studentGender.value = dataStudent.gender;
  //   studentFork.value = dataStudent.fork;
  //   studentNation.value = dataStudent.nation;
  //   studentBirthOrigin.value = dataStudent.place_of_birth;
  //   studentBirtday.value = new Date(dataStudent.birthday);
  //   studentStudyStatus.value = dataStudent.study_status;
  // }
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
