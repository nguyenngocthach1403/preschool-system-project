<template>
  <LayoutPopup :title="'Thông tin khách hàng'" class="absolute top-0 right-0">
    <template #content>
      <div class="w-[1600px] flex gap-2 pl-5 pr-3 h-[600px]">
        <div class="w-full overflow-y-auto">
          <!--name-->
          <div
            class="w-full h-[90px] flex bg-white p-2 gap-6 rounded-md shadow"
          >
            <div class="w-full flex gap-6">
              <!--avatar-->
              <div
                class="w-[50px] h-[50px] my-3 content-center rounded-full bg-blue-700 text-[26px] font-bold text-white"
              >
                {{ props.data ? props.data.name.charAt(0).toUpperCase() : "X" }}
              </div>
              <div class="content-center text-start">
                <!--name-->
                <p>KH{{ props.data.id }}</p>
                <p class="text-[20px]">{{ props.data.name }}</p>
              </div>
            </div>
            <div v-if="disableInput" class="h-full px-5 flex items-center">
              <button
                class="w-10 h-10 rounded-full content-center text-center hover:bg-gray-200"
                @click="disableInput = false"
              >
                <img class="w-5 h-5 m-auto" :src="edit_icon" alt="" />
              </button>
            </div>
            <div
              v-if="!disableInput"
              class="h-full px-5 flex items-center gap-2"
            >
              <button
                class="h-10 px-5 rounded-xl content-center text-center hover:bg-gray-200 border"
                @click="disableInput = true"
              >
                Hủy
              </button>
              <button
                class="h-10 px-5 rounded-xl content-center text-center hover:bg-blue-800 bg-blue-700 text-white"
                @click="disableInput = true"
              >
                Lưu
              </button>
            </div>
          </div>
          <div
            class="w-full h-[90px] mt-3 bg-white p-2 text-start px-5 rounded-md shadow content-center relative"
          >
            <div>
              <p>
                <span>Đợt: </span>
                <span class="text-gray-500 text-[16px]">{{
                  register ? register.admission_name : "unknown"
                }}</span>
              </p>
            </div>
            <div>
              <p>
                <span>Thời gian: </span>
                <span class="text-gray-500 text-[16px]"
                  >{{
                    register
                      ? ddmmyyyyDateString(
                          new Date(register.start_date).toLocaleDateString()
                        )
                      : ""
                  }}
                  -
                  {{
                    register
                      ? ddmmyyyyDateString(
                          new Date(register.end_date).toLocaleDateString()
                        )
                      : ""
                  }}</span
                >
              </p>
            </div>
            <div class="absolute right-3 bottom-1 text-gray-500 text-[13px]">
              Tạo ngày:
              <span>{{
                register
                  ? ddmmyyyyDateString(
                      new Date(register.created).toLocaleDateString()
                    )
                  : ""
              }}</span>
            </div>
          </div>
          <div class="my-3 w-full bg-white p-3 gap-6 rounded-md shadow">
            <div class="w-full text-start text-gray-500">
              Thông tin người đăng ký
            </div>
            <section class="my-5">
              <div class="flex gap-5 w-full text-start">
                <div class="w-full">
                  <label for=""
                    ><span class="pl-4 text-gray-500">Tên người đăng ký</span>
                    <span class="text-red-600"> (*) </span>
                    <input
                      v-if="disableInput"
                      type="text"
                      class="input-text-default disable"
                      :disabled="{ disableInput }"
                      v-model="registerName" />
                    <input
                      v-if="!disableInput"
                      type="text"
                      class="input-text-default"
                      v-model="registerName"
                  /></label>
                </div>
                <div class="w-full">
                  <label class="w-full text-start">
                    <span class="pl-4 text-gray-500"
                      >Vai trò của người đăng ký</span
                    ><span class="text-red-600"> (*) </span>
                    <select
                      v-if="disableInput"
                      disabled
                      v-model="registerRelationship"
                      class="input-text-default disable"
                    >
                      <option value="0">Bố</option>
                      <option value="1">Mẹ</option>
                      <option value="2">Người giám hộ</option>
                    </select>
                    <select
                      v-if="!disableInput"
                      v-model="registerRelationship"
                      class="input-text-default"
                    >
                      <option value="0">Bố</option>
                      <option value="1">Mẹ</option>
                      <option value="2">Người giám hộ</option>
                    </select>
                  </label>
                </div>
              </div>
            </section>
            <section class="my-5">
              <div class="flex gap-5 w-full text-start">
                <div class="w-full">
                  <label class="w-full text-start">
                    <span class="pl-4 text-gray-500">Số điện thoại</span
                    ><span class="text-red-600"> (*) </span>
                    <input
                      v-if="disableInput"
                      v-model="registerPhone"
                      type="text"
                      placeholder="0xxxxxxxxx"
                      disabled
                      class="input-text-default disable"
                    />
                    <input
                      v-if="!disableInput"
                      v-model="registerPhone"
                      type="text"
                      placeholder="0xxxxxxxxx"
                      class="input-text-default"
                    />
                    <div class="px-3">
                      <p class="text-red-600 mt-1"></p>
                    </div>
                  </label>
                </div>
                <div class="w-full">
                  <label class="w-full text-start">
                    <span class="pl-4 text-gray-500">Email</span
                    ><span class="text-red-600"> (*) </span>
                    <input
                      v-if="disableInput"
                      v-model="registerEmail"
                      type="email"
                      disabled
                      placeholder="abc@abc.com"
                      class="input-text-default disable"
                    />
                    <input
                      v-if="!disableInput"
                      v-model="registerEmail"
                      type="email"
                      placeholder="abc@abc.com"
                      class="input-text-default"
                    />
                    <div class="px-3">
                      <p class="text-red-600 mt-1"></p>
                    </div>
                  </label>
                </div>
              </div>
            </section>
          </div>
          <div class="my-3 w-full bg-white p-3 gap-6 rounded-md shadow">
            <div class="w-full text-start text-gray-500">Nhu cầu học</div>
            <section class="my-5">
              <div class="flex gap-5 w-full text-start">
                <div class="w-full">
                  <label for=""
                    ><span class="pl-4 text-gray-500">Cấp bậc</span>
                    <span class="text-red-600"> (*) </span>
                    <select
                      v-if="disableInput"
                      class="input-text-default disable"
                      disabled
                      v-model="registerLevel"
                    >
                      <option
                        v-for="item in levelList"
                        :key="item"
                        :value="item.value"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                    <select
                      v-if="!disableInput"
                      class="input-text-default"
                      v-model="registerLevel"
                    >
                      <option
                        v-for="item in levelList"
                        :key="item"
                        :value="item.value"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </label>
                </div>
                <div class="w-full">
                  <label class="w-full text-start">
                    <span class="pl-4 text-gray-500">Chương trình</span
                    ><span class="text-red-600"> (*) </span>
                    <select
                      v-if="disableInput"
                      disabled
                      v-model="registerSyllabus"
                      class="input-text-default disable"
                    >
                      <option
                        v-for="item in syllabusList"
                        :key="item"
                        :value="item.value"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                    <select
                      v-if="!disableInput"
                      v-model="registerSyllabus"
                      class="input-text-default"
                    >
                      <option
                        v-for="item in syllabusList"
                        :key="item"
                        :value="item.value"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </label>
                </div>
              </div>
            </section>
          </div>
          <div class="my-3 w-full bg-white p-3 gap-6 rounded-md shadow">
            <div class="w-full text-start text-gray-500">Thông tin bé</div>
            <section class="my-5">
              <div class="flex gap-5 w-full text-start">
                <div class="w-full">
                  <label for=""
                    ><span class="pl-4 text-gray-500">Họ tên</span>
                    <span class="text-red-600"> (*) </span>
                    <input
                      v-if="disableInput"
                      type="text"
                      class="input-text-default disable"
                      :disabled="{ disableInput }"
                      v-model="studentName" />
                    <input
                      v-if="!disableInput"
                      type="text"
                      class="input-text-default"
                      v-model="studentName"
                      :class="{ invalid: messageOfStudentName }"
                  /></label>
                  <div class="px-3">
                    <p class="text-red-600 mt-1">
                      {{ messageOfStudentName }}
                    </p>
                  </div>
                </div>
                <div class="w-full">
                  <label class="w-full text-start">
                    <span class="pl-4 text-gray-500">Giới tính</span
                    ><span class="text-red-600"> (*) </span>
                    <select
                      v-if="disableInput"
                      disabled
                      v-model="studentGender"
                      class="input-text-default disable"
                    >
                      <option value="0">Nam</option>
                      <option value="1">Nữ</option>
                    </select>
                    <select
                      v-if="!disableInput"
                      v-model="studentGender"
                      class="input-text-default"
                    >
                      <option value="0">Nam</option>
                      <option value="1">Nữ</option>
                    </select>
                  </label>
                </div>
              </div>
            </section>
            <section class="my-5">
              <div class="flex gap-5 w-full text-start">
                <div class="w-full">
                  <label class="w-full text-start">
                    <span class="pl-4 text-gray-500">Ngày sinh </span
                    ><span class="text-red-600"> (*) </span>
                    <VueDatePicker
                      v-if="disableInput"
                      v-model="studentBirthday"
                      :enable-time-picker="false"
                      :disabled="true"
                    />
                    <VueDatePicker
                      v-if="!disableInput"
                      v-model="studentBirthday"
                      :enable-time-picker="false"
                      :class="{ invalid: messageOfStudentBirthday }"
                    />
                    <div class="px-3">
                      <p class="text-red-600 mt-1">
                        {{ messageOfStudentBirthday }}
                      </p>
                    </div>
                  </label>
                </div>
                <div class="w-full">
                  <label class="w-full text-start">
                    <span class="pl-4 text-gray-500">Nơi sinh</span>
                    <input
                      v-if="disableInput"
                      v-model="studentBirthOfOrigin"
                      type="text"
                      disabled
                      class="input-text-default disable"
                    />
                    <select
                      v-if="!disableInput"
                      v-model="studentBirthOfOrigin"
                      class="input-text-default"
                    >
                      <option v-for="item in cities" :key="item" :value="item">
                        {{ item.Name }}
                      </option>
                    </select>
                  </label>
                </div>
              </div>
            </section>
            <section class="my-5">
              <div class="flex gap-5 w-full text-start">
                <div class="w-full">
                  <label class="w-full text-start">
                    <span class="pl-4 text-gray-500">Dân tộc</span>
                    <input
                      v-if="disableInput"
                      v-model="studentFork"
                      type="text"
                      disabled
                      class="input-text-default disable"
                    />
                    <select
                      v-if="!disableInput"
                      v-model="studentFork"
                      class="input-text-default"
                    >
                      <option
                        v-for="item in forkList"
                        :key="item"
                        :value="item.name"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </label>
                </div>
                <div class="w-full">
                  <label class="w-full text-start">
                    <span class="pl-4 text-gray-500">Quốc tịch</span>
                    <input
                      v-if="disableInput"
                      v-model="studentNation"
                      type="text"
                      disabled
                      class="input-text-default disable"
                    />
                    <input
                      v-if="!disableInput"
                      v-model="studentNation"
                      type="text"
                      class="input-text-default"
                    />
                  </label>
                </div>
              </div>
            </section>
            <section class="my-5">
              <div class="flex gap-5 w-full text-start">
                <div class="w-full">
                  <label class="w-full text-start">
                    <span class="pl-4 text-gray-500">Tỉnh/Thành phố</span>
                    <span class="text-red-600"> (*) </span>
                    <input
                      v-if="disableInput"
                      v-model="registerCity"
                      type="text"
                      disabled
                      class="input-text-default disable"
                    />
                    <select
                      v-if="!disableInput"
                      v-model="registerCity"
                      class="input-text-default"
                    >
                      <option
                        v-for="item in cities"
                        :key="item"
                        :value="item.Name"
                      >
                        {{ item.Name }}
                      </option>
                    </select>
                  </label>
                </div>
                <div class="w-full">
                  <label class="w-full text-start">
                    <span class="pl-4 text-gray-500">Quận/Huyện</span>
                    <span class="text-red-600"> (*) </span>
                    <input
                      v-if="disableInput"
                      v-model="registerDistrict"
                      type="text"
                      disabled
                      class="input-text-default disable"
                    />
                    <select
                      v-if="!disableInput"
                      v-model="registerDistrict"
                      class="input-text-default"
                    >
                      <option
                        v-for="item in districts"
                        :key="item"
                        :value="item.Name"
                      >
                        {{ item.Name }}
                      </option>
                    </select>
                  </label>
                </div>
                <div class="w-full">
                  <label class="w-full text-start">
                    <span class="pl-4 text-gray-500">Phường/Xã</span>
                    <span class="text-red-600"> (*) </span>
                    <input
                      v-if="disableInput"
                      v-model="registerTown"
                      type="text"
                      disabled
                      class="input-text-default disable"
                    />
                    <select
                      v-if="!disableInput"
                      v-model="registerTown"
                      class="input-text-default"
                    >
                      <option
                        v-for="item in wards"
                        :key="item"
                        :value="item.Name"
                      >
                        {{ item.Name }}
                      </option>
                    </select>
                  </label>
                </div>
              </div>
            </section>
          </div>
          <div class="my-3 w-full bg-white p-3 gap-6 rounded-md shadow">
            <div class="w-full text-start text-gray-500">Hình ảnh</div>
            <div class="flex gap-5">
              <div class="w-[150px] h-[200px]">
                <img
                  class="w-full h-full object-contain"
                  :src="
                    register
                      ? register.register_img == ''
                        ? empty_icon
                        : register.register_img
                      : empty_icon
                  "
                  alt=""
                />
              </div>
              <div class="w-[150px] h-[200px]">
                <img
                  class="w-full h-full object-contain"
                  :src="empty_icon"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="my-3 w-full bg-white p-3 gap-6 rounded-md shadow">
            <div class="w-full text-start text-gray-500">Ghi chú</div>
            <div class="w-full">
              <ul class="w-full text-start">
                <li v-for="item in notes" :key="item" class="h-fit w-full my-3">
                  <div class="ml-5">
                    {{ item.username }}
                    <span class="text-gray-400 text-[13px]"
                      >{{
                        ddmmyyyyDateString(
                          new Date(item.created).toLocaleDateString()
                        )
                      }}
                      {{
                        formatTimeString(
                          new Date(item.created).getMinutes(),
                          new Date(item.created).getHours()
                        )
                      }}</span
                    >
                  </div>
                  <div class="flex items-center pl-3 gap-2">
                    <div
                      class="w-fit border rounded-bl-full text-gray-600 hover:bg-gray-300/50 rounded-tr-full rounded-br-full my-1 py-2 px-4"
                    >
                      <article class="text-balance w-full">
                        <p class="text-wrap">
                          <span>{{ item.content }}</span>
                        </p>
                      </article>
                    </div>
                    <button
                      v-if="isShowDelete(item)"
                      class="w-[20px] h-[20px] rounded-full content-center hover:bg-gray-200"
                    >
                      <img
                        class="w-[15px] h-[15px] m-auto"
                        :src="delete_icon"
                        alt=""
                      />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
            <div class="w-full flex gap-3">
              <div class="w-full">
                <input
                  type="text"
                  placeholder="Nhập ghi chú..."
                  v-model="noteInput"
                  class="h-[40px] outline-none border w-full rounded-xl px-4 py-2"
                />
              </div>
              <div>
                <button
                  v-if="!addingNote"
                  @click="addNote()"
                  class="px-3 h-full rounded-xl content-center bg-blue-600/75 text-white hover:bg-blue-700 active:scale-95"
                >
                  Send
                </button>
                <button
                  v-if="addingNote"
                  class="px-3 h-full rounded-xl content-center bg-blue-600/75 text-white hover:bg-blue-700 active:scale-95"
                >
                  <LoaddingComp />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="w-[700px] shadow rounded-md bg-white overflow-y-auto">
          <div class="w-full px-1 py-3">
            <div class="text-start px-3 text-[18px]">Tình trạng tư vấn</div>
            <ul class="w-full py-5 px-5 h-full">
              <li class="w-full flex items-center gap-5">
                <div class="flex gap-2 items-center w-[40%]">
                  <img :src="edit_user" class="w-7 h-7" alt="" />
                  <div class="text-start">
                    <p class="text-[13px] text-gray-500">Hiện bạn đang</p>
                    <p class="text-[15px]">Chỉnh sửa</p>
                  </div>
                </div>
                <div class="flex items-center w-[65%] gap-1">
                  <div
                    class="w-[40px] h-[40px] rounded-full bg-blue-500 content-center"
                  >
                    <img :src="plus_icon" class="w-5 h-5 m-auto" alt="" />
                  </div>
                  <div>
                    <SelectStatus
                      :options="statusList"
                      class="border w-[200px] h-[45px] rounded-md"
                      :value="statusSelected"
                      @choose="chooseStatus($event)"
                    />
                  </div>
                </div>
              </li>
              <li
                v-for="app in approves"
                :key="app"
                class="w-full flex items-center gap-5 my-5"
              >
                <div class="flex gap-2 items-center w-[40%]">
                  <img :src="edit_user" class="w-7 h-7" alt="" />
                  <div class="text-start">
                    <p class="text-[11px] text-gray-500">
                      {{
                        ddmmyyyyDateString(
                          new Date(app.approval_date).toLocaleDateString()
                        )
                      }}
                      -
                      {{
                        formatTimeString(
                          new Date(app.approval_date).getMinutes(),
                          new Date(app.approval_date).getHours()
                        )
                      }}
                    </p>
                    <p class="text-[15px]">{{ app.username }}</p>
                  </div>
                </div>
                <div class="flex items-center w-[65%] gap-1 relative">
                  <div
                    class="absolute h-[35px] w-[2px] top-[-23px] border border-dotted border-gray-400 left-[19px]"
                  ></div>
                  <div
                    class="mx-[10px] w-[20px] h-[20px] rounded-full bg-black content-center"
                  ></div>
                  <div>
                    <div
                      :class="{
                        'status-0': app.coming_status === 0,
                        'status-1': app.coming_status === 1,
                        'status-2': app.coming_status === 2,
                        'status-3': app.coming_status === 3,
                        'status-4': app.coming_status === 4,
                        'status-5': app.coming_status === 5,
                      }"
                      class="border w-[200px] h-[45px] rounded-xl content-center"
                    >
                      {{ convertRegisterStatus(app.coming_status) }}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </LayoutPopup>
