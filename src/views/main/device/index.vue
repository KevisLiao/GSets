<template>
  <v-app id="deviceDetail">
    <v-toolbar color="blue" dark fixed app style="margin-bottom:48px;">
      <v-toolbar-side-icon @click.stop="$router.go(-1)">
        <v-icon>arrow_back</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>{{deviceName}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="commentDialog=true">
        <v-icon>mode_comment</v-icon>
      </v-toolbar-side-icon>
    </v-toolbar>
    <v-container align-center style="margin-top:56px;padding:0">
      <v-layout>
        <v-flex xs12>
          <v-img :src="deviceImg"></v-img>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-list two-line>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="blue">devices</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{deviceName}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="blue" outlined>label_outlined</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{deviceBrand}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
          </v-list>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-card flat>
            <v-layout>
              <v-flex xs1>
                <v-card-title>
                  <v-icon color="blue">info_outlined</v-icon>
                </v-card-title>
              </v-flex>
              <v-flex xs10 style="margin-left:20px;text-align:left">
                <v-card-text>{{deviceProfile}}</v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-divider light></v-divider>
      <v-subheader light style="font-weight:bold;background-color:white;margin-top:16px">评论</v-subheader>
      <v-divider light></v-divider>
      <v-layout>
        <v-flex xs12>
          <template v-for="(item,index) in commentList">
            <comment-item
            :key=index
            :userName="item.userName"
            :level="index+1"
            :commentText="item.commentText">
            </comment-item>
          </template>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 style="padding:8px">
          <v-btn @click="getMoreComment" block color="primary" dark v-if="!noMoreComment" :loading="buttonLoading">查看更多</v-btn>
          <span v-if="noMoreComment" style="line-height:48px">没有更多评论了</span>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="commentDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">评论</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-textarea
                v-model="newComment"
                label="请输入评论"
                auto-grow
                autofocus
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="handleCommentCancel">取消</v-btn>
          <v-btn color="blue darken-1" flat @click="handleCommentConfirm">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import deviceAPI from "@/service/device";
import CommentItem from "@/components/device/deviceComment";

export default {
  components: {
    CommentItem
  },
  data() {
    return {
      commentDialog: false,
      alert: false,
      alertInfo: '',
      newComment: '',
      deviceCode: null,
      deviceName: "",
      deviceBrand: "",
      deviceProfile: "",
      deviceType: null,
      page: 10,
      commentList: [],
      noMoreComment: false,
      buttonLoading: false,
    };
  },
  async created() {
    this.deviceCode = this.$route.query.deviceCode? this.$route.query.deviceCode : null;
    await deviceAPI.findDeviceByDeviceCode({deviceCode: this.deviceCode}).then((res) => {
        if(res.data.code === 0) {
            this.deviceCode = res.data.data.deviceCode
            this.deviceName = res.data.data.deviceName
            this.deviceBrand = res.data.data.deviceBrand
            this.deviceProfile = res.data.data.deviceProfile
            this.deviceType = res.data.data.deviceType
        }
    })
    await deviceAPI.getDeviceComment({deviceCode: this.deviceCode, userCode: this.$store.state.userCode, page: this.page}).then((res) => {
      if(res.data.code === 0) {
        this.commentList = res.data.data.commentList
      } else if (res.data.code === 1008) {
        this.noMoreComment = true
      }
    })
  },
  computed: {
    deviceImg() {
      return require(`@/assets/img/device/${this.deviceType}/${
        this.deviceCode
      }.jpg`);
    }
  },
  methods: {
    async getMoreComment() {
      this.page += 10
      this.buttonLoading = true
      let commentLength = this.commentList.length
      await deviceAPI.getDeviceComment({deviceCode: this.deviceCode, userCode: this.$store.state.userCode, page: this.page}).then((res) => {
        if(res.data.code === 0) {
          this.buttonLoading = false
          this.commentList = res.data.data.commentList
          if(commentLength === this.commentList.length) {
            this.buttonLoading = false
            this.noMoreComment = true
          }
        }
      })
    },
    handleCommentCancel() {
      this.commentDialog = false
      this.newComment = ''
    },
    async handleCommentConfirm() {
      if(this.newComment === '') {
        this.alertInfo = '评论不能为空'
        this.alert = true
        return
      }
      await deviceAPI.addDeviceComment({deviceCode: this.deviceCode, userCode: this.$store.state.userCode, commentText: this.newComment}).then((res) => {
        if(res.data.code === 0) {
          this.commentDialog = false
          this.newComment = ''
          this.alertInfo = '评论成功'
          this.alert = true
        }
      })
      await deviceAPI.getDeviceComment({deviceCode: this.deviceCode, userCode: this.$store.state.userCode, page: this.page}).then((res) => {
        if(res.data.code === 0) {
          this.commentList = res.data.data.commentList
          this.noMoreComment = false
        }
      })
    },
  }
}
</script>
