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
        </v-flex>
      </v-layout>
      <v-divider light></v-divider>
      <v-layout>
        <v-flex xs12>
          <v-card-actions>
            <v-icon color="#e09015">stars</v-icon>
            <span style="color:#e09015;margin-left:8px;">暂无评分</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="handleDelete">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-card>
  </v-hover>
</template>

<script>
import wishlishAPI from "@/service/wishlist"
import WishlistCard from "./wishlistCard.vue"

export default {  
  components: {
    WishlistCard
  },
  created() {
  }
}
</script>
