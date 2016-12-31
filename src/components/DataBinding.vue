<template lang="pug">
.container
  .row
    .col-md-4
      button.btn.btn-default(@click="toggleMessage()") {{ buttonText }}
    .col-md-8
      .alert.alert-info(v-if="hide === false")
        h1 {{ message }}
</template>

<script>
export default {

  data: () => ({
    message: 'Hello world!',
    hide: false
  }),

  methods: {
    toggleMessage() {
      this.hide = !this.hide
    }
  },

  computed: {
    buttonText() {
      return this.hide ? 'Show' : 'Hide'
    }
  }

}
</script>
