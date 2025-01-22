import login from '@/views/auth/login.vue'
import register from '@/views/auth/register.vue'
import forgotPassword from '@/views/auth/forgot-password.vue'
import verifyOtp from '@/views/auth/verify-otp.vue'
import changePassword from '@/views/auth/change-password.vue'
import resetPassword from '@/views/auth/reset-password.vue'

export const authRoutes = [
    {
        path: '',
        name: 'register',
        component: register,
    },
    {
        path: 'login',
        name: 'login',
        component: login,
    },
    {
        path: 'forgot-password',
        name: 'forgotPassword',
        component: forgotPassword,
    },
    {
        path: 'verify-otp',
        name: 'verifyOtp',
        component: verifyOtp,
    },
    {
        path: 'change-password',
        name: 'changePassword',
        component: changePassword,
    },
    {
        path: 'reset-password',
        name: 'resetPassword',
        component: resetPassword,
    }
]