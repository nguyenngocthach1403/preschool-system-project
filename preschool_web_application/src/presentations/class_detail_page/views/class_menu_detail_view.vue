<template>
  <div class="w-full h-full bg-white rounded-xl">
    <div class="py-4 px-7 text-start border-b flex justify-between">
      <span class="text-[20px] font-bold">Thực đơn hàng tuần</span>
    </div>
    <div class="flex">
      <div class="menu-navigation">
        <button onclick="prevWeek()">Tuần trước</button>
        <button onclick="nextWeek()">Hiện tại</button>
        <button onclick="nextWeek()">Tuần sau</button>
      </div>
    </div>
    <!--Body-->
    <!--Table-->
    <MenuTable />
  </div>
</template>

<script setup>
import MenuTable from "../components/menu_table.vue";
</script>

<style  scoped>
.menu-navigation {
  margin: 10px 0px;
}

.menu-navigation button:hover {
  background-color: #2d3d99;
}

.menu-navigation button {
  background-color: #3f51b5;
  color: white;
  border-radius: 7px;
  margin: 0 0px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>