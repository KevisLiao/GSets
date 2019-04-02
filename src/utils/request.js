import axios from 'axios'
import qs from 'qs'

// axios.defaults.transformRequest = [function (data) {
//     let newStr = ''
//     for (let item in data) {
//         newStr += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
//     }
//     newStr = newStr.slice(0, -1)
//     return newStr
// }];

export default {
    post (url, data) {  //  post
        return axios({
            method: 'post',
            url,
            data: qs.stringify(data),
            timeout: 60000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
    },
    get (url, params) {  // get
        return axios({
            method: 'get',
            url,
            params, // get 请求时带的参数
            timeout: 60000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    }
}
