import { defineStore } from "pinia";

export const useStudentStore = defineStore('studentStore' , {
    state: () => ({
        students: [
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :0},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :1},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :0},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :1},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :0},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :1},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :0},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :1},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Quoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
            {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Van A', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
        ]
    }),
    // actions: {
    //     async getStudent() {
    //         // const res = await 
    //     }
    // }
})