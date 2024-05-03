import { defineStore } from "pinia";
import { ddmmyyyyDateString } from "../utils/resources/format_date";

export const useStudentStore = defineStore('studentStore' , {
    state: () => ({
        students: [
            {'id':  1,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :0},
            {'id':  2,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :1},
            {'id':  3,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'id':  4,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'id':  5,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'id':  6,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :0},
            {'id':  20,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :1},
            {'id':  7,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'id':  8,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'id':  9,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'id':  10,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :0},
            {'id':  12,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'id':  13,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen d d', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'id':  14,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'id':  15,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen a a', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :0},
            {'id':  16,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :1},
            {'id':  17,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'id':  18,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Quoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'id':  19,'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Van A', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
        ],
    }),
    actions: {
        addStudent(studentToAdd)
        {
            //Add to student to Db 

            //Add new student
            this.students.push(studentToAdd)
        },
        deleteStudent(idStudentToDel)
        {
            for (let index = 0; index < this.students.length; index++) {
                if(this.students[index]['id'] == idStudentToDel)
                {
                    this.students.splice(index, 1)
                    return
                }  
            }
        },
        updateStudent(studentToUpdate)   
        { 
            console.log(studentToUpdate)
            for (let index = 0; index < this.students.length; index++) {
                if(this.students[index]['id'] == studentToUpdate.id)
                {
                    this.students[index].name = studentToUpdate.name
                    this.students[index].class = studentToUpdate.class
                    this.students[index].gender = Number.parseInt(studentToUpdate.gender)
                    this.students[index].birthday = ddmmyyyyDateString(studentToUpdate.birthday)

                }
            }
        } 
    }
})