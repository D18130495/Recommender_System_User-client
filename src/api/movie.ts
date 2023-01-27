import request from '@/utils/request'

// @ts-ignore
export default {
    getRandomMovieList() {
        return request({
            url: `/movie/getRandomMovieList`,
            method: 'get'
        })
    },
    getMovieByMovieId(movieId: any) {
        return request({
            url: `/movie/getMovieByMovieId/${movieId}`,
            method: 'get'
        })
    },
    getMovieRating(movieId: any, email: any) {
        return request({
            url: `/movie/rating/getMovieRating`,
            method: 'get',
            params: {
                movieId: movieId,
                email: email
            }
        })
    },
    addOrUpdateMovieRating(movieRate: any) {
        return request({
            url: `/movie/rating/addOrUpdateMovieRating`,
            method: 'post',
            data: movieRate
        })
    }
}
