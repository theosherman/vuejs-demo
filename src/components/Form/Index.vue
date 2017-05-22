<template lang="pug">
div
  h1 Form

  hr

  ul.nav.nav-pills
    router-link(to="/form/basicform", role="presentation", tag="li")
      a Basic Form
    router-link(to="/form/advancedform", role="presentation", tag="li")
      a Advanced Form

  #wrapper
    router-view

</template>

<style lang="css" scoped>
  #wrapper {
    margin-top: 2em;
  }
</style>
