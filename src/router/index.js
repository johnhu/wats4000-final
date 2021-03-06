import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '@/views/Search'
import LearnMore from '@/views/LearnMore'
import LandingPage from '@/views/LandingPage'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/results',
      name: 'Search',
      component: Search
    },
    {
      path: '/about',
      name: 'LearnMore',
      component: LearnMore
    }
]

const router = new VueRouter({
  routes
})

export default router
