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
          <label for="account_id">Account ID</label>
          <div class="account-container">
            <input
              type="text"
              id="account_id"
              v-model="account_id"
              placeholder="Nhập account id"
            />
          </div>
        </div>

        <div class="container-btn">
          <!-- <button class="btn-close" @click="cancel">Huỷ</button>
          <button class="btn-save" @click="saveData">Lưu</button> -->
          <closeButton @click="cancel" />
          <saveButton @click="saveData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import saveButton from "@/components/save_button.vue";
import closeButton from "@/components/close_button.vue";

const name = ref("");
const gender = ref(0);
const birthday = ref("");
const address = ref("");
const job = ref("");
const email = ref("");
const phone = ref("");
const role = ref(0);
const status = ref(1);
const account_id = ref("");
const emits = defineEmits(["add-toast"]);
const router = useRouter();

const checkDuplicate = async () => {
  try {
    const checkDuplicateResponse = await axios.post(
      "http://localhost:9000/parents/duplicate",
      {
        email: email.value,
        phone: phone.value,
        account_id: account_id.value,
      }
    );
    return checkDuplicateResponse.data;
  } catch (error) {
    console.log(e);
  }
};
const saveData = async () => {
  try {
    const isDuplicate = await checkDuplicate();
    if (
      isDuplicate.message === "Email or phone or account_id already exists."
    ) {
      emits("add-toast", {
        title:
          "Email hoặc số điện thoại hoặc account_id đã tồn tại, vui lòng thử lại!",
        type: 1,
      });
      return;
    } else if (
      isDuplicate.message === "Email, phone and account_id are unique."
    ) {
      const response = await axios.post(
        "http://localhost:9000/parents/insert",
        {
          name: name.value,
          gender: gender.value,
          birthday: birthday.value,
          address: address.value,
          job: job.value,
          email: email.value,
          phone: phone.value,
          role: role.value,
          status: status.value,
          account_id: account_id.value,
        }
      );
      if (response.status === 200) {
        emits("add-toast", {
          title: "Create Successfully!",
          type: 0,
        });
        console.log("Success");
        router.push({ name: "ParentView" });
      } else {
        console.log("Fail");
      }
    }
  } catch (e) {
    console.log(e);
  }
};

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
