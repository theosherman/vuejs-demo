<template lang="pug">
include ../../FormHelpers.pug

.row
  .col-md-6
    h3
      | List of lists
      button.btn.btn-default.pull-right(@click='addPerson()')
          i.fa.fa-plus
          | &nbsp;&nbsp;
          i.fa.fa-user
          
    .form-horizontal

      div(v-for="(person, i) in form.people")
        hr
        .form-group(:class="{ 'has-error': $v.form.people.$each[i].$error }")
          input.form-control.input-lg(
              type='text',
              v-model.trim='person.name',
              @input='$v.form.people.$each[i].name.$touch()',
              placeholder='Name'
              )

        h4 Phone numbers...
        button.btn.btn-default(@click='addPhoneNumber(person)')
          i.fa.fa-plus
        div(v-for="(phoneNumber, j) in person.phoneNumbers")
          .form-group(:class="{ 'has-error': $v.form.people.$each[i].phoneNumbers.$each[j].$error }")
            input.form-control.input-sm(
                type='text',
                v-model.trim='phoneNumber.phoneNumber',
                @input='$v.form.people.$each[i].phoneNumbers.$each[j].phoneNumber.$touch()',
                :placeholder="'Phone number ' + (j + 1) + ' for ' + person.name"
                )

  .col-md-6
    pre
      | form: {{ form }}
      | 
      | validation: {{ $v.form }}
</template>

<script>
import http from '../../http'
import { required, email, minLength, between } from 'vuelidate/lib/validators'

export default {

  data: () => ({
    form: {
      people: [
        {
          name: 'David',
          phoneNumbers: [
            { phoneNumber: '123-456-7890', type: 'Home' },
            { phoneNumber: '425-211-6878', type: 'Mobile' }
          ]
        }
      ]
    }
    
  }),

  methods: {
    save() {
      if (this.$v.$invalid === true) return
      alert('Saved!')
      this.form.$v.$reset()
    },
    addPerson() {
      this.form.people.push({ name: '', phoneNumbers: [] })
    },
    addPhoneNumber(person) {
      person.phoneNumbers.push({ phoneNumber: '', type: '' })
    }
  },

  validations: {
    form: {
      people: {
        $each: {
          name: { required, minLength: minLength(4) },
          phoneNumbers: {
            $each: {
              phoneNumber: { required }
            }
          }
        }
      }
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
</style>
