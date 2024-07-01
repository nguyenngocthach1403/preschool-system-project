import { createRouter, createWebHistory } from "vue-router";

import DashBoardView from "@/presentations/dash_board_page/views/dash_board_page.vue";
import StudentView from "@/presentations/student_page/view/student_page.vue";
import ParentView from "@/presentations/parent_page/views/parent_page.vue";
import ClassView from "@/presentations/class_page/views/class_page.vue";
import StudentCreationView from "@/presentations/student_creation_page/views/student_creation_page.vue";
import ParentCreationView from "@/presentations/parent_page/views/parent_create_page.vue";
import HomePage from "@/presentations/home_page/views/home_page.vue";
import LoginView from "@/presentations/login_page/view/login_page.vue";
import RegistrationForm from "@/presentations/registration/view/registration-form.vue";
import ParentEditView from "@/presentations/parent_page/views/parent_edit_page.vue";
import RegistrationView from "@/presentations/registration_page/view/registration_view.vue";
import AccountView from "@/presentations/account_page/views/account_view.vue";
import RegisterAdditionView from "../presentations/registration_addition_page/views/registration_addition_page.vue";
import TeacherView from "../presentations/teacher_page/view/teacher_view.vue";
import CategoryView from "../presentations/category_page/views/category_page.vue";
import ParentStudentCreationView from "../presentations/registration_page/view/parent_and_student_creation.vue";
import ProgramConfigurationView from "../presentations/program_configuration_page/views/program_configuration_page.vue";
import AdmissionPeriodView from "../presentations/program_configuration_page/views/admission_period_view.vue";
import TeacherCreationView from "../presentations/teacher_page/view/teacher_create.vue";
import StudentDetailView from "../presentations/student_detail_page/views/student_detail_page.vue";
import ClassDetailView from "../presentations/class_detail_page/views/class_detail_page.vue";
import TeacherEditView from "../presentations/teacher_page/view/teacher_edit.vue";
import AssignmentView from "../presentations/assignmet_page/views/assignment_page.vue";

import HomePageParent from "../presentations/home_page/views/home_page_parent.vue";
import ParentDetailView from "../presentations/parent_page/view_parentLogin/parent_detail.vue";
import StudentDetailParentView from "../presentations/parent_page/view_parentLogin/student_detail.vue";
import ParentDetailInfoView from "../presentations/parent_page/view_detail_i4/parent_detail_view.vue";

