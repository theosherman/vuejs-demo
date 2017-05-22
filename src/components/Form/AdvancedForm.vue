<template lang="pug">
include ../../FormHelpers.pug

.row
  .col-md-6
    h3
      | Advanced Form&nbsp;
      small List of lists
      button.btn.btn-default.pull-right(@click='addContact()')
          i.fa.fa-plus
          | &nbsp;&nbsp;
          i.fa.fa-user
          
    .form-horizontal

      .well(v-for="(contact, i) in form.contacts")
        .row

          .col-md-10
            .form-group(:class="{ 'has-error': $v.form.contacts.$each[i].name.$error }")
              input.form-control.input-lg(
                  type='text',
                  v-model.trim='contact.name',
                  @input='$v.form.contacts.$each[i].name.$touch()',
                  :placeholder="'Name for contact ' + (i + 1)")

          .col-md-2
            button.btn.btn-lg.btn-danger(@click="removeContact(i)")
              i.fa.fa-trash-o

        h4 Phone numbers...
          button.btn.btn-sm.btn-default.pull-right(@click='addPhoneNumber(contact)', style="margin-top: -6px")
            i.fa.fa-plus
        .row(v-for="(phoneNumber, j) in contact.phoneNumbers")

          .col-md-5
            .form-group(:class="{ 'has-error': $v.form.contacts.$each[i].phoneNumbers.$each[j].phoneNumber.$error }")
              masked-input.form-control.input-sm(
                  v-model='phoneNumber.phoneNumber',
                  mask="(111) 111-1111",
                  :placeholder="'Phone number ' + (j + 1) + ' for ' + contact.name")

          .col-md-5
            .form-group
              select.form-control.input-sm(v-model="phoneNumber.type")
                option(v-for="option in typeOptions") {{ option }}

          .col-md-2
            .btn.btn-danger.btn-sm.pull-right(@click="removePhoneNumber(contact, j)")
              i.fa.fa-trash
      
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

export default {

  data: () => ({
    form: {
      contacts: [
        {
          name: 'David',
          phoneNumbers: [
            { phoneNumber: '1111111111', type: 'Home' },
            { phoneNumber: '2222222222', type: 'Mobile' }
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
      this.form.contacts = []
      this.$v.$reset()
    },
    addContact() {
      this.form.contacts.push({ name: '', phoneNumbers: [] })
    },
    removeContact(index) {
      this.form.contacts.splice(index, 1)
    },
    addPhoneNumber(contact) {
      contact.phoneNumbers.push({ phoneNumber: '', type: '' })
    },
    removePhoneNumber(contact, index) {
      contact.phoneNumbers.splice(index, 1)
    }
  },

  validations: {
    form: {
      contacts: {
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
