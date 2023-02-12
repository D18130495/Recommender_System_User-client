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
    },
    getRecommendMovieListByUserCF(email: any, type:any) {
        return request({
            url: `/recommendation/getRecommendMovieListByUserCF`,
            method: 'get',
            params: {
                email: email,
                type: type
            }
        })
    },
    getRecommendBookListByItemCF(email: any) {
        return request({
            url: `/recommendation/getRecommendBookListByItemCF`,
            method: 'get',
            params: {
                email: email
            }
        })
    },
    getRecommendBookListByUserCF(email: any, type:any) {
        return request({
            url: `/recommendation/getRecommendBookListByUserCF`,
            method: 'get',
            params: {
                email: email,
                type: type
            }
        })
    },
    getBooksLikeThis(isbn: any) {
        return request({
            url: `/recommendation/getBooksLikeThis`,
            method: 'get',
            params: {
                isbn: isbn
            }
        })
    }
}
