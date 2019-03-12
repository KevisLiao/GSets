import request from '../utils/request'

export default {
    userDeviceList: (params = {}) => {
        return request.post("/device/userDeviceList", params)
    },
    deviceList: (params = {}) => {
        return request.post("/device/all", params)
    },
    addUserDevice: (params = {}) => {
        return request.post("/device/addUserDevice", params)
    },
}