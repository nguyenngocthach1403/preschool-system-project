<template>
  <div class="dashboard text-[14px]">
    <main>
      <!-- <div class="feature flex-container"> -->
      <!-- <div class="search-bar">
            <i class="pi pi-search"></i>
            <input type="text" v-model="searchQuery" placeholder="Tìm kiếm" />
          </div> -->
      <!-- <div class="total-student">
          <span class="total-label">Tổng cộng:</span>
          <span class="total-count">{{ totalStudents }}</span>
        </div> -->
      <!-- <router-link to="/parents/create">
          <div class="add-button">
            <button>
              <img :src="add_icon" class="w-[30px] m-auto" />
            </button>
          </div>
        </router-link> -->
      <!-- </div> -->
      <!-- <div class="container">
        <button @click="filterAll">Tất cả</button>
        <button @click="filterAZ">A-Z</button>
        <button @click="filterZA">Z-A</button>
      </div> -->
      <div class="overflow-scroll h-dvh">
        <table class="table h-dvh">
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
              <th>Lớp</th>
              <th>Ngày sinh</th>
              <th>Địa chỉ</th>
              <th>Nghề nghiệp</th>
              <th>Số điện thoại</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="h-[60px] text-left even:bg-gray-50 hover:bg-gray-200"
              v-for="parent in parents"
              :key="parent.id"
            >
              <td class="w-dvw">{{}}</td>
              <!-- <td class="w-dvw text-[#3B44D1]">{{ student.fullName }}</td> -->
              <!-- <td class="w-[300px]">{{ parent.id}}</td> -->
              <td class="w-[300px]">{{ parent.name }}</td>
              <td class="w-[300px]">{{ parent.gender }}</td>
              <td class="w-[300px]">{{ parent.birthday }}</td>
              <td class="w-[300px]">{{ parent.address }}</td>
              <td class="w-[700px]">{{ parent.job }}</td>
              <td class="w-[700px]">{{ parent.email }}</td>
              <td class="w-[700px]">{{ parent.phone }}</td>
              <td class="w-[700px]">{{ parent.role }}</td>
              <td class="w-[200px]">
                <!-- <div class="button-container">
                  <button class="delete-button">
                    <img :src="delete_icon" alt="" />
                  </button>
                  <button class="edit-button">
                    <img :src="edit_icon" alt="" />
                  </button>
                </div> -->
                <div class="flex">
                  <div
                    class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(206,44,44)] content-center"
                    @click="deleteStudent(item)"
                  >
                    <img :src="delete_icon" class="w-[14px] m-auto" />
                  </div>
                  <div
                    class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(53,61,186)] content-center"
                    @click="editStudent(item)"
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

<script>
import { ref, computed } from "vue";
import axios from "axios";
import delete_icon from "@/assets/icons/delete.svg";
import edit_icon from "@/assets/icons/edit.svg";
import add_icon from "@/assets/icons/pls.svg";
import AddParent from "@/presentations/parent_page/views/parent_create_page.vue";
import sort_icon from "@/assets/icons/Sorting arrowheads.svg";
export default {
  setup() {
    const parents = ref([]);
    const newParent = ref({
      fullname: "",
      gender: "",
      birthday: "",
      address: "",
      job: "",
      email: "",
      phone: "",
      role: "",
      account_id: "",
      status: 1,
    });
    const searchQuery = ref("");
    const sortCriteria = ref("all");

    const filterAll = () => {
      sortCriteria.value = "all";
    };

    const filterAZ = () => {
      sortCriteria.value = "AZ";
    };

    const filterZA = () => {
      sortCriteria.value = "ZA";
    };

    const filteredParents = computed(() => {
      const filteredParents = students.value.filter((student) => {
        return student.fullName
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
      });

      if (sortCriteria.value === "AZ") {
        return filteredParents.sort((a, b) => {
          return a.fullName.localeCompare(b.fullName);
        });
      } else if (sortCriteria.value === "ZA") {
        return filteredParents.sort((a, b) => {
          return b.fullName.localeCompare(a.fullName);
        });
      }
      return filteredParents;
    });
    const fetchParents = async () => {
      try {
        const response = await axios.get("http://localhost:9000/parents");
        parents.value = response.data;
      } catch (error) {
        console.error("Error fetching parents:", error);
      }
    };

    return {
      parents,
      newParent,
      searchQuery,
      sortCriteria,
      filterAll,
      filterAZ,
      filterZA,
      filteredParents,
      delete_icon,
      edit_icon,
      add_icon,
      AddParent,
      sort_icon,
      fetchParents,
    };
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  justify-content: start;
}

.flex-container {
  display: flex;
  justify-content: start;
  width: 100%;
  padding: 10px;
}

.search-bar {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  height: 50px;
}

.search-bar i {
  padding-left: 5px;
  margin-right: 10px;
}

.search-bar input {
  padding: 5px;
  border: none;
  outline: none;
}

.total-student {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: #000000;
  padding: 10px 20px;
  border: 1px solid #ccc;
  width: 200px;
  height: 50px;
  border-radius: 10px;
}

.total-label {
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
}

.total-count {
  font-size: 16x;
  color: #000000;
  padding: 5px 7px;
  border-radius: 3px;
}

.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  height: 50px;
  width: 60px;
  border-radius: 5px;
  cursor: pointer;
}

.container {
  display: flex;
  justify-content: space-evenly;
  width: 400px;
  padding: 10px;
}

.container button {
  font-size: 20px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  width: 100px;
}

.container button:hover {
  background-color: #53808c;
}

table {
  /* width: 100%;
  height: 100vh; */
  /* margin-bottom: 250px; */
  margin: 0 auto;
  /* border-collapse: collapse; */
}

/* .overflow-scroll {
  max-height: 700px;
  overflow-y: auto;
} */
th,
td {
  padding: 8px;
  border: 0px solid #ffffff;
  text-align: left;
}

th {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* .table tr:nth-child(even) {
  background-color: #f2f2f2;
} */
.button-container {
  display: flex;
  width: 120px;
  justify-content: space-between;
  align-items: center;
}

.button-container button {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-container img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

/* .delete-button {
  background-color: #ff0000;
}

.edit-button {
  background-color: #007bff;
} */
</style>
