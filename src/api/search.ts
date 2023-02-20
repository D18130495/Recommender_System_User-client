import request from '@/utils/request'

// @ts-ignore
export default {
    fuzzySearchMovieAndBookByTitle(titleSubstring: any) {
        return request({
            url: `/search/fuzzySearchMovieAndBookByTitle`,
            method: 'get',
            params: {
                titleSubstring: titleSubstring
            }
        })
    }
}
