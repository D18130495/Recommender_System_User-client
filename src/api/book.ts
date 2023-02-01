import request from '@/utils/request'

// @ts-ignore
export default {
    getRandomBookList() {
        return request({
            url: `/book/getRandomBookList`,
            method: 'get'
        })
    },
    getBookByISBN(isbn: any) {
        return request({
            url: `/book/getBookByISBN/${isbn}`,
            method: 'get'
        })
    },
    getUserBookRating(isbn: any, email: any) {
        return request({
            url: `/book/rating/getUserBookRating`,
            method: 'get',
            params: {
                isbn: isbn,
                email: email
            }
        })
    },
    getUserBookFavourite(isbn: any, email: any) {
        return request({
            url: `/book/favourite/getUserBookFavourite`,
            method: 'get',
            params: {
                isbn: isbn,
                email: email
            }
        })
    },
    addOrUpdateUserBookRating(bookRate: any) {
        return request({
            url: `/book/rating/addOrUpdateUserBookRating`,
            method: 'post',
            data: bookRate
        })
    },
    likeOrUnlikeBook(bookFavourite: any) {
        return request({
            url: `/book/favourite/likeOrUnlikeBook`,
            method: 'post',
            data: bookFavourite
        })
    }
}
