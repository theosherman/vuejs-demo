<template lang="pug">
nav.navbar.navbar-inverse
  .container-fluid
    
    .navbar-header
      a.navbar-brand(href="#")
        i.fa.fa-rocket
        | &nbsp;&nbsp;Vue.JS Demo

    .navbar-right
      p.navbar-text Welcome, {{ displayName }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('auth', {
      displayName: state => state.displayName
    })
  }
}
</script>