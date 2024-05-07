<template>
    <div class="overflow-scroll h-[700px] 2xl:h-dvh mr-[10px]"> 
        <!--Table here-->
        <table class="mb-[250px] h-fit w-full">
            <thead class="text-[15px] text-white bg-[#3B44D1] sticky top-0 z-10">
                <tr>
                    <th class="px-3 py-3 text-left"></th>
                    <th class="px-7 py-3 text-left">Avatar</th>
                    <th class="px-3 text-left">
                        <div class="flex">
                            Họ và tên <img :src="sort_icon" @click="$emit('sort-student-name')" class="w-[20px] hover:bg-gray-200/25 rounded-full">
                        </div>
                    </th>
                    <th class="px-3 text-left">
                        <div class="flex">
                            ID <img :src="sort_icon" @click="$emit('sort-student-id')" class="w-[20px] hover:bg-gray-200/25 rounded-full">
                        </div>
                    </th>
                    <th class="px-3 text-left  hidden 2xl:table-cell">Giới tính</th>
                    <th class="px-3 text-left hidden lg:table-cell">
                        <div class="flex">
                            Lớp <img :src="sort_icon" @click="$emit('sort-student-class')" class="w-[20px] hover:bg-gray-200/25 rounded-full">
                        </div>
                    </th>
                    <th class="px-3 text-left hidden xl:table-cell">Ngày sinh</th>
                    <th class="px-3 text-left">Trạng thái</th>
                    <th class="px-3 text-left">Chức năng</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in dataTable" :key="item.id" class="text-[14px] h-[60px] text-left even:bg-gray-50">
                    <td class="px-3">
                        <div class="inline-flex items-center">
                            <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                                <input type="checkbox" class="before:content[''] hover:ring-2 peer relative h-4 w-4 cursor-pointer appearance-none rounded-[5px] border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-[#3B44D1] checked:border-none hover:before:opacity-10" id="check" />
                                <span
                                class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                    stroke="currentColor" stroke-width="1">
                                    <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                                </svg>
                                </span>
                            </label>
                        </div>
                    </td>
                    <td class="px-3"><div class="ml-[15px]"><img :src="item.avatar" class="w-[40px] h-[40px] rounded-[50px] object-cover"> </div></td>
                    <td class="w-dvw px-3">
                        <span>{{ item.name }}</span>
                        <!-- <dd class="text-[#3B44D1] text-[14px] my-[5px]">HS12121222</dd> -->
                        <dd class="lg:hidden text-gray-500 text-[14px] my-[5px]">{{ item.class }}</dd>
                        <dl class="2xl:hidden text-gray-500 text-[14px] my-[5px]">{{ convertNumToGender(item.gender) }}</dl>
                        <dd class="xl:hidden text-gray-500 text-[14px] my-[5px]">{{ item.birthday }}</dd>   
                    </td>
                    <td class="hidden 2xl:table-cell px-3 w-[600px] text-blue-900"><span>{{ item.id }}</span></td>
                    <td class="hidden 2xl:table-cell px-3 w-[600px]"><span>{{ convertNumToGender(item.gender) }}</span></td>
                    <td class="hidden lg:table-cell w-[1000px] px-3"><span>{{ item.class }}</span></td>
                    <td class="hidden xl:table-cell px-3 w-dvw"><span>{{ new Date(item.birthday).toDateString() }}</span></td>
                    <td class="px-3"><div class="rounded-[5px] h-[30px] text-white w-[70px] content-center text-center text-[12px]" :class="`${checkStatusToClass(item.status)}`">{{ checkStatusToContent(item.status) }}</div></td>
                    <td class="content-center px-3">
                        <div class="hidden xl:flex">
                            <!-- <div class="feature w-[35px] h-[30px] rounded-[50px] bg-[#DE2E2E] mr-[3px] hover:bg-[rgb(206,44,44)]  content-center" @click="deleteStudent(item)" > <img :src="delete_icon" class="w-[14px] m-auto"></div>
                            <div class="feature w-[35px] h-[30px] rounded-[50px] bg-[#3B44D1] mr-[3px] hover:bg-[rgb(53,61,186)]  content-center" @click="editStudent(item)"> <img :src="edit_icon" class="w-[14px] m-auto"> </div>
                            <div class="feature w-[35px] h-[30px] rounded-[50px] bg-[#53808C] mr-[3px] hover:bg-[rgb(73,114,125)]  content-center"> <img :src="chat_icon" class="w-[14px] m-auto"> </div>
                            <div class="feature w-[35px] h-[30px] rounded-[50px] bg-[#DB944B] mr-[3px] hover:bg-[rgb(198,134,68)]  content-center"> <img :src="eye_icon" class="w-[14px] m-auto"> </div>
                             -->
                            <div class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-300 mr-[3px] hover:bg-[rgb(206,44,44)]  content-center" @click="deleteStudent(item)" > <img :src="delete_icon" class="w-[14px] m-auto"></div>
                            <div class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-300 mr-[3px] hover:bg-[rgb(53,61,186)]  content-center" @click="editStudent(item)"> <img :src="edit_icon" class="w-[14px] m-auto"> </div>
                            <div class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-300 mr-[3px] hover:bg-[rgb(73,114,125)]  content-center"> <img :src="chat_icon" class="w-[14px] m-auto"> </div>
                            <div class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-300 mr-[3px] hover:bg-[rgb(198,134,68)]  content-center"> <img :src="eye_icon" class="w-[14px] m-auto"> </div>
                        </div>
                        <div class="xl:hidden hover:bg-gray-400 w-[30px] rounded-[5px] active:scale-95"><img :src="menu_vertical_icon" class="w-[30px] m-auto"></div>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
    /* Import module here */
    import {ref, watch, computed} from 'vue';

    /* Import icon for feature */
    import delete_icon from '../../../assets/icons/delete.svg'
    import edit_icon from '../../../assets/icons/edit.svg'
    import chat_icon from '../../../assets/icons/chat.svg'
    import eye_icon from '../../../assets/icons/eye.svg'
    import menu_vertical_icon from '../../../assets/icons/menu-vertical.svg'
    import sort_icon from '../../../assets/icons/Sorting arrowheads.svg'


    /* Import function */
    import convertNumToGender from '../../../utils/resources/convert_gender'
    
    const checkStatusToClass = (sts) => {
        switch (sts) {
            case 0:
                return 'none-status'
            case 1:
                return 'studing-status'
            case 2: 
                return 'save-status'
            default:
                return '#FFFFFF'
        }
    }   

    const checkStatusToContent = (sts) => {
        switch (sts) {
            case 1:
                return 'Đang học'
            case 2:
                return 'Bảo lưu'
            default:
                return 'Chưa rõ'
        }
    }

    defineProps({
        dataTable: 
        {
            type: Array,
            required: true
        }
        
    })

    const emits = defineEmits(['delete-student', 'edit-student'])

    const deleteStudent= (studentIdToDel) => {
        emits('delete-student', studentIdToDel)
    }

    const editStudent = (student) => {
        emits('edit-student', student)
    }
</script>

<style scoped>
    tbody > tr:hover {
        background-color: #b7d3ff;
    }
    .none-status
    {
        background-color: gray;

    }
    .save-status{
        background-color: #DB944B;
    }
    .studing-status
    {
        background-color: #1AD316;
    }
    table{
        overflow-y: scroll;
    }
</style>