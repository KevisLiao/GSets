<template>
  <v-app id="collectionDetail">
    <v-toolbar color="blue" dark fixed app flat style="margin-bottom:48px;">
      <v-toolbar-side-icon
        @click.stop="$router.push({ path: '/homepage/userDeviceSets', query: {activeBtn: 'collection'} })"
      >
        <v-icon>arrow_back</v-icon>
      </v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-btn icon @click="deleteAlert = true">
        <v-icon>delete</v-icon>
      </v-btn>
      <v-btn icon @click="editDialog = true">
        <v-icon>edit</v-icon>
      </v-btn>
    </v-toolbar>
    <v-layout justify-start>
      <v-flex xs12>
        <v-card dark color="blue" style="height:196px;padding-top:48px;">
          <v-card-title style="padding-bottom:8px;font-size:36px">{{collectionName}}</v-card-title>
          <v-card-text style="padding-bottom:8px;padding-top:0px;text-align:left">{{collectionProfile}}</v-card-text>
          <v-card-actions style="padding-bottom:8px;padding-left:16px">{{collectionDeviceCount}}个设备</v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- 设备卡片-->
    <v-container fill-height style="overflow: scroll;">
      <v-layout justify-center>
        <v-flex xs12 style="margin-top:36px;">
          <!-- <v-progress-circular :size="50" color="primary" indeterminate v-if="isLoading" style="position: absolute;z-index: 1000;top: 128px;left:44.32%"></v-progress-circular> -->
          <img
            src="../../../assets/img/device-empty.png"
            v-if="this.deviceList.length === 0"
            style="width:200px;height:200px;"
          >
          <template v-for="(item, index) in deviceList">
            <collection-card
              :key="index"
              :deviceName="item.deviceName"
              :deviceBrand="item.deviceBrand"
              :devicePrice="item.devicePrice"
              :deviceType="item.deviceType"
              :deviceCode="item.deviceCode"
              style="margin-bottom:16px;"
              @deleteDevice="deleteDeviceHandler"
            ></collection-card>
          </template>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- 编辑对话框 -->
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">编辑收藏集</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="名称" required v-model="newCollectionName"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="描述" required v-model="newCollectionProfile"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="handleEditCancel">取消</v-btn>
          <v-btn color="blue darken-1" flat @click="handleEditConfirm">确认</v-btn>
        </v-card-actions>
      </v-card>
       <v-dialog v-model="alert" max-width="500px">
        <v-card>
          <v-card-title>
            <span>信息不能为空！</span>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="alert=false">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-dialog>

    <!-- 收藏集删除对话框 -->
    <v-dialog v-model="deleteAlert" max-width="500px">
      <v-card>
        <v-card-title>
          <span>确认删除收藏集？</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="deleteAlert = false">取消</v-btn>
          <v-btn color="primary" flat @click="handleCollectionDelete">删除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 收藏集设备删除对话框 -->
    <v-dialog v-model="deleteDeviceAlert" max-width="500px">
      <v-card>
        <v-card-title>
          <span>确认删除此设备？</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="deleteDeviceAlert = false">取消</v-btn>
          <v-btn color="primary" flat @click="deleteDeviceConfirm">删除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" color="success" :timeout="timeout">删除成功</v-snackbar>
  </v-app>
</template>

<script>
import CollectionCard from "@/components/user/collectionCard.vue";
import collectionAPI from "@/service/collection";

export default {
  data() {
    return {
      isLoading: false,
      snackbar: false,
      timeout: 2000,
      alert: false,
      deleteAlert: false,
      deleteDeviceAlert: false,
      deleteDeviceCode: null,
      collectionCode: null,
      collectionName: '',
      collectionProfile: '',
      collectionDeviceCount: null,
      editDialog: false,
      newCollectionName: '',
      newCollectionProfile: '',
      deviceList: []
    };
  },
  components: {
    CollectionCard
  },
  async created() {
    this.isLoading = true;
    this.collectionCode = this.$route.query.collectionCode ? this.$route.query.collectionCode : "";
    await collectionAPI.getCollectionInfo({collectionCode: this.collectionCode}).then(res => {
      res = res.data
      this.collectionName = res.data.collectionName
      this.collectionProfile = res.data.collectionProfile
      this.collectionDeviceCount = res.data.collectionDeviceCount
      this.newCollectionName = this.collectionName
      this.newCollectionProfile = this.collectionProfile
    })
    await collectionAPI.collectionDeviceList({collectionCode: this.collectionCode}).then(res => {
      this.deviceList = res.data.data.deviceList;
    })
    this.isLoading = false;
  },
  methods: {
    handleEditCancel() {
      this.newCollectionName = this.collectionName
      this.newCollectionProfile = this.collectionProfile
      this.editDialog = false
    },
    async handleEditConfirm() {
      if(this.newCollectionName === '' || this.newCollectionProfile === null) {
        this.alert = true
        return
      }
      await collectionAPI.updateCollection({collectionName: this.newCollectionName, collectionProfile: this.newCollectionProfile, collectionCode: this.collectionCode}).then((res) => {
        if(res.data.code === 0) {
          this.editDialog = false
          this.newCollectionName = this.collectionName
          this.newCollectionProfile = this.collectionProfile
        }
      })
      await collectionAPI.getCollectionInfo({collectionCode: this.collectionCode}).then(res => {
          res = res.data
          this.collectionName = res.data.collectionName
          this.collectionProfile = res.data.collectionProfile
          this.collectionDeviceCount = res.data.collectionDeviceCount
          this.newCollectionName = this.collectionName
          this.newCollectionProfile = this.collectionProfile
      })
    },
    async handleCollectionDelete() {
      await collectionAPI.deleteCollection({collectionCode: this.collectionCode}).then((res) => {
        if(res.data.code === 0) {
          this.deleteAlert = false
          this.$router.push({ path: '/homepage/userDeviceSets', query: {activeBtn: 'collection'}})
        }
      })
    },
    deleteDeviceHandler(deviceCode) {
      this.deleteDeviceCode = deviceCode
      this.deleteDeviceAlert = true
    },
    async deleteDeviceConfirm() {
      await collectionAPI.deleteDeviceFromCollection({collectionCode: this.collectionCode,  deviceCode: this.deleteDeviceCode}).then((res) => {
        if(res.data.code === 0) {
          this.deleteDeviceAlert = false
          this.collectionDeviceCount--
          this.snackbar = true
        }
      })
      await collectionAPI.collectionDeviceList({collectionCode: this.collectionCode}).then(res => {
        this.deviceList = res.data.data.deviceList;
      })
    }
  },
};
</script>

<style lang="less">
.loading {
  position: fixed;
  z-index: 1000;
  top: 48px;
}
</style>

