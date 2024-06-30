<template>
  <div class="bg-white ml-4 rounded-3xl text-center">
    <div
      class="bg-white ml-4 mt-[20px] rounded-xl mr-2 text-center h-fit pb-[60px]"
    >
      <div id="head">Tạo phụ huynh</div>
      <div id="site" class="flex px-[30px] py-[30px]">
        <div class="add-avatar w-fit h-fit rounded-md">
          <img
            :src="parentAvatarPath"
            class="w-[150px] h-[150px] object-cover bg-[#D9D9D9] rounded-md"
          />
          <div class="button-side flex my-4 gap-2">
            <input
              type="file"
              class="w-[150px] file:w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#3B44D1] file:text-white hover:file:text-black hover:file:bg-violet-100"
              accept=".png, .jpeg, .jpg"
              @change="handleUploadParentImg"
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
                v-model="name_parent"
                :class="{ 'in-valid': messageOfParentName }"
              />
              <div class="mt-1 mb-2 h-[25px] text-red-500">
                <span>{{ messageOfParentName }}</span>
              </div>
            </label>
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Giới tính</span>
              <select
                id="gender"
                v-model="gender_parent"
                class="input-text-default"
              >
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
              <span class="pl-4 text-blue-700">Nghề nghiệp</span>
              <input
                type="text"
                placeholder="Nghề nghiệp"
                class="h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                v-model="job"
              />
            </label>
          </div>
          <div id="input-side-3" class="flex w-full gap-5 mx-[20px]">
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Số điện thoại</span>
              <input
                type="text"
                placeholder="0xxxxxxxx"
                class="input-text-default"
                v-model="phone_parent"
                :class="{ 'in-valid': messageOfParentPhone }"
              />
              <div class="mt-1 mb-2 h-[25px] text-red-500">
                <span>{{ messageOfParentPhone }}</span>
              </div>
            </label>
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Email</span>
              <input
                type="text"
                placeholder="abc@abc.com"
                class="input-text-default"
                v-model="email_parent"
                :class="{ 'in-valid': messageOfParentEmail }"
              />
              <div class="mt-1 mb-2 h-[25px] text-red-500">
                <span>{{ messageOfParentEmail }}</span>
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
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Vai trò</span>
              <select
                id="role"
                v-model="role"
                class="input-text-default"
                :class="{ 'in-valid': messageOfParentRole }"
              >
                <option value="null">Chọn mối quan hệ</option>
                <option value="0">Bố</option>
                <option value="1">Mẹ</option>
                <option value="2">Người giám hộ</option>
              </select>
              <div class="mt-1 mb-2 h-[25px] text-red-500">
                <span>{{ messageOfParentRole }}</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div id="button-side" class="w-full flex text-start mx-[50px] gap-5">
        <button
          @click.prevent="createParent()"
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
import parentService from "../../../services/parent.service";
import {
  isEmpty,
  isEmailValid,
  isPhoneValid,
} from "../../../utils/resources/check_valid";
const name_parent = ref("");
const gender_parent = ref(0);
const birthday = ref("");
const address = ref("");
const job = ref("");
const email_parent = ref("");
const phone_parent = ref("");
const role = ref("");
const emits = defineEmits(["add-toast"]);
const creating = ref(false);
const fileUpload = ref(null);
const parentAvatarPath = ref(null);

const messageOfParentName = ref("");
const messageOfParentPhone = ref("");
const messageOfParentEmail = ref("");
const messageOfParentRole = ref("");

function checkValidParent() {
  let invalid = false;

  if (isEmpty(phone_parent.value)) {
    invalid = true;
    messageOfParentPhone.value = "Vui lòng nhập số điện thoại phụ huynh.";
  }

  if (!isEmpty(phone_parent.value) && !isPhoneValid(phone_parent.value)) {
    invalid = true;
    messageOfParentPhone.value =
      "Số điện thoại phụ huynh không đúng định dạng.";
  }

  if (!isEmpty(email_parent.value) && !isEmailValid(email_parent.value)) {
    invalid = true;
    messageOfParentEmail.value = "Email phụ huynh sai định dạng.";
  }

  if (isEmpty(name_parent.value)) {
    invalid = true;
    messageOfParentName.value = "Không được đển trống tên phụ huynh.";
  }

  if (isEmpty(role.value)) {
    invalid = true;
    messageOfParentRole.value = "Vui lòng chọn vai trò của phụ huynh.";
  }

  return invalid;
}

watch(name_parent, () => {
  if (!isEmpty(name_parent.value)) {
    messageOfParentName.value = "";
  }
});

watch(phone_parent, () => {
  if (!isEmpty(phone_parent.value) && isPhoneValid(phone_parent.value)) {
    messageOfParentPhone.value = "";
  }
});

watch(email_parent, () => {
  if (!isEmpty(email_parent.value) && isEmailValid(email_parent.value)) {
    messageOfParentEmail.value = "";
  }
});

watch(role, () => {
  if (!isEmpty(role.value)) {
    messageOfParentRole.value = "";
  }
});

async function createParent() {
  if (checkValidParent()) {
    return;
  }
  creating.value = true;
  const formData = new FormData();
  if (fileUpload.value !== null) {
    formData.append("files", fileUpload.value);
  }
  formData.append("name", name_parent.value);
  formData.append("gender", gender_parent.value);
  if (!isEmpty(birthday.value)) formData.append("birthday", birthday.value);
  if (!isEmpty(address.value)) formData.append("address", address.value);
  if (!isEmpty(job.value)) formData.append("job", job.value);
  if (!isEmpty(email_parent.value))
    formData.append("email", email_parent.value);
  formData.append("phone", phone_parent.value);
  formData.append("role", role.value);

  const response = await parentService.createParent(formData);

  creating.value = false;

  if (response.status !== 500 && response.status != 200) {
    emits("add-toast", {
      title: "Thất bại.",
      content: response.data.error,
      type: 1,
    });
    return;
  }

  if (response.status === 500) {
    emits("add-toast", {
      title: "Tạo thất bại",
      content: response.data.error,
      type: 3,
    });
    return;
  }
  if (!response.data.success) {
    emits("add-toast", {
      title: "Tạo thất bại",
      content: response.data.message,
      type: 2,
    });
    return;
  }

  emits("add-toast", {
    title: "Tạo thành công",
    content: `Tạo phụ huynh ${name_parent.value} thành công.`,
    type: 0,
  });
}
// Sử lý và ràn buộc lấy hình ảnh
const handleUploadParentImg = (event) => {
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
  parentAvatarPath.value = URL.createObjectURL(fileUpload.value);
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
