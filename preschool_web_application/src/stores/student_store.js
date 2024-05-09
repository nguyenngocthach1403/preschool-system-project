import { defineStore } from "pinia";
import { ddmmyyyyDateString } from "../utils/resources/format_date";
import axios from "axios";

export const useStudentStore = defineStore("studentStore", {
  state: () => ({
    students: [],
    studentState: {},
  }),
  actions: {
    async getStudent() {
      this.loading = true;
      const res = await fetch("http://localhost:9000/students");
      const dataRes = await res.json();
      const data = dataRes.data;

      let students = [];

      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        students.push({
          id: element.id,
          avatar: element.avatarPath,
          name: element.name,
          gender: element.gender,
          class: element.className,
          birthday: element.birthday,
          status: element.studentStatus,
        });
      }

      console.log(students);

      this.students = students;

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
  },
});
