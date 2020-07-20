import Vue from 'vue';
import axios from 'axios';
import router from '../../router';
import { Message } from 'element-ui';
let common = {
    /**
     * @method get - get请求.
     * @param {string} url - 请求路径.
    */
    get(url, data) {
        return new Promise((resolve, reject) =>{
            axios.get(url, { params: data, retry: 2, retryDelay: 100 }).then(res => {
                if(res.data.code === 0) {
                    resolve(res.data);
                }else {
                    sucErrFun(res);
                    reject(res.data);
                }
            }).catch(err =>{
                errorFun(err);
                reject(err.data)        
            })
        })
    },
    /**
     * @method post - post请求.
     * @param {string} url - 请求路径.
     * @param {Object} data - 请求参数.
    */
    post(url, data) {
        return new Promise((resolve, reject) =>{        
            axios.post(url, data, { retry: 2, retryDelay: 100 }).then(res => {
                if(res.data.code === 0) {
                    resolve(res.data);
                }else {
                    sucErrFun(res);
                    reject(res.data);
                }
            }).catch(err =>{
                errorFun(err);
                reject(err.data)        
            })
        })
    },
    /**
     * @method patch - patch请求.
     * @param {string} url - 请求路径.
     * @param {Object} data - 请求参数.
    */
    patch(url, data) {
        return new Promise((resolve, reject) =>{        
            axios.patch(url, data, { retry: 2, retryDelay: 100 }).then(res => {
                if(res.data.code === 0) {
                    resolve(res.data);
                }else {
                    sucErrFun(res);
                    reject(res.data);
                }
            }).catch(err =>{
                errorFun(err);
                reject(err.data)        
            })
        })
    },
    /**
     * @method put - put请求.
     * @param {string} url - 请求路径.
     * @param {Object} data - 请求参数.
    */
    put(url, data) {
        return new Promise((resolve, reject) =>{        
            axios.put(url, data, { retry: 2, retryDelay: 100 }).then(res => {
                if(res.data.code === 0) {
                    resolve(res.data);
                }else {
                    sucErrFun(res);
                    reject(res.data);
                }
            }).catch(err =>{
                errorFun(err);
                reject(err.data)        
            })
        })
    },
    /**
     * @method delete - delete请求.
     * @param {string} url - 请求路径.
     * @param {Object} data - 请求参数.
    */
    patch(url, data) {
        return new Promise((resolve, reject) =>{        
            axios.patch(url, data, { retry: 2, retryDelay: 100 }).then(res => {
                if(res.data.code === 0) {
                    resolve(res.data);
                }else {
                    sucErrFun(res);
                    reject(res.data);
                }
            }).catch(err =>{
                errorFun(err);
                reject(err.data)        
            })
        })
    },
    /**
     * @method put - put请求.
     * @param {string} url - 请求路径.
    */
    put(url, data) {
        return new Promise((resolve, reject) =>{        
            axios.put(url, data, { retry: 2, retryDelay: 100 }).then(res => {
                if(res.data.code === 0) {
                    resolve(res.data);
                }else {
                    sucErrFun(res);
                    reject(res.data);
                }
            }).catch(err =>{
                errorFun(err);
                reject(err.data)        
            })
        })
    },
    /**
     * @method delete - delete请求.
     * @param {string} url - 请求路径.
    */
    delete(url, data) {
        return new Promise((resolve, reject) =>{        
            axios.delete(url, { data, retry: 2, retryDelay: 100 }).then(res => {
                if(res.data.code === 0) {
                    resolve(res.data);
                }else {
                    sucErrFun(res);
                    reject(res.data);
                }
            }).catch(err =>{
                errorFun(err);
                reject(err.data)        
            })
        })
    },
    requestAll(arr) {
        axios.all(arr)
        .then(
            axios.spread(() => {
                console.log('全部加载完成')
            })
        )
        .catch(err => {
            console.log(err.response)
        });
    }
}
function sucErrFun(res) {
    if(res.data.code === 10060) {
        if(res.data.data[Object.keys(res.data.data)[0]] && res.data.data[Object.keys(res.data.data)[0]][0]){
            let msg = res.data.data[Object.keys(res.data.data)[0]];
            Message({
                message: msg[0],
                type: 'warning'
            })
        }else {
            Message({
                message: res.data.msg,
                type: 'warning'
            }) 
        }
    }else {
        Message({
            message: res.data.msg,
            type: 'warning'
        }) 
    }
}
function errorFun(err) {
    // 没有登录或者cookie过期
    if(err.response) {
        if(err.response.status == 403) {
            localStorage.clear();
            router.replace({path: '/'}).catch(data => {  });
        }
    }
    // Message({
    //     type: 'error',
    //     message: err.response.data.detail
    // })
}
export default common;