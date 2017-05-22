<template lang="pug">
div
  h1 State Management
  hr
  .row

    .col-md-6
      .input-group
        input.form-control(v-model.trim="nameInput", @keyup.enter="setDisplayName(nameInput)", placeholder = "displayName")
        .input-group-btn
          button.btn.btn-success(@click="setDisplayName(nameInput)")
            i.fa.fa-save
            | &nbsp;Save
      
      h2 displayName: {{ $store.state.auth.displayName }}

    .col-md-6
      pre {{ $store.state }}
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