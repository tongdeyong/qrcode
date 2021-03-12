import { createRouter, createWebHashHistory } from 'vue-router'
import Qrcode from '../views/Qrcode'
import Timer from '../views/Timer'
import Dashboard from '@/views/Dashboard'
import Encrypt from '@/views/Encrypt'
export const routes = [
  {
    path: '/',
    name: '首页',
    component: Dashboard
  },
  {
    path: '/1',
    name: '生成二维码',
    component: Qrcode
  },
  {
    path: '/2',
    name: '时间戳转换',
    component: Timer
  },
  {
    path: '/3',
    name: '加密解密',
    component: Encrypt
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
