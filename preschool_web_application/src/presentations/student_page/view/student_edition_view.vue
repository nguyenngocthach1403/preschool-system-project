<template>
  <Layout :title="'Cập nhật thông tin'">
    <template #content>
      <form @submit.prevent="" class="w-full h-full px-[40px] text-start">
        <!-- Aavatar -->
        <div
          class="add-avatar w-[100px] h-[100px] m-auto bg-[#D9D9D9] rounded-md relative"
        >
          <img
            v-if="avatarPath"
            :src="avatarPath"
            class="w-[100px] h-[100px] m-auto object-cover rounded-md border-2"
          />
          <input
            type="file"
            class="absolute top-0 left-0 w-[100px] h-[100px] opacity-0"
            accept=".png, .jpeg, .jpg"
            @change="handleUploadImg"
          />
        </div>
        <p class="w-full text-center">Ảnh đại diện</p>
        <div id="YourName_YourClass" class="gap-5 flex mt-4">
          <div id="YourName" class="w-full">
            <label for="">
              <span class="pl-3">Họ tên học sinh</span>
              <input
                type="text"
                v-model="nameInput"
                class="mb-0 h-[40px] rounded-md w-full outline-none border-2 focus:border-blue-500 px-4"
              />
            </label>
          </div>
          <div id="YourName" class="w-full">
            <label for="">
              <span class="pl-3">Lớp</span>
              <input
                type="text"
                v-model="classInput"
                class="mb-0 h-[40px] rounded-md w-full outline-none border-2 focus:border-blue-500 px-4"
              />
            </label>
          </div>
        </div>
        <div id="YourName_YourClass" class="gap-5 flex mt-4">
          <div id="YourName" class="w-full">
            <label for="">
              <span class="pl-3">Giới tính</span>
              <!-- <input type="text" class="mb-0 h-[40px] rounded-md w-full outline-none border-2 focus:border-blue-500 px-4"> -->
              <select
                ref="selectGender"
                @change="genderInput = $event.target.value"
                class="mb-0 h-[40px] rounded-md w-full outline-none border-2 focus:border-blue-500 px-4"
              >
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
              </select>
            </label>
          </div>
          <div id="Gender" class="w-full">
            <label for="">
              <span class="pl-3">Ngày sinh</span>
              <input
                type="date"
                ref="birthdayEle"
                v-model="birthdayInput"
                class="mb-0 h-[40px] rounded-md w-full outline-none border-2 focus:border-blue-500 px-4"
              />
            </label>
          </div>
        </div>
      </form>
    </template>
    <template #bottom>
      <SaveButton @click="updateSubmit"></SaveButton>
    </template>
  </Layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import Layout from "@/components/edit_and_create_layout.vue";
import SaveButton from "@/components/save_button.vue";
import { useStudentStore } from "@/stores/student_store.js";
import { yyyymmddDateString } from "..//..//..//utils//resources//format_date";

const avatarPath = ref(null);
const avatarUpload = ref(null);

const studentStore = useStudentStore();

const loading = ref(false);

//Input
const nameInput = ref(null);
const classInput = ref(null);
const selectGender = ref(null);
const genderInput = ref(null);
const birthdayInput = ref(null);

// //Hook
onMounted(() => {
  avatarPath.value = studentData.studentData.avatar;
  nameInput.value = studentData.studentData.name;
  classInput.value = studentData.studentData.class;
  selectGender.value.selectedIndex = studentData.studentData.gender;
  genderInput.value = studentData.studentData.gender;
  birthdayInput.value = yyyymmddDateString(studentData.studentData.birthday);
});

const handleUploadImg = (event) => {
  //Lấy hình
  avatarUpload.value = event.target.files[0];

  //Kiểm tra tồn tại
  if (!avatarUpload) return;

  //Kiểm tra size
  if (avatarUpload.value.size / 1024 > 5120) {
    //Bỏ nếu quá dung lượng cho phếp
    avatarUpload.value = null;
    return;
  }

  //Tạo đường dẫn của ảnh
  avatarPath.value = URL.createObjectURL(avatarUpload.value);
};

const updateSubmit = () => {
  console.log(genderInput.value);
  studentStore.updateStudent({
    id: studentData.studentData.id,
    name: nameInput.value,
    class: classInput.value,
    birthday: birthdayInput.value,
    gender: genderInput.value,
  });
};

//define
const studentData = defineProps(["studentData"]);
</script>

<style scoped>
</style>