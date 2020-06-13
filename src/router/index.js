import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '@/views/Search'
import LearnMore from '@/views/LearnMore'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Search',
      component: Search
    },
    {
      path: '/',
      name: 'LearnMore',
      component: LearnMore
    }
]

const router = new VueRouter({
  routes
})

export default router
