<template>
    <div class="layout-container">
      <div class="image-container">
        <img src="/src/assets/img/1.png" alt="Hình ảnh" />
      </div>
      <div class="form-container">
        <form @submit.prevent="handleSubmit">
            <h1>Đăng nhập</h1>
          <label for="name">Email</label>
          <div class="form-group">
            <img src="/src/assets/icons/member.svg" alt="" />
            <input type="email" id="email" v-model="email" placeholder="Nhập email" />
          </div>
          <label for="email">Mật khẩu</label>
          <div class="form-group">
            <img src="/src/assets/icons/key.svg" alt="" />
            <input type="text" id="password" v-model="password" placeholder="Nhập mật khẩu" />
          </div>
          <div class="forgot-password">
            <a href="#">Quên mật khẩu</a>
          </div>
          <router-link to="/home-page"><button type="submit">Đăng nhập</button></router-link>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      handleSubmit() {
        console.log('Gửi dữ liệu:', this.email, this.password)
      }
    }
  }
  </script>
  <style scoped>
  .layout-container {
    display: flex;
  }
  .image-container {
    width: 50%;
    height: 100%;
    background-color: #ccc;
    text-align: center;
  }
  
  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .form-container {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 50%;
    padding: 20px;
    background-color: #ccc;
    border-radius: 5px;
  }
  h1{
    font-size: 25px;
    margin-bottom: 30px;
  }
  .form-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .form-group img {
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: #fff;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 300px;
    height: 30px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  .forgot-password {
    display: block;
    text-align: end;
    margin: 10px;
  }
  button {
    width: 200px;
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: 3px solid #ccc;
    border-radius: 3px;
    cursor: pointer;
  }
  </style>
  