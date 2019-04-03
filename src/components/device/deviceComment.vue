<template>
  <v-card flat >
      <v-layout fill-height>
        <v-flex xs12 style="text-align:left">
          <v-card-title>
            <span style="color:#2196f3">{{userName}}</span>
            <v-spacer></v-spacer>
            <span>{{level}}楼</span>
          </v-card-title>
          <v-card-text>{{commentText}}</v-card-text>
          <v-card-actions></v-card-actions>
        </v-flex>
      </v-layout>
    <v-divider light></v-divider>
  </v-card>
</template>

<script>
export default {
  props: {
    userName: {
      type: String,
      default: ""
    },
    level: {
      type: Number,
      default: null
    },
    commentText: {
      type: String,
      default: ""
    }
  }
};
</script>
