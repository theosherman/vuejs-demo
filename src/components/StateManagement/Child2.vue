<template lang="pug">
.panel.panel-default
  .panel-heading Child 2
  .panel-body
    input.form-control(type="text", :value="message", @input="setMessage")
    h2 {{ message }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  methods: {
    setMessage(e) {
      this.$store.commit('setMessage', e.target.value)
    }
  },

  computed: {
    ...mapGetters({
      message: 'getMessage'
    })
  }

}
</script>
