import request from '@/utils/request'

// @ts-ignore
export default {
    exportUserData() {
        return request({
            url: `/excel/exportUserData`,
            method: 'get'
        })
    }
}
