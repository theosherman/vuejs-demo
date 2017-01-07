<template lang="pug">
div
  h1 State Management
  hr
  pre {{ $store.state }}

  .input-group
    input.form-control(v-model.trim="nameInput", @keyup.enter="setDisplayName(nameInput)", placeholder = "displayName")
    .input-group-btn
      button.btn.btn-success(@click="setDisplayName(nameInput)")
        i.fa.fa-save
        | &nbsp;Save
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

}
</script>