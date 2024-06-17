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
import CategoryView from "../presentations/category_page/views/category_page.vue";
const router = Router();
export default router;
function Router() {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        name: "LoginView",
        path: "/",
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
            name: "ParentView",
            path: "/home-page/:username/parent",
            component: ParentView,
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
        ],
      },
    ],
  });
  router.beforeEach((to, from) => {
    if (localStorage.getItem("user") !== null) {
      if (to.meta.requireAuth && !window.user) {
        alert("You are not logged in");
        return "/";
      }
    }
  });
  return router;
}
