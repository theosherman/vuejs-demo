<template lang="pug">
include ../../FormHelpers.pug

.row
  .col-md-6
    h3
      | Advanced Form&nbsp;
      small List of lists
      button.btn.btn-default.pull-right(@click='addPerson()')
          i.fa.fa-plus
          | &nbsp;&nbsp;
          i.fa.fa-user
          
    .form-horizontal

      .well(v-for="(person, i) in form.people")
        .form-group(:class="{ 'has-error': $v.form.people.$each[i].name.$error }")
          input.form-control.input-lg(
              type='text',
              v-model.trim='person.name',
              @input='$v.form.people.$each[i].name.$touch()',
              placeholder='Name'
              )

        h4 Phone numbers...
          button.btn.btn-sm.btn-default.pull-right(@click='addPhoneNumber(person)', style="margin-top: -6px")
            i.fa.fa-plus
        .row(v-for="(phoneNumber, j) in person.phoneNumbers")
          .col-md-2
            .btn.btn-danger.btn-sm.pull-right(@click="removePhoneNumber(person, j)")
              i.fa.fa-trash
          .col-md-5
            .form-group(:class="{ 'has-error': $v.form.people.$each[i].phoneNumbers.$each[j].phoneNumber.$error }")
              masked-input.form-control.input-sm(
                  v-model='phoneNumber.phoneNumber',
                  mask="(111) 111-1111",
                  :placeholder="'Phone number ' + (j + 1) + ' for ' + person.name"
                  )
          .col-md-5
            .form-group(:class="{ 'has-error': $v.form.people.$each[i].phoneNumbers.$each[j].type.$error }")
              select.form-control.input-sm(v-model="phoneNumber.type")
                option(v-for="option in typeOptions") {{ option }}
      
      button.btn.btn-primary.pull-right(@click="save()")
        i.fa.fa-floppy-o
        | &nbsp;Save
            

  .col-md-6
    pre
      | form: {{ form }}
      | 
      | validation: {{ $v.form }}
</template>

<script>
import Vue from 'vue'
import http from '../../http'
import { required, email, minLength, between } from 'vuelidate/lib/validators'

function phone(value) {
  
}

export default {

  data: () => ({
    form: {
      people: [
        {
          name: 'David',
          phoneNumbers: [
            { phoneNumber: '1234567890', type: 'Home' },
            { phoneNumber: '4252116878', type: 'Mobile' }
          ]
        }
      ]
    },
    typeOptions: [
      'Home',
      'Work',
      'Mobile',
      'Fax',
      'Other'
    ]
    
  }),

  methods: {
    save() {
      this.$v.$touch()
      if (this.$v.$invalid === true) return
      alert('Saved!')
      this.form.people = []
      this.$v.$reset()
    },
    addPerson() {
      this.form.people.push({ name: '', phoneNumbers: [] })
    },
    addPhoneNumber(person) {
      person.phoneNumbers.push({ phoneNumber: '', type: '' })
    },
    removePhoneNumber(person, index) {
      person.phoneNumbers.splice(index, 1)
    }
  },

  validations: {
    form: {
      people: {
        $each: {
          name: { required, minLength: minLength(4) },
          phoneNumbers: {
            $each: {
              phoneNumber: { required },
              type: { required }
            }
          }
        }
      }
    }
  },

  components: {
    'masked-input': require('vue-masked-input')
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
