import axios from 'axios'

switch (process.env.NODE_ENV) {
    // 生产环境，部署到服务器上的环境
    case 'PROD':
        axios.defaults.baseURL = 'http://192.168.58.77:8088';
        break;
    //开发环境接口地址
    default:
        axios.defaults.baseURL = 'http://localhost:8088'
}

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('na-token')
    token && (config.headers.Authoriztion = token)
    return config
}, err => Promise.reject(err))

// 若get请求的url中带问号，则将url上的参数截取，改为对象形式传参
axios.interceptors.request.use(config => {
    if (config.method === 'get') {
        const url = config.url
        const index = url.indexOf('?')
        if (index > -1) {
            const pre = url.substring(0, index)
            const suf = url.substring(index + 1, url.length)
            const paramsArr = suf.split('&')
            const params = {}
            paramsArr.forEach(p => {
                const i = p.indexOf('=')
                if (i > -1) {
                    params[p.substring(0, i)] = p.substring(i + 1, p.length)
                } else {
                    params[p] = ''
                }
            })
            config = {...config, url: pre, params: params}
        }
    }
    return config
})

axios.interceptors.response.use(response => {
    return response.data
}, error => {
    let {response} = error
    if (response) {
        switch (response.status) {
            case 404:
                break;
        }
    } else {
        // 服务器没有返回结果 分两种情况 断网  服务器崩了

        if (!window.navigator.onLine) {
            //断网处理：跳转到断网页面
            return
        }
        return Promise.reject(error)
    }
})

export function get(url, params) {
    return new Promise((resolve) => {
        axios.get(url, {
            params: params
        }).then(response => {
            resolve(response)
        }).catch(err => {
            if (err.response) {
                resolve(err.response)
            } else if (err.message) {
                resolve(err.message)
            }
        })
    })
}

export function post(url, params, headers) {
    return new Promise(resolve => {
        axios.post(url, params, {headers: headers}).then(response => {
            resolve(response, response)
        }).catch(err => {
            if (err.response) {
                resolve(err.response)
            } else if (err.message) {
                resolve(err.message)
            }
        })
    })
}
