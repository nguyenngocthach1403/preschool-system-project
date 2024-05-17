import { createRouter, createWebHistory } from "vue-router";

import DashBoardView from "@/presentations/dash_board_page/views/dash_board_page.vue";
import StudentView from "@/presentations/student_page/view/student_page.vue";
import ParentView from "@/presentations/parent_page/views/parent_page.vue";
import ClassView from "@/presentations/class_page/views/class_page.vue";
import StudentCreationView from "@/presentations/student_creation_page/views/student_creation_page.vue";
import ParentCreationView from "@/presentations/parent_page/views/parent_create_page.vue";
import HomePage from "@/presentations/home_page/views/home_page.vue";
import LoginView from "@/presentations/login_page/login_view.vue";
import RegistrationForm from "@/presentations/registration/view/registration-form.vue";
import ParentEditView from "@/presentations/parent_page/views/parent_edit_page.vue";
import RegistrationView from "../presentations/registration_page/view/registration_view.vue";
import AccountView from "../presentations/account_page/views/account_view.vue";
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
      },
      {
        name: "RegistrationFormView",
        path: "/register",
        component: RegistrationForm,
      },
      {
        name: "HomePage",
        path: "/home-page",
        component: HomePage,
        beforeEnter(to) {
          if (to.name !== "HomePage") {
            return "/home-page";
          }
        },
        children: [
          {
            name: "StudentView",
            path: "/students",
            component: StudentView,
          },
          {
            name: "ParentView",
            path: "/parents",
            component: ParentView,
          },
          {
            name: "DashBoardView",
            path: "/dashboard",
            component: DashBoardView,
          },
          {
            name: "ClassView",
            path: "/classes",
            component: ClassView,
          },
          {
            name: "StudentCreationView",
            path: "/students/create",
            component: StudentCreationView,
          },
          {
            name: "ParentCreationView",
            path: "/parents/create",
            component: ParentCreationView,
          },
          {
            name: "RegistrationView",
            path: "/registration_view",
            component: RegistrationView,
          },
          {
            name: "AccountView",
            path: "/account",
            component: AccountView,
          },
          {
            name: "ParentEditView",
            path: "/parents/edit/:id",
            component: ParentEditView,
          },
        ],
      },
    ],
  });
  return router;
}
