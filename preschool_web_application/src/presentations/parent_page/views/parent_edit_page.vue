<template>
  <div class="bg-white ml-4 rounded-3xl text-center text-3xl">
    <div class="info-form">
      <h1>Chi tiết phụ huynh</h1>
      <div class="row">
        <div class="form-group-row">
          <div class="form-group">
            <label for="name">Họ tên</label>
            <input type="text" id="name" v-model="name" />
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
            <input type="text" id="address" v-model="address" />
          </div>
        </div>
        <div class="form-group-row">
          <div class="form-group">
            <label for="job">Nghề nghiệp</label>
            <input type="text" id="job" v-model="job" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" />
          </div>
        </div>

        <div class="form-group-row">
          <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <input type="tel" id="phone" v-model="phone" />
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
          <label for="status">Trạng thái hoạt động</label>
          <div class="select-container">
            <select id="role" v-model="status" class="form-control">
              <option value="0">Không hoạt động</option>
              <option value="1">Hoạt động</option>
            </select>
          </div>
        </div>

        <div class="container-btn">
          <!-- <button class="btn-close" @click="cancel">Huỷ</button>
          <button class="btn-save" @click="updateParent">Lưu</button> -->
          <closeButton @click="cancel" />
          <saveButton @click="updateParent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import saveButton from "@/components/save_button.vue";
import closeButton from "@/components/close_button.vue";

const name = ref("");
const gender = ref("");
const birthday = ref("");
const address = ref("");
const job = ref("");
const email = ref("");
const phone = ref("");
const role = ref("");
const status = ref("");
// const account_id = ref("");
const emits = defineEmits(["add-toast"]);
const router = useRouter();

const getParent = async () => {
  try {
    const parentId = router.currentRoute.value.params.id;
    console.log(parentId);
    const response = await axios.get(
      `http://localhost:9000/parents/${parentId}`
    );
    const parents = response.data[0];
    const parsedBirthday = new Date(parents.birthday);
    const formattedBirthday = `${parsedBirthday.getFullYear()}-${String(
      parsedBirthday.getMonth() + 1
    ).padStart(2, "0")}-${String(parsedBirthday.getDate()).padStart(2, "0")}`;
    if (parents) {
      name.value = parents.name;
      gender.value = parents.gender;
      birthday.value = formattedBirthday;
      address.value = parents.address;
      job.value = parents.job;
      email.value = parents.email;
      phone.value = parents.phone;
      role.value = parents.role;
      status.value = parents.status;
      // account_id.value = parents.account_id;
    }
    console.log(birthday.value);
  } catch (error) {
    console.error("Error fetching parents:", error);
  }
};

const updateParent = async () => {
  try {
    const parentId = router.currentRoute.value.params.id;
    const response = await axios.put(
      `http://localhost:9000/parents/${parentId}`,
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
        // account_id: account_id.value,
      }
    );
    if (response.status === 200) {
      emits("add-toast", {
        title: "Update Successfully!",
        type: 0,
      });
      router.push("/parents");
    } else {
      console.log("Fail");
    }
  } catch (error) {
    console.error("Error updating parent:", error);
  }
};

const cancel = () => {
  router.push("/parents");
};

onMounted(() => {
  getParent();
});
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
  justify-content: flex-start;
}
.form-group {
  flex: 1;
  margin-bottom: 15px;
}
.select-container {
  display: flex;
  justify-content: flex-start;
  height: 48px;
  margin-left: 30px;
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

.container-btn {
  width: 250px;
  display: flex;
  margin-left: auto;
  margin-right: 10px;
}
/* .btn-save {
  margin-right: 10px;
  width: 80px;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
} */
/* .btn-close {
  margin-left: auto;
  width: 80px;
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
} */
</style>
