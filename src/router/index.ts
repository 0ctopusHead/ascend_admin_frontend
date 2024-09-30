import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UploadView from '@/views/UploadView.vue'
import ManageFileView from '@/views/ManageFileView.vue'
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadView
    },
    {
      path: '/manage_file',
      name: 'manage',
      component: ManageFileView,
      props: (route) => ({ page: parseInt((route.query?.page as string) || '1') })
    },

  ]
})
router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
