import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/xss',
    name: 'XSS',
    component: () => import(/* webpackChunkName: "xss" */ '@/views/XSS.vue'),
    children: [
      {
        path: '',
        alias: 'insecure',
        name: 'XSSInsecure',
        component: () => import(/* webpackChunkName: "xss-insecure" */ '@/components/xss/Insecure.vue'),
      },
      {
        path: 'secure',
        name: 'XSSSecure',
        component: () => import(/* webpackChunkName: "xss-secure" */ '@/components/xss/Secure.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
