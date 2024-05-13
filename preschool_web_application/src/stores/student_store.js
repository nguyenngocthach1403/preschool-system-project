import { defineStore } from "pinia";
import { ddmmyyyyDateString } from "../utils/resources/format_date";
import axios from "axios";

export const useStudentStore = defineStore("studentStore", {
  state: () => ({
    students: [],
    page: 0,
    limit: 10,
    loading: false,
    total: 0,
    txtSearch: "",
    status: "initial",
  }),
  actions: {
    resetPage() {
      if (this.page !== 0) this.page = 0;
    },

    formatDataStudent(dataStudent) {
      let students = [];

      for (let index = 0; index < dataStudent.length; index++) {
        const element = dataStudent[index];
        students.push({
          id: element.id,
          avatar: element.avatarPath,
          name: element.name,
          gender: element.gender,
          class: element.className,
          birthday: new Date(element.birthday).toLocaleDateString(),
          status: element.status,
        });
      }
      return students;
    },

    async deleteStudentInDB(idStudentToDel) {
      this.loading = true;

      const query = `http://localhost:9000/students/delete?id=${idStudentToDel}`;
      // const query = `http://localhost:9000/students/delete?id=1`;

      const res = await fetch(query);

      const data = await res.json();

      if (data.status == 200) {
        this.deleteStudent(idStudentToDel);
        this.loading = false;
        return true;
      }

      return false;
    },

    async createStudent(studentToCreate) {
      this.status = "creating";

      const query = `http://localhost:9000/students/create`;
      const res = await axios.post(query, studentToCreate);

      const data = res.data;

      if (data.status != 200) {
        this.status = "create_failed";
        return data.message;
      }

      this.status = "created";

      return studentToCreate.name;
    },

    async searchStudent(searchText) {
      this.loading = true;
      this.status = "searching";

      this.resetPage();

      const query = `http://localhost:9000/students/search?text=${searchText}&page=${this.page}&limit=${this.limit}`;

      const res = await fetch(query);

      const data = await res.json();

      if (data.status == 404) {
        console.log(data.message);
        this.students = [];
        this.total = 0;
        this.loading = false;
        this.status = "search_failed";
        return;
      }

      this.total = data.total;

      const studentResponse = data.data;

      const studentFormated = this.formatDataStudent(studentResponse);

      this.students = studentFormated;

      this.loading = false;
      this.status = "searhed";
    },

    async getTotalStudent() {
      //Querry
      const query = `http://localhost:9000/students/total`;

      const res = await fetch(query);

      const numStudent = await res.json();

      this.total = numStudent.data;
    },

    async getStudent() {
      this.loading = true;
      this.status = "loading";

      await this.getTotalStudent();

      if (this.total == 0) {
        this.status = "load_failed";
        return;
      }

      const query = `http://localhost:9000/students?page=${this.page}&limit=${this.limit}`;
      const res = await fetch(query);
      const dataRes = await res.json();
      const data = dataRes.data;

      if (data.status === 404) {
        this.status = "load_failed";
        return;
      }

      const studentFormated = this.formatDataStudent(data);

      console.log(studentFormated);

      this.students = studentFormated;

      this.status = "loaded";

      this.loading = false;
    },

    addStudent(studentToAdd) {
      //Add to student to Db

      //Add new student
      this.students.push(studentToAdd);
    },
    deleteStudent(idStudentToDel) {
      for (let index = 0; index < this.students.length; index++) {
        if (this.students[index]["id"] == idStudentToDel) {
          this.students.splice(index, 1);
          return;
        }
      }
    },

    updateStudent(studentToUpdate) {
      console.log(studentToUpdate);
      for (let index = 0; index < this.students.length; index++) {
        if (this.students[index]["id"] == studentToUpdate.id) {
          this.students[index].name = studentToUpdate.name;
          this.students[index].class = studentToUpdate.class;
          this.students[index].gender = Number.parseInt(studentToUpdate.gender);
          this.students[index].birthday = ddmmyyyyDateString(
            studentToUpdate.birthday
          );
        }
      }
    },
    async changeLimit(newVal) {
      this.limit = newVal;
      if (this.txtSearch != "") {
        this.searchStudent(this.txtSearch);
      } else {
        this.getStudent();
      }
    },
  },
});
