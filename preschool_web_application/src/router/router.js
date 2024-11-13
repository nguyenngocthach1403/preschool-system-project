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
import CategoryView from "../presentations/category_page/component/tab.vue";
import ParentStudentCreationView from "../presentations/registration_page/view/parent_and_student_creation.vue";
import ProgramConfigurationView from "../presentations/program_configuration_page/views/program_configuration_page.vue";
import AdmissionPeriodView from "../presentations/program_configuration_page/views/admission_period_view.vue";
import TeacherCreationView from "../presentations/teacher_page/view/teacher_create.vue";
import StudentDetailView from "../presentations/student_detail_page/views/student_detail_page.vue";
import TeacherEditView from "../presentations/teacher_page/view/teacher_edit.vue";
import AssignmentView from "../presentations/assignmet_page/views/assignment_page.vue";
//==============Parent==================//
import HomePageParent from "../presentations/home_page/views/home_page_parent.vue";
import ParentDetailView from "../presentations/parent_page/view_parentLogin/parent_detail.vue";
import StudentDetailParentView from "../presentations/parent_page/view_parentLogin/student_detail.vue";
import ParentDetailInfoView from "../presentations/parent_page/view_detail_i4/parent_detail_view.vue";
import StudentDetailViewOfParent from "../presentations/student_detail_page/views/student_detail_page.vue";
import HistoryClassView from "../presentations/parent_page/view_detail_i4/class_history_view.vue";

import HomePageTeacher from "../presentations/home_page/views/home_page_teacher.vue";
import InfoTeacherView from "../presentations/teacher_login/views/info_view.vue";
import ClassTeacherDetailView from "../presentations/teacher_login/views/info_class_view.vue";
import ClassCurentDetailView from "../presentations/teacher_login/view_info_class_detail/class_current_view.vue";
import ClassHistoryView from "../presentations/teacher_login/view_info_class_detail/class_history_view.vue";
import ExpertiseAndProgramView from "../presentations/program_configuration_page/views/expertise_and_programs.vue";
import MenuFoodStudent from "../presentations/parent_page/view_detail_i4/menu_food_weekly.vue";
import TeacherEvalutionView from "../presentations/teacher_login/component/evalution_view.vue";
import TeacherEvalutionDetailView from "../presentations/teacher_login/component/evalution_detail.vue";
// import ClassHistoryView from "../presentations/teacher_login/view_info_class_detail/class_before_view.vue";
// import ExpertiseAndProgramView from "../presentations/program_configuration_page/views/expertise_and_programs.vue";

//===========ClassDetail================//
import ClassDetailPage from "../presentations/class_detail_page/class_detail_page.vue";
import ClassScheduleView from "../presentations/class_detail_page/views/class_schedule_view.vue";
import ClassMenuView from "../presentations/class_detail_page/views/class_menu_detail_view_demo.vue";
import ClassManagerView from "../presentations/class_detail_page/views/class_teachers_view.vue";
import ClassMemberView from "../presentations/class_detail_page/views/student_list_view.vue";
import StudentReviewManagementView from "../presentations/class_detail_page/views/evaluation_management_view.vue";
import EvaluattionDetailView from "../presentations/class_detail_page/views/evaluation_detail.vue";

import HomePageView from "../presentations/home_page_user/views/news_view.vue";
import Home from "../presentations/home_page_user/views/home_page.vue";

//============Menu=================//
import MenuManagementView from "../presentations/menu_page/views/menu_page.vue";
import DishesView from "../presentations/menu_page/views/dishes_view.vue";
import MealView from "../presentations/menu_page/views/meals_view.vue";
import ClassMenuManagement from "../presentations/menu_page/views/menu_manager_view.vue";
//============Schedule============//
import SchedulePage from "../presentations/schedule_page/schedule_page.vue";
import ActivityView from "../presentations/schedule_page/views/activity_view.vue";
import TimetableView from "../presentations/schedule_page/views/timetable_view.vue";

import NewsView from "../presentations/home_page_user/views/news_view.vue";
import DetailNewsView from "../presentations/home_page_user/views/detail_news_view.vue";
import IntroduceView from "../presentations/home_page_user/views/introduce_view.vue";
import CreateNewsView from "../presentations/news/create_news_view.vue";
import EditNewsView from "../presentations/news/edit_news_view.vue";

import CreateSlideView from "../presentations/home_page_management/create_slide_view.vue";
import EditSlideView from "../presentations/home_page_management/update_slide_view.vue";

