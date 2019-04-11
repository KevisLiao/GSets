<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-layout @click="toDeviceDetail">
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
            <!-- <v-icon color="#e09015">stars</v-icon> -->
            <!-- <span style="color:#e09015;margin-left:8px;">暂无评分</span> -->
            <v-spacer></v-spacer>
            <v-btn icon @click="$emit('collection', deviceCode)">
              <v-icon>star</v-icon>
            </v-btn>
            <v-btn icon @click="$emit('deleteDevice', deviceCode)">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-card>
  </v-hover>
</template>

<script>
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
  computed: {
    deviceImg() {
      return require(`@/assets/img/device/${this.deviceType}/${
        this.deviceCode
      }.jpg`);
    }
  },
  methods: {
    toDeviceDetail() {
      this.$router.push({ path: '/deviceDetail', query: {deviceCode: this.deviceCode} })
    }
  }
};
</script>

