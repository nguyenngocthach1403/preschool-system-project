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
                    @click="$emit('sort-parent-name')"
                    class="w-[20px] hover:bg-gray-200/25 rounded-full"
                  />
                </div>
              </th>
              <th>Tài khoản</th>
              <!-- <th>Giới tính</th> -->
              <th>Ngày sinh</th>
              <th>Địa chỉ</th>
              <!-- <th>Nghề nghiệp</th> -->
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="h-[60px] text-left even:bg-gray-50 hover:bg-gray-200"
              v-for="parent in dataTable"
              :key="parent.id"
            >
              <td class="w-[300px]">{{ parent.name }}</td>
              <td class="px-3 w-[400px]">
                <button
                  @click.prevent
                  v-if="parent.account == null"
                  @click="$emit('click-create-acount', parent)"
                  class="hover:bg-yellow-500/50 active:scale-95 rounded-[5px] h-[30px] w-fit px-2 content-center text-center border-yellow-300 text-[12px] border bg-yellow-200/25 text-yellow-600 cursor-default"
                >
                  Tạo tài khoản
                </button>
                <dd class="text-gray-500 text-[14px] my-[5px]" v-else>
                  <span>
                    <span class="font-bold">Tài khoản:</span>
                    {{ parent.account }}</span
                  >
                </dd>
              </td>
              <!-- <td class="w-[300px]">
                {{ parent.gender === 0 ? "Nam" : "Nữ" }}
              </td> -->
              <td class="w-[300px]">
                {{ new Date(parent.birthday).toLocaleDateString() }}
              </td>

              <td class="w-[300px]">{{ parent.address }}</td>
              <!-- <td class="w-[700px]">{{ parent.job }}</td> -->
              <td class="w-[700px]">{{ parent.email }}</td>
              <td class="w-[700px]">{{ parent.phone }}</td>
              <td class="w-[700px]">{{ getRoleString(parent.role) }}</td>
              <td class="w-[700px]">
                {{ parent.status === 1 ? "Hoạt động" : "Không hoạt động" }}
              </td>
              <td class="w-[200px]">
                <div class="flex">
                  <div
                    class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(206,44,44)] content-center"
                    @click="deleteParent(parent)"
                  >
                    <img :src="delete_icon" class="w-[14px] m-auto" />
                  </div>
                  <div
                    class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(53,61,186)] content-center"
                    @click="editParent(parent.id)"
                  >
                    <img :src="edit_icon" class="w-[14px] m-auto" />
                  </div>
                </div>
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
import axios from "axios";
import router from "@/router/router";
import delete_icon from "@/assets/icons/delete.svg";
import edit_icon from "@/assets/icons/edit.svg";
import add_icon from "@/assets/icons/pls.svg";
import sort_icon from "@/assets/icons/Sorting arrowheads.svg";

// const searchText = ref(props.searchText);
// const searchtext = defineProps({
//   searchText: String,
// });
// const parents = ref([]);
// const showOverlay = ref(false);
// const deleteConfirmation = ref(false);
// const parentToDelete = ref(null);
const emits = defineEmits(["add-toast"]);

const formatDate = (birthday) => moment(birthday).format("DD/MM/YYYY");

defineProps({
  dataTable: {
    type: Array,
    required: true,
  },
});
// const fetchParents = async () => {
//   try {
//     const response = await axios.get("http://localhost:9000/parents");
//     parents.value = response.data;
//     console.log(parents);
//   } catch (error) {
//     console.error("Error fetching parents:", error);
//   }
// };
const getRoleString = (role) => {
  switch (role) {
    case 1:
      return "Bố";
    case 2:
      return "Mẹ";
    case 3:
      return "Anh, chị";
    case 4:
      return "Ông, bà";
    case 5:
      return "Người giám hộ";
    default:
      return "Khác";
  }
};

const editParent = (parentId) => {
  router.push({ name: "ParentEditView", params: { id: parentId } });
  console.log(parentId);
};
function deleteParent(parentIdToDel) {
  emits("delete-parent", parentIdToDel);
}
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
