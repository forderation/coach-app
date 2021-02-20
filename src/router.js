import { createRouter, createWebHistory } from "vue-router"
// import CoachDetail from "@/pages/coaches/CoachDetail";
// import CoachesList from "@/pages/coaches/CoachesList";
// import CoachRegistration from "@/pages/coaches/CoachRegistration";
// import ContactCoach from "@/pages/requests/ContactCoach"
// import RequestReceived from "@/pages/requests/RequestReceived";
// import NotFound from "@/pages/NotFound";
// import UserAuth from "@/pages/UserAuth/UserAuth";
import store from '@/store/index'

const CoachDetail = () => import("@/pages/coaches/CoachDetail")
const CoachesList = () => import("@/pages/coaches/CoachesList")
const CoachRegistration = () => import("@/pages/coaches/CoachRegistration")
const ContactCoach = () => import("@/pages/requests/ContactCoach")
const UserAuth = () => import("@/pages/UserAuth/UserAuth")
const RequestReceived = () => import("@/pages/requests/RequestReceived")
const NotFound = () => import("@/pages/NotFound")

const router = createRouter({
    "history": createWebHistory(),
    "routes": [
        {
            "path": '/',
            "redirect": '/coaches'
        },
        {
            "path": "/coaches",
            "component": CoachesList
        },
        {
            "path": '/coaches/:id',
            "component": CoachDetail,
            "props": true,
            "children": [
                { "path": 'contact', "component": ContactCoach, name: "contactCoach" }
            ]
        },
        {
            "path": '/register',
            "component": CoachRegistration,
            meta: {
                requiresAuth: true
            }
        },
        {
            "path": '/requests',
            "component": RequestReceived,
            meta: {
                requiresAuth: true
            }
        },
        {
            "path": '/auth',
            "component": UserAuth,
            meta: {
                requiresOffAuth: true
            }
        },
        {
            "path": '/:notFound(.*)',
            "component": NotFound
        }
    ]
})

router.beforeEach((to, _, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth')
    } else if (to.meta.requiresOffAuth && store.getters.isAuthenticated) {
        next('/coaches')
    } else {
        next()
    }
})

export default router