import HomePageSlideView from "../presentations/home_page_management/view.vue";
import NewsManagementView from "../presentations/news/view.vue";
import SettingHomePageView from "../presentations/setting_home_page_user/view/view_setting.vue";
import EditSettingHomePageView from "../presentations/setting_home_page_user/view/edit_view.vue";
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
        name: "Home",
        path: "/",
        component: Home,
        meta: {
          requireAuth: false,
        },
      },
      {
        name: "NewsView",
        path: "/tin-tuc",
        component: NewsView,
        meta: {
          requireAuth: false,
        },
      },
      {
        name: "IntroduceView",
        path: "/gioi-thieu",
        component: IntroduceView,
        meta: {
          requireAuth: false,
        },
      },
      {
        name: "DetailNewsView",
        path: "/chi-tiet/:id",
        component: DetailNewsView,
        meta: {
          requireAuth: false,
        },
      },
      {
        name: "RegistrationFormView",
        path: "/ghi-danh",
        component: RegistrationForm,
        meta: {
          requireAuth: false,
        },
      },
      //Parent View Login
      {
        path: "/home-page-parent/",
        name: "homepage-parent",
        component: HomePageParent,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            name: "ParentDetailView",
            path: "/home-page/parent-detail-view",
            component: ParentDetailView,
          },
          {
            name: "StudentDetailParentView",
            path: "/home-page/student-detail-parent-view",
            component: StudentDetailParentView,
            // beforeEnter(to, from) {
            //   if (!to.query.parentId) {
            //     return from.path;
            //   }
            // },
          },
          {
            name: "MenuFoodStudent",
            path: "/home-page/student-menu-food-view",
            component: MenuFoodStudent,
          },
          {
            name: "ParentDetailInfoView",
            path: "/home-page/parent-info-detail-view",
            component: ParentDetailInfoView,
          },
          {
            name: "HistoryClassView",
            path: "/home-page/history-class",
            component: HistoryClassView,
          },
          {
            name: "StudentDetailViewOfParent",
            path: "/home-page/student/detail",
            component: StudentDetailViewOfParent,
            beforeEnter(to, from) {
              if (to.query.studentID == null) {
                return from.path;
              }
            },
          },
        ],
      },
      // Teacher View Login
      {
        path: "/home-page-teacher/",
        name: "homepage-teacher",
        component: HomePageTeacher,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            name: "InfoTeacherView",
            path: "/home-page/info-detail-view",
            component: InfoTeacherView,
          },
          {
            name: "ClassTeacherDetailView",
            path: "/home-page/info-class-detail-view",
            component: ClassTeacherDetailView,
          },
          {
            name: "ClassCurentDetailView",
            path: "/home-page/info-class-current-detail-view",
            component: ClassCurentDetailView,
          },
          {
            name: "ClassHistoryView",
            path: "/home-page/info-class-history-detail-view",
            component: ClassHistoryView,
          },
          {
            name: "TeacherEvalutionView",
            path: "/home-page/evalution/:id",
            component: TeacherEvalutionView,
          },
          {
            name: "TeacherEvalutionDetailView",
            path: "/home-page/evalution-detail",
            component: TeacherEvalutionDetailView,
            beforeEnter(to, from) {
              if (!to.query.classID || !to.query.evaluationId) {
                return from.path;
              }
            },
          },
        ],
      },
      {
        path: "/home",
        name: "homepage",
        component: HomePage,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            name: "StudentView",
            path: "/home/students",
            component: StudentView,
          },
          {
            name: "AssignmentView",
            path: "/home/asignment",
            component: AssignmentView,
          },
          {
            name: "StudentDetailView",
            path: "/home/students/detail",
            component: StudentDetailView,
            beforeEnter(to, from) {
              if (to.query.studentID == null) {
                return from.path;
              }
            },
          },
          {
            name: "ParentStudentCreationView",
            path: "/home/registration/create_parent_student",
            component: ParentStudentCreationView,
          },
          {
            name: "ClassDetailPage",
            path: "/home/classes/detail",
            component: ClassDetailPage,
            beforeEnter(to, from) {
              if (!to.query.classID) {
                return from.path;
              }
            },
            children: [
              {
                name: "ClassScheduleView",
                path: "/home/classes/detail/schedule",
                component: ClassScheduleView,
                beforeEnter(to, from) {
                  if (!to.query.classID) {
                    return from.path;
                  }
                },
              },
              {
                name: "StudentReviewManagementView",
                path: "/home/classes/detail/student_preview_management",
                component: StudentReviewManagementView,
                beforeEnter(to, from) {
                  if (!to.query.classID) {
                    return from.path;
                  }
                },
                // children: [
                //   {
                //     name: "EvaluattionDetailView",
                //     path: "/home/classes/detail/student_preview_management/evaluation_detail",
                //     component: EvaluattionDetailView,
                //     beforeEnter(to, from) {
                //       if (!to.query.classID || !to.query.evaluationId) {
                //         return from.path;
                //       }
                //     },
                //   },
                // ],
              },
              {
                name: "EvaluattionDetailView",
                path: "/home/classes/detail/student_preview_management",
                component: EvaluattionDetailView,
                beforeEnter(to, from) {
                  if (!to.query.classID || !to.query.evaluationId) {
                    return from.path;
                  }
                },
              },

              {
                name: "ClassMenuView",
                path: "/home/classes/detail/menu",
                component: ClassMenuView,
                beforeEnter(to, from) {
                  if (!to.query.classID) {
                    return from.path;
                  }
                },
              },
              {
                name: "ClassManagerView",
                path: "/home/classes/detail/managers",
                component: ClassManagerView,
                beforeEnter(to, from) {
                  if (!to.query.classID) {
                    return from.path;
                  }
                },
              },
              {
                name: "ClassMemberView",
                path: "/home/classes/detail/members",
                component: ClassMemberView,
                beforeEnter(to, from) {
                  if (!to.query.classID) {
                    return from.path;
                  }
                },
              },
            ],
          },
          {
            name: "SchedulePage",
            path: "/home/schedule_manage_page",
            component: SchedulePage,
            children: [
              {
                name: "ActivityView",
                path: "/home/schedule_manage_page/activity",
                component: ActivityView,
              },
              {
                name: "TimetableView",
                path: "/home/schedule_manage_page/timetables",
                component: TimetableView,
              },
            ],
          },
          {
            name: "ProgramConfigurationView",
            path: "/home/program-configuration",
            component: ProgramConfigurationView,
            children: [
              {
                name: "AdmissionPeriodView",
                path: "/home/program-configuration/addmission-period",
                component: AdmissionPeriodView,
              },
              {
                name: "ExpertiseAndProgramView",
                path: "/home/program-configuration/expertise-and-programs",
                component: ExpertiseAndProgramView,
              },
            ],
          },
          {
            name: "CategoryView",
            path: "/home/management",
            component: CategoryView,
            children: [
              {
                name: "HomePageSlideView",
                path: "/home/management/home-page",
                component: HomePageSlideView,
              },
              {
                name: "NewsManagementView",
                path: "/home/management/news",
                component: NewsManagementView,
              },
              {
                name: "SettingHomePageView",
                path: "/home/management/setting-page",
                component: SettingHomePageView,
              },
              {
                name: "CreateNewsView",
                path: "/home-page/management/create-news",
                component: CreateNewsView,
              },
              {
                name: "EditNewsView",
                path: "/home-page/management/edit-news/:id",
                component: EditNewsView,
              },
              {
                name: "CreateSlideView",
                path: "/home-page/create-slide",
                component: CreateSlideView,
              },
              {
                name: "EditSlideView",
                path: "/home-page/edit-slide/:id",
                component: EditSlideView,
              },
              {
                name: "EditSettingHomePageView",
                path: "/home-page/setting",
                component: EditSettingHomePageView,
              },
            ],
          },
          {
            name: "MenuManagementView",
            path: "/home/menu_management",
            component: MenuManagementView,
            children: [
              {
                name: "DishesView",
                path: "/home/menu_management/dishes",
                component: DishesView,
              },
              {
                name: "MealView",
                path: "/home/menu_management/meals",
                component: MealView,
              },
              {
                name: "ClassMenuManagement",
                path: "/home/menu_management/class_menu",
                component: ClassMenuManagement,
              },
            ],
          },
          {
            name: "ParentView",
            path: "/home/parent",
            component: ParentView,
          },
          {
            name: "TeacherView",
            path: "/home/teacher",
            component: TeacherView,
          },
          {
            name: "TeacherEditView",
            path: "/home/teacher-edit/:id",
            component: TeacherEditView,
          },
          {
            name: "DashBoardView",
            path: "/home/dashboard",
            component: DashBoardView,
          },
          {
            name: "ClassView",
            path: "/home/class",
            component: ClassView,
          },
          {
            name: "StudentCreationView",
            path: "/home/student-creation",
            component: StudentCreationView,
          },
          {
            name: "ParentCreationView",
            path: "/home/parent-creation",
            component: ParentCreationView,
          },
          {
            name: "RegistrationView",
            path: "/home/registration",
            component: RegistrationView,
          },
          {
            name: "AccountView",
            path: "/home/account",
            component: AccountView,
          },
          {
            name: "ParentEditView",
            path: "/home/parent-edit/:id",
            component: ParentEditView,
          },
          {
            name: "RegisterAdditionView",
            path: "/home/registration-addition-admin",
            component: RegisterAdditionView,
          },
          // {
          //   name: "CategoryView",
          //   path: "/home/category",
          //   component: CategoryView,
          // },
          {
            name: "TeacherCreationView",
            path: "/home/teacher",
            component: TeacherCreationView,
          },
          // {
          //   name: "CreateNewsView",
          //   path: "/home-page/create-news",
          //   component: CreateNewsView,
          // },
          // {
          //   name: "EditNewsView",
          //   path: "/home-page/edit-news/:id",
          //   component: EditNewsView,
          // },
          // {
          //   name: "CreateSlideView",
          //   path: "/home-page/create-slide",
          //   component: CreateSlideView,
          // },
          // {
          //   name: "EditSlideView",
          //   path: "/home-page/edit-slide/:id",
          //   component: EditSlideView,
          // },
        ],
      },
    ],
  });
  router.beforeEach((to, from, next) => {
    // if (to.name === from.name) {
    //   return next();
    // }
    // next();
    if (to.matched.some((record) => record.meta.requireAuth)) {
      if (localStorage.getItem("user") == null && !window.user) {
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
