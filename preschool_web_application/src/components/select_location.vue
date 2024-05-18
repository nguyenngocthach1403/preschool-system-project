<template>
  <div>
    <label for="city">Tỉnh thành phố:</label>
    <select v-model="selectedCity" @change="onCityChange">
      <option value="" selected>Chọn thành phố</option>
      <option v-for="city in cities" :value="city.Name" :key="city.Id">
        {{ city.Name }}
      </option>
    </select>
    <label for="district">Quận/Huyện/Thành phố trực thuộc tỉnh:</label>
    <select v-model="selectedDistrict" @change="onDistrictChange">
      <option value="" selected>Chọn quận/huyện</option>
      <option
        v-for="district in districts"
        :value="district.Name"
        :key="district.Id"
      >
        {{ district.Name }}
      </option>
    </select>
    <label for="town">Thị xã:</label>
    <select v-model="selectedWard" @change="onWardChange">
      <option value="" selected>Chọn phường/xã</option>
      <option v-for="ward in wards" :value="ward.Name" :key="ward.Id">
        {{ ward.Name }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    selectedCity: String,
    selectedDistrict: String,
    selectedWard: String,
  },
  data() {
    return {
      cities: [],
      districts: [],
      wards: [],
      selectedCity: "",
      selectedDistrict: "",
      selectedWard: "",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        )
        .then((response) => {
          this.cities = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    onCityChange() {
      this.districts = [];
      this.wards = [];
      const selectedCityData = this.cities.find(
        (city) => city.Name === this.selectedCity
      );
      if (selectedCityData) {
        this.districts = selectedCityData.Districts;
      }
      this.$emit("update:selectedCity", this.selectedCity);
    },
    onDistrictChange() {
      this.wards = [];
      const selectedCityData = this.cities.find(
        (city) => city.Name === this.selectedCity
      );
      if (selectedCityData) {
        const selectedDistrictData = selectedCityData.Districts.find(
          (district) => district.Name === this.selectedDistrict
        );
        if (selectedDistrictData) {
          this.wards = selectedDistrictData.Wards;
        }
      }
      this.$emit("update:selectedDistrict", this.selectedDistrict);
    },
    onWardChange() {
      this.$emit("update:selectedWard", this.selectedWard);
    },
  },
};
</script>
<style scoped>
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
  margin-bottom: 20px;
}

select {
  font-size: 14px;
  height: 40px;
}
</style>
