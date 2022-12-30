import request from '@/utils/request'

// @ts-ignore
export default {
    login(userInfo: any) {
        return request({
            url: `/authentication/login`,
            method: 'get',
            params: userInfo
        })
    }
}
