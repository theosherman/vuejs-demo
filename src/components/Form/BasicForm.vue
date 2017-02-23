<template lang="pug">
include ../../FormHelpers.pug

.row
  .col-md-6

    h3 Basic Form
    .form-horizontal

      +textbox('Username', 'form.username')
      +validation('form.username', 'required', 'Username is required')
      +validation('form.username', 'isUnique', 'Username is not available')

      +textbox('Name', 'form.name')
      +validation('form.name', 'required', 'Name is required')
      +validation('form.name', 'minLength', 'Name needs to be more than 3 characters')

      +textbox('Email', 'form.email')
      +validation('form.email', 'required', 'Email is required')
      +validation('form.email', 'email', 'Email is invalid')

      +textbox('Age', 'form.age')
      +validation('form.age', 'isAdult', 'Age needs to be 18+')
      +validation('form.age', 'notTooOld', 'Too damn old!')

      +button('Sign up!', 'save()', 'success')(class="pull-right", :class="{'disabled': $v.$invalid === true}")

  .col-md-6
    pre
      | form: {{ form }}
      | 
      | validation: {{ $v.form }}

</template>

<script>
import http from '../../http'
import { required, email, minLength, between } from 'vuelidate/src/validators'

export default {

  data: () => ({
    form: {
      username: '',
      name: '',
      email: '',
      age: ''
    }
  }),

  methods: {
    save() {
      if (this.$v.$invalid === true) return
      alert('Saved!')
      this.form.username = this.form.name = this.form.email = this.form.age = ''
      this.form.$v.$reset()
    }
  },

  validations: {
    form: {
      name: { required, minLength: minLength(4) },
      age: { isAdult: (age) => age >= 18, notTooOld: (age) => age < 120 },
      username: {
        required,
        async isUnique (username)  {
          if (username === '') return true
          let { data } = await http.get(`/users?username=${this.username}`)
          return !(data.length > 0)
        }
      },
      email: { required, email }
    }
  }
  
}

</script>

<style lang="css">
.validation-message {
  color: #a94442;
  margin-top: -16px;
  font-size: .85em;
}

h3 {
  margin-bottom: 1em;
}
</style>
