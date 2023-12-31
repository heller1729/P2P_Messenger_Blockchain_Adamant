<template>
  <v-menu
    offset-y
    class="language-switcher"
  >
    <v-btn
      slot="activator"
      class="ma-0"
      flat
    >
      <slot name="prepend">
        <v-icon
          v-if="prependIcon"
          left
        >
          {{ prependIcon }}
        </v-icon>
      </slot>
      {{ currentLanguageName }}
      <slot name="append">
        <v-icon
          v-if="appendIcon"
          right
        >
          {{ appendIcon }}
        </v-icon>
      </slot>
    </v-btn>
    <v-list>
      <v-list-tile
        v-for="(language, code) in languages"
        :key="code"
        @click="onSelect(code)"
      >
        <v-list-tile-title>{{ language.title }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    prependIcon: {
      type: String,
      default: ''
    },
    appendIcon: {
      type: String,
      default: ''
    }
  },
  computed: {
    languages () {
      return this.$i18n.messages
    },
    currentLocale: {
      get () {
        return this.$store.state.language.currentLocale
      },
      set (value) {
        this.$store.dispatch('language/changeLocale', value)
      }
    },
    currentLanguageName () {
      const locale = Object.keys(this.languages)
        .find(code => code === this.currentLocale)

      return this.languages[locale].title
    }
  },
  methods: {
    onSelect (locale) {
      this.currentLocale = locale
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~vuetify/src/stylus/settings/_colors.styl'
@import '../assets/stylus/settings/_colors.styl'

.language-switcher
  >>> .v-menu__activator
    .v-icon
      margin-top: 2px
    .v-icon:before
      transition: 0.2s linear
  >>> .v-menu__activator--active
    .v-icon:before
      transform: rotate(90deg)
  >>> .v-btn
    text-transform: capitalize

/** Themes **/
.theme--light
  .language-switcher
    .v-btn
      color: $adm-colors.regular
      font-weight: 300
</style>
