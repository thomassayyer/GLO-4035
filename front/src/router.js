import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Request1 from './views/Request1.vue';
import Request2 from './views/Request2.vue';
import Request3 from './views/Request3.vue';
import Request4 from './views/Request4.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/request1',
      name: 'Request1',
      component: Request1,
    },
    {
      path: '/request2',
      name: 'Request2',
      component: Request2,
    },
    {
      path: '/request3',
      name: 'Request3',
      component: Request3,
    },
    {
      path: '/request4',
      name: 'Request4',
      component: Request4,
    },
  ],
});
