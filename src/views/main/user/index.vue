<template>
  <v-content>
    <v-container fill-height style="overflow: scroll;padding:0">
      <v-layout justify-center>
        <v-flex>
            <sets v-if="activeBtn === 'sets'"></sets>
            <collection v-if="activeBtn === 'collection'"></collection> 
            <wishlist v-if="activeBtn === 'wishlist'"></wishlist>
          <!-- <v-card width="100%" height="100%">用户</v-card>
          <v-card width="100%" height="100%">用户</v-card>
          <v-card width="100%" height="100%">用户</v-card> -->
        </v-flex>
      </v-layout>
    </v-container>

    <!-- 底部导航 -->
    <v-bottom-nav
      :active.sync="activeBtn"
      :value="true"
      fixed
      color="transparent"
      class="bottomNav"
    >
      <v-btn flat color="blue" value="sets">
        <span>设备集</span>
        <v-icon>devices_other</v-icon>
      </v-btn>

      <v-btn flat color="blue" value="collection">
        <span>收藏集</span>
        <v-icon>star</v-icon>
      </v-btn>

      <v-btn flat color="blue" value="wishlist">
        <span>心愿单</span>
        <v-icon>favorite</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-content>
</template>

<script>
import Sets from '@/components/user/sets.vue'
import Collection from '@/components/user/collection.vue'
import Wishlist from '@/components/user/wishlist.vue'

export default {
  name: "index",
  components: {
    Sets,
    Collection,
    Wishlist
  },
  created() {},
  data: () => ({
    drawer: null,
    activeBtn: 'sets'
  }),
  props: {
    source: String
  }
};
</script>

<style lang="less">
.bottomNav {
  background: #ffffff !important;
  position: fixed;
  bottom: 0px;
  // z-index: 10000 !important;
}
</style>

