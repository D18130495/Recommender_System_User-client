import request from '@/utils/request'

// @ts-ignore
export default {
    fuzzySearchMovieAndBookByTitleOrYear(substring: any, type:any) {
        return request({
            url: `/search/fuzzySearchMovieAndBookByTitleOrYear`,
            method: 'get',
            params: {
                substring: substring,
                type: type
            }
        })
    }
}
