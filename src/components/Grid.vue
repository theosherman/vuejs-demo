<template lang="pug">
div
  h1 Grid

  hr

  ul.nav.nav-pills
    router-link(to="/grid/localdata", role="presentation", tag="li")
      a(href="#") Local Data
    router-link(to="/grid/serverdata", role="presentation", tag="li")
      a(href="#") Server Data

  #wrapper
    router-view

</template>

<style lang="css" scoped>
  #wrapper {
    margin-top: 2em;
  }
</style>
