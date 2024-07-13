<template>
  <div class="w-full">
    <div
      v-for="(cls, index) in ClassData"
      :key="index"
      class="m-10 border rounded-md"
      @click="onClickClasses(cls)"
    >
      <button
        class="w-full py-4 px-10 font-bold text-[18px] border-b text-start"
      >
        Đánh giá lớp {{ cls.ClassName }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import teacherService from "../../../services/teacher.service";
import accountService from "../../../services/account.service";
import { isUser } from "../../../utils/resources/validator";
import router from "@/router/router";
const classID = ref("");
const ClassData = ref([]);
const emits = defineEmits(["click-classes"]);

onBeforeMount(() => {
  CurrentClass();
});

function onClickClasses(cls) {
  const user = isUser();
  if (!user) return;
  const username = user.username;
  router.push({
    name: "TeacherEvalutionView",
    params: { username: username, id: cls.id },
  });
}

async function CurrentClass() {
  const user = isUser();
  if (!user) return;
  const accountId = user.id;
  const response = await accountService.getTeacherById(accountId);
  const teacherId = response.data[0].TeacherId;
  const result = await teacherService.getClassCurrent(teacherId);
  ClassData.value = result.data.data;
  console.log(ClassData.value);
}
</script>

<style scoped>
.dp__theme_light {
  --dp-button-height: 35px;
  --dp-border-radius: 5px;
  --dp-input-padding: 11px 30px 10px 12px;
  margin: 7px 0px;
}
</style>
