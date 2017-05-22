<template lang="pug">
div
  h1 Grid

  hr

  ul.nav.nav-pills
    router-link(to="/grid/localdata", role="presentation", tag="li")
      a Custom w/ Local Data
    router-link(to="/grid/serverdata", role="presentation", tag="li")
      a Custom w/ Server Data
    router-link(to="/grid/vuetables2client", role="presentation", tag="li")
      a Vue-tables-2 w/ Client Data

  #wrapper
    router-view

</template>

<style lang="css" scoped>
  #wrapper {
    margin-top: 2em;
  }
</style>
