<template lang="pug">
.row
  .col-md-6
    child1
  .col-md-6
    child2
</template>

<script>
export default {
  components: {
    child1: require('./Child1'),
    child2: require('./Child2')
  }
}
</script>
