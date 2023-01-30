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
    tokenLoginRefresh(token: any) {
        return request({
            url: `/authentication/tokenLoginRefresh`,
            method: 'get',
            params: {
                token: token
            }
        })
    },
    getUserDetailByToken(token: any) {
        return request({
            url: `/user/getUserDetailByToken`,
            method: 'get',
            params: {
                token: token
            }
        })
    },
    getUserDetailByEmail(email: any) {
        return request({
            url: `/user/getUserDetailByEmail`,
            method: 'get',
            params: {
                email: email
            }
        })
    },
    updateUserDetail(userInfo: any) {
        return request({
            url: `/user/updateUserDetail`,
            method: 'put',
            data: userInfo
        })
    },
    getUserLikeList(email: any) {
        return request({
            url: `/user/getUserLikeList`,
            method: 'get',
            params: {
                email: email
            }
        })
    }
}
