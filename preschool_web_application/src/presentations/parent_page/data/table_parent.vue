<template>
    <div class="dashboard">
      <main>
        <div class="feature flex-container">
          <div class="search-bar">
            <i class="pi pi-search"></i>
            <input type="text" v-model="searchQuery" placeholder="Tìm kiếm" />
          </div>
          <div class="total-student">
            <span class="total-label">Tổng cộng:</span>
            <span class="total-count">{{ totalStudents }}</span>
          </div>
         <router-link to="/parents/create">
          <div class="add-button">
          <button>
            <img :src="add_icon" class="w-[30px] m-auto">
          </button>
        </div> 
         </router-link>
        </div>
        <div class="container">
          <button @click="filterAll">Tất cả</button>
          <button @click="filterAZ">A-Z</button>
          <button @click="filterZA">Z-A</button>
        </div>
        <div class="overflow-scroll" v-scrollbar="true">
        <table class="table" >
          <thead class="sticky top-0">
            <tr>
              <th>Họ tên</th>
              <th>Giới tính</th>
              <th>Lớp</th>
              <th>Birthday</th>
              <th>Trạng thái</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in filteredStudents" :key="student.id">
              <td>{{ student.fullName }}</td>
              <td>{{ student.gender }}</td>
              <td>{{ student.grade }}</td>
              <td>{{ student.birthday }}</td>
              <td>{{ student.status }}</td>
              <td>
                <div class="button-container">
                  <button class="delete-button">
                    <img :src="delete_icon" alt="" />
                  </button>
                  <button class="edit-button">
                    <img :src="edit_icon" alt="" />
                  </button>
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
  import 'primeicons/primeicons.css'
  import delete_icon from '@/assets/icons/delete.svg'
  import edit_icon from '@/assets/icons/edit.svg'
  import add_icon from '@/assets/icons/pls.svg'
  import AddParent from '@/presentations/parent_page/views/parent_create_page.vue'
  export default {
    data() {
      return {
        students: [
          {
            id: 1,
            fullName: 'Nguyễn Văn A',
            gender: 'Nam',
            grade: '10A',
            birthday: '2000-01-01',
            status: 'Hoạt động'
          },
          {
            id: 2,
            fullName: 'Trần Thị B',
            gender: 'Nữ',
            grade: '10B',
            birthday: '2001-02-02',
            status: 'Khóa'
          },
          {
            id: 3,
            fullName: 'Lê Văn C',
            gender: 'Nam',
            grade: '11C',
            birthday: '2002-03-03',
            status: 'Hoạt động'
          },
          {
            id: 4,
            fullName: 'Lê Văn D',
            gender: 'Nam',
            grade: '11C',
            birthday: '2002-03-03',
            status: 'Hoạt động'
          },
          {
            id: 5,
            fullName: 'Lê Văn D',
            gender: 'Nam',
            grade: '11C',
            birthday: '2002-03-03',
            status: 'Hoạt động'
          },
          {
            id: 6,
            fullName: 'Lê Văn D',
            gender: 'Nam',
            grade: '11C',
            birthday: '2002-03-03',
            status: 'Hoạt động'
          },{
            id: 7,
            fullName: 'Lê Văn D',
            gender: 'Nam',
            grade: '11C',
            birthday: '2002-03-03',
            status: 'Hoạt động'
          },
          {
            id: 8,
            fullName: 'Lê Văn D',
            gender: 'Nam',
            grade: '11C',
            birthday: '2002-03-03',
            status: 'Hoạt động'
          },
          {
            id: 9,
            fullName: 'Lê Văn D',
            gender: 'Nam',
            grade: '11C',
            birthday: '2002-03-03',
            status: 'Hoạt động'
          },
          {
            id: 10,
            fullName: 'Lê Văn D',
            gender: 'Nam',
            grade: '11C',
            birthday: '2002-03-03',
            status: 'Hoạt động'
          },
          {
            id: 11,
            fullName: 'Lê Văn D',
            gender: 'Nam',
            grade: '11C',
            birthday: '2002-03-03',
            status: 'Hoạt động'
          },{
            id: 12,
            fullName: 'Lê Văn D',
            gender: 'Nam',
            grade: '11C',
            birthday: '2002-03-03',
            status: 'Hoạt động'
          },
          {
            id: 13,
            fullName: 'Lê Văn D',
            gender: 'Nam',
            grade: '11C',
            birthday: '2002-03-03',
            status: 'Hoạt động'
          },
          {
            id: 14,
            fullName: 'Lê Văn 4',
            gender: 'Nam',
            grade: '11C',
            birthday: '2002-03-03',
            status: 'Hoạt động'
          },
        ],
        searchQuery: '',
        sortCriteria: 'all',
        delete_icon: delete_icon,
        edit_icon: edit_icon,
        add_icon: add_icon,
        AddParent: AddParent,
      }
    },
    methods: {
      filterAll() {
        this.sortCriteria = 'all'
      },
      filterAZ() {
        this.sortCriteria = 'AZ'
      },
      filterZA() {
        this.sortCriteria = 'ZA'
      }
    },
    computed: {
      filteredStudents() {
        const filteredStudents = this.students.filter((student) => {
          return student.fullName.toLowerCase().includes(this.searchQuery.toLowerCase())
        })
  
        if (this.sortCriteria === 'AZ') {
          filteredStudents.sort((a, b) => {
            return a.fullName.localeCompare(b.fullName)
          })
        } else if (this.sortCriteria === 'ZA') {
          filteredStudents.sort((a, b) => {
            return b.fullName.localeCompare(a.fullName)
          })
        }
  
        return filteredStudents
      },
      totalStudents() {
        return this.students.length
      },
    }
  }
  </script>
  
<style scoped>
.dashboard{
  font-size: 17px;
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
  width: 100%;
  height: 100vh;
  margin-bottom: 250px;
  border-collapse: collapse;
}

.overflow-scroll {
  max-height: 700px; 
  overflow-y: auto;
}
th,
td {
  padding: 8px;
  border: 0px solid #ffffff;
  text-align: left;
}

th {
  color: #ffffff;
  background-color: #53808c;
}

.table tr:nth-child(even) {
  background-color: #f2f2f2;
}
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

.delete-button {
  background-color: #ff0000; 
}

.edit-button {
  background-color: #007bff; 
}
</style>
