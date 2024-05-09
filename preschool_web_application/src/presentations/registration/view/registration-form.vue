<template>
    <div class="registration-form">
      <p>Form đăng ký</p>
  
      <form @submit="onSubmit">
        <div class="form-group">
          <label for="name">Họ tên:</label>
          <input type="text" id="name" v-model="name" class="form-control" />
        </div>
  
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" class="form-control" />
        </div>
  
        <div class="form-group">
          <label for="phone">Số điện thoại:</label>
          <input type="tel" id="phone" v-model="phone" class="form-control" />
        </div>
  
        <div class="form-group">
          <label for="address">Địa chỉ thường trú:</label>
          <textarea id="address" v-model="address" class="form-control" rows="3"></textarea>
        </div>
  
        <div class="form-group">
          <label for="city">Tỉnh thành phố:</label>
          <input type="text" id="city" v-model="city" class="form-control" />
        </div>
  
        <div class="form-group">
          <label for="district">Quận/Huyện/Thành phố trực thuộc tỉnh:</label>
          <input type="text" id="district" v-model="district" class="form-control" />
        </div>
  
        <div class="form-group">
          <label for="town">Thị xã:</label>
          <input type="text" id="town" v-model="town" class="form-control" />
        </div>
  
        <div class="form-group">
          <label for="levels">Cấp bậc học:</label>
          <select id="levels" v-model="levels" class="form-control">
            <option value="0">Chọn cấp bậc học</option>
            <option value="1">Mầm</option>
            <option value="2">Chồi</option>
            <option value="3">Lá</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="syllabus">Loại chương trình học:</label>
          <select id="syllabus" v-model="syllabus" class="form-control" required>
            <option value="0">Chọn loại chương trình học</option>
            <option value="1">Chương trình chuẩn</option>
            <option value="2">Chương trình nâng cao</option>
            <option value="3">Chương trình quốc tế</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="relationship">Mối quan hệ với học sinh:</label>
          <select id="relationship" v-model="relationship" class="form-control">
            <option value="0">Chọn mối quan hệ</option>
            <option value="1">Bố</option>
            <option value="2">Mẹ</option>
            <option value="3">Anh, Chị</option>
            <option value="4">Ông, Bà</option>
            <option value="5">Người giám hộ</option>
          </select>
        </div>
  
        <label for="upload">Gửi hình ảnh</label>
        <div class="file-uploader">
          <div class="upload-area">
            <div class="dropzone">
              <h2>Choose files or drag and drop</h2>
            </div>
            <input type="file" @change="handleFileSelect" multiple />
          </div>
  
          <div class="uploaded-files">
            <div v-for="(file, index) in uploadedFiles" :key="index">
              <div class="file-info">
                <span class="filename">{{ file.name }}</span>
                <span
                  ><button @click="removeFile(index)"><img :src="delete_icon" alt="" /></button
                ></span>
              </div>
              <!-- <div class="progress-bar">
            <div class="progress" :style="{ width: file.progress + '%' }"></div>
          </div> -->
            </div>
          </div>
        </div>
        <div class="btn-submit">
          <button class="btn-dangky">Đăng ký</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import delete_icon from "@/assets/icons/delete.svg";
  export default {
    data() {
      return {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        town: '',
        levels: '0',
        syllabus: '0',
        relationship: '0',
        // informationState: ''
        // status: '',
        delete_icon: delete_icon
      }
    },
  
    setup() {
      const uploadedFiles = ref([])
      const handleFileSelect = (event) => {
        const files = event.target.files
        for (const file of files) {
          uploadedFiles.value.push({
            name: file.name,
            // size: file.size,
            progress: 0
          })
  
          // Upload the file to the server here
        }
      }
  
      const removeFile = (index) => {
        uploadedFiles.value.splice(index, 1)
      }
  
      return {
        uploadedFiles,
        handleFileSelect,
        removeFile
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        console.log(this.name)
        console.log(this.email)
        console.log(this.phone)
        console.log(this.address)
        console.log(this.city)
        console.log(this.district)
        console.log(this.town)
        console.log(this.levels)
        console.log(this.syllabus)
        console.log(this.relationship)
      }
    }
  }
  </script>
  <style scoped>
  .registration-form {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
  }
  
  .registration-form p {
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
    font-size: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  select {
    font-size: 14px;
    height: 40px;
  }
  
  .file-uploader {
    width: 450px;
    margin: 0 auto;
    border: 1px solid #ccc;
    padding: 20px;
  }
  
  .upload-area {
    text-align: center;
    padding: 10px;
    border: 1px dashed #ccc;
  }
  
  .dropzone {
    cursor: pointer;
  }
  
  .uploaded-files {
    margin-top: 20px;
  }
  
  .file-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  /* .progress-bar {
    background-color: #f0f0f0;
    height: 5px;
    margin-bottom: 10px;
  }
  
  .progress {
    background-color: #4caf50;
    height: 100%;
    transition: width 0.5s ease;
  } */
  
  .file-info img {
    width: 20px;
    height: 20px;
  }
  
  .btn-dangky {
    margin-top: 20px;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-dangky:hover {
    background-color: #45a049;
  }
  </style>
  