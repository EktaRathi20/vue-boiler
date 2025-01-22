export default {
  common: {
    optional: '(optional)',
    submit: 'Submit',
    nonempty: 'This field is required.',
    compressedImage: 'Compressed Image',
    send: 'Send',
    errors: {
      '401': {
        title: 'Unauthorized',
        message: 'Please log in again.',
      },
      '403': {
        title: 'Forbidden',
        message: 'You do not have permission to perform this action.',
      },
      '404': {
        title: 'Not Found',
        message: 'Requested resource was not found.',
      },
      '500': {
        title: 'Server Error',
        message: 'An error occurred on the server. Please try again later.',
      },
      default: {
        title: 'Unexpected Error',
        message: 'Error {status}: {data}',
      },
      noResponse: {
        title: 'No Response',
        message: 'The server did not respond. Please check your connection.',
      },
      requestError: {
        title: 'Request Error',
        message: 'Error setting up the request: {message}',
      },
    },
  },
  auth: {
    common: {
      email: 'Email',
      password: 'Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      googleLogin: 'Login with Google',
    },
    register: {
      title: 'Register',
      firstName: 'First Name',
      lastName: 'Last Name',
      alreadyHaveAccount: 'Already have an account ?',
    },
    login: {
      title: 'Login',
      forgotPassword: 'Forgot Password ?',
      newAccount: 'Create a new account?',
    },
    forgotPassword: {
      title: 'Forgot Password',
      sendResetLink: 'Send Reset Link',
      rememberPassword: 'Remember your password?',
    },
    resetPassword: {
      title: 'Reset Password',
    },
    verifyOTP: {
      title: 'Verify OTP',
      otp: 'OTP',
    },
    changePassword: {
      title: 'Change Password',
      currentPassword: 'Current Password',
    },
    error: {
      password: 'Password must be at least 8 characters long and include at least one letter and one number',
      email: 'Invalid email address',
      passwordsDoNotMatch: 'Confirm Password shpould match New Password',
    },
  },
  chat: {
    chatRoom: 'Chat Room'
  },
  filter: {
    applyFilter: 'Apply Filte'
  }
}