</template>

<script setup>
import { onMounted, ref, watch, onBeforeMount } from "vue";
import axios from "axios";
import LayoutPopup from "../../../components/popup_layout.vue";
import LoaddingComp from "../../../components/loading_comp.vue";
import SelectStatus from "../components/select_register_status.vue";

//service
import syllabusService from "../../../services/syllabus.service";
import levelService from "../../../services/levels.service";
import registrationService from "../../../services/registration.service";
import {
  ddmmyyyyDateString,
  formatTimeString,
} from "../../../utils/resources/format_date";
import { convertRegisterStatus } from "../../../utils/resources/converter";

//icon
import edit_icon from "../../../assets/icons/edit.svg";
import edit_user from "../../../assets/icons/Edit User.svg";
import plus_icon from "../../../assets/icons/pls.svg";
import threedot_icon from "../../../assets/icons/menu.svg";
import empty_icon from "../../../assets/icons/Empty Box.svg";
import delete_icon from "../../../assets/icons/delete.svg";

//list
const levelList = ref([]);
const syllabusList = ref([]);

const cities = ref([]);
const districts = ref([]);
const wards = ref([]);

const statusList = ref([
  {
    id: 0,
    name: "Đơn mới",
  },
  {
    id: 1,
    name: "Đã hẹn",
  },
  {
    id: 2,
    name: "Liên hẹ lại",
  },
  {
    id: 3,
    name: "Đơn ảo",
  },
  {
    id: 4,
    name: "Hoàn thành",
  },
  {
    id: 5,
    name: "Chờ hủy",
  },
]);

