<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-layout>
        <v-flex xs5>
          <v-card-text primary-title>
            <v-img :src="deviceImg" height="125px" contain></v-img>
          </v-card-text>
        </v-flex>
        <v-flex xs7>
          <v-card-title></v-card-title>
          <v-card-text primary-title>
            <div style="text-align:left">
              <div class="headline">{{deviceName}}</div>
              <div>{{deviceBrand}}</div>
              <div>￥{{devicePrice}}</div>
            </div>
          </v-card-text>
          <!-- <v-divider light></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-icon>more_vert</v-icon>
          </v-card-actions>-->
        </v-flex>
      </v-layout>
      <v-divider light></v-divider>
      <v-layout>
        <v-flex xs12>
          <v-card-actions>
            <v-icon color="#e09015">stars</v-icon>
            <span style="color:#e09015;margin-left:8px;">暂无评分</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="addDevice">
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-card>
  </v-hover>
</template>

<script>
import userAPI from "@/service/user"
import deviceAPI from "@/service/device";

export default {
  props: {
    deviceName: {
      type: String,
      default: "小米6"
    },
    deviceBrand: {
      type: String,
      default: "小米"
    },
    devicePrice: {
      type: Number,
      default: 2899
    },
    deviceType: {
      type: Number,
      default: 1
    },
    deviceCode: {
      type: Number,
      default: 53
    }
  },
  data() {
    return {
      deviceSetsCode: ''
    }
  },
  methods: {
    async addDevice() {
      await userAPI.getDeviceSetsCode({userCode: this.$store.state.userCode, deviceSetsType: this.deviceType}).then((res) => {
        this.deviceSetsCode = res.data.data.deviceSetsCode
      })
      await deviceAPI.addUserDevice({deviceSetsCode: this.deviceSetsCode, deviceCode: this.deviceCode}).then((res) => {
        if(res.data.code === 0) {
          this.$emit('showNotice')
        }
      })
    }
  },
  computed: {
    deviceImg() {
      return require(`@/assets/img/device/${this.deviceType}/${
        this.deviceCode
      }.jpg`);
    }
  }
};
</script>

