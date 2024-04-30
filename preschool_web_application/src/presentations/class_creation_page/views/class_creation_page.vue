<template>
    <div class="bg-gray-200/50 content-center text-[15px]">
        <form @submit.prevent class="view w-[700px] h-[700px] bg-white rounded-[15px] px-[40px] text-start relative">
            <!--Title-->
            <div class="text-[19px] flex justify-between">
                <span class="font-bold">Tạo lớp học mới</span>
                <div @click="closePage" class="h-[40px] hover:bg-red-500 hover:text-white content-center px-[12px] rounded-md absolute right-0 cursor-pointer">
                    <img class="w-[25px]" :src="close_icon" alt="">
                </div>
            </div>
            <!--Add Avatar-->
            <div class="add-avatar w-[100px] h-[100px] m-auto bg-[#D9D9D9] rounded-md relative" >
                <img v-if="avatarPath" :src="avatarPath" class="w-[100px] h-[100px] m-auto object-cover rounded-md border-2">
                <input type="file" class="absolute top-0 left-0 w-[100px] h-[100px] opacity-0" accept=".png, .jpeg, .jpg" @change="handleUploadImg" >
            </div>
            <p class="w-full text-center">Ảnh đại diện lớp</p>
            <!--Name class input-->
            <label>
                <span class="pl-4">Ten lop</span>
                <input v-model="classNameInput" type="text" placeholder="Nhap ten lop hoc" class="mb-0 h-[40px] rounded-md w-full outline-none border-2 focus:border-blue-500 px-4">
                <div class="h-[20px] valid">
                    <!-- <p v-if="messageOfStudentName" class="mb-4 text-red-300">{{ messageOfStudentName }}</p> -->
                </div>
            </label>
            <!--Class type input-->
            <div class="flex justify-between w-full gap-4">
                <label class="w-full">
                    <span class="pl-4">Levels</span>
                    <!-- <input v-model="nameClassInput" type="text" placeholder="Nhap ten lop hoc" class="mb-0 h-[40px] rounded-md w-full outline-none border-2 focus:border-blue-500 px-4" :class="{'invalid-input' : isStudentNameValid}"> -->
                    <select @change="selectLevels" class="h-[40px] rounded-md outline-none border-2 focus:border-blue-500 rounded-md w-full outline-none border-2 focus:border-blue-500 px-4">
                        <option value="level1" selected disabled>Selected</option>
                        <option value="level1">Mầm</option>
                        <option value="level2">Chồi</option>
                        <option value="level3">Lá</option>
                    </select>
                    <div class="h-[20px] valid">
                        <!-- <p v-if="messageOfStudentName" class="mb-4 text-red-300">{{ messageOfStudentName }}</p> -->
                    </div>
                </label>
                <label class="w-full">
                    <span class="pl-4">Loại chương trình</span>
                    <!-- <input v-model="nameClassInput" type="text" placeholder="Nhap ten lop hoc" class="mb-0 h-[40px] rounded-md w-full outline-none border-2 focus:border-blue-500 px-4" :class="{'invalid-input' : isStudentNameValid}"> -->
                    <select @change="selectType" class="h-[40px] rounded-md w-full outline-none border-2 focus:border-blue-500 rounded-md w-full outline-none border-2 focus:border-blue-500 px-4">
                        <option value="level1" selected disabled>Selected</option>
                        <option value="level1">Thường</option>
                        <option value="level2">Anh Ngữ</option>
                        <option value="level3">Pháp Ngữ</option>
                    </select>
                    <div class="h-[20px] valid">
                        <!-- <p v-if="messageOfStudentName" class="mb-4 text-red-300">{{ messageOfStudentName }}</p> -->
                    </div>
                </label>
            </div>
            <!--Time-->
            <div class="flex justify-between w-full gap-4">
                <label class="w-full">
                    <span class="pl-4">Ngày mở lớp</span>
                    <input v-model="dateBeginInput" type="date" class="mb-0 h-[40px] rounded-md w-full outline-none border-2 focus:border-blue-500 px-4">
                    <div class="h-[20px] valid">
                        <!-- <p v-if="messageOfStudentName" class="mb-4 text-red-300">{{ messageOfStudentName }}</p> -->
                    </div>
                </label>
                <label class="w-full">
                    <span class="pl-4">Kết thúc dự kiến</span>
                    <input v-model="dateFinishInput" type="date" class="mb-0 h-[40px] rounded-md w-full outline-none border-2 focus:border-blue-500 px-4">
                    <div class="h-[20px] valid">
                        <!-- <p v-if="messageOfStudentName" class="mb-4 text-red-300">{{ messageOfStudentName }}</p> -->
                    </div>
                </label>
            </div>

            <!--Limited member & Teacher-->
            <div class="flex justify-between w-full gap-4">
                <label class="w-full">
                    <span class="pl-4">Số lượng tối đa</span>
                    <input v-model="limitedStudent" type="number" class="mb-0 h-[40px] rounded-md w-full outline-none border-2 focus:border-blue-500 px-4">
                    <div class="h-[20px] valid">
                        <!-- <p v-if="messageOfStudentName" class="mb-4 text-red-300">{{ messageOfStudentName }}</p> -->
                    </div>
                </label>
                <label class="w-full">
                    <span class="pl-4">Giáo viên phụ trách</span>
                    <input v-model="formTeacherInput" type="text" class="mb-0 h-[40px] rounded-md w-full outline-none border-2 focus:border-blue-500 px-4">
                    <div class="h-[20px] valid">
                        <!-- <p v-if="messageOfStudentName" class="mb-4 text-red-300">{{ messageOfStudentName }}</p> -->
                    </div>
                </label>
            </div>
            <!--Button save & close-->
            <button class="absolute bottom-4 h-[45px] px-[12px] bg-green-500 text-white rounded-md left-[325px] hover:bg-green-600">
                Lưu
            </button>
        </form>
    </div>
</template>

<script setup>

    import {ref} from 'vue'
    import close_icon from '@/assets//icons//close.svg'

    const classNameInput = ref('')
    const dateBeginInput = ref(null)
    const dateFinishInput = ref(null)
    const limitedStudent = ref(0)
    const formTeacherInput = ref('')

    const avatarUpload = ref(null)
    const avatarPath = ref(null)

    const emits = defineEmits(['close'])

    const closePage = () => [
        emits('close', false)
    ]

    const selectLevels = (event) => {
        console.log(event.target.value)
    }

    const selectType = (event) => {
        console.log(event.target.value)
    }

    const handleUploadImg = (event) => {
        //Lấy hình
        avatarUpload.value = event.target.files[0]

        //Kiểm tra tồn tại
        if(!avatarUpload) return 

        //Kiểm tra size
        if(avatarUpload.value.size / 1024 > 5120) 
        {
            //Bỏ nếu quá dung lượng cho phếp
            avatarUpload.value = null
            return
        }

        //Tạo đường dẫn của ảnh
        avatarPath.value = URL.createObjectURL(avatarUpload.value)
    }

</script>

<style scoped>
    .view
    {
        animation: next 0.3s forwards linear;
        /* transition: 1s ease-in; */
    }


    @keyframes next {
        0% {
            margin: 0;
        }
        50%
        {
            margin-left: 300px;
        }
        100%
        {
            margin-left: 700px;
        }
    }
</style>