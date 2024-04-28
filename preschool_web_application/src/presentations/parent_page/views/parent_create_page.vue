<template>
    <div class="info-form">
      <h2>Thông tin cá nhân</h2>
  
      <form>
        <div class="form-group">
          <label for="name">Họ tên</label>
          <input type="text" id="name" v-model="name"   placeholder="Nhập họ tên"/>
        </div>
  
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email"  placeholder="Nhập họ email"/>
        </div>
  
        <div class="form-group">
          <label for="gender">Giới tính</label>
          <select id="gender" v-model="gender" >
            <option value="male" selected>Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="dob">Ngày sinh</label>
          <input type="date" id="dob" v-model="dob"  />
        </div>
  
        <div class="form-group">
          <label for="address">Địa chỉ</label>
          <input type="text" id="address" v-model="address"  placeholder="Nhập địa chỉ"/>
        </div>
  
        <div class="form-group">
          <label for="phone">Số điện thoại</label>
          <input type="tel" id="phone" v-model="phone" placeholder="Nhập số điện thoại"/>
        </div>
  
        <div class="form-group">
          <label for="occupation">Nghề nghiệp</label>
          <input type="text" id="occupation" v-model="occupation" placeholder="Nhập nghề nghiệp"/>
        </div>
        <div class="container-btn">
          <button class="btn-save">Lưu</button>
          <button class="btn-close" @click="cancel">Huỷ</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import router from '@/router/router'
  export default {
    components(){
      router: router
    },
    data() {
      return {
        name: '',
        email: '',
        gender: '',
        dob: '',
        address: '',
        phone: '',
        occupation: '',
      }
    },
    setup() {
      const cancel = () => {
      console.log('out');
      router.push('/'); 
    };
    return{
      cancel
    }
    }
  }
  </script>
  
  <style scoped>
  .info-form {
    width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input,
  select {
    width: 100%;
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
  