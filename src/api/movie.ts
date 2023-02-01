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
    getUserMovieRating(movieId: any, email: any) {
        return request({
            url: `/movie/rating/getUserMovieRating`,
            method: 'get',
            params: {
                movieId: movieId,
                email: email
            }
        })
    },
    getUserMovieFavourite(movieId: any, email: any) {
        return request({
            url: `/movie/favourite/getUserMovieFavourite`,
            method: 'get',
            params: {
                movieId: movieId,
                email: email
            }
        })
    },
    addOrUpdateUserMovieRating(movieRate: any) {
        return request({
            url: `/movie/rating/addOrUpdateUserMovieRating`,
            method: 'post',
            data: movieRate
        })
    },
    likeOrUnlikeMovie(movieFavourite: any) {
        return request({
            url: `/movie/favourite/likeOrUnlikeMovie`,
            method: 'post',
            data: movieFavourite
        })
    }
}
