<template>
  <div class="bg-white ml-4 rounded-3xl text-center text-3xl">
    <div class="info-form">
      <h1>Thêm phụ huynh</h1>
      <div class="row">
        <div class="form-group-row">
          <div class="form-group">
            <label for="name">Họ tên</label>
            <input
              type="text"
              id="name"
              v-model="name"
              placeholder="Nhập họ tên"
            />

            <div class="text-base text-red-500">
              {{ messageOfParentName }}
            </div>
          </div>

          <div class="form-group">
            <label for="gender">Giới tính</label>
            <select id="gender" v-model="gender">
              <option value="0">Nam</option>
              <option value="1">Nữ</option>
              <option value="2">Khác</option>
            </select>
          </div>
        </div>

        <div class="form-group-row">
          <div class="form-group">
            <label for="birthday">Ngày sinh</label>
            <input type="date" id="birthday" v-model="birthday" />
          </div>
          <div class="form-group">
            <label for="address">Địa chỉ</label>
            <input
              type="text"
              id="address"
              v-model="address"
              placeholder="Nhập địa chỉ"
            />
          </div>
        </div>
        <div class="form-group-row">
          <div class="form-group">
            <label for="job">Nghề nghiệp</label>
            <input
              type="text"
              id="job"
              v-model="job"
              placeholder="Nhập nghề nghiệp"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Nhập email"
            />
            <div class="text-base text-red-500">
              {{ invalidEmail }}
            </div>
          </div>
        </div>

        <div class="form-group-row">
          <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              v-model="phone"
              placeholder="Nhập số điện thoại"
            />
            <div class="text-base text-red-500">
              {{ invalidPhone }}
            </div>
          </div>
          <div class="form-group">
            <label for="role">Vai trò</label>
            <select id="role" v-model="role" class="form-control">
              <option value="0">Chọn mối quan hệ</option>
              <option value="1">Bố</option>
              <option value="2">Mẹ</option>
              <option value="3">Anh, Chị</option>
              <option value="4">Ông, Bà</option>
              <option value="5">Người giám hộ</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="account_id">Account</label>
          <div class="account-container">
            <input
              type="text"
              id="account_id"
              v-model="account"
              placeholder="Nhập account id"
            />
          </div>
        </div>

        <div class="container-btn">
          <!-- <button class="btn-close" @click="cancel">Huỷ</button>
          <button class="btn-save" @click="saveData">Lưu</button> -->
          <closeButton @click="cancel" />
          <saveButton @click="createParent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useParentStore } from "../../../stores/parent_store";
import { storeToRefs } from "pinia";
import axios from "axios";
import saveButton from "@/components/save_button.vue";
import closeButton from "@/components/close_button.vue";
const parentStore = useParentStore();
const name = ref("");
const gender = ref(0);
const birthday = ref("");
const address = ref("");
const job = ref("");
const email = ref(null);
const phone = ref(null);
const role = ref(0);
// const status = ref(1);
const account = ref(null);
const emits = defineEmits(["add-toast"]);
const router = useRouter();
const messageOfParentName = ref("");
const invalidEmail = ref("");
const invalidPhone = ref("");
const { status } = storeToRefs(parentStore);
// const checkDuplicate = async () => {
//   try {
//     const checkDuplicateResponse = await axios.post(
//       "http://localhost:9000/parents/duplicate",
//       {
//         email: email.value,
//         phone: phone.value,
//         account: account.value,
//       }
//     );
//     return checkDuplicateResponse.data;
//   } catch (error) {
//     console.log(e);
//   }
// };
function checkVadlidInput() {
  const invalid = ref(false);
  if (name.value === null || name.value == "") {
    messageOfParentName.value = "Không được bỏ trống tên.";
    invalid.value = true;
  }
  if (email.value === null || email.value === "") {
    invalidEmail.value = "Không được bỏ trống email.";
    invalid.value = true;
  }
  if (phone.value === null || phone.value === "") {
    invalidPhone.value = "Không được bỏ trống số điện thoại.";
    invalid.value = true;
  }
  return invalid.value;
}

// const saveData = async () => {
//   try {
//     if (checkVadlidInput()) {
//       return;
//     }
//     const isDuplicate = await checkDuplicate();
//     if (isDuplicate.status === 400) {
//       emits("add-toast", {
//         title:
//           "Email hoặc số điện thoại hoặc account đã tồn tại, vui lòng thử lại!",
//         type: 1,
//       });
//       return;
//     } else if (isDuplicate.status === 200) {
//       const accountValue = account.value ? account.value : null;
//       const response = await axios.post(
//         "http://localhost:9000/parents/insert",
//         {
//           name: name.value,
//           gender: gender.value,
//           birthday: birthday.value,
//           address: address.value,
//           job: job.value,
//           email: email.value,
//           phone: phone.value,
//           role: role.value,
//           status: 1,
//           account: accountValue,
//         }
//       );
//       if (response.status === 200) {
//         emits("add-toast", {
//           title: "Create Successfully!",
//           type: 0,
//         });
//         console.log("Success");
//         router.push({ name: "ParentView" });
//       } else {
//         console.log("Fail");
//       }
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };

async function createParent() {
  try {
    if (checkVadlidInput()) {
      return;
    }
    const accountValue = account.value ? account.value : null;
    const ParentToCreate = {
      name: name.value,
      gender: gender.value,
      birthday: birthday.value,
      address: address.value,
      job: job.value,
      email: email.value,
      phone: phone.value,
      role: role.value,
      status: 1,
      account: accountValue,
    };

    const result = await parentStore.createParent(ParentToCreate);

    if (result.status === 400) {
      emits("add-toast", {
        title: "Email hoặc số điện thoại hoặc account đã tồn tại!",
        content: result.message,
        type: 1,
      });
      return;
    }
    if (result.status === 500) {
      emits("add-toast", {
        title: "Tạo phụ huynh thất bại, kiểm tra lại dữ liệu!",
        content: result.message,
        type: 1,
      });
      return;
    }
    emits("add-toast", {
      title: "Create Successful!",
      content: `Tạo phụ huynh thành công.`,
      type: 0,
    });
    router.push({ name: "ParentView" });
  } catch (error) {
    console.log(error);
  }
}

const cancel = () => {
  router.push({ name: "ParentView" });
};
</script>
<style scoped>
h1 {
  text-align: start;
  padding-left: 15px;
  padding-top: 10px;
  border-bottom: 1px solid #ccc;
}
.info-form {
  font-size: 20px;
  height: 700px;
  display: flex;
  flex-direction: column;
}
.row {
  margin-top: 20px;
}
.form-group-row {
  display: flex;
  /* justify-content: flex-start; */
}
.form-group {
  flex: 1;
  margin-bottom: 15px;
}

label {
  padding-left: 40px;
  display: block;
  margin-bottom: 5px;
  text-align: left;
  color: #3b44d1;
}

input,
select {
  width: 520px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}
.account-container {
  display: flex;
  justify-content: flex-start;
  height: 48px;
  margin-left: 30px;
}

.container-btn {
  width: 250px;
  display: flex;
  margin-left: auto;
  margin-right: 10px;
}
/* .btn-save {
  width: 100px;
  margin-left: 5px;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
.btn-close {
  width: 100px;
  margin-left: auto;
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
} */
</style>
