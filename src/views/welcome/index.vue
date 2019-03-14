<template>
   <v-app id="inspire">
    <v-content class="bg">
        <div class="logo">
            <img src="../../assets/img/logo.png" alt="avatar">
        </div>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            
            <!-- 登录卡片 -->
            <transition name="fade" mode="out-in">
            <v-card class="elevation-12 card" v-if="loginStatus" key="card1">
              <v-toolbar dark color="primary">
                <v-toolbar-title>登录</v-toolbar-title>
                <v-spacer></v-spacer>
                    <v-btn icon large target="_blank" @click="loginStatus = !loginStatus">
                      <v-icon large>person_add</v-icon>
                    </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field 
                  v-model="userAccount"
                  prepend-icon="person"
                  name="login" label="账号"
                  type="text"
                  :error-messages="userAccountErrorMsg"
                  @input="userAccountValidate = true">
                  </v-text-field>
                  <v-text-field
                  v-model="userPassword"
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="密码"
                  type="password"
                  :error-messages="userPasswordErrorMsg"
                  @input="userPasswordValidate = true"
                  >
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" :loading="buttonLoading" @click="handleLogin">确认</v-btn>
              </v-card-actions>
            </v-card>
            

            <!-- 注册卡片 -->
            <!-- <transition name="fade"> -->
            <v-card class="elevation-12 card" v-else key="card2">
              <v-toolbar dark color="primary">
                <v-toolbar-title>注册</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon large target="_blank" @click="loginStatus = !loginStatus">
                  <v-icon large>arrow_back</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="userRegisterAccount" prepend-icon="person" name="login" label="账号" type="text"></v-text-field>
                  <v-text-field v-model="userRegisterPassword" id="password" prepend-icon="lock" name="password" label="密码" type="password"></v-text-field>
                  <v-text-field id="passwordConfirm" prepend-icon="check" name="passwordConfirm" label="确认密码" type="password"></v-text-field>
                  <v-text-field v-model="userName" prepend-icon="label" name="login" label="昵称" type="text"></v-text-field>
                  <v-text-field v-model="userProfile" prepend-icon="notes" name="login" label="简介" type="text"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="handleRegister">确认</v-btn>
              </v-card-actions>
            </v-card>
            </transition>


          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template> 


<script>
import userAPI from '@/service/user'
import cookie from 'js-cookie'

export default {
    data: () => ({
      loginStatus: true,
      buttonLoading: false,
      userAccount: '',
      userAccountValidate: true,
      userPassword: '',
      userPasswordValidate: true,
      userRegisterAccount: '',
      userRegisterPassword: '',
      userName: '',
      userProfile: '',
      userAvatar: ''
    }),
    methods: {
      async handleLogin() {
          this.buttonLoading = true
          try {
              await userAPI.login({userAccount: this.userAccount, userPassword: this.userPassword}).then((res) => {
                res = res.data
                if(res.code === 0) {
                    console.warn(res.data)
                    cookie.set('userCode', res.data.userCode)
                    this.$store.commit('updateUserCode', { userCode: res.data.userCode })
                    this.$router.push('/homepage/userDeviceSets')
                } else if(res.code === 1004) {
                    this.userAccountValidate = false
                } else if(res.code === 1005) {
                    this.userPasswordValidate = false
                }
                this.buttonLoading = false
              })
          } catch(e) {
              console.warn(e)
              this.buttonLoading = false
          }
          
          
      },
      async handleRegister() {
          await userAPI.register({userAccount: this.userRegisterAccount, userPassword: this.userRegisterPassword, userName: this.userName, userProfile: this.userProfile}).then((res) => {
               if(res.code === 0) {
                  console.warn(res.data)
              }
          })
      }
    },
    props: {
    },
    computed: {
        userAccountErrorMsg() {
            if(!this.userAccountValidate) {
                return this.userAccount === '' ? '请输入账号' : '账号不存在'
            }
            return ''
        },
        userPasswordErrorMsg() {
            if(!this.userPasswordValidate) {
                return this.userPassword === '' ? '请输入密码' : '密码错误'
            }
            return ''
        }
    }
}
</script>

<style lang="less">
.bg {
    background-image: url('../../assets/img/bg.png')
}
.logo {
    width: 100%;
    position: absolute;
    top: 48px;
    margin-bottom: 56px;
    text-align: center;
    img {
        width: 150px;
        height: 150px;
    }
}
.fade-enter{
	opacity: 0;
}
.fade-enter-active{
	transition: opacity 0.5s;
}
.fade-leave-to{
	opacity: 0;
}
.fade-leave-active{
	transition: opacity 0.5s;
}
</style>

