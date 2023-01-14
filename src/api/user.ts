import request from '@/utils/request'

// @ts-ignore
export default {
    systemRegister(userInfo: any) {
        return request({
            url: `/authentication/systemRegister`,
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
