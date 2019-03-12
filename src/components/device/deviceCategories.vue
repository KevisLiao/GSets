<template>
  <v-card height="96px" flat>
      <v-divider light></v-divider>
    <v-container fill-height>
      <v-layout fill-height>
        <v-flex xs4>
            <!-- <v-card-title></v-card-title> -->
          <v-card-text>
            <v-icon size="36px">{{icon}}</v-icon>
          </v-card-text>
        </v-flex>
        <v-flex xs8 align-end flexbox style="text-align:left;line-height:100%">
          <!-- <v-card-title></v-card-title> -->
          <v-card-text>
            <span style="font-size:24px;line-height:36px">{{title}}</span>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
    
    <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg" height="200px">
      <v-container fill-height fluid pa-2>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox style="text-align:left;line-height:100%">
            <span class="headline white--text" style="text-align:left;height:100%">手机</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>-->
    <!-- <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>bookmark</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>share</v-icon>
      </v-btn>
    </v-card-actions>-->
  </v-card>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
};
</script>

