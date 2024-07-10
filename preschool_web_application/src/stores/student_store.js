import { defineStore } from "pinia";
import { ddmmyyyyDateString } from "../utils/resources/format_date";
import studentService from "../services/student.service";
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
      if (this.page != 0) this.page = 0;
    },

    formatDataStudent(dataStudent) {
      let students = [];

      for (let index = 0; index < dataStudent.length; index++) {
        const element = dataStudent[index];
        students.push({
          id: element.id,
          avatar: element.avatar,
          name: element.name,
          gender: element.gender,
          class: element.class,
          birthday: new Date(element.birthday).toLocaleDateString(),
          status: element.status,
          studyStatus: element.study_status,
          parents: element.parents,
          fork: element.fork,
          address: element.address,
          origin: element.place_of_origin,
          placeOfBirth: element.place_of_birth,
          nation: element.nation,
          created: element.created,
        });
      }
      return students;
    },

    async deleteStudentInDB(idStudentToDel) {
      this.loading = true;

      const res = await studentService.deleleStudent(idStudentToDel);

      const data = res.data;

      if (data.status == 200) {
        this.deleteStudent(idStudentToDel);
        this.loading = false;
        return true;
      }

      return false;
    },

    async createStudent(studentToCreate) {
      this.status = "creating";

      const res = await studentService.createStudent(studentToCreate);

      const data = res.data;

      console.log(res);

      if (data.status != 200) {
        this.status = "create_failed";
        return {
          success: false,
          message: data.error,
        };
      }

      this.status = "created";

      return {
        success: true,
      };
    },

    async updateStudent(idStudent, dataToUpdate) {
      this.status = "updating";

      const response = await studentService.updateStudent(
        idStudent,
        dataToUpdate
      );

      console.log("aa", response);

      if (response.status === 500) {
        this.status = "update_failed";
        return {
          success: false,
          message: response.data.error,
        };
      }

      this.getStudent();
      return {
        success: true,
        message: response.data.message,
      };
    },

    async searchStudent(searchText) {
      this.loading = true;
      this.status = "loading";

      if (searchText !== this.txtSearch) {
        console.log("Reset page 0");
        this.resetPage();
      }

      const res = await studentService.search(
        searchText,
        this.page,
        this.limit
      );

      const data = res.data;

      if (data.status == 404) {
        console.log(data.message);
        this.students = [];
        this.total = 0;
        this.loading = false;
        this.status = "search_failed";
        return;
      }
      console.log(data.total);
      this.total = data.total;

      const studentResponse = data.data;

      const studentFormated = this.formatDataStudent(studentResponse);

      this.students = studentFormated;

      this.loading = false;
      this.status = "loaded";
    },

    async getTotalStudent() {
      const res = await studentService.countStudent();

      const numStudent = res.data;

      this.total = numStudent.data;
    },

    async getStudent() {
      try {
        this.loading = true;

        this.status = "loading";

        const response = await studentService.getStudent(this.page, this.limit);

        console.log(response);

        const responseData = response.data;

        const studentsResponse = responseData.data;

        this.students = this.formatDataStudent(studentsResponse);
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
        this.status = "loaded";
      }
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

    async changePage(page) {
      if (this.page === page) return;

      this.page = page;
      if (this.txtSearch != "") {
        console.log("Has search");
        this.searchStudent(this.txtSearch);
      } else {
        console.log("No search");
        this.getStudent();
      }
    },

    async changeLimit(limit) {
      if (this.limit === limit) return;

      this.limit = limit;
      if (this.txtSearch != "") {
        this.searchStudent(this.txtSearch);
      } else {
        this.getStudent();
      }
    },
  },
});