const forkList = ref([
  { name: "Select item", id: 0 },
  { name: "Kinh", id: 1 },
  { name: "Tày", id: 2 },
  { name: "Thái", id: 3 },
  { name: "Mường", id: 4 },
  { name: "H'Mông", id: 5 },
  { name: "Dao", id: 7 },
  { name: "Khơ Me", id: 8 },
  { name: "Nùng", id: 9 },
  { name: "H'rê", id: 10 },
  { name: "Gia Rai", id: 11 },
  { name: "Ê Đê", id: 12 },
  { name: "Ba Na", id: 13 },
  { name: "Xơ Đăng", id: 14 },
  { name: "Sán Chay", id: 15 },
  { name: "Cơ Tu", id: 16 },
  { name: "Chăm", id: 17 },
  { name: "Sán Dìu", id: 18 },
  { name: "Hà Nhì", id: 19 },
  { name: "Ra Glai", id: 20 },
  { name: "La Chí", id: 21 },
  { name: "M'Nông", id: 22 },
  { name: "Chứt", id: 23 },
  { name: "Xê Đăng", id: 24 },
  { name: "Bru-Vân Kiều", id: 25 },
  { name: "Giáy", id: 26 },
  { name: "Cơ Ho", id: 27 },
  { name: "Tà Ôi", id: 28 },
  { name: "Co", id: 29 },
  { name: "Ta Oi", id: 30 },
  { name: "Kháng", id: 31 },
  { name: "Co Lao", id: 32 },
  { name: "La Ha", id: 33 },
  { name: "Pu Péo", id: 34 },
  { name: "Lự", id: 35 },
  { name: "Ngái", id: 36 },
  { name: "Pa Thẻn", id: 37 },
  { name: "Lô Lô", id: 38 },
  { name: "Chơ Ro", id: 39 },
  { name: "Mảng", id: 40 },
  { name: "Cờ Lao", id: 41 },
  { name: "Bố Y", id: 42 },
  { name: "La Hu", id: 43 },
  { name: "Pà Thẻn", id: 44 },
  { name: "Lào", id: 45 },
  { name: "Mông", id: 46 },
  { name: "Pơng", id: 47 },
  { name: "Cống", id: 48 },
  { name: "Si La", id: 49 },
  { name: "Ơ Đu", id: 50 },
  { name: "Mảng", id: 51 },
  { name: "M'ngông", id: 52 },
  { name: "Thổ", id: 53 },
]);

