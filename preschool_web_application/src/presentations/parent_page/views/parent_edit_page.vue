<template>
  <div class="bg-white ml-4 rounded-3xl text-center text-3xl">
    <div class="info-form">
      <h1>Thông tin cá nhân</h1>
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
        <div class="form-group-row">
          <div class="form-group">
            <label for="account_id">Account ID</label>
            <input type="text" id="account_id" v-model="account_id" />
          </div>
          <div class="form-group">
            <label for="status">Trạng thái hoạt động</label>
            <select id="role" v-model="status" class="form-control">
              <option value="0">Không hoạt động</option>
              <option value="1">Hoạt động</option>
            </select>
          </div>
        </div>

        <div class="container-btn">
          <button class="btn-close" @click="cancel">Huỷ</button>
          <button class="btn-save" @click="updateParent">Lưu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import router from "@/router/router";
export default {
  setup() {
    const name = ref("");
    const gender = ref("");
    const birthday = ref("");
    const address = ref("");
    const job = ref("");
    const email = ref("");
    const phone = ref("");
    const role = ref("");
    const status = ref("");
    const account_id = ref("");
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
        ).padStart(2, "0")}-${String(parsedBirthday.getDate()).padStart(
          2,
          "0"
        )}`;
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
          account_id.value = parents.account_id;
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
            account_id: account_id.value,
          }
        );
        if (response.status === 200) {
          console.log("Success");
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
    return {
      name,
      gender,
      birthday,
      address,
      job,
      email,
      phone,
      role,
      status,
      account_id,
      cancel,
      getParent,
      updateParent,
    };
  },
};
</script>

<style scoped>
.info-form {
  font-size: 20px;
  height: 700px;
  display: flex;
  flex-direction: column;
}
.row {
  margin-top: 40px;
}
.form-group-row {
  display: flex;
  justify-content: flex-start;
}
.form-group {
  flex: 1;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
}

input,
select {
  width: 90%;
  padding: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.container-btn {
  display: flex;
}
.btn-save {
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
}
</style>
