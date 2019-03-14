<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed left app>
      <v-toolbar flat class="transparent" color="blue">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title style="color:#ffffff">{{userName}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list dense>
        <v-list-tile @click="toUserDeviceSets">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>首页</v-list-tile-title>
          </v-list-tile-content>
          <!-- <router-link to="/homepage/userDeviceSets">公司简介</router-link> -->
        </v-list-tile>
        <v-list-tile @click="toDeviceSets">
          <v-list-tile-action>
            <v-icon>inbox</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>设备库</v-list-tile-title>
          </v-list-tile-content>
          <!-- <router-link to="/homepage/deviceSets">公司简介</router-link> -->
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
        <!-- <v-avatar  size="36" color="grey lighten-4">
          <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png">
        </v-avatar> -->
      </v-toolbar-side-icon>
      <v-toolbar-title>GSets</v-toolbar-title>
    </v-toolbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import cookie from 'js-cookie'

export default {
  name: "index",
  components: {},
  created() {
  },
  data: () => ({
    drawer: false
  }),
  props: {
    source: String
  },
  methods: {
    toUserDeviceSets() {
      this.$router.push("/homepage/userDeviceSets");
    },
    toDeviceSets() {
      this.$router.push("/homepage/deviceSets");
    }
  },
  computed: {
    userName() {
      return cookie.get('userName')
    }
  }
};
</script>
