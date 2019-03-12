<template>
  <v-content>
    <v-container fill-height style="padding:0;overflow:scroll">
      <v-layout justify-start>
        <v-flex>
          <template v-for="item in items">
            <v-btn block large depressed :key="item.type" style="margin:0;padding:0;height:96px" @click="setsDetail(item.type)">
              <device-categories style="width:100%" :icon="item.action" :title="item.title"></device-categories>
            </v-btn>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import DeviceCategories from "@/components/device/deviceCategories.vue";

export default {
  name: "index",
  components: {
    DeviceCategories
  },
  created() {},
  data: () => ({
    drawer: null,
    items: [
      {
        action: "smartphone",
        title: "手机",
        type: 1
      },
      {
        action: "tablet",
        title: "平板电脑",
        type: 2
      },
      {
        action: "laptop",
        title: "笔记本电脑",
        type: 3
      },
      {
        action: "camera",
        title: "摄影",
        type: 4
      },
      {
        action: "audiotrack",
        title: "音频",
        type: 5
      },
      {
        action: "watch",
        title: "智能",
        type: 6
      },
      {
        action: "games",
        title: "游戏设备",
        type: 7
      }
    ]
  }),
  props: {
    source: String
  },
  methods: {
    setsDetail(type) {
        this.$router.push({ path: '/deviceSetsDetail', query: {deviceSetsType: type} })
    }
  }
};
</script>
