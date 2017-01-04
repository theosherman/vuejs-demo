<template lang="pug">
div
  h1 State Management
  hr
  h3 Current value of displayName: "{{ displayName }}"

  .form-horizontal
    input.form-control(v-model="nameInput", placeholder = "Name")
    button.btn.btn-primary(@click="setDisplayName(nameInput)") Set
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {

  data: () => ({
    nameInput: ''
  }),

  methods: {
    ...mapMutations('auth', ['setDisplayName'])
  },

  computed: {
    ...mapState('auth', { displayName: state => state.displayName })
  }

}
</script>