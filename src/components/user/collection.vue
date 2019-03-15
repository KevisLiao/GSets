<template v-for=(item, index) in collectionList>
  <v-container fill-height style="padding:0;overflow:scroll">
      <v-layout justify-start>
        <v-flex>
          <img
            src="../../assets/img/device-empty.png"
            v-if="this.collectionList.length === 0"
            style="width:200px;height:200px;"
          >
          <template v-for="item in collectionList">
              <collection-list style="width:100%"
              :title="item.collectionName"
              :profile="item.collectionProfile"
              :collectionCode="item.collectionCode"
              :key="item.collectionCode">
              </collection-list>
          </template>
          <v-btn color="#1d67bd" dark fixed bottom right fab style="bottom:72px;" @click="handleAdd">
            <v-icon>add</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>

      <!-- 新建收藏集 -->
      <v-dialog v-model="addDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">新建收藏集</span>
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
          <v-btn color="blue darken-1" flat @click="addDialog = false">取消</v-btn>
          <v-btn color="blue darken-1" flat @click="handleAddConfirm">确认</v-btn>
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
    <v-snackbar v-model="snackbar" color="success" :timeout="timeout">添加成功</v-snackbar>
  </v-container>
</template>

<script>
import CollectionList from "./collectionList.vue"
import collectionAPI from "@/service/collection"

export default {
  data() {
    return {
      collectionList: [],
      addDialog: false,
      newCollectionName: '',
      newCollectionProfile: '',
      alert: false,
      snackbar: false,
      timeout: 2000
    }
  },
  components: {
    CollectionList
  },
  async created() {
    await collectionAPI.collectionList({userCode: this.$store.state.userCode}).then((res) => {
      this.collectionList = res.data.data.collectionList
    })
  },
  methods: {
    handleAdd() {
      this.newCollectionName = ''
      this.newCollectionProfile = ''
      this.addDialog = true
    },
    async handleAddConfirm() {
      if(this.newCollectionName === '' || this.newCollectionProfile === null) {
        this.alert = true
        return
      }
      await collectionAPI.newCollection({collectionName: this.newCollectionName, collectionProfile: this.newCollectionProfile, userCode: this.$store.state.userCode}).then((res) => {
        if(res.data.code === 0) {
          this.addDialog = false
          this.snackbar = true
        }
      })
      await collectionAPI.collectionList({userCode: this.$store.state.userCode}).then((res) => {
        this.collectionList = res.data.data.collectionList
      })
    }
  }
}
</script>
