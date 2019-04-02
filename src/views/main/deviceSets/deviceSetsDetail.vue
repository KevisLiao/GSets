<template>
  <v-app id="setsDetail">
    <v-toolbar color="blue" dark fixed app style="margin-bottom:48px;">
      <v-toolbar-side-icon @click.stop="$router.go(-1)">
        <v-icon>arrow_back</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>{{setsTitle}}</v-toolbar-title>
    </v-toolbar>

    <!-- 设备卡片-->
    <v-container fill-height style="overflow: scroll;">
      <v-layout justify-center>
        <v-flex xs12 style="margin-top:56px;">
          <!-- <v-progress-circular :size="50" color="primary" indeterminate v-if="isLoading" style="position: absolute;z-index: 1000;top: 128px;left:44.32%"></v-progress-circular> -->
          <img
            src="../../../assets/img/device-empty.png"
            v-if="this.deviceList.length === 0"
            style="width:200px;height:200px;"
          >
          <template v-for="(item, index) in deviceList">
            <device-card
              :key="index"
              :deviceName="item.deviceName"
              :deviceBrand="item.deviceBrand"
              :devicePrice="item.devicePrice"
              :deviceType="item.deviceType"
              :deviceCode="item.deviceCode"
              style="margin-bottom:16px;"
              @showNotice="notice"
              @showAlert="addAlert"
              @showWishlistDialog="addToWishlist"
            ></device-card>
          </template>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- 心愿单弹窗 -->
    <v-dialog v-model="wishlistDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">添加到心愿单</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="理由？" required v-model="wishlistInfo"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="handleWishlistCancel">取消</v-btn>
          <v-btn color="blue darken-1" flat @click="handleWishlistConfirm">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 提示 -->
    <v-snackbar v-model="snackbar" color="success" :timeout="timeout">添加成功</v-snackbar>
    <v-dialog v-model="alert" max-width="500px">
      <v-card>
        <v-card-title>
          <span>{{alertInfo}}</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="alert=false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import DeviceCard from "@/components/device/deviceCard.vue";
import deviceAPI from "@/service/device";
import wishlistAPI from "@/service/wishlist"

export default {
  data() {
    return {
      isLoading: false,
      deviceSetsType: "",
      deviceCode: null,
      wishlistInfo:'',
      timeout: 2000,
      deviceList: [],
      snackbar: false,
      wishlistDialog: false,
      alert: false,
      alertInfo: '',
    };
  },
  components: {
    DeviceCard
  },
  async created() {
    this.isLoading = true;
    this.deviceSetsType = this.$route.query.deviceSetsType
      ? this.$route.query.deviceSetsType
      : "";
    await deviceAPI
      .deviceList({
        deviceType: this.deviceSetsType
      })
      .then(res => {
        this.deviceList = res.data.data.deviceList;
      });
    this.isLoading = false;
  },
  methods: {
    notice() {
      this.snackbar = true;
    },
    addAlert() {
      this.alertInfo = "设备已存在"
      this.alert = true;
    },
    addToWishlist(deviceCode) {
      this.deviceCode = deviceCode
      this.wishlistDialog = true
    },
    handleWishlistCancel() {
      this.wishlistInfo = ''
      this.deviceCode = null
      this.wishlistDialog = false
    },
    async handleWishlistConfirm() {
      if(this.wishlistInfo.length === 0) {
        this.alertInfo = '信息不能为空'
        this.alert = true
        return
      }
      await wishlistAPI.addToWishlist({deviceCode: this.deviceCode, userCode: this.$store.state.userCode, wishlistInfo: this.wishlistInfo}).then((res) => {
        if(res.data.code === 0) {
          this.wishlistDialog = false
          this.wishlistInfo = ''
          this.snackbar = true
        } else if (res.data.code === 1007) {
          this.alertInfo = '设备已在心愿单'
          this.alert = true
        }
      })
    }
    
  },
  computed: {
    setsTitle() {
      switch (this.deviceSetsType) {
        case 1: {
          return "手机";
        }
        case 2: {
          return "平板电脑";
        }
        case 3: {
          return "笔记本电脑";
        }
        case 4: {
          return "摄影";
        }
        case 5: {
          return "音频";
        }
        case 6: {
          return "智能";
        }
        case 7: {
          return "游戏设备";
        }
        default:
          return "设备集";
      }
    }
  }
};
</script>

<style lang="less">
.loading {
  position: fixed;
  z-index: 1000;
  top: 48px;
}
</style>

