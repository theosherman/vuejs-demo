<template lang="pug">
div
  h1 Form
  hr
  basic-form
  hr
  advanced-form
</template>

<script>
export default {
  components: {
    'basic-form': require('./BasicForm'),
    'advanced-form': require('./AdvancedForm')
  }
}
</script>

<style lang="css">
.validation-message {
  color: #a94442;
  margin-top: -16px;
  font-size: .85em;
}
</style>
