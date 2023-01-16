import axios from 'axios'

import { ElMessage } from 'element-plus'

import { useUserStore } from '@/stores/user'

import cookies from "js-cookie"


// create an axios instance
const service = axios.create({
    baseURL: 'http://localhost:9001',
    timeout: 50000
})

// request interceptor
service.interceptors.request.use(
    config => {
        const userStore = useUserStore()

        if(userStore.token) {
            config.headers['Authorization'] = 'Bearer ' + userStore.token
        }

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const userStore = useUserStore()
        const res = response.data

        if(res.code !== 200) {
            if(res.code === 201) {
                ElMessage.error(res.message)
            }else if(res.code === 202) {
                ElMessage.error("Token expired")

                userStore.userInfo = ''
                userStore.token = ''
                sessionStorage.removeItem('token')
                cookies.remove('token')
            }else if(res.code === 403) {
                ElMessage.error("Permission denied")
            }else {
                ElMessage.error('Something wrong')
            }

            return Promise.reject(new Error(res.message || 'Error'))
        }else {
            return response
        }
    },
    error => {
        ElMessage.error('Network Error can not reach server')

        return Promise.reject(error)
    }
    // response => {
    //     // if the custom code is not 200, it is judged as an error.
    //     if (res.code !== 200) {
    //         Message({
    //             message: res.message || 'Error',
    //             type: 'error',
    //             duration: 5 * 1000
    //         })
    //
    //         // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //         if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //             // to re-login
    //             MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //                 confirmButtonText: 'Re-Login',
    //                 cancelButtonText: 'Cancel',
    //                 type: 'warning'
    //             }).then(() => {
    //                 store.dispatch('user/resetToken').then(() => {
    //                     location.reload()
    //                 })
    //             })
    //         }
    //         return Promise.reject(new Error(res.message || 'Error'))
    //     } else {
    //         return res
    //     }
    // }
)

export default service
