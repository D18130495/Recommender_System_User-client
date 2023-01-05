import request from '@/utils/request'

// @ts-ignore
export default {
    googleLogin(userInfo: any) {
        return request({
            url: `/authentication/googleLogin`,
            method: 'post',
            params: userInfo
        })
    }
}
