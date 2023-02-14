import request from '@/utils/request'

// @ts-ignore
export default {
    sendUserSystemRegisterVerificationCode(email: any) {
        return request({
            url: `/email/sendUserSystemRegisterVerificationCode`,
            method: 'get',
            params: {
                email: email
            }
        })
    },
    sendUserResetPassword(email: any) {
        return request({
            url: `/email/sendUserResetPassword`,
            method: 'get',
            params: {
                email: email
            }
        })
    },
    sendChangePasswordVerificationCode(email: any) {
        return request({
            url: `/email/sendChangePasswordVerificationCode`,
            method: 'get',
            params: {
                email: email
            }
        })
    }
}
