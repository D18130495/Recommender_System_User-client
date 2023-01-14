import request from '@/utils/request'

// @ts-ignore
export default {
    userSystemRegister(userInfo: any) {
        return request({
            url: `/authentication/userSystemRegister`,
            method: 'post',
            params: userInfo
        })
    },
    userSystemLogin(userInfo: any) {
        return request({
            url: `/authentication/userSystemLogin`,
            method: 'post',
            params: userInfo
        })
    },
    googleLogin(userInfo: any) {
        return request({
            url: `/authentication/googleLogin`,
            method: 'post',
            params: userInfo
        })
    },
    getUserDetail(email: any) {
        return request({
            url: `/user/detail`,
            method: 'get',
            params: email
        })
    }
}
