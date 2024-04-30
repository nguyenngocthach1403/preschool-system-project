<template>
    <div class="overflow-scroll h-[700px] 2xl:h-dvh"> 
        <!--Table here-->
        <table class="mb-[250px] h-fit w-full">
            <thead class="text-[17px] text-white bg-[#7BA7D7] sticky top-0">
                <tr>
                    <th class="px-7 py-3 text-left">Avatar</th>
                    <th class="px-3 text-left">Họ tên</th>
                    <th class="px-3 text-left  hidden 2xl:table-cell">Giới tính</th>
                    <th class="px-3 text-left hidden lg:table-cell">Lớp</th>
                    <th class="px-3 text-left hidden xl:table-cell">Ngày sinh</th>
                    <th class="px-3 text-left">Trạng thái</th>
                    <th class="px-3 text-left">Chức năng</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in dataTable" :key="index" class="text-[19px] h-[50px] text-left even:bg-gray-200" >
                    <td class="px-3"><div class="ml-[15px]"><img :src="item.avatar" class="w-[40px] h-[40px] rounded-[50px]"> </div></td>
                    <td class="w-dvw px-3">
                        <span>{{ item.name }}</span>
                        <dd class="lg:hidden text-gray-500 text-[15px] my-[5px]">{{ item.class }}</dd>
                        <dl class="2xl:hidden text-gray-500 text-[15px] my-[5px]">{{ convertNumToGender(item.gender) }}</dl>
                        <dd class="xl:hidden text-gray-500 text-[15px] my-[5px]">{{ item.birthday }}</dd>
                    </td>
                    <td class="hidden 2xl:table-cell px-3 w-dvw"><span>{{ convertNumToGender(item.gender) }}</span></td>
                    <td class="hidden lg:table-cell w-dvw px-3"><span>{{ item.class }}</span></td>
                    <td class="hidden xl:table-cell px-3 w-dvw"><span>{{ item.birthday }}</span></td>
                    <td class="px-3"><div class="rounded-[50px] h-[30px] text-white w-[85px] content-center text-center text-[15px]" :class="`${checkStatusToClass(item.status)}`">{{ checkStatusToContent(item.status) }}</div></td>
                    <td class="content-center px-3">
                        <div class="hidden xl:flex">
                            <div class="feature w-[50px] h-[30px] rounded-[50px] bg-[#DE2E2E] mr-[3px] hover:bg-[rgb(206,44,44)]  content-center" > <img :src="delete_icon" class="w-[17px] m-auto"></div>
                            <div class="feature w-[50px] h-[30px] rounded-[50px] bg-[#3B44D1] mr-[3px] hover:bg-[rgb(53,61,186)]  content-center"> <img :src="edit_icon" class="w-[17px] m-auto"> </div>
                            <div class="feature w-[50px] h-[30px] rounded-[50px] bg-[#53808C] mr-[3px] hover:bg-[rgb(73,114,125)]  content-center"> <img :src="chat_icon" class="w-[17px] m-auto"> </div>
                            <div class="feature w-[50px] h-[30px] rounded-[50px] bg-[#DB944B] mr-[3px] hover:bg-[rgb(198,134,68)]  content-center"> <img :src="eye_icon" class="w-[17px] m-auto"> </div>
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
    import {ref} from 'vue';

    /* Import icon for feature */
    import delete_icon from '../../../assets/icons/delete.svg'
    import edit_icon from '../../../assets/icons/edit.svg'
    import chat_icon from '../../../assets/icons/chat.svg'
    import eye_icon from '../../../assets/icons/eye.svg'
    import menu_vertical_icon from '../../../assets/icons/menu-vertical.svg'


    /* Import function */
    import convertNumToGender from '../../../utils/resources/convert_gender'


    const evenRow = ref('even-row')
    
    const checkStatusToClass = (sts) => {
        switch (sts) {
            case 0:
                return 'none-status'
            case 1:
                return 'studing-status'
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
                return 'default'
        }
    }

    defineProps({
        dataTable: 
        {
            type: Array,
            required: true
        }
        
    })
</script>

<style scoped>
    tbody > tr:hover {
        background-color: rgb(123, 167, 215, 0.6);
    }
    .none-status
    {
        background-color: #DE2E2E;

    }
    .studing-status
    {
        background-color: #1AD316;
    }
    table{
        overflow-y: scroll;
    }
</style>