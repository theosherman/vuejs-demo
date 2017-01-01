<template lang="pug">
.row
  .col-md-4
    button.btn.btn-lg(@click="toggleMessage()", :class="buttonStyle") {{ buttonText }}
  .col-md-8
    .alert.alert-info(v-if="hide === false")
      input.form-control.input-lg(v-model="message")
      h1.text-center {{ message }}
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
    },
    buttonStyle() {
      return { 'btn-success': this.hide, 'btn-warning': !this.hide }
    }
  }

}
</script>
