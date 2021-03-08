import { createRouter, createWebHashHistory } from 'vue-router'
import Qrcode from '../views/Qrcode'
import Timer from '../views/Timer'
import Dashboard from '@/views/Dashboard'
export const routes = [
  {
    path: '/',
    name: '首页',
    component: Dashboard
  },
  {
    path: '/qrcode',
    name: '生成二维码',
    component: Qrcode
  },
  {
    path: '/timer',
    name: '时间戳转换',
    component: Timer
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