//data
const register = ref(null);
const approves = ref([]);
const notes = ref([]);

//effect
const disableInput = ref(true);
const addingNote = ref(false);
const statusSelected = ref(null);

//model
const registerName = ref();
const registerPhone = ref();
const registerEmail = ref("");
const registerAddress = ref("");
const registerCity = ref("");
const registerDistrict = ref("");
const registerTown = ref("");
const registerLevel = ref("");
const registerSyllabus = ref("");
const registerRelationship = ref(0);
const registerStatus = ref(0);
//
const studentName = ref();
const studentGender = ref();
const studentBirthday = ref(new Date());
const studentFork = ref("");
const studentBirthOfOrigin = ref("");
const studentNation = ref("");

const messageOfStudentName = ref();
const messageOfStudentBirthday = ref();

const noteInput = ref("");

//emits props watch
const props = defineProps({
  data: {
    type: Object,
    require: true,
  },
});
const emits = defineEmits(["add-toast"]);

//watch
watch(registerCity, (newValue) => {
  districts.value = [];
  wards.value = [];

  if (newValue != undefined) {
    districts.value = cities.value.find((e) => e.Name.match(newValue))
      ? (districts.value = cities.value.find((e) =>
          e.Name.match(newValue)
        ).Districts)
      : [];
  }
});
watch(registerDistrict, () => {
  if (registerDistrict.value != undefined) {
    wards.value = districts.value.find((e) =>
      e.Name.match(registerDistrict.value)
    )
      ? (wards.value = districts.value.find((e) =>
          e.Name.match(registerDistrict.value)
        ).Wards)
      : [];
  }
});
watch(register, () => {
  if (!register) return;
  initialInput(register.value);
});
//funcion
function initialInput(dataToFill) {
  registerName.value = dataToFill.name;
  registerPhone.value = dataToFill.phone;
  registerEmail.value = dataToFill.email;
  registerAddress.value = dataToFill.address_detail;
  registerCity.value = dataToFill.city;
  registerDistrict.value = dataToFill.district;
  registerTown.value = dataToFill.town;
  registerLevel.value = dataToFill.level_id;
  registerSyllabus.value = dataToFill.syllabus_id;
  registerRelationship.value = dataToFill.relationship;
  studentName.value = dataToFill.student_name;
  studentGender.value = dataToFill.student_gender;
  studentBirthday.value = dataToFill.birthday;
  studentFork.value = dataToFill.student_fork;
  studentBirthOfOrigin.value = dataToFill.place_of_birth;
  studentNation.value = dataToFill.student_nation;
  approves.value = dataToFill.approves;
  notes.value = dataToFill.notes;
}

