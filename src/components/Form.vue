<template lang="pug">
include ../FormHelpers.pug

div
  h1 Form
  hr
    
  .form-horizontal

    +textbox('Username', 'username')
    +validation('username', 'required', 'Username is required')
    +validation('username', 'isUnique', 'Username is not available')

    +textbox('Name', 'name')
    +validation('name', 'required', 'Name is required')
    +validation('name', 'minLength', 'Name needs to be more than 3 characters')

    +textbox('Email', 'email')
    +validation('email', 'required', 'Email is required')
    +validation('email', 'email', 'Email is invalid')

    +textbox('Age', 'age')
    +validation('age', 'isAdult', 'Age needs to be 18+')
    +validation('age', 'notTooOld', 'Too damn old!')

    +button('Sign up!', 'save()', 'success')(class="pull-right", :class="{'disabled': $v.$invalid === true}")

</template>

<script>
import http from '../http'
import { required, email, minLength, between } from 'vuelidate/lib/validators'

export default {

  data: () => ({
    username: '',
    name: '',
    email: '',
    age: ''
  }),

  methods: {
    save() {
      if (this.$v.$invalid === true) return
      alert('Saved!')
      this.username = this.name = this.email = this.age = ''
      this.$v.$reset()
    }
  },

  validations: {
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

</script>

<style lang="css">
.validation-message {
  color: #a94442;
  margin-top: -16px;
  font-size: .85em;
}
</style>
