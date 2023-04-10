import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'XSSInnnertext',
    component: () => import(/* webpackChunkName: "xss-innertext" */ '@/components/xss/InnerText.vue'),
  },
  {
    path: '/insecure',
    name: 'XSSInsecure',
    component: () => import(/* webpackChunkName: "xss-insecure" */ '@/components/xss/Insecure.vue'),
  },
  {
    path: '/secure',
    name: 'XSSSecure',
    component: () => import(/* webpackChunkName: "xss-secure" */ '@/components/xss/Secure.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
