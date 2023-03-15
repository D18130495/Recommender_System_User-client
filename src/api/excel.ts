import request from '@/utils/request'

// @ts-ignore
export default {
    exportUserData(email: any) {
        return request({
            url: `/excel/exportUserData`,
            method: 'get',
            params: {
                email: email
            },
            responseType: 'blob'
        })
    }
}
