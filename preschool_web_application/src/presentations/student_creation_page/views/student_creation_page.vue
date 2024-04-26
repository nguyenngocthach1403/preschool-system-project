<template>
    <div>
        <!--Previous-->
        <!-- <div class="previous-page col-start-1 col-end-4 h-[40px] my-[10px] px-[20px] row-span-1"> 
            <button class="h-full w-[40px] px-[8px] border-2 rounded-[10px] shadow-lg content-center active:bg-gray-100"><img :src="arrow_back_icon" class="w-[25px] m-auto"></button>
        </div> -->

        <!--Body-->

        <!--Form Personal Information-->
        <form class="w-full bg-white h-dvh rounded-15 grid grid-cols-3" action="submit">
            <div id="personal_info" class="px-[50px]">
                <div class="title w-[200px] px-2 my-[20px] h-[25px] bg-[#49727D] text-white rounded-[5px] ">Thông tin cá nhân</div>
                <!-- Add avatar-->
                <div class="add-avatar w-[100px] h-[100px] m-auto bg-[#D9D9D9] rounded-md relative" >
                    <img v-if="avatar_path" :src="avatar_path" class="w-[100px] h-[100px] m-auto object-cover rounded-md border-2">
                    <input type="file" class="absolute top-0 left-0 w-[100px] h-[100px] opacity-0" accept=".png, .jpeg, .jpg" @change="handleUploadImg" >
                </div>
                <!--Name-->
                <label>
                    <span class="pl-4">Họ và tên</span>
                    <input v-model="nameStudentInput" type="text" placeholder="Họ và tên" class="mb-0 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4" :class="{'invalid-input' : isStudentNameValid}">
                    <div class="h-[20px] valid">
                        <p v-if="messageOfStudentName" class="mb-4 text-red-300">{{ messageOfStudentName }}</p>
                    </div>
                </label>

                <!--Birthdy & Gender-->
                <div class="flex">
                    <label class="mr-2">
                        <span class="pl-4">Ngày sinh</span>
                        <input v-model="birthDayStudentInput" type="date" placeholder="Ho va ten" class="h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4"  :class="{'invalid-input' : isBirdayStudentValid}">
                        <div class="h-[2px] valid">
                            <p v-if="messageOfStudentBirthDay" class="text-red-300">{{ messageOfStudentBirthDay }}</p>
                        </div>
                    </label>
                    <label class="ml-2">
                        <span class="pl-4">Giới tính</span>
                        <!-- <input type="text" placeholder="Ho va ten" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4"> -->
                        <select ref="studentGender" @change="genderStudentChange" name="" id="" class="h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                            <option value="selection" disabled selected>Select</option>
                            <option value="0">Nữ</option>
                            <option value="1">Nam</option>
                        </select>
                        <div class="h-[20px] valid">
                            <p v-if="isStudentNameValid" class="text-red-300">{{ }}</p>
                        </div>
                    </label>
                </div>
                <!--Dan toc-->
                <div class="relative">
                    <label>
                        <span class="pl-4">Dân tộc</span>
                        <input @focus="showNationDropDown = !showNationDropDown" @change="showNationDropDown = true" v-model="nationStudentInput" type="text" placeholder="Dân tộc" class=" mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                        <div v-if="showNationDropDown" class="nation-drop-down w-full border-2 rounded-[5px] overflow-y-auto">
                            <div class="option-item" v-for="(item) in filteredNationStudent" :key=item @click="chooseItemNationDropDown(item)">{{ item }}</div>
                        </div>
                    </label>
                </div>

                <!--Quoc tich-->
                <label>
                    <span class="pl-4">Quốc tịch</span>
                    <input v-model="nationalityStudentInput" type="text" placeholder="Việt Nam" class="mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>

                <!--Ton giao-->
                <label>
                    <span class="pl-4">Tôn giáo</span>
                    <input type="text" v-model="religionStudentInput" placeholder="Phật, Hồi, Thiên Chúa" class="mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-300 px-4">
                </label>

                <!--Dia chi-->
                <label>
                    <span class="pl-4">Địa chỉ</span>
                    <input v-model="placeOfResidenceStudentInput" type="text" placeholder="23 abc/3123, Tp.Hồ Chí Minh, Việt Nam" class="mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>

                <!--Nguyen quan-->
                <label>
                    <span class="pl-4">Nguyên quân</span>
                    <input v-model="placeOfOriginStudentInput" type="text" placeholder="Việt Nam" class="mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>
            </div>

            <!--Form Personal Health-->
            <div id="health_info" class="px-[50px] border-x-2 h-full ooverflow-hidden overflow-y-auto pb-[100px]">
                <!--Title-->
                <div class="title w-[200px] px-2 my-[20px] h-[25px] bg-[#5242B4] rounded-[5px] text-white sticky top-0 z-10">Thông tin sức khỏe</div>
                
                <!--Cân nặng & chiều cao-->
                <div class="flex">
                    <label class="mr-2 relative">
                        <span class="pl-4">Cân nặng</span>
                        <span class="input-prefix absolute right-[10px] top-[45%]">kg</span>
                        <input type="text" v-model="studentWeight" placeholder="0" class="mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                    </label>
                    <label class="ml-2 relative">
                        <span class="pl-4">Chiều cao</span>
                        <span class="input-prefix absolute right-[10px] top-[45%]">m</span>
                        <input type="text" v-model="studentHeight" placeholder="100" class="mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                    </label>
                </div>
                <!--Bơi lội-->
                <div class='relative'>
                    <span class="pl-4">Các khả năng (Nếu có)</span>
                    <div class="flex my-[5px] flex-wrap">
                        <div class="text-wrap mx-2 my-[2px] bg-green-500 pl-[12px] pr-[8px] text-white rounded-[5px] flex" v-for="(item, index) in abilityList" :key="index">
                            <span>{{ item }}</span>
                            <img :src="close_icon" @click.prevent="deleteItemAbilityList(index)" class="w-[12px] ml-3">
                        </div>
                    </div>
                    <label for="">
                        <input type="text" @focus="showDropDownAbility = !showDropDownAbility"  @keydown.enter.prevent="chooseItemDropDownAbilities(abilityInput)" v-model="abilityInput" placeholder="" class="mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                        <div v-show="showDropDownAbility" class="nation-drop-down w-full border-2 rounded-[5px] overflow-y-auto z-10">
                            <div class="option-item" v-for="(item) in filteredAbility" :key=item @click="chooseItemDropDownAbilities(item)">{{ item }}</div>
                        </div>
                    </label>
                </div>
                <!--Tình trạng mắt-->
                <div class="eyes-state flex">
                    <label>
                        <span class="pl-4">Tình trạng mắt</span>
                        <!-- <input type="text" placeholder="" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4"> -->
                        <select name="" id="" class="mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                                <option value="Cận" selected>Bình thường</option>
                                <option value="Cận">Cận thị</option>
                                <option value="Cận">Loạn thị</option>
                                <option value="Cận">Khuyết tật</option>
                        </select>
                    </label>
                    <label class="ml-2 relative">
                        <span class="pl-4">Chiều cao</span>
                        <span class="input-prefix absolute right-[10px] top-[45%]">m</span>
                        <input type="text" placeholder="100" class="mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                    </label>
                </div>

                <!--Tình trạng tai-->
                <label>
                    <span class="pl-4">Tình trạng tai</span>
                    <input type="text" v-model="earsStateInput" placeholder="Nhập dị ứng" class="mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>
                <!--Tim mạch-->
                <label>
                    <span class="pl-4">Tim mạch</span>
                    <input type="text" v-model="heartStateInput" placeholder="Nhập dị ứng" class="mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>

                <!--Dị ứng-->
                <label>
                    <span class="pl-4">Dị ứng</span>
                    <input type="text" cols="40" rows="5" v-model="allergyInput" placeholder="Nhập dị ứng" class="mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>
            </div>

            <!--Form Personal Relationships-->
            <div id="relatives_info" class="px-[50px]">
                <!--Title-->
                <div class="title w-[200px] px-2 my-[20px] h-[25px] bg-[#EBC351] rounded-[5px] text-white">Thông tin người thân</div>

                <!--Họ tên-->
                <label>
                    <span class="pl-4">Họ và tên</span>
                    <input type="text" v-model="nameRelativeInput" placeholder="Họ và tên người thân" class=" h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4" :class="{'invalid-input' : isValidRelativeName}">
                    <div class="h-[20px] valid">
                        <p v-if="messageOfRelativeName" class="mb-4 text-red-300">{{ messageOfRelativeName }}</p>
                    </div>
                </label>
                <!--Birthdy & Gender-->
                <div class="flex">
                    <label class="mr-2">
                        <span class="pl-4">Ngày sinh</span>
                        <input type="date" v-model="birdayRelativeInput" placeholder="Ho va ten" class="h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                        <div class="h-[20px] valid">
                            <p v-if="messageOfRelativeBirthday" class="mb-4 text-red-300">{{ messageOfRelativeBirthday }}</p>
                        </div>
                    </label>
                    <label class="ml-2">
                        <span class="pl-4">Giới tính</span>
                        <!-- <input type="text" placeholder="Ho va ten" class=" mb-4 h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4"> -->
                        <select name="" id="" class="mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
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
                    <select name="" id="" class="mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
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
                    <input type="tel" v-model="phoneInput" placeholder="0xxxxxxxxx" class="mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>

                <!--Email-->
                <label>
                    <span class="pl-4">Email</span>
                    <input type="email" v-model="emailInput" placeholder="abc@abc.com" class="mb-[20px] h-[40px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4">
                </label>

                <!--Địa chỉ-->
                <label>
                    <span class="pl-4">Địa chỉ</span>
                    <textarea cols="30" rows="10" class="mb-[20px] h-[80px] rounded-md my-[5px] w-full outline-none border-2 focus:border-blue-500 px-4 py-2"></textarea>
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
    import close_icon from '@/assets/icons/close.svg'
    
    import {ref, computed, watch, onMounted} from 'vue'

    import {nameStudentValid, birthdayStudentValid} from '../../../utils/resources/check_valid'

    const avatar_upload = ref(user_icon)
    const avatar_path = ref(user_icon)

    const nameStudentInput = ref('')
    const birthDayStudentInput = ref(null)
    const nationStudentInput = ref(null)
    const nationalityStudentInput = ref(null)
    const religionStudentInput = ref(null)
    const placeOfResidenceStudentInput = ref(null)
    const placeOfOriginStudentInput = ref(null)
    const studentHeight = ref(null)
    const studentWeight = ref(null)
    const abilityInput = ref(null)
    const earsStateInput = ref(null)
    const heartStateInput = ref(null)
    const eyeStateInput  =ref(null)
    const allergyInput =ref(null)
    const nameRelativeInput = ref(null)
    const birdayRelativeInput = ref(null)
    const genderRelativeInput = ref(null)
    const relationshipInput = ref(null)
    const phoneInput = ref(null)
    const emailInput = ref(null)
    const addressRelativeInput = ref(null)


    const showNationDropDown = ref(false)
    const showDropDownAbility =ref(false)

    // valid valiable
    const messageOfStudentName = ref('')

    const messageOfStudentBirthDay = ref('')

    const messageOfRelativeName = ref('')

    const messageOfRelativeBirthday = ref('')

    //ref
    const studentGender = ref(null)

    let studentModel = {
        'avatar' : null,
        'name': null,
        'gender': null,
        'birthday': null,
        'nation': null,
        'nationality': null,
        'placeOfResidence' :null,
        'placeOfOrigin': null,
        'religion': null,
        'height' : null,
        'weight': null,
        'abilities': null,
        'allergy': null,
        'earsState': null,
        'heartState': null,
    }

    const chooseItemNationDropDown = (item) => {
        nationStudentInput.value = item
    }

    const chooseItemDropDownAbilities = (item) =>
    {
        if(abilityList.value.indexOf(item) !== -1)
            return 
        abilityList.value.push(item)
        studentModel.abilities = abilityList.value
        saveLocalStudentInputData()
    }

    const deleteItemAbilityList = (index) => {
        abilityList.value.splice(index, 1)
        studentModel.abilities = abilityList.value
        saveLocalStudentInputData()
    }

    const abilityList = ref([]);

    const dropDown = ref(["Kinh","Tày","Thái","Mường","H'Mông","Dao","Khơ Me","Nùng","H'rê","Gia Rai","Ê Đê","Ba Na","Xơ Đăng","Sán Chay","Cơ Tu","Chăm","Sán Dìu","Hà Nhì","Ra Glai","La Chí","M'Nông","Chứt","Xê Đăng","Bru-Vân Kiều","Giáy","Cơ Ho","Tà Ôi","Co","Ta Oi","Kháng","Co Lao","La Ha","Pu Péo","Lự","Ngái","Pa Thẻn","Lô Lô","Chơ Ro","Mảng","Cờ Lao","Bố Y","La Hu","Pà Thẻn","Lào","Mông","Pơng","Cống","Si La","Ơ Đu","Mảng","M'ngông","Thổ",])

    const dropDownAbilities = ref(['Bơi lội', 'Làm toán cơ bản', 'Làm toán nâng cao', 'Đọc bản chữ cái', 'Viết chữ', 'Đánh vần'])

    const filteredAbility =  computed(() => {
        const filterList =  dropDownAbilities.value.filter((e) => {
            return e.match(abilityInput.value)
        }) 

        if(filterList.length ===0)
            return dropDownAbilities.value;
        return filterList
    })

    const filteredNationStudent = computed(() => {
        return dropDown.value.filter((e) => {
            return e.match(nationStudentInput.value)
        })
    })

    /* folow gender input */
    const genderStudentChange = (event) => {
        studentModel.gender = event.target.value
        saveLocalStudentInputData()
    }

    watch(earsStateInput, (newVal) => {
        studentModel.earsState = newVal
        saveLocalStudentInputData()
    })

    watch(heartStateInput, (newVal) => {
        studentModel.heartState = newVal
        saveLocalStudentInputData()
    })
    
    watch(allergyInput, (newVal) => {
        studentModel.allergy = newVal
        saveLocalStudentInputData()
    })

    watch(nameStudentInput, (newVal) => {
        const valid = nameStudentValid(newVal)
        if(valid!== '')
        {
            messageOfStudentName.value = valid
            return
        }

        messageOfStudentName.value = ''

        studentModel.name = newVal;
        saveLocalStudentInputData()
    })

    watch(birthDayStudentInput, (newVal) => {
        const valid = birthdayStudentValid(newVal);
        if(valid !== '')
        {
            messageOfStudentBirthDay.value = valid
            return
        }

        messageOfStudentBirthDay.value = ''

        studentModel.birthday = newVal;
        saveLocalStudentInputData()
        
    })

    watch(nationStudentInput, (newVal) => {
        studentModel.nation = newVal;
        saveLocalStudentInputData()
    })

    watch(nationalityStudentInput, (newVal) => {
        studentModel.nationality = newVal;
        saveLocalStudentInputData()
    })

    watch(placeOfResidenceStudentInput, (newVal) => {
        studentModel.placeOfResidence = newVal;
        saveLocalStudentInputData()
    })

    watch(placeOfOriginStudentInput, (newVal) => {
        studentModel.placeOfOrigin = newVal;
        saveLocalStudentInputData()
    })

    watch(religionStudentInput, (newVal) => {
        studentModel.religion = newVal;
        saveLocalStudentInputData()
    })

    watch(nameRelativeInput, (newVal) => {
        const valid = nameStudentValid(newVal)
        if(valid !== '')
        {
            messageOfRelativeName.value = valid
            return 
        }

        messageOfRelativeName.value =''

    })

    watch(studentHeight, (newVal) => {
        studentModel.height = newVal
        saveLocalStudentInputData()
    })

    watch(studentWeight, (newVal) => {
        studentModel.weight = newVal
        saveLocalStudentInputData()
    })

    watch(birdayRelativeInput, (newVal) => {
        const valid = birthdayStudentValid(newVal)
        if(valid !== '')
        {
            messageOfRelativeBirthday.value = valid
            return 
        }

        messageOfRelativeBirthday.value =''

    })

    //Lưu dữ liệu vào bộ nhớ đệm
    function saveLocalStudentInputData()
    {
        localStorage.setItem('studentToAddInput', JSON.stringify(studentModel))
    }


    // Sử lý và ràn buộc lấy hình ảnh
    const handleUploadImg = (event) => {
        //Lấy hình
        avatar_upload.value = event.target.files[0]

        //Kiểm tra tồn tại
        if(!avatar_upload) return 

        //Kiểm tra size
        if(avatar_upload.value.size / 1024 > 5120) 
        {
            //Bỏ nếu quá dung lượng cho phếp
            avatar_upload.value = null
            return
        }

        //Tạo đường dẫn của ảnh
        avatar_path.value = URL.createObjectURL(avatar_upload.value)

        studentModel.avatar = avatar_path.value
        saveLocalStudentInputData()
    }

    onMounted(() => {
        studentModel = JSON.parse(localStorage.getItem('studentToAddInput'));
        nameStudentInput.value = studentModel.name
        birthDayStudentInput.value = studentModel.birthday
        genderStudentChange.value = studentModel.gender
        studentGender.value.selectedIndex = studentModel.gender === 0 ? 1 : 2
        nationStudentInput.value = studentModel.nation
        nationalityStudentInput.value = studentModel.nationality
        placeOfOriginStudentInput.value = studentModel.placeOfOrigin
        placeOfResidenceStudentInput.value = studentModel.placeOfResidence
        religionStudentInput.value = studentModel.religion
        avatar_path.value = studentModel.avatar
        allergyInput.value = studentModel.allergy
        earsStateInput.value = studentModel.earsState
        heartStateInput.value = studentModel.heartState
        abilityList.value = studentModel.abilities
    })

</script>

<style scoped>

    .invalid-input
    {
        border: 1px solid red !important;
    }
    .valid
    {
        font-size: 12px;
    }
    .nation-drop-down
    {
        padding: 5px;
        border: 1px solid rgb(192, 192, 192);
        height: 100px;
        position: absolute;
        background-color: white;
        
    }
    .nation-drop-down > .option-item:hover
    {
        background-color:  #5242B4;
        color: white;
    }
    #health_info::-webkit-scrollbar {
        width: 10px;
    }
</style>
