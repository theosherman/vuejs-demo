<template lang="pug">
nav.navbar.navbar-inverse
  .container
    
    .navbar-header
      #navicon.span.fa-stack.fa-lg
          i.fa.fa-circle.fa-stack-2x.fa-inverse
          i.fa.fa-rocket.fa-stack-1x(style="color: #bbb")
      a.navbar-brand(href="#") Vue.JS Demo

    .navbar-right
      p.navbar-text
        i.fa.fa-user
        | &nbsp;{{ displayName }}
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

<style>
#navicon {
  float: left;
  margin: 6px 10px 0 0;
}
</style>