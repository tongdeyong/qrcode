import { createRouter, createWebHashHistory } from 'vue-router'
import Qrcode from '../views/Qrcode'
import Timer from '../views/Timer'
const routes = [
  {
    path: '/',
    redirect: '/qrcode'
  },
  {
    path: '/qrcode',
    name: 'Qrcode',
    component: Qrcode
  },
  {
    path: '/timer',
    name: 'Timer',
    component: Timer
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