import HomePageTeacher from "../presentations/home_page/views/home_page_teacher.vue";
import InfoTeacherView from "../presentations/teacher_login/views/info_view.vue";
import ClassTeacherDetailView from "../presentations/teacher_login/views/info_class_view.vue";
import ClassCurentDetailView from "../presentations/teacher_login/view_info_class_detail/class_current_view.vue";
import ClassHistoryView from "../presentations/teacher_login/view_info_class_detail/class_before_view.vue";
import ExpertiseAndProgramView from "../presentations/program_configuration_page/views/expertise_and_programs_view.vue";
const router = Router();
export default router;
function Router() {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        name: "LoginView",
        path: "/sign",
        component: LoginView,
        meta: {
          requireAuth: false,
        },
      },
      {
        name: "RegistrationFormView",
        path: "/register",
        component: RegistrationForm,
        meta: {
          requireAuth: false,
        },
      },
      //Parent View Login
      {
        path: "/home-page-parent/:username/",
        name: "homepage-parent",
        component: HomePageParent,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            name: "ParentDetailView",
            path: "/home-page/:username/parent-detail-view",
            component: ParentDetailView,
          },
          {
            name: "StudentDetailParentView",
            path: "/home-page/:username/student-detail-parent-view",
            component: StudentDetailParentView,
          },
          {
            name: "ParentDetailInfoView",
            path: "/home-page/:username/parent-info-detail-view",
            component: ParentDetailInfoView,
          },
        ],
      },
      // Teacher View Login
      {
        path: "/home-page-teacher/:username/",
        name: "homepage-teacher",
        component: HomePageTeacher,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            name: "InfoTeacherView",
            path: "/home-page/:username/info-detail-view",
            component: InfoTeacherView,
          },
          {
            name: "ClassTeacherDetailView",
            path: "/home-page/:username/info-class-detail-view",
            component: ClassTeacherDetailView,
          },
          {
            name: "ClassCurentDetailView",
            path: "/home-page/:username/info-class-current-detail-view",
            component: ClassCurentDetailView,
          },
          {
            name: "ClassHistoryView",
            path: "/home-page/:username/info-class-history-detail-view",
            component: ClassHistoryView,
          },
        ],
      },
      {
        path: "/home-page/:username",
        name: "homepage",
        component: HomePage,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            name: "StudentView",
            path: "/home-page/:username/students",
            component: StudentView,
          },
          {
            name: "AssignmentView",
            path: "/home-page/:username/asignment",
            component: AssignmentView,
          },
          {
            name: "StudentDetailView",
            path: "/home-page/:username/students/detail",
            component: StudentDetailView,
          },
          {
            name: "ParentStudentCreationView",
            path: "/home-page/:username/registration/create_parent_student",
            component: ParentStudentCreationView,
          },
          {
            name: "ClassDetailView",
            path: "/home-page/:username/classes/detail",
            component: ClassDetailView,
            beforeEnter(to, from) {
              if (!to.query.classID) {
                return from.path;
              }
            },
          },
          {
            name: "ProgramConfigurationView",
            path: "/home-page/:username/program-configuration",
            component: ProgramConfigurationView,
            children: [
              {
                name: "AdmissionPeriodView",
                path: "/home-page/:username/program-configuration/addmission-period",
                component: AdmissionPeriodView,
              },
              {
                name: "ExpertiseAndProgramView",
                path: "/home-page/:username/program-configuration/expertise-and-programs",
                component: ExpertiseAndProgramView,
              },
            ],
          },
          {
            name: "ParentView",
            path: "/home-page/:username/parent",
            component: ParentView,
          },
          {
            name: "TeacherView",
            path: "/home-page/:username/teacher",
            component: TeacherView,
          },
          {
            name: "TeacherEditView",
            path: "/home-page/:username/teacher-edit/:id",
            component: TeacherEditView,
          },
          {
            name: "DashBoardView",
            path: "/home-page/:username/dashboard",
            component: DashBoardView,
          },
          {
            name: "ClassView",
            path: "/home-page/:username/class",
            component: ClassView,
          },
          {
            name: "StudentCreationView",
            path: "/home-page/:username/student-creation",
            component: StudentCreationView,
          },
          {
            name: "ParentCreationView",
            path: "/home-page/:username/parent-creation",
            component: ParentCreationView,
          },
          {
            name: "RegistrationView",
            path: "/home-page/:username/registration",
            component: RegistrationView,
          },
          {
            name: "AccountView",
            path: "/home-page/:username/account",
            component: AccountView,
          },
          {
            name: "ParentEditView",
            path: "/home-page/:username/parent-edit/:id",
            component: ParentEditView,
          },
          {
            name: "RegisterAdditionView",
            path: "/home-page/:username/registration-addition-admin",
            component: RegisterAdditionView,
          },
          {
            name: "CategoryView",
            path: "/home-page/:username/category",
            component: CategoryView,
          },
          {
            name: "TeacherCreationView",
            path: "/home-page/:username/teacher",
            component: TeacherCreationView,
          },
        ],
      },
    ],
  });
  router.beforeEach((to, from, next) => {
    if (to.name === from.name) {
      return next();
    }
    next();
    if (to.matched.some((record) => record.meta.requireAuth)) {
      if (localStorage.getItem("user") == null) {
        next({
          path: "/sign",
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });
  return router;
}
