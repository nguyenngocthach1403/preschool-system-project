<template>
  <div class="dashboard text-[14px]">
    <main>
      <div class="2xl:h-dvh mr-[10px]h-dvh">
        <table class="h-fit w-full">
          <thead
            class="sticky top-0 text-[15px] bg-[#3B44D1] text-white text-white z-10"
          >
            <tr>
              <th class="px-3 py-3 text-left">
                <div class="flex">
                  Họ và tên
                  <img
                    :src="sort_icon"
                    @click="$emit('sort-teacher-name')"
                    class="w-[20px] hover:bg-gray-200/25 rounded-full"
                  />
                </div>
              </th>
              <th>Tài khoản</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Lớp giảng dạy</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr class="h-[60px] text-left even:bg-gray-50 hover:bg-gray-200">
              <td class="w-[700px]">{{}}</td>
              <td class="w-[700px]">{{}}</td>
              <td class="w-[700px]">{{}}</td>
              <td class="w-[700px]">{{}}</td>
              <td class="w-[700px]">{{}}</td>
              <td class="w-[200px]">
                <!-- <div class="flex">
                  <div
                    class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(206,44,44)] content-center"
                  >
                    <img :src="delete_icon" class="w-[14px] m-auto" />
                  </div>
                  <div
                    class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(53,61,186)] content-center"
                  >
                    <img :src="edit_icon" class="w-[14px] m-auto" />
                  </div>
                </div> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
// import moment from "moment";
import router from "@/router/router";
import delete_icon from "@/assets/icons/delete.svg";
import edit_icon from "@/assets/icons/edit.svg";
import add_icon from "@/assets/icons/pls.svg";
import sort_icon from "@/assets/icons/Sorting arrowheads.svg";

//   const emits = defineEmits(["add-toast"]);

//   const formatDate = (birthday) => moment(birthday).format("DD/MM/YYYY");

//   defineProps({
//     dataTable: {
//       type: Array,
//       required: true,
//     },
//   });

//   const editParent = (parentId) => {
//     router.push({ name: "ParentEditView", params: { id: parentId } });
//     console.log(parentId);
//   };
//   function deleteParent(parentIdToDel) {
//     emits("delete-parent", parentIdToDel);
//   }
</script>

<style scoped>
th,
td {
  padding: 10px;
  border: 0px solid #ffffff;
  text-align: left;
}

th {
  white-space: nowrap;
}
</style>
