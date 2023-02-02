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
    getUserLikeAndRatingMovieCount(email: any) {
        return request({
            url: `/user/getUserLikeAndRatingMovieCount`,
            method: 'get',
            params: {
                email: email
            }
        })
    },
    getUserLikeAndRatingBookCount(email: any) {
        return request({
            url: `/user/getUserLikeAndRatingBookCount`,
            method: 'get',
            params: {
                email: email
            }
        })
    },
    getUserMovieLikeList(email: any) {
        return request({
            url: `/user/getUserMovieLikeList`,
            method: 'get',
            params: {
                email: email
            }
        })
    },
    getUserMovieRatingList(email: any) {
        return request({
            url: `/user/getUserMovieRatingList`,
            method: 'get',
            params: {
                email: email
            }
        })
    },
    getUserBookLikeList(email: any) {
        return request({
            url: `/user/getUserBookLikeList`,
            method: 'get',
            params: {
                email: email
            }
        })
    },
    getUserBookRatingList(email: any) {
        return request({
            url: `/user/getUserBookRatingList`,
            method: 'get',
            params: {
                email: email
            }
        })
    }
}
