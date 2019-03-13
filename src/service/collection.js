import request from '../utils/request'
export default {
    newCollection: (params = {}) => {
        return request.post("/collection/newCollection", params)
    },
    collectionList: (params = {}) => {
        return request.post("/collection/collectionList", params)
    },
    updateCollection: (params = {}) => {
        return request.post("/collection/updateCollection", params)
    },
    deleteCollection: (params = {}) => {
        return request.post("/collection/deleteCollection", params)
    },
    getCollectionInfo: (params = {}) => {
        return request.post("/collection/getCollectionInfo", params)
    },
    collectionDeviceList: (params = {}) => {
        return request.post("/collection/collectionDeviceList", params)
    },
    addDeviceToCollection: (params = {}) => {
        return request.post("/collection/addDeviceToCollection", params)
    },
}