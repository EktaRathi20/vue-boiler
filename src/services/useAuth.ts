import ApiService from '@/middleware/ApiClient'
import type { ILogin, IRegister, IForgotPassword, IVerifyOTP, IChangePassword, IResetPassword } from '@/models'
import { withLoader } from '@/utils'

export const useAuth = () => {
    const registerUser = (data: IRegister) => withLoader(() => ApiService.post('/register', data))
    const loginUser = (data: ILogin) => withLoader(() => ApiService.post('/login', data))
    const forgotPassword = (data: IForgotPassword) =>
        withLoader(() => ApiService.post('/forgot-password', data))
    const verifyOtp = (data: IVerifyOTP) => withLoader(() => ApiService.post('/verify-otp', data))
    const changePassword = (data: IChangePassword) =>
        withLoader(() => ApiService.post('/change-password', data))
    const resetPassword = (data: IResetPassword) =>
        withLoader(() => ApiService.post('/change-password', data))

    return {
        loginUser,
        registerUser,
        forgotPassword,
        verifyOtp,
        changePassword,
        resetPassword,
    }
}
