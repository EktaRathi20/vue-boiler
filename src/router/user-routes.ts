import dashboard from '@/views/user/dashboard.vue'
import chat from '@/views/user/chat.vue'
import userListing from '@/views/user/user-listing.vue'

export const userRoutes = [
  {
    path: '',
    name: 'dasboard',
    component: dashboard,
  },
  {
    path: 'chat',
    name: 'chat',
    component: chat,
  },
  {
    path: 'user-list',
    name: 'userList',
    component: userListing,
  },
]
