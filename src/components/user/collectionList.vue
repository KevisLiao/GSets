<template>
  <v-card  style="margin-top:8px;" @click="collectionDetail(collectionCode)">
      <v-divider light></v-divider>
    <v-container fill-height style="padding-top:0;padding-bottom:0">
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox style="text-align:left;">
          <v-card-title style="padding-bottom:4px">
            <span style="font-size:16px;font-weight:700">{{title}}</span>
          </v-card-title>
          <v-card-text style="padding-top:0">{{profile}}</v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        profile: {
            type: String,
            default: ''
        },
        collectionCode: {
          type:Number
        }
    },
    methods: {
      collectionDetail(collectionCode) {
        this.$router.push({ path: '/collectionDetail', query: {collectionCode: collectionCode} })
      }
    }
}
</script>