async function updataRegisterStatus() {
  try {
  } catch (error) {}
}
// async function updateRegister() {
//   if (checkinvalid()) return;
//   try {
//     const formData = new FormData();
//     if (fileUpload.value) {
//       formData.append("files", fileUpload.value);
//     }
//     formData.append("name", name.value);
//     if (!isEmpty(email.value)) formData.append("email", email.value);
//     formData.append("phone", phone.value);
//     if (isEmpty(address.value)) formData.append("address", address.value);
//     formData.append("city", city.value);
//     formData.append("district", district.value);
//     formData.append("town", town.value);
//     if (!isEmpty(levels.value)) formData.append("levels", levels.value);
//     if (!isEmpty(syllabus.value)) formData.append("syllabus", syllabus.value);
//     formData.append("relationship", relationship.value);
//     formData.append("status", status.value);

//     const response = await RegistrationService.updateRegister(
//       route.query.id,
//       formData
//     );

//     if (response.status !== 200) {
//       emits("add-toast", {
//         title: "Cập nhật không thành công",
//         content: response.data.error,
//         type: 1,
//       });
//       return;
//     }

//     if (!response.data.success) {
//       emits("add-toast", {
//         title: "Cập nhật không thành công",
//         content: response.data.message,
//         type: 1,
//       });
//       return;
//     }

