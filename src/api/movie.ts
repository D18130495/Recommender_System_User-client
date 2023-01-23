import request from '@/utils/request'

// @ts-ignore
export default {
    getRandomMovieList() {
        return request({
            url: `/movie/getRandomMovieList`,
            method: 'get'
        })
    }
}
