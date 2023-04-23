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
        component: () => import(/* webpackChunkName: "about" */ '../views/Createresponse.vue'),
        props: (route) => ({ prompt: route.query.prompt, command: route.query.command })
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
    {
        path: '/autopay_on',
        name: 'autopay_on_ai',
        beforeEnter(to, from, next) {
            const learnUrl = `https://school.sweta-anti.com/ai_autopayOn_success_to_server`;
            window.open(learnUrl, '_blank');
            return false;
        },
    },
    {
        path: '/autopay_off',
        name: 'autopay_off_ai',
        beforeEnter(to, from, next) {
            const learnUrl = `https://school.sweta-anti.com/ai_autopayOff_success_to_server`;
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