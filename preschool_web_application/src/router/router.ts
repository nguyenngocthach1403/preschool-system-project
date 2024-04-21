import {createRouter, createWebHistory} from 'vue-router'

import DashBoardView from '@/presentations/dash_board_page/views/dash_board_page.vue';
import StudentView from '@/presentations/student_page/view/student_page.vue';
import ParentView from '@/presentations/parent_page/views/parent_page.vue';
import ClassView from '@/presentations/class_page/views/class_page.vue';
import StaffView from '@/presentations/staff_page/views/staff_page.vue';
import AccountView from '@/presentations/account_page/views/account_page.vue';



const router = Router()
export default router;
function Router()
{
    const router = createRouter({
        history: createWebHistory(),
        routes: [
            {
                name: 'DashBoardView',
                path: '/',
                component: DashBoardView
            },
            {
                name: 'StudentView',
                path: '/students',
                component: StudentView
            },
            {
                name: 'ParentView',
                path: '/parents',
                component: ParentView
            },
            {
                name: 'ClassView',
                path: '/classes',
                component: ClassView
            },
            {
                name: 'Staffs',
                path: '/staffs',
                component: StaffView
            },
            {
                name: 'Account',
                path: '/account',
                component: AccountView
            },
        ]
    });
    return router
}