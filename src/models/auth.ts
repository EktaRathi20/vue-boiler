export interface IRegister {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface ILogin {
    email: string
    password: string
}

export interface IForgotPassword {
    email: string
}

export interface IVerifyOTP {
    email: string
    otp: string
}

export interface IChangePassword {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export interface IResetPassword {
    newPassword: string
    confirmPassword: string
}