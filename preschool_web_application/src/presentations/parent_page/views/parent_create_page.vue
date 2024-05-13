<template>
  <div class="bg-white ml-4 rounded-3xl text-center text-3xl">
    <div class="info-form">
      <h1>Thông tin cá nhân</h1>
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
              <option value="male" selected>Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
        </div>

        <div class="form-group-row">
          <div class="form-group">
            <label for="dob">Ngày sinh</label>
            <input type="date" id="dob" v-model="dob" />
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
            <label for="occupation">Nghề nghiệp</label>
            <input
              type="text"
              id="occupation"
              v-model="occupation"
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

        <div class="container-btn">
          <button class="btn-save">Lưu</button>
          <button class="btn-close" @click="cancel">Huỷ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
export default {
  components() {
    router: router;
  },
  data() {
    return {
      name: "",
      email: "",
      gender: "",
      dob: "",
      address: "",
      phone: "",
      occupation: "",
    };
  },
  setup() {
    const cancel = () => {
      console.log("out");
      router.push("/");
    };
    return {
      cancel,
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
  width: 70%;
  padding: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.container-btn {
  display: flex;
}
.btn-save {
  margin-left: auto;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
.btn-close {
  margin-left: 5px;
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
</style>
