import request from '@/utils/request'

// @ts-ignore
export default {
    getRandomMovieList() {
        return request({
            url: `/book/getRandomBookList`,
            method: 'get'
        })
    },
}
