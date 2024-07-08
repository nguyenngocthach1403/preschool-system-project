<template>
  <div>
    <form>
      <div
        class="bg-white ml-4 mt-[20px] rounded-xl mr-2 text-center h-fit pb-[60px]"
      >
        <div id="head">Chi tiết giáo viên</div>
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
                  v-model="name_teacher"
                  :class="{ 'in-valid': messageOfTeacherName }"
                />
                <div class="mt-1 mb-2 h-[25px] text-red-500">
                  <span>{{ messageOfTeacherName }}</span>
                </div>
              </label>
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Giới tính</span>
                <select
                  id="gender"
                  v-model="gender_teacher"
                  class="input-text-default"
                >
                  <option value="0">Nam</option>
                  <option value="1">Nữ</option>
                  <option value="2">Khác</option>
                </select>
              </label>
            </div>
            <div
              id="input-side-2"
              class="flex w-full gap-5 mx-[20px] mb-[25px]"
            >
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Ngày sinh</span>
                <input
                  v-model="birthday"
                  type="date"
                  class="input-text-default"
                />
              </label>
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Kinh nghiệm</span>
                <input
                  type="text"
                  placeholder="0xxxxxxxx"
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
                  v-model="phone_teacher"
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
                  v-model="email_teacher"
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
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Trạng thái hoạt động</span>
                <select
                  id="gender"
                  v-model="status_teacher"
                  class="input-text-default"
                >
                  <option value="0">Không hoạt động</option>
                  <option value="1">Hoạt động</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <div
          v-if="$router.currentRoute.value.params.id"
          id="button-side"
          class="w-full flex text-start mx-[50px] gap-5"
        >
          <button
            @click.prevent="updateTeacher()"
            v-if="!updating"
            type="submit"
            class="h-[48px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
          >
            Cập nhật
          </button>
          <button
            v-if="updating"
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
    </form>
    <div
      class="bg-white ml-4 mt-[20px] rounded-xl mr-2 text-center h-fit pb-[60px]"
    >
      <div id="head">Thông tin tài khoản</div>

      <!--Hiện thị khi người dùng chưa có tài khoản 
              Nhập mã tài khoản để thêm
            -->
      <div v-if="!username_account">
        <div class="text-start px-10 py-3 text-gray-500">
          * Giáo viên hiện tại chưa được thêm tài khoản
        </div>
        <div class="flex w-full gap-5 mx-[20px] mb-[20px] py-5 items-center">
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Tên tài khoản</span>
            <div class="flex gap-5">
              <input
                type="text"
                placeholder="Tên đăng nhập"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                v-model="accountForTeacher"
                :class="{ 'in-valid': messageOfAddAccountForTeacher }"
              />
              <div class="mt-1 mb-2 h-[25px] text-red-500">
                <span>{{ messageOfAddAccountForTeacher }}</span>
              </div>
              <div
                id="button-side"
                class="w-full flex text-start gap-5 my-[5px]"
              >
                <button
                  @click.prevent="addAccountForTeacher()"
                  v-if="!addingAccountForTeacher"
                  type="submit"
                  class="h-[45px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
                >
                  Cập nhật
                </button>
                <button
                  v-if="addingAccountForTeacher"
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
          </label>
        </div>
      </div>

      <!-- Hiện thị khi người dùng đã có tài khoản -->
      <div class="w-full px-40" v-if="username_account">
        <div class="flex w-full gap-5 mx-[20px] mb-[20px] py-5">
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Tên tài khoản</span>
            <input
              disabled
              type="text"
              placeholder="Tên đăng nhập"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              v-model="username_account"
            />
          </label>
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Số điện thoại</span>
            <input
              type="text"
              placeholder="0xxxxxxxxx"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              v-model="phone_account"
              :class="{ 'in-valid': messageOfAccountPhone }"
            />
            <div class="mt-1 mb-2 h-[25px] text-red-500">
              <span>{{ messageOfAccountPhone }}</span>
            </div>
          </label>
        </div>
        <div class="flex w-full gap-5 mx-[20px] mb-[20px]">
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Trạng thái</span>
            <!-- <SelectStatusComp
                class="h-[45px] rounded-md my-[5px] w-full outline-none focus:border-blue-500"
                @choose="statusAccount = $event"
                :active="1"
                :choose="status_account"
              /> -->
            <select
              id="status_account"
              v-model="status_account"
              class="input-text-default"
            >
              <option value="0">Khoá</option>
              <option value="1">Đang hoạt động</option>
            </select>
          </label>
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Email</span>
            <input
              type="text"
              placeholder="abc@abc.com"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              v-model="email_account"
              :class="{ 'in-valid': messageOfAccountEmail }"
            />
            <div class="mt-1 mb-2 h-[25px] text-red-500">
              <span>{{ messageOfAccountEmail }}</span>
            </div>
          </label>
        </div>
        <div id="button-side" class="w-full flex text-start mx-5 gap-5">
          <button
            @click.prevent="updateAccount"
            v-if="status !== 'creating'"
            type="submit"
            class="h-[48px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
          >
            Cập nhật
          </button>
          <button
            v-if="status === 'creating'"
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
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import teacherService from "../../../services/teacher.service";
import { useAccountStore } from "../../../stores/account_store";
import { yyyymmddDateString } from "..//..//..//utils//resources//format_date";
import {
  isEmpty,
  isEmailValid,
  isPhoneValid,
} from "../../../utils/resources/check_valid";
const name_teacher = ref("");
const gender_teacher = ref("");
const birthday = ref("");
const address = ref("");
const email_teacher = ref("");
const phone_teacher = ref("");
const status_teacher = ref("");
const experience = ref("");
const emits = defineEmits(["add-toast"]);
const router = useRouter();
const username_account = ref("");
const email_account = ref("");
const phone_account = ref("");
const status_account = ref("");
const accountStore = useAccountStore();
const updating = ref(false);
const creating = ref(false);
const addingAccountForTeacher = ref(false);
const fileUpload = ref(null);
const teacherAvatarPath = ref(null);
const accountForTeacher = ref("");
const status = ref("");

