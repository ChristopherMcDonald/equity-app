<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Equity Calculator</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <Main />
    </v-main>
    <v-footer>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Main from './components/Main.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Main,
  },

  data: () => ({
    //
  }),
});
</script>
