import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import Package from '../components/Package'
import Config from '../components/Config'
import Task from '../components/Task'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Package
    }, {
      path: '/package',
      name: 'package',
      component: Package
    }, {
      path: '/config',
      name: 'config',
      component: Config
    }, {
      path: '/task',
      name: 'task',
      component: Task
    }, {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
