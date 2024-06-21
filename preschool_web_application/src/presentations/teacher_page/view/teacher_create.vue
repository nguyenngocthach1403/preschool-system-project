<template>
  <div class="bg-white ml-4 rounded-3xl text-center">
    <div
      class="bg-white ml-4 mt-[20px] rounded-xl mr-2 text-center h-fit pb-[60px]"
    >
      <div id="head">Tạo giáo viên</div>
      <div id="site" class="flex px-[30px] py-[30px]">
        <div class="add-avatar w-fit h-fit rounded-md">
          <img
            :src="teacherAvatarPath"
            class="w-[150px] h-[150px] object-cover bg-[#D9D9D9] rounded-md"
          />
          <div class="button-side flex my-4 gap-2">
            <input
              type="file"
              class="w-[150px] file:w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#3B44D1] file:text-white hover:file:text-black hover:file:bg-violet-100"
              accept=".png, .jpeg, .jpg"
              @change="handleUploadTeacherImg"
            />
            <button
              class="w-[150px] border h-[35px] rounded-md hover:bg-red-100"
            >
              Xóa ảnh
            </button>
          </div>
        </div>
        <div id="input-side" class="w-full pr-[20px]">
          <div id="input-side-1" class="flex w-full gap-5 mx-[20px]">
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Họ và tên</span
              ><span class="text-red-600"> * </span>
              <input
                type="text"
                placeholder="Họ và tên"
                class="input-text-default"
                v-model="name"
                :class="{ 'in-valid': messageOfTeacherName }"
              />
              <div class="mt-1 mb-2 h-[25px] text-red-500">
                <span>{{ messageOfTeacherName }}</span>
              </div>
            </label>
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Giới tính</span>
              <select id="gender" v-model="gender" class="input-text-default">
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
                <option value="2">Khác</option>
              </select>
            </label>
          </div>
          <div id="input-side-2" class="flex w-full gap-5 mx-[20px] mb-[25px]">
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Ngày sinh</span>
              <input
                v-model="birthday"
                type="date"
                class="input-text-default"
              />
            </label>
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Kinh nghiệm giảng dạy</span>
              <input
                type="text"
                placeholder="1 năm kinh nghiệm, 2 năm kinh nghiệm,..."
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                v-model="experience"
              />
            </label>
          </div>
          <div id="input-side-3" class="flex w-full gap-5 mx-[20px]">
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Số điện thoại</span>
              <input
                type="text"
                placeholder="0xxxxxxxx"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                v-model="phone"
                :class="{ 'in-valid': messageOfTeacherPhone }"
              />
              <div class="mt-1 mb-2 h-[25px] text-red-500">
                <span>{{ messageOfTeacherPhone }}</span>
              </div>
            </label>
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Email</span>
              <input
                type="text"
                placeholder="abc@abc.com"
                class="input-text-default"
                v-model="email"
                :class="{ 'in-valid': messageOfTeacherEmail }"
              />
              <div class="mt-1 mb-2 h-[25px] text-red-500">
                <span>{{ messageOfTeacherEmail }}</span>
              </div>
            </label>
          </div>
          <div id="input-side-4" class="flex w-full gap-5 mx-[20px]">
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Địa chỉ</span>
              <input
                v-model="address"
                type="text"
                placeholder="23 abc/3123, Tp.Hồ Chí Minh, Việt Nam"
                class="input-text-default"
              />
            </label>
          </div>
        </div>
      </div>
      <div id="button-side" class="w-full flex text-start mx-[50px] gap-5">
        <button
          @click.prevent="createTeacher()"
          v-if="!creating"
          type="submit"
          class="h-[48px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
        >
          Lưu
        </button>
        <button
          v-if="creating"
          type="button"
          class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
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

<script setup>
import { ref, watch } from "vue";
import teacherService from "../../../services/teacher.service";
import {
  isEmpty,
  isPhoneValid,
  isEmailValid,
} from "../../../utils/resources/check_valid";
const name = ref("");
const gender = ref("");
const birthday = ref("");
const address = ref("");
const email = ref("");
const phone = ref("");
const experience = ref("");
const account_id = ref(null);
const emits = defineEmits(["add-toast"]);
const creating = ref(false);
const fileUpload = ref(null);
const teacherAvatarPath = ref(null);

const messageOfTeacherName = ref("");
const messageOfTeacherPhone = ref("");
const messageOfTeacherEmail = ref("");

function checkValidTeacher() {
  let invalid = false;

  if (isEmpty(phone.value)) {
    invalid = true;
    messageOfTeacherPhone.value = "Vui lòng nhập số điện thoại giáo viên";
  }

  if (!isEmpty(phone.value) && !isPhoneValid(phone.value)) {
    invalid = true;
    messageOfTeacherPhone.value =
      "Số điện thoại giáo viên không đúng định dạng.";
  }
  if (!isEmpty(email.value) && !isEmailValid(email.value)) {
    invalid = true;
    messageOfTeacherEmail.value = "Email giáo viên sai định dạng.";
  }

  if (isEmpty(name.value)) {
    invalid = true;
    messageOfTeacherName.value = "Không được đển trống tên giáo viên";
  }

  return invalid;
}

async function createTeacher() {
  if (checkValidTeacher()) {
    return;
  }
  creating.value = true;
  const formData = new FormData();
  if (fileUpload.value !== null) {
    formData.append("files", fileUpload.value);
  }
  formData.append("name", name.value);
  formData.append("gender", gender.value);
  if (!isEmpty(birthday.value)) formData.append("birthday", birthday.value);
  if (!isEmpty(address.value)) formData.append("address", address.value);
  if (!isEmpty(email.value)) formData.append("email", email.value);
  if (!isEmpty(experience.value))
    formData.append("experience", experience.value);
  formData.append("phone", phone.value);
  formData.append("account_id", account_id.value);

  const response = await teacherService.createTeacher(formData);

  creating.value = false;

  if (!response.data.success) {
    emits("add-toast", {
      title: "Tạo thất bại",
      content: response.data.message,
      type: 2,
    });
    return;
  }
  if (response.data.status === 400) {
    emits("add-toast", {
      title: "Emai hoặc số điện thoại đã tồn tại",
      content: response.data.message,
      type: 1,
    });
    return;
  }

  emits("add-toast", {
    title: "Tạo thành công",
    content: `Tạo giáo viên ${name.value} thành công.`,
    type: 0,
  });
}
// Sử lý và ràn buộc lấy hình ảnh
const handleUploadTeacherImg = (event) => {
  //Lấy hình
  fileUpload.value = event.target.files[0];

  //Kiểm tra tồn tại
  if (!fileUpload) return;

  //Kiểm tra size
  if (fileUpload.value.size / 1024 > 5120) {
    //Bỏ nếu quá dung lượng cho phếp
    fileUpload.value = null;
    return;
  }

  //Tạo đường dẫn của ảnh
  teacherAvatarPath.value = URL.createObjectURL(fileUpload.value);
  console.log(URL.createObjectURL(fileUpload.value));
};
</script>
<style scoped>
#head {
  text-align: start;
  padding: 20px;
  font-size: large;
  font-weight: 600;
  border-bottom: solid 1px rgb(221, 221, 221);
}
</style>
