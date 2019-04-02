import request from '../utils/request'
export default {
    getWishlist: (params = {}) => {
        return request.post("/wishlist/getWishlist", params)
    },
    addToWishlist: (params = {}) => {
        return request.post("/wishlist/addToWishlist", params)
    },
    deleteFromWishlist: (params = {}) => {
        return request.post("/wishlist/deleteFromWishlist", params)
    },
    addUserDevice: (params = {}) => {
        return request.post("/wishlist/addUserDevice", params)
    },
}