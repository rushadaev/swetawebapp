import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/createresponse',
        name: 'Create Response',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Createresponse.vue')
    },
    {
        path: '/learn',
        name: 'Learn How To Use',
        beforeEnter() {
            window.open('https://teletype.in/@sweta_anti/Neuronet', '_blank')
            return false;
        }
    },
    {
        path: '/subscribe',
        name: 'subscribe_to_ai',
        beforeEnter(to, from, next) {
            const learnUrl = `https://school.sweta-anti.com/bot-subscribe?sid=${to.query.sb_id}&tgid=${to.query.tg_id}`;
            window.open(learnUrl, '_blank');
            return false;
        },
    },
]
const router = createRouter({
    history: createWebHistory('swetawebapp'),
    routes
})
export default router