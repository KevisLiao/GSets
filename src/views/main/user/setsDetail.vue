<template>
  <v-app id="setsDetail">
    <v-toolbar color="blue" dark fixed app style="margin-bottom:48px;">
      <v-toolbar-side-icon @click.stop="$router.push({ path: '/homepage/userDeviceSets', query: {activeBtn: 'sets'} })">
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
              @collection="handleCollection"
              @deleteDevice= "handleDeviceDelete"
            ></device-card>
          </template>
          <v-btn color="#1d67bd" dark fixed bottom right fab @click="$router.push('/homepage/deviceSets')">
            <v-icon>add</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- 收藏弹窗 -->
    <v-dialog v-model="collectionDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">选择收藏集</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-select
                v-model="selectCollection"
                :items="collectionList"
                item-text="collectionName"
                item-value="collectionCode"
                label="请选择"
                persistent-hint
                return-object
                single-line
              ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="handleCollectionCancel">取消</v-btn>
          <v-btn color="blue darken-1" flat @click="handleCollectionConfirm">确认</v-btn>
        </v-card-actions>
      </v-card>

      <!-- 设备删除对话框 -->
      <v-dialog v-model="deleteDeviceAlert" max-width="500px">
        <v-card>
          <v-card-title>
            <span>确认删除此设备？</span>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="handleDeviceDeleteCancel">取消</v-btn>
            <v-btn color="primary" flat @click="handleDeviceDeleteConfirm">删除</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 提示 -->
      <v-dialog v-model="alert" max-width="500px">
        <v-card>
          <v-card-title>
            <span>{{alertText}}</span>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="alert=false">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-dialog>

    <v-snackbar v-model="snackbar" color="success" :timeout="timeout">删除成功</v-snackbar>
  </v-app>
</template>

<script>
import DeviceCard from "@/components/user/deviceCard.vue";
import deviceAPI from "@/service/device";
import collectionAPI from "@/service/collection"

export default {
  data() {
    return {
      isLoading: false,
      deleteDeviceAlert: false,
      deleteDeviceCode: null,
      deviceSetsCode: null,
      deviceSetsType: "",
      collectionDialog: false,
      collectionDeviceCode: null,
      selectCollection: [],
      alert: false,
      alertText: '',
      snackbar: false,
      timeout: 2000,
      collectionList: [],
      deviceList: []
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
    await deviceAPI.userDeviceList({ userCode: this.$store.state.userCode, deviceSetsType: this.deviceSetsType }).then(res => {
        this.deviceList = res.data.data.deviceList;
    });
    await deviceAPI.findUserSetsCode({userCode: this.$store.state.userCode, deviceSetsType: this.deviceSetsType}).then((res) => {
      if(res.data.code === 0) {
        this.deviceSetsCode = res.data.data.deviceSetsCode
      }
    })
    this.isLoading = false;
  },
  methods: {
    async handleCollection(deviceCode) {
      await collectionAPI.collectionList({userCode: this.$store.state.userCode}).then((res) => {
        if(res.data.code ===  0) {
          this.collectionList = res.data.data.collectionList
        }
      })
      this.collectionDeviceCode = deviceCode
      this.collectionDialog = true
    },
    handleCollectionCancel() {
      this.collectionDialog = false
      this.selectCollection = []
    },
    async handleCollectionConfirm() {
      if(this.selectCollection.length === 0) {
        this.alertText = '请选择收藏集'
        this.alert = true
        return
      }
      await collectionAPI.addDeviceToCollection({collectionCode: this.selectCollection.collectionCode, deviceCode: this.collectionDeviceCode}).then((res) => {
        if(res.data.code === 0) {
          this.collectionDialog = false
          this.selectCollection = []
          this.alertText = '收藏成功'
          this.alert = true
        } else if (res.data.code === 1006) {
          this.alertText = '设备已在此收藏集'
          this.alert = true
        }
      })
    },
    async handleDeviceDelete(deviceCode) {
      this.deleteDeviceCode = deviceCode
      this.deleteDeviceAlert = true
    },
    handleDeviceDeleteCancel() {
      this.deleteDeviceAlert = false
    },
    async handleDeviceDeleteConfirm() {
      await deviceAPI.deleteDeviceFromDeviceSets({deviceSetsCode: this.deviceSetsCode, deviceCode: this.deleteDeviceCode}).then((res) => {
        if(res.data.code === 0) {
          this.deleteDeviceAlert = false
          this.snackbar = true
        }
      })
      await deviceAPI.userDeviceList({ userCode: this.$store.state.userCode, deviceSetsType: this.deviceSetsType }).then(res => {
        this.deviceList = res.data.data.deviceList;
      });
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

