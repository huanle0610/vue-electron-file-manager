import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
    },
    {
      path: '/check-update',
      name: 'check-update',
      component: require('@/components/CheckUpdate').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})
