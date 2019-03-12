import request from '../utils/request'
export default {
    login: (params = {}) => {
        return request.post("/user/login", params)
    },
    register: (params = {}) => {
        return request.post("/user/register", params)
    },
    getDeviceSetsCode: (params = {}) => {
        return request.post("/user/deviceSetsCode", params)
    },
}