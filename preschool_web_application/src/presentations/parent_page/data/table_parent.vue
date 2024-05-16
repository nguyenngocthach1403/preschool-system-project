<template>
  <div class="dashboard text-[14px]">
    <main>
      <div class="overflow-scroll h-dvh">
        <table class="table">
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
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>Địa chỉ</th>
              <th>Nghề nghiệp</th>
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
              v-for="parent in filteredParents"
              :key="parent.id"
            >
              <td class="w-[300px]">{{ parent.name }}</td>
              <td class="w-[300px]">
                {{ parent.gender === 0 ? "Nam" : "Nữ" }}
              </td>
              <td class="w-[300px]">{{ formatDate(parent.birthday) }}</td>
              <td class="w-[300px]">{{ parent.address }}</td>
              <td class="w-[700px]">{{ parent.job }}</td>
              <td class="w-[700px]">{{ parent.email }}</td>
              <td class="w-[700px]">{{ parent.phone }}</td>
              <td class="w-[700px]">{{ parent.role }}</td>
              <td class="w-[700px]">
                {{ parent.status === 1 ? "Hoạt động" : "Không hoạt động" }}
              </td>
              <td class="w-[200px]">
                <div class="flex">
                  <div
                    class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(206,44,44)] content-center"
                    @click="showConfirmation(parent)"
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
  <Toast v-if="showToast" :toastItemData="toastData" @closeToast="closeToast" />
  <div v-if="showOverlay" class="overlay"></div>
  <div v-if="deleteConfirmation" class="delete-confirmation">
    <p>Bạn có chắc chắn muốn xoá?</p>
    <button class="confirm" @click="confirmDelete(parentToDelete)">
      Xác nhận
    </button>
    <button class="cancel" @click="cancelDelete">Hủy</button>
  </div>
</template>

<script>
import { ref, onMounted, computed, defineEmits } from "vue";
import router from "@/router/router";
import moment from "moment";
import axios from "axios";
import delete_icon from "@/assets/icons/delete.svg";
import edit_icon from "@/assets/icons/edit.svg";
import add_icon from "@/assets/icons/pls.svg";
import AddParent from "@/presentations/parent_page/views/parent_create_page.vue";
import sort_icon from "@/assets/icons/Sorting arrowheads.svg";
export default {
  props: {
    searchText: String,
  },
  setup(props) {
    const parents = ref([]);
    const showOverlay = ref(false);
    const deleteConfirmation = ref(false);
    const parentToDelete = ref(null);
    const emits = defineEmits(["add-toast"]);
    const fetchParents = async () => {
      try {
        const response = await axios.get("http://localhost:9000/parents");
        parents.value = response.data;
        // console.log(parents);
      } catch (error) {
        console.error("Error fetching parents:", error);
      }
    };
    const formatDate = (birthday) => {
      const formattedDate = moment(birthday).format("DD/MM/YYYY");
      return formattedDate;
    };

    const filteredParents = computed(() => {
      if (props.searchText == "") {
        return parents.value.data;
      } else {
        const searchTextLowerCase = props.searchText.toLowerCase();
        console.log(props);
        console.log(parents.value);
        return parents.value.data.filter((parent) =>
          parent.name.toLowerCase().includes(searchTextLowerCase)
        );
      }
    });

    const editParent = (parentId) => {
      router.push({ name: "ParentEditView", params: { id: parentId } });
    };

    const showConfirmation = (parent) => {
      console.log("a");
      showOverlay.value = true;
      deleteConfirmation.value = true;
      parentToDelete.value = parent;
    };
    const confirmDelete = async (parent) => {
      try {
        const parentId = parent.id;
        await axios.delete(`http://localhost:9000/parents/${parentId}`);
        emits("add-toast", {
          title: "Detele Successfully!",
          content: "Delete " + parent.name + " student",
          type: 0,
        });
        cancelDelete();
      } catch (error) {
        console.error("Error deleting parent:", error);
      }
    };
    const cancelDelete = () => {
      showOverlay.value = false;
      deleteConfirmation.value = false;
    };
    // watch(
    //   () => searchText,
    //   (newValue, oldValue) => {
    //     searchText.value = newValue;
    //     fetchParents();
    //   }
    // );

    onMounted(() => {
      fetchParents();
    });

    return {
      parents,
      delete_icon,
      edit_icon,
      add_icon,
      AddParent,
      filteredParents,
      editParent,
      sort_icon,
      router,
      formatDate,
      deleteConfirmation,
      parentToDelete,
      showConfirmation,
      confirmDelete,
      cancelDelete,
      showOverlay,
    };
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  justify-content: start;
}

th,
td {
  padding: 5px;
  border: 0px solid #ffffff;
  text-align: left;
}

th {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.delete-confirmation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  z-index: 1000;
}

.delete-confirmation p {
  margin-bottom: 20px;
}

.delete-confirmation button {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-confirmation button:focus {
  outline: none;
}

.delete-confirmation button.confirm {
  background-color: #dc3545;
  color: #fff;
}

.delete-confirmation button.cancel {
  background-color: #6c757d;
  color: #fff;
}
</style>
