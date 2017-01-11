<template lang="pug">
div
  h1 Lazy Loaded Route
  hr

  .alert.alert-info
    span
      i.fa.fa-info-circle
      b &nbsp;Info
      | &nbsp;&nbsp;This route was loaded asynchronously. Check the network tab in developer tools to verify.
</template>

<script>
export default {

  data: () => ({}),

  methods: {},

  computed: {}

}
</script>
