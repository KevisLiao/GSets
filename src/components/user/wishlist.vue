<template>
  <v-container fill-height style="overflow: scroll;">
    <v-layout justify-center>
      <v-flex xs12 style="margin-top:0;">
        <!-- <v-progress-circular :size="50" color="primary" indeterminate v-if="isLoading" style="position: absolute;z-index: 1000;top: 128px;left:44.32%"></v-progress-circular> -->
        <img
          src="../../assets/img/device-empty.png"
          v-if="this.wishlistList.length === 0"
          style="width:200px;height:200px;"
        >
        <template v-for="(item, index) in wishlistList">
          <wishlist-card
            :key="index"
            :deviceName="item.deviceName"
            :deviceBrand="item.deviceBrand"
            :devicePrice="item.devicePrice"
            :deviceType="item.deviceType"
            :deviceCode="item.deviceCode"
            :wishlistCode="item.wishlistCode"
            :wishlistInfo="item.wishlistInfo"
            style="margin-bottom:16px;"
            @deleteDevice="deleteDeviceHandler"
            @addDevice="addDeviceHandler"
          ></wishlist-card>
        </template>
      </v-flex>
    </v-layout>
    <!-- 心愿单设备删除对话框 -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span>确认从心愿单删除此设备？</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="wishlistDeleteCancel">取消</v-btn>
          <v-btn color="primary" flat @click="wishlistDeleteConfirm">删除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 提示 -->
    <v-snackbar v-model="snackbar" color="success" :timeout="timeout">添加成功</v-snackbar>
    <v-dialog v-model="alert" max-width="500px">
      <v-card>
        <v-card-title>
          <span>设备已存在</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="alert=false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import wishlistAPI from "@/service/wishlist";
import WishlistCard from "./wishlistCard.vue";

export default {
  data() {
    return {
      wishlistCode: null,
      deviceCode: null,
      deviceType: null,
      deleteDialog: false,
      snackbar: false,
      alert: false,
      wishlistList: []
    }
  },
  components: {
    WishlistCard
  },
  async created() {
    await wishlistAPI.getWishlist({userCode: this.$store.state.userCode}).then((res) => {
      this.wishlistList = res.data.data.wishlistList
    })
  },
  methods: {
    deleteDeviceHandler(wishlistCode) {
      this.wishlistCode = wishlistCode
      this.deleteDialog = true
    },
    wishlistDeleteCancel() {
      this.wishlistCode = null
      this.deleteDialog = false
    },
    async wishlistDeleteConfirm() {
      await wishlistAPI.deleteFromWishlist({wishlistCode: this.wishlistCode}).then((res) => {
        if(res.data.code === 0) {
          this.deleteDialog = false
        }
      })
      await wishlistAPI.getWishlist({userCode: this.$store.state.userCode}).then((res) => {
      this.wishlistList = res.data.data.wishlistList
      })
    },
    async addDeviceHandler(wishlistCode, deviceCode, deviceType) {
      this.wishlistCode = wishlistCode
      this.deviceCode = deviceCode
      this.deviceType = deviceType
      await wishlistAPI.addUserDevice({userCode: this.$store.state.userCode, deviceCode: this.deviceCode, deviceType: this.deviceType, wishlistCode: this.wishlistCode}).then((res) => {
        if(res.data.code === 0) {
          this.snackbar = true
        } else if (res.data.code === 1007) {
          this.alert = true
        }
      })
      await wishlistAPI.getWishlist({userCode: this.$store.state.userCode}).then((res) => {
        this.wishlistList = res.data.data.wishlistList
      })
    }
  }
}
</script>
