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

