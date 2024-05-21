<template>
  <div class="registration-form">
    <p>Form đăng ký</p>

    <form enctype="multipart/form-data">
      <div class="form-group">
        <label for="name">Họ tên:</label>
        <input
          type="text"
          id="name"
          v-model="your_name"
          class="form-control"
          required
          @blur="checkFilled"
        />
        <div v-if="!your_name && initialLoad" class="input-error">
          Vui lòng nhập họ tên
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="form-control"
          required
          @blur="checkFilled"
        />
        <div v-if="!email && initialLoad" class="input-error">
          Vui lòng nhập email
        </div>
      </div>

      <div class="form-group">
        <label for="phone">Số điện thoại:</label>
        <input
          type="phone"
          id="phone"
          v-model="phone"
          class="form-control"
          required
          @blur="checkFilled"
        />
        <div v-if="!phone && initialLoad" class="input-error">
          Vui lòng nhập số điện thoại
        </div>
        <div v-if="phone.length > 10 && initialLoad" class="input-error">
          Số điện thoại không hợp lệ, vui lòng kiểm tra lại
        </div>
      </div>

      <div class="form-group">
        <label for="address">Địa chỉ thường trú:</label>
        <textarea
          id="address"
          v-model="address"
          class="form-control"
          rows="3"
          required
          @blur="checkFilled"
        ></textarea>
        <div v-if="!address && initialLoad" class="input-error">
          Vui lòng nhập địa chỉ thường trú
        </div>
      </div>

      <select_locantion
        :selectedCity="city"
        :selectedDistrict="district"
        :selectedWard="town"
        @update:selectedCity="handleCityChange"
        @update:selectedDistrict="handleDistrictChange"
        @update:selectedWard="handleWardChange"
        @blur="checkFilled"
      />
      <div
        v-if="(!city || !district || !town) && initialLoad"
        class="input-error"
      >
        Vui lòng chọn đầy đủ
      </div>
      <div class="form-group">
        <label for="levels">Cấp bậc học:</label>
        <select
          id="levels"
          v-model="levels"
          class="form-control"
          required
          @blur="checkFilled"
        >
          <option value="0">Chọn cấp bậc học</option>
          <option value="1">Mầm</option>
          <option value="2">Chồi</option>
          <option value="3">Lá</option>
        </select>
        <div v-if="!levels && initialLoad" class="input-error">
          Vui lòng chọn cấp bậc học
        </div>
      </div>

      <div class="form-group">
        <label for="syllabus">Loại chương trình học:</label>
        <select
          id="syllabus"
          v-model="syllabus"
          class="form-control"
          required
          @blur="checkFilled"
        >
          <option value="0">Chọn loại chương trình học</option>
          <option value="1">Chương trình chuẩn</option>
          <option value="2">Chương trình nâng cao</option>
          <option value="3">Chương trình quốc tế</option>
        </select>
        <div v-if="!syllabus && initialLoad" class="input-error">
          Vui lòng chọn chương trình học
        </div>
      </div>

      <div class="form-group">
        <label for="relationship">Mối quan hệ với học sinh:</label>
        <select
          id="relationship"
          v-model="relationship"
          class="form-control"
          required
          @blur="checkFilled"
        >
          <option value="0">Chọn mối quan hệ</option>
          <option value="1">Bố</option>
          <option value="2">Mẹ</option>
          <option value="3">Anh, Chị</option>
          <option value="4">Ông, Bà</option>
          <option value="5">Người giám hộ</option>
        </select>
        <div v-if="!relationship && initialLoad" class="input-error">
          Vui lòng chọn mối quan hệ
        </div>
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
          <div v-for="file in uploadedFiles" :key="file.name">
            <div class="file-info">
              <span class="filename">{{ file.name }}</span>
              <span
                ><button @click="removeFile(file)">
                  <img :src="delete_icon" alt="" /></button
              ></span>
            </div>
            <!-- <div class="progress-bar">
            <div class="progress" :style="{ width: file.progress + '%' }"></div>
          </div> -->
          </div>
        </div>
      </div>
      <div class="btn-submit">
        <button class="btn-dangky" @click="register">Đăng ký</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import delete_icon from "@/assets/icons/delete.svg";
import select_locantion from "@/components/select_location.vue";
import router from "@/router/router";
const your_name = ref("");
const email = ref("");
const phone = ref("");
const address = ref("");
const city = ref("");
const district = ref("");
const town = ref("");
const levels = ref(0);
const syllabus = ref(0);
const relationship = ref(0);
const informationState = ref();
const status = ref(0);
const uploadedFiles = ref([]);
const emits = defineEmits(["add-toast"]);
const initialLoad = ref(false);
const filled = ref(true);

const handleCityChange = (selectedCity) => {
  city.value = selectedCity;
};

const handleDistrictChange = (selectedDistrict) => {
  district.value = selectedDistrict;
};

const handleWardChange = (selectedWard) => {
  town.value = selectedWard;
};

const handleFileSelect = (event) => {
  const files = event.target.files;
  for (const file of files) {
    uploadedFiles.value.push(file);
  }
};

const removeFile = (file) => {
  const index = uploadedFiles.value.indexOf(file);
  if (index !== -1) {
    uploadedFiles.value.splice(index, 1);
  }
};

const register = async () => {
  try {
    const formData = new FormData();
    for (const file of uploadedFiles.value) {
      formData.append("files", file);
    }
    formData.append("your_name", your_name.value);
    formData.append("email", email.value);
    formData.append("phone", phone.value);
    formData.append("address", address.value);
    formData.append("city", city.value);
    formData.append("district", district.value);
    formData.append("town", town.value);
    formData.append("levels", levels.value);
    formData.append("syllabus", syllabus.value);
    formData.append("relationship", relationship.value);
    formData.append("informationState", 0);
    formData.append("status", 0);
    const response = await axios.post(
      "http://localhost:9000/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      emits("add-toast", {
        title: "Đăng ký thành công",
        type: 0,
      });
      router.push("/");
    } else {
      console.log("Fail");
    }
  } catch (e) {
    console.log(e);
  }
};
const checkFilled = () => {
  filled.value =
    your_name.value.trim() !== "" &&
    email.value.trim() !== "" &&
    phone.value.trim() !== "" &&
    address.value.trim() !== "";
  city.value !== 0 &&
    district.value !== 0 &&
    town.value !== 0 &&
    levels.value !== 0 &&
    syllabus.value !== 0 &&
    relationship.value !== 0;
  if (
    your_name.value.trim() === "" ||
    email.value.trim() === "" ||
    address.value.trim() === "" ||
    city.value === 0 ||
    district.value === 0 ||
    town.value === 0 ||
    levels.value === 0 ||
    syllabus.value === 0 ||
    relationship.value === 0
  ) {
    initialLoad.value = true;
  }
};

window.onload = () => {
  initialLoad.value = true;
};
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
.input-error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
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
