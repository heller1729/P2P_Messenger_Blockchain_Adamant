<template>
  <v-content>
    <slot />

    <app-snackbar />
    <app-navigation v-if="showNavigation" />
  </v-content>
</template>

<script>
import AppSnackbar from '@/components/AppSnackbar'
import AppNavigation from '@/components/AppNavigation'

export default {
  components: {
    AppSnackbar,
    AppNavigation
  },
  computed: {
    showNavigation () {
      return this.$route.meta.showNavigation || false
    }
  }
}
</script>
