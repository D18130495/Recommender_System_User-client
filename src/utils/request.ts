import axios from 'axios'

import { ElMessage, ElMessageBox } from 'element-plus'

import { useUserStore } from '@/stores/user'

import cookies from "js-cookie"

import router from "@/router";


// create an axios instance
const service = axios.create({
    baseURL: 'http://localhost:9001',
    // baseURL: 'https://server.finterests.com/',
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

        if(response.config.url === '/excel/exportUserData') {
            return response
        }

        if(res.code !== 200) {
            if(res.code === 201) {
                ElMessage.error(res.message)
            }else if(res.code === 202) {
                // server token expired, front cookie not expired
                userStore.userInfo = ''
                userStore.token = ''
                sessionStorage.removeItem('token')
                cookies.remove('token')

                ElMessageBox.confirm(
                    'You login time expired, cancel to go home page, or log in again',
                    'Confirm logout',
                    {
                        confirmButtonText: 'Login',
                        cancelButtonText: 'Cancel',
                        type: 'warning'
                    }
                ).then(() => {
                    userStore.userInfo = ''
                    userStore.token = ''
                    sessionStorage.removeItem('token')

                    router.push({ path: '/authentication' })
                }).catch(() => {
                    userStore.userInfo = ''
                    userStore.token = ''
                    sessionStorage.removeItem('token')

                    router.push({ path: '/' })
                })
            }else if(res.code === 401) {
                // request server without token
                ElMessageBox.confirm(
                    'Please login to visit this page',
                    'Not Authenticated',
                    {
                        confirmButtonText: 'Login',
                        cancelButtonText: 'Cancel',
                        type: 'warning'
                    }
                ).then(() => {
                    userStore.userInfo = ''
                    userStore.token = ''
                    sessionStorage.removeItem('token')

                    router.push({ path: '/authentication' })
                }).catch(() => {
                    userStore.userInfo = ''
                    userStore.token = ''
                    sessionStorage.removeItem('token')

                    router.push({ path: '/' })
                })
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
)

export default service