const messageOfTeacherName = ref("");
const messageOfTeacherPhone = ref("");
const messageOfTeacherEmail = ref("");
const messageOfAccountPhone = ref("");
const messageOfAccountEmail = ref("");
const messageOfAddAccountForTeacher = ref("");

async function getTeacher() {
  const teacherId = router.currentRoute.value.params.id;
  const response = await teacherService.getTeacherById(teacherId);

  console.log(response);

  if (response.status !== 200) {
    emits("add-toast", {
      title: "Lỗi tải dữ liệu giáo viên",
      content: response.data.error,
      type: 3,
    });
    return;
  }

  const teachers = response.data.data[0];

  if (teachers) {
    name_teacher.value = teachers.name;
    gender_teacher.value = teachers.gender;
    // const partsDate = new Date(teachers.birthday)
    //   .toLocaleDateString()
    //   .split("/");
    // birthday.value = `${partsDate[2]}-${partsDate[0] < 10 ? "0" : ""}${
    //   partsDate[0]
    // }-${partsDate[1]}`;
    const parsedBirthday = new Date(teachers.birthday);
    const formattedBirthday = `${parsedBirthday.getFullYear()}-${String(
      parsedBirthday.getMonth() + 1
    ).padStart(2, "0")}-${String(parsedBirthday.getDate()).padStart(2, "0")}`;
    birthday.value = formattedBirthday;
    address.value = teachers.address;
    email_teacher.value = teachers.email;
    phone_teacher.value = teachers.phone;
    experience.value = teachers.experience;
    status_teacher.value = teachers.status;
    email_account.value = teachers.EmailAccount;
    phone_account.value = teachers.PhoneAccount;
    status_account.value = teachers.StatusAccount;
    teacherAvatarPath.value = teachers.avatar;
    username_account.value = teachers.username;
  }
}

