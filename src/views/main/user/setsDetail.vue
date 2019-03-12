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
            ></device-card>
          </template>
          <v-btn color="#1d67bd" dark fixed bottom right fab>
            <v-icon>add</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import DeviceCard from "@/components/user/deviceCard.vue";
import deviceAPI from "@/service/device";

export default {
  data() {
    return {
      isLoading: false,
      deviceSetsType: "",
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
    await deviceAPI
      .userDeviceList({
        userCode: this.$store.state.userCode,
        deviceSetsType: this.deviceSetsType
      })
      .then(res => {
        this.deviceList = res.data.data.deviceList;
      });
    this.isLoading = false;
  },
  methods: {},
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