//     emits("add-toast", {
//       title: "Cập nhật thành công",
//       content: response.data.message,
//       type: 0,
//     });
//   } catch (e) {
//     emits("add-toast", {
//       title: "Cập nhật không thành công",
//       content: e,
//       type: 1,
//     });
//   }
// }

async function getLevel() {
  const response = await levelService.getLevels();
  for (let index = 0; index < response.data.data.length; index++) {
    const element = response.data.data[index];
    levelList.value.push({
      value: element.id,
      name: element.name,
    });
  }
}

async function getSyllabus() {
  const response = await syllabusService.getSyllabus();
  for (let index = 0; index < response.data.data.length; index++) {
    const element = response.data.data[index];
    syllabusList.value.push({
      value: element.id,
      name: element.name,
    });
  }
}

function fetchAddressList() {
  axios
    .get(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    )
    .then((response) => {
      cities.value = response.data;
      // console.log(cities.value);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

async function getRegisterByID() {
  if (!props.data.id) return;

  const response = await registrationService.getRegisterByID(props.data.id);

  console.log(response);

  if (response.data.success) {
    register.value = response.data.data;
  }
}

function onchangeCity(value) {
  if (!cities) return;
  districts.value = [];
  wards.value = [];

  if (value != undefined) {
    districts.value = cities.value.find((e) => e.Name.match(value)).Districts;
  }
}
async function addNote() {
  if (!window.user.id || !noteInput.value || !register) return;

  const data = {
    created_by: window.user.id,
    content: noteInput.value,
    register_id: register.value.id,
  };

  addingNote.value = true;

  const response = await registrationService.addNote(data);

  addingNote.value = false;

  console.log(response);

  if (response.status !== 200) {
    emits("add-toast", { title: "Thêm ghi chú thất bại", type: 1 });
    return;
  }

  if (!response.data.success) {
    emits("add-toast", { title: "Thêm ghi chú thất bại", type: 1 });
    return;
  }

  emits("add-toast", { title: "Thêm ghi chú thành công", type: 0 });
  notes.value.push(response.data.data);
  noteInput.value = "";
}

async function chooseStatus(event) {
  alert(event.id);
  statusSelected.value = event.id;

  try {
    const reponse = await registrationService.updateStatus(
      register.value.id,
      event.id,
      window.user.id,
      register.value.status
    );

    console.log(reponse);

    getRegisterByID();
    statusSelected.value = null;
  } catch (error) {
    emits("add-toast", { title: "Thất bại!", type: 1 });
  }
}
function isShowDelete(item) {
  console.log(window.user.role);
  if (window.user.id == item.created_by || window.user.role == 1) return true;
  return false;
}

//life cicle
onMounted(() => {
  console.log(props.data);
  getRegisterByID();
});

onBeforeMount(() => {
  fetchAddressList();
  getLevel();
  getSyllabus();
});
</script>

<style scoped>
.disable {
  border: none;
}
.dp__theme_light {
  --dp-button-height: 35px;
  --dp-border-radius: 5px;
  --dp-input-padding: 12px 30px 11px 12px;
  margin: 5px 0px;
}
.disable .dp__theme_light {
  --dp-button-height: 35px;
  --dp-border-radius: 5px;
  --dp-input-padding: 12px 30px 11px 12px;
  --dp-border-color: #ffffff;
  --dp-border-color-hover: #ffffff;
  margin: 5px 0px;
  border: none;
}

.status-0 {
  background-color: rgb(186 230 253);
  border: 1px solid rgb(125 211 252) !important;
  color: rgb(14 165 233);
}
.status-1 {
  background-color: rgb(221 214 254) !important;
  border: 1px solid rgb(196 181 253) !important;
  color: rgb(139 92 246) !important;
}
.status-2 {
  color: rgb(142, 73, 8) !important;
  background-color: rgba(162, 103, 7, 0.2);
  border: solid 1px rgb(246, 199, 105);
}
.status-3 {
  background-color: rgb(254, 254, 202);
  border: 1px solid rgb(252, 230, 165) !important;
  color: rgb(220, 162, 38);
}
.status-4 {
  background-color: rgb(217 249 157);
  border: 1px solid rgb(190 242 100) !important;
  color: rgb(132 204 22);
}
.status-5 {
  background-color: rgba(252, 165, 165, 0.3) !important;
  border: 1px solid rgb(252 165 165) !important;
  color: rgb(220 38 38);
}
p {
  word-wrap: break-word;
}
</style>