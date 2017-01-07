<template lang="pug">
div
  h1 Data Binding
  hr
  pre {{ data }}

  .row
    .col-md-3
      button.btn.btn-lg(@click="toggleMessage()", :class="buttonStyle") {{ buttonText }}
    .col-md-9
      .alert.alert-info(v-if="data.hide === false")
        input.form-control.input-lg(v-model="data.message")
        h1.text-center {{ data.message }}
</template>

<script>
export default {

  data: () => ({
    data: {
      message: 'Hello world!',
      hide: false
    }
  }),

  methods: {
    toggleMessage() {
      this.data.hide = !this.data.hide
    }
  },

  computed: {
    buttonText() {
        return this.data.hide ? 'Show' : 'Hide'
    },
    buttonStyle() {
      return { 'btn-default': this.data.hide, 'btn-warning': !this.data.hide }
    }
  }

}
</script>
