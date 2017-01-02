<template lang="pug">
.panel.panel-default
  .panel-heading Child 1
  .panel-body
    input.form-control(type="text", v-model="message", @input="setMessage")
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
