<template>
  <v-app id="deviceDetail">
    <v-toolbar color="blue" dark fixed app style="margin-bottom:48px;">
      <v-toolbar-side-icon @click.stop="$router.go(-1)">
        <v-icon>arrow_back</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>{{deviceName}}</v-toolbar-title>
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
                <v-card-text>
                  {{deviceProfile}}
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import deviceAPI from "@/service/device"

export default {
  data() {
    return {
      deviceCode: null,
      deviceName: "",
      deviceBrand: "",
      deviceProfile: "",
      deviceType: ""
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
  },
  computed: {
    deviceImg() {
      return require(`@/assets/img/device/${this.deviceType}/${this.deviceCode}.jpg`);
    }
  }
};
</script>
