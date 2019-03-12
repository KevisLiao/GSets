<template>
  <v-list>
    <template v-for="item in items">
      <v-list-tile v-if="item.action" :key="item.title" @click="setsDetail(item.type)">
        <v-list-tile-action>
          <v-icon>{{ item.action }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <!-- <v-divider :key="index"></v-divider> -->
    </template>
  </v-list>
</template>

<script>
export default {
  components: {},
  created() {},
  data: () => ({
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
  methods: {
    setsDetail(type) {
        this.$router.push({ path: '/setsDetail', query: {deviceSetsType: type} })
    }
  }
};
</script>
