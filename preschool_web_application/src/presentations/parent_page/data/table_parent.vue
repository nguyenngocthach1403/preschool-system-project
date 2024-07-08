<template>
  <div class="text-[14px]">
    <main>
      <div class="mr-[10px]">
        <table class="h-fit w-full">
          <thead
            class="sticky w-full top-0 text-[15px] bg-[#3B44D1] text-white text-white z-10"
          >
            <tr>
              <th></th>
              <th class="w-[300px]">Avatar</th>

              <th class="px-3 py-3 text-left w-dvw">
                <div class="flex">
                  Họ và tên
                  <img
                    :src="sort_icon"
                    @click="$emit('sort-parent-name')"
                    class="w-[20px] hover:bg-gray-200/25 rounded-full"
                  />
                </div>
              </th>
              <th class="w-[300px]">ID</th>
              <th class="w-[300px]">Tài khoản</th>

              <!-- <th>Địa chỉ</th> -->
              <th class="w-dvw">Liên hệ</th>
              <th class="w-[400px]">Giới tính</th>
              <th class="w-[400px]">Ngày sinh</th>
              <th class="w-[700px]">Nghề nghiệp</th>
              <!-- <th>Vai trò</th> -->
              <th>Trạng thái</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="h-[60px] w-full text-left even:bg-gray-50 hover:bg-gray-200"
              v-for="parent in dataTable"
              :key="parent.id"
              :class="{ 'empty-account': !parent.username }"
            >
              <td class="px-3 relative">
                <div
                  v-if="!parent.username"
                  class="absolute top-0 left-5 text-red-500 text-[12px]"
                >
                  new
                </div>
                <div class="inline-flex items-center">
                  <label
                    class="relative flex items-center p-3 rounded-full cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      class="before:content[''] hover:ring-2 peer relative h-4 w-4 cursor-pointer appearance-none rounded-[5px] border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-[#3B44D1] checked:border-none hover:before:opacity-10"
                      id="check"
                    />
                    <span
                      class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
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
                </div>
              </td>
              <td class="w-[300px]">
                <div class="ml-[15px]">
                  <img
                    :src="parent.avatar || avatar"
                    class="w-[40px] h-[40px] rounded-[50px] object-cover"
                  />
                </div>
              </td>

              <td class="w-dvw">
                {{ parent.name }}
                <dd>
                  <span class="text-gray-500">Vai trò: </span>
                  <span class="text-gray-600">{{
                    convertParentRole(parent.role)
                  }}</span>
                </dd>
              </td>
              <td class="w-[300px]">
                {{ parent.id }}
              </td>
              <td class="px-3 w-[500px]">
                <button
                  @click.prevent
                  v-if="parent.username == null"
                  @click="$emit('create-account-for-parent', parent)"
                  class="hover:bg-yellow-500/50 active:scale-95 rounded-[5px] h-[30px] w-fit px-2 content-center text-center border-yellow-300 text-[12px] border bg-yellow-200/25 text-yellow-600 cursor-default"
                >
                  Thêm tài khoản
                </button>
                <dd class="text-gray-500 text-[14px] my-[5px] w-[200px]" v-else>
                  <span>
                    <span class="font-bold">Tài khoản:</span>
                    {{ parent.username }}</span
                  >
                </dd>
              </td>

              <!-- <td class="w-[300px]">{{ parent.address }}</td> -->

              <td class="w-dvw text-gray-400">
                <dd>
                  <span>Email: </span>
                  <span class="text-gray-700">{{ parent.email }}</span>
                </dd>
                <dd>
                  <span>Phone: </span>
                  <span class="text-gray-700">{{ parent.phone }}</span>
                </dd>
              </td>
              <td class="w-[400px]">
                {{ parent.gender === 0 ? "Nam" : "Nữ" }}
              </td>
              <td class="w-[400px]">
                {{ new Date(parent.birthday).toLocaleDateString() }}
              </td>
              <td class="w-[700px]">{{ parent.job }}</td>
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
import avatar from "../../../assets/img/avatar.jpg";
import { convertParentRole } from "../../../utils/resources/converter";

// const searchText = ref(props.searchText);
// const searchtext = defineProps({
//   searchText: String,
// });
// const parents = ref([]);
// const showOverlay = ref(false);
// const deleteConfirmation = ref(false);
// const parentToDelete = ref(null);
const emits = defineEmits(["add-toast", "delete-parent"]);

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
.empty-account {
  background-color: rgba(59, 68, 209, 0.1);
}
</style>
