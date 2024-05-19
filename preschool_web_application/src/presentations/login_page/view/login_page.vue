<template>
  <div class="w-full h-dvh flex align-center justify-center">
    <section
      class="w-dvw bg-white rounded-tl-xl rounded-bl-xl hidden xl:table-cell content-center align-center"
    >
      <img src="/src/assets/img/1.png" class="h-full m-auto" alt="Hình ảnh" />
    </section>
    <section
      class="w-[800px] rounded-tr-xl rounded-br-xl bg-[#3B44D1] content-center align-center px-[50px] md:px-[100px]"
    >
      <!--Logo-->
      <div
        class="w-[120px] h-[120px] bg-white rounded-full m-auto text-center content-center"
      ></div>

      <!--Name-->
      <div class="text-center content-center my-3">
        <span class="text-white text-[27px]">Preschool</span>
      </div>
      <div></div>
      <form action="">
        <!--Username-->
        <div class="my-6">
          <label for="" class="relative">
            <p class="text-white text-start my-2 text-[19px]">Email</p>
            <input
              placeholder="abc@gmail.comm"
              type="text"
              class="w-full h-[48px] text-white rounded-md border-[0.1rem] focus:ring-1 ring-white focus:border-white border-gray-300 bg-[#3B44D1] outline-none px-5 text-[17px] placeholder:text-[#FFFFFF]"
              id="username-input"
            />
            <!-- <img :src="account_icon" class="absolute top-2/3 left-2" /> -->
          </label>
        </div>

        <!--Password-->
        <div class="my-6">
          <label for="">
            <p class="text-white text-start my-2 text-[19px]">Mật khẩu</p>
            <input
              type="password"
              class="w-full h-[48px] text-white rounded-md border-[0.1rem] focus:ring-1 ring-white focus:border-white border-gray-300 bg-[#3B44D1] outline-none px-5 text-[17px] placeholder:text-[#FFFFFF]"
              id="username-input"
              placeholder="Nhập mật khẩu"
            />
          </label>
        </div>
        <!--Rememer pass & forgot pass-->
        <div class="flex my-6 justify-between">
          <div class="flex">
            <label
              for=""
              class="relative flex items-center rounded-full cursor-pointer"
              ><input
                type="checkbox"
                class="before:content[''] hover:ring-white peer relative h-5 w-5 cursor-pointer appearance-none rounded-[5px] border border-white transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-white checked:border-none hover:before:opacity-10"
                id="check"
              />
              <span
                class="absolute text-black transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <span class="px-2 text-white">Keep me logged in</span>
          </div>
          <div>
            <label for="">
              <span class="px-2 text-white hover:underline"
                ><a href="">Forgot your password?</a></span
              ></label
            >
          </div>
        </div>

        <!--Login button -->
        <div
          class="w-full bg-white my-6 h-[48px] content-center text-[#3B44D1] rounded-md active:scale-[98%] hover:bg-gray-200"
        >
          <button type="button" class="w-full h-full">
            <router-link to="/home-page">Đăng nhập</router-link>
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import account_icon from "../../../assets/icons/account.svg";
</script>

<style  scoped>
</style>