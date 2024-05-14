import { defineStore } from "pinia";
import { ddmmyyyyDateString } from "../utils/resources/format_date";
import StudentService from "../services/student.service";
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

      const res = await StudentService.createStudent(studentToCreate);

      const data = res.data;

      if (data.status != 200) {
        this.status = "create_failed";
        return data.message;
      }

      this.status = "created";

      return studentToCreate.name;
    },

    async storeImage(image) {
      this.status = "creating";
      const formData = new FormData();
      formData.append("upload_preset", "preschool");
      formData.append("file", image);
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/diaia9ndd/image/upload",
          formData
        );
        console.log(res);
        if (res.status == 200) {
          return res.data;
        } else {
          return;
        }
      } catch (error) {
        return error;
      }
    },

    async searchStudent(searchText) {
      this.loading = true;
      this.status = "searching";

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
      this.status = "searched";
    },

    async getTotalStudent() {
      const res = await studentService.countStudent();

      const numStudent = res.data;

      this.total = numStudent.data;
    },

    async getStudent() {
      this.loading = true;

      this.status = "loading";

      // await this.getTotalStudent();

      // if (this.total == 0) {
      //   this.status = "load_failed";
      //   return;
      // }

      const res = await studentService.getStudent(this.page, this.limit);
      const dataRes = res.data;

      console.log(dataRes);

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

    async changePage(newVal) {
      this.page = newVal;
      if (this.txtSearch != "") {
        console.log("Has search");
        this.searchStudent(this.txtSearch);
      } else {
        console.log("No search");
        this.getStudent();
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
