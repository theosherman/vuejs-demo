<template lang="pug">
mixin textbox(label, binding, inputType)
  .form-group(:class="{ 'has-error': $v." + binding + ".$error }")
    label.control-label.col-sm-2(for=binding)= label
    .col-sm-10
      input.form-control(type=inputType ? inputType : 'text', v-model.trim=binding, id=binding, @input='$v.' + binding + '.$touch()', placeholder=label)

mixin validation(binding, validation, message)
  .col-sm-10.col-sm-offset-2.validation-message(v-show=("!$v." + binding + "." + validation + " && $v." + binding + ".$error === true"))= message

mixin button(label, clickAction, buttonType)
  button.btn(class="btn-" + (buttonType ? buttonType : "default"), @click=clickAction)&attributes(attributes)= label

div
  h1 Form

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
    +validation('age', 'tooYoung', 'Age needs to be 18+')
    +validation('age', 'tooOld', 'Too damn old!')

    +button('Sign up!', 'save()', 'primary')(class="pull-right", :class="{'disabled': $v.$invalid === true}")

</template>

<script>
import http from '../http'
import { required, email, minLength, between } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    username: '',
    name: '',
    email: '',
    age: 0
  }),
  methods: {
    save() {
      if (this.$v.$invalid === false)
        alert('Saved!')
    }
  },
  validations: {
    name: { required, minLength: minLength(4) },
    age: {
      tooYoung: (age) => !(age < 18),
      tooOld: (age) => !(age > 100)
      },
    username: {
      required,
      async isUnique (username)  {
        if (username === '')
          return true
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
