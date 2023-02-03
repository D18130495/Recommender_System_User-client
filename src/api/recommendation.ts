import request from '@/utils/request'

// @ts-ignore
export default {
    getRecommendMovieListByItemCF(email: any) {
        return request({
            url: `/recommendation/getRecommendMovieListByItemCF`,
            method: 'get',
            params: {
                email: email
            }
        })
    }
}