function checkValidTeacher() {
  let invalid = false;

  if (isEmpty(phone_teacher.value)) {
    invalid = true;
    messageOfTeacherPhone.value = "Vui lòng nhập số điện thoại giáo viên.";
  }

  if (!isEmpty(phone_teacher.value) && !isPhoneValid(phone_teacher.value)) {
    invalid = true;
    messageOfTeacherPhone.value =
      "Số điện thoại giáo viên không đúng định dạng.";
  }

  if (!isEmpty(email_teacher.value) && !isEmailValid(email_teacher.value)) {
    invalid = true;
    messageOfTeacherEmail.value = "Email giáo viên sai định dạng.";
  }

  if (isEmpty(name_teacher.value)) {
    invalid = true;
    messageOfTeacherName.value = "Không được đển trống tên giáo viên.";
  }

  return invalid;
}

function checkValidAccount() {
  let invalid = false;

  if (isEmpty(phone_account.value)) {
    invalid = true;
    messageOfAccountPhone.value = "Vui lòng nhập số điện thoại.";
  }

  if (!isEmpty(phone_account.value) && !isPhoneValid(phone_account.value)) {
    invalid = true;
    messageOfAccountPhone.value = "Số điện thoại không đúng định dạng.";
  }

  if (!isEmpty(email_account.value) && !isEmailValid(email_account.value)) {
    invalid = true;
    messageOfAccountEmail.value = "Email sai định dạng.";
  }
  return invalid;
}

async function updateTeacher() {
  if (checkValidTeacher()) {
    return;
  }
  updating.value = true;
  const teacherId = router.currentRoute.value.params.id;
  const formData = new FormData();
  if (fileUpload.value !== null) {
    formData.append("files", fileUpload.value);
  }
  formData.append("name", name_teacher.value);
  formData.append("gender", gender_teacher.value);
  if (!isEmpty(birthday.value)) formData.append("birthday", birthday.value);
  if (!isEmpty(address.value)) formData.append("address", address.value);
  if (!isEmpty(email_teacher.value))
    formData.append("email", email_teacher.value);
  formData.append("phone", phone_teacher.value);
  formData.append("experience", experience.value);
  formData.append("status", status_teacher.value);

  console.log(formData);

  const response = await teacherService.updateTeacher(teacherId, formData);

  updating.value = false;

  if (response.status !== 500 && response.status != 200) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      content: response.data.error,
      type: 1,
    });
    return;
  }

  if (response.status === 500) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      content: response.data.error,
      type: 3,
    });
    return;
  }
  if (!response.data.success) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      content: response.data.message,
      type: 2,
    });
    return;
  }

  emits("add-toast", {
    title: "Cập nhật thành công",
    content: `Cập nhật giáo viên ${name_teacher.value} thành công.`,
    type: 0,
  });
}

async function addAccountForTeacher() {
  addingAccountForTeacher.value = true;
  if (isEmpty(accountForTeacher.value)) {
    messageOfAddAccountForTeacher.value = "Vui lòng nhập mã tài khoản.";
    return;
  }
  const response = await teacherService.addAccountForTeacher(
    router.currentRoute.value.params.id,
    accountForTeacher.value
  );

  addingAccountForTeacher.value = false;

  if (response.status !== 500 && response.status != 200) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      content: response.data.error,
      type: 1,
    });
    return;
  }

  if (response.status === 500) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      content: response.data.error,
      type: 3,
    });
    return;
  }
  if (!response.data.success) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      content: response.data.message,
      type: 2,
    });
    return;
  }

  emits("add-toast", {
    title: "Cập nhật thành công",
    content: `Thêm account cho phụ huynh ${name_teacher.value} thành công.`,
    type: 0,
  });
  getTeacher();
}

async function updateAccount() {
  if (checkValidAccount()) {
    return;
  }
  const Username = username_account.value;
  console.log(Username);
  const AccountToUpdate = {
    email: email_account.value,
    phone: phone_account.value,
    status: status_account.value,
  };
  const result = await accountStore.updateAccount(Username, AccountToUpdate);
  if (result.status === 400) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      type: 1,
    });
    return;
  }
  emits("add-toast", {
    title: "Cập nhật thành công",
    type: 0,
  });
}

onMounted(() => {
  if (router.currentRoute.value.params.id) {
    getTeacher();
  }
});
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
.in-valid {
  border: 1px solid red;
}
</style>
