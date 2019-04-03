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
    findUserSetsCode: (params = {}) => {
        return request.post("/device/findUserSetsCode", params)
    },
    deleteDeviceFromDeviceSets: (params = {}) => {
        return request.post("/device/deleteDeviceFromDeviceSets", params)
    },
    findDeviceByDeviceCode: (params = {}) => {
        return request.post("/device/findDeviceByDeviceCode", params)
    },
    getDeviceComment: (params = {}) => {
        return request.post("/device/getDeviceComment", params)
    },
    addDeviceComment: (params = {}) => {
        return request.post("/device/addDeviceComment", params)
    },
}