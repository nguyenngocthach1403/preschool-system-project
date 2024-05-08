<template>
  <div class="layout-container h-dvh text-[20px]">
    <!--background image-->
    <div class="image-container">
      <img src="/src/assets/img/1.png" class="h-full" alt="Hình ảnh" />
    </div>
    <!--Form login-->
    <div class="form-container">
      <form
        @submit.prevent="handleSubmit"
        class="py-[100px] bg-gray-200/75 px-[40px] rounded-xl shadow-ss"
      >
        <h1>Đăng nhập</h1>
        <div class="h-[60px] my-[25px]">
          <label for="">
            <span>Tài khoản</span>
          </label>
          <div class="relative">
            <img
              src="/src/assets/icons/account.svg"
              alt=""
              class="absolute top-[7px] left-1 w-[30px]"
            />
            <input
              type="text"
              class="rounded-md focus:ring-2 focus:ring-[#3B44D1] outline-none w-[500px] text-[19px] h-[44px] border pl-[40px] shadow-md"
            />
          </div>
        </div>
        <div class="h-[60px] my-[25px]">
          <label for="">
            <span>Mật khẩu</span>
          </label>
          <div class="relative">
            <img
              src="/src/assets/icons/account.svg"
              alt=""
              class="absolute top-[7px] left-1 w-[30px]"
            />
            <input
              type="password"
              class="rounded-md focus:ring-2 focus:ring-[#3B44D1] outline-none w-[500px] text-[19px] h-[44px] border pl-[40px] shadow-md"
            />
          </div>
        </div>
        <div class="forgot-password">
          <a href="#">Quên mật khẩu</a>
        </div>
        <router-link to="/home-page">
          <button type="submit" class="hover:bg-[#3B44D1]/75 active:scale-95">
            Đăng nhập
          </button>
        </router-link>
      </form>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      console.log("Gửi dữ liệu:", this.email, this.password);
    },
  },
};
</script>
  <style scoped>
.layout-container {
  display: flex;
}
.image-container {
  width: 50%;
  height: 100%;
  background-color: #ffffff;
  text-align: center;
}

/* .image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
} */

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
}
h1 {
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
  background-color: #fff;
}

label {
  display: block;
  margin-bottom: 5px;
}

/* input {
  width: 300px;
  height: 30px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
} */

.forgot-password {
  display: block;
  text-align: end;
  margin: 10px;
}
button {
  width: 200px;
  background-color: #3b44d1;
  color: #fff;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
}
</style>
  