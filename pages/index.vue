<template>
  <v-app id="inspire" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  asyncData({ redirect }) {
    redirect('/articles')
  },

})
</script>
