<template>
    <div>
        <!--Previous-->
        <!-- <div class="previous-page col-start-1 col-end-4 h-[40px] my-[10px] px-[20px] row-span-1"> 
            <button class="h-full w-[40px] px-[8px] border-2 rounded-[10px] shadow-lg content-center active:bg-gray-100"><img :src="arrow_back_icon" class="w-[25px] m-auto"></button>
        </div> -->

        <!--Body-->

        <!--Form Personal Information-->
        <form class="w-full bg-white h-full rounded-15 grid grid-cols-3 overflow-scroll" action="submit">
            <div id="personal_info" class="px-[50px]">
                <div class="title w-[200px] px-2 my-[20px] h-[25px] bg-[#49727D] text-white rounded-[5px] ">Thông tin cá nhân</div>
                <!-- Add avatar-->
                <div class="add-avatar w-[100px] h-[100px] m-auto bg-[#D9D9D9] rounded-md relative" >
                    <img v-if="avatar_path" :src="avatar_path" class="w-[100px] h-[100px] m-auto object-cover rounded-md border-2">
                    <input type="file" class="absolute top-0 left-0 w-[100px] h-[100px] opacity-0" @change="handleUploadImg" >
                </div>
                <!--Name-->
                <label>
                    <span class="pl-4">Họ và tên</span>
                    <input type="text" placeholder="Họ và tên" class="mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>

                <!--Birthdy & Gender-->
                <div class="flex">
                    <label class="mr-2">
                        <span class="pl-4">Ngày sinh</span>
                        <input type="date" placeholder="Ho va ten" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                    </label>
                    <label class="ml-2">
                        <span class="pl-4">Giới tính</span>
                        <!-- <input type="text" placeholder="Ho va ten" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4"> -->
                        <select name="" id="" class="mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                            <option value="selection" disabled selected>Select</option>
                        </select>
                    </label>
                </div>
                <!--Dan toc-->
                <label>
                    <span class="pl-4">Dân tộc</span>
                    <input type="text" placeholder="Dân tộc" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>

                <!--Quoc tich-->
                <label>
                    <span class="pl-4">Quốc tịch</span>
                    <input type="text" placeholder="Việt Nam" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>

                <!--Ton giao-->
                <label>
                    <span class="pl-4">Tôn giáo</span>
                    <!-- <input type="text" placeholder="Kinh" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-300 px-4"> -->
                    <select name="" id="" class="mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                        <option value="selection" disabled selected>Select</option>
                    </select>
                </label>

                <!--Dia chi-->
                <label>
                    <span class="pl-4">Địa chi</span>
                    <input type="text" placeholder="23 abc/3123, Tp.Hồ Chí Minh, Việt Nam" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>

                <!--Nguyen quan-->
                <label>
                    <span class="pl-4">Nguyên quân</span>
                    <input type="text" placeholder="Việt Nam" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>
            </div>

            <!--Form Personal Health-->
            <div id="health_info" class="px-[50px] border-x-2">
                <!--Title-->
                <div class="title w-[200px] px-2 my-[20px] h-[25px] bg-[#5242B4] rounded-[5px] text-white">Thông tin sức khỏe</div>
                
                <!--Cân nặng & chiều cao-->
                <div class="flex">
                    <label class="mr-2 relative">
                        <span class="pl-4">Cân nặng</span>
                        <span class="input-prefix absolute right-[10px] top-[45%]">kg</span>
                        <input type="text" placeholder="0" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                    </label>
                    <label class="ml-2 relative">
                        <span class="pl-4">Chiều cao</span>
                        <span class="input-prefix absolute right-[10px] top-[45%]">m</span>
                        <input type="text" placeholder="100" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                    </label>
                </div>
                <!--Bơi lội-->
                <label>
                    <span class="pl-4">Các khả năng (Nếu có)</span>
                    <input type="text" placeholder="" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>
                <!--Tình trạng mắt-->
                <div class="eyes-state flex">
                    <label>
                        <span class="pl-4">Tình trạng mắt</span>
                        <!-- <input type="text" placeholder="" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4"> -->
                        <select name="" id="" class="mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                                <option value="selection" disabled selected>Select</option>
                                <option value="Cận">Cận thị</option>
                        </select>
                    </label>
                    <label class="ml-2 relative">
                        <span class="pl-4">Chiều cao</span>
                        <span class="input-prefix absolute right-[10px] top-[45%]">m</span>
                        <input type="text" placeholder="100" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                    </label>
                </div>

                <!--Tình trạng tai-->
                <label>
                    <span class="pl-4">Tình trạng tai</span>
                    <textarea cols="30" rows="10" placeholder="Nhập tình trạng tai" class="mb-4 h-[80px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4 py-2"></textarea>
                    <!-- <input type="text" cols="40" rows="5" placeholder="Địa chỉ người thân" class="mb-4 h-[80px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4"> -->
                </label>

                <!--Tim mạch-->
                <label>
                    <span class="pl-4">Tim mạch</span>
                    <textarea cols="30" rows="10" placeholder="Nhập tình trạng tim" class="mb-4 h-[80px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4 py-2"></textarea>
                    <!-- <input type="text" cols="40" rows="5" placeholder="Địa chỉ người thân" class="mb-4 h-[80px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4"> -->
                </label>

                <!--Dị ứng-->
                <label>
                    <span class="pl-4">Dị ứng</span>
                    <textarea cols="30" rows="10" class="mb-4 h-[80px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4 py-2"></textarea>
                    <!-- <input type="text" cols="40" rows="5" placeholder="Địa chỉ người thân" class="mb-4 h-[80px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4"> -->
                </label>

                <!---Các khả năng-->
                <!-- <label>
                    <span class="pl-4">Các khả năng (Nếu có)</span>
                    <input type="text" placeholder="" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label> -->
            </div>

            <!--Form Personal Relationships-->
            <div id="relatives_info" class="px-[50px]">
                <!--Title-->
                <div class="title w-[200px] px-2 my-[20px] h-[25px] bg-[#EBC351] rounded-[5px] text-white">Thông tin người thân</div>

                <!--Họ tên-->
                <label>
                    <span class="pl-4">Họ và tên</span>
                    <input type="text" placeholder="Họ và tên người thân" class="mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>

                <!--Birthdy & Gender-->
                <div class="flex">
                    <label class="mr-2">
                        <span class="pl-4">Ngày sinh</span>
                        <input type="date" placeholder="Ho va ten" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                    </label>
                    <label class="ml-2">
                        <span class="pl-4">Giới tính</span>
                        <!-- <input type="text" placeholder="Ho va ten" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4"> -->
                        <select name="" id="" class="mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                            <option value="selection" disabled selected>Select</option>
                            <option value="Female">Nam</option>
                            <option value="Male">Nữ</option>

                        </select>
                    </label>
                </div>

                <!--Quan hệ-->
                <label>
                    <span class="pl-4">Quan hệ với bé</span>
                    <!-- <input type="text" placeholder="Bố" class="mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4"> -->
                    <select name="" id="" class="mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                            <option value="selection" disabled selected>Select</option>
                            <option value="Father">Bố</option>
                            <option value="Mother">Mẹ</option>
                            <option value="GrandMother">Bà</option>
                            <option value="GrandFather">Ông</option>
                            <option value="Uncle">Chú</option>
                    </select>
                </label>

                <!--Số điện thoại-->
                <label>
                    <span class="pl-4">Số điện thoại</span>
                    <input type="tel" placeholder="0xxxxxxxxx" class="mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>

                <!--Email-->
                <label>
                    <span class="pl-4">Email</span>
                    <input type="email" placeholder="abc@abc.com" class="mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>

                <!--Địa chỉ-->
                <label>
                    <span class="pl-4">Địa chỉ</span>
                    <textarea cols="30" rows="10" class="mb-4 h-[80px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4 py-2"></textarea>
                    <!-- <input type="text" cols="40" rows="5" placeholder="Địa chỉ người thân" class="mb-4 h-[80px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4"> -->
                </label>

                <!--Buttton-->
                <div class="gb-black h-[100px] w-full content-end flex justify-between">
                    <button type="submit" class="h-[48px] p-[12px] bg-[#408E3E] rounded-[7px] my-[10px] shadow-ss text-white flex active:scale-95">
                        <img :src="save_icon" alt="" class="mr-[10px]">
                        <span>Lưu thông tin</span>
                    </button>
                    <button class="h-[48px] p-[12px] rounded-[7px] my-[10px] shadow-ss text-black flex active:scale-95">
                        <span>Thoát</span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>

    /*Import icon */
    import save_icon from '@/assets/icons/save.svg'
    import user_icon from '@/assets/icons/avatar.svg'
    
    import {ref, computed, watch} from 'vue'

    const avatar_upload = ref(user_icon)
    const avatar_path = ref(user_icon)
    
    const handleUploadImg = (event) => {
        avatar_upload.value = event.target.files[0]

        if(!avatar_upload) return 

        if(avatar_upload.value.size > 5120) 
        {
            avatar_upload.value = null
            return
        }

        avatar_path.value = URL.createObjectURL(avatar_upload.value)
        
    }

</script>

<style lang="scss" scoped>

</style>