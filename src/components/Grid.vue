<template lang="pug">
div
  h1 Grid
  hr

  .row
    .col-md-4
      input.form-control.input-sm(type='text', v-model='searchText', placeholder='Search')
    .col-md-8
      div.pull-right
        button.btn.btn-default.btn-sm(@click="edit = !edit")
          i.fa.fa-pencil

  table.table
    thead
      tr
        th ID
        th First Name
        th Last Name
        th Username
        th(v-if="edit")
    tbody
      tr(v-for='x in paginatedData')
        td {{ x.id }}
        td
          span(v-if="!x.edit") {{ x.fname }}
          span(v-if="x.edit")
            input.form-control.input-sm(v-model="x.fname")
        td
          span(v-if="!x.edit") {{ x.lname }}
          span(v-if="x.edit")
            input.form-control.input-sm(v-model="x.lname")
        td
          span(v-if="!x.edit") {{ x.username }}
          span(v-if="x.edit")
            input.form-control.input-sm(v-model="x.username")
        td(v-if="edit")
          .pull-right
            button.btn.btn-xs.btn-warning.button-spacing(@click="toggleEdit(x)", v-if="!x.edit")
              i.fa.fa-pencil
            button.btn.btn-xs.btn-success.button-spacing(@click="updateItem(x)", v-if="x.edit")
              i.fa.fa-save
            button.btn.btn-xs.btn-danger.button-spacing(@click="deleteItem(x.id)")
              i.fa.fa-trash
            
      tr(v-if='edit && hasInput')
        td
          i.fa.fa-plus
        td {{ input.fname }}
        td {{ input.lname }}
        td {{ input.username }}
        td(v-if="edit")
          .pull-right
            button.btn.btn-xs.btn-success.button-spacing(@click="addItem")
              i.fa.fa-save

      tr(v-if="edit")
        td
        td
          input.form-control.input-sm(type='text', v-model='input.fname', placeholder='First Name')
        td
          input.form-control.input-sm(type='text', v-model='input.lname', placeholder='Last Name')
        td
          input.form-control.input-sm(type='text', v-model='input.username', placeholder='Username')
        td
</template>

<script>
import http from '../http'
import miniToastr from 'mini-toastr'

function paginateRows (data, pageNum) {
  return data
}

function sortRows (data, sortColumn) {
  return data
}

function filterRows (data, searchText) {
  return data
  // searchText = searchText.toLowerCase()
  // return data.filter(obj => Object.keys(obj).some(key => obj[key].toLowerCase().includes(searchText)))
}

export default {

  data: () => ({
    searchText: '',
    sortColumn: 'fname',
    edit: false,
    input: {
      fname: '',
      lname: '',
      username: ''
    },
    pageNum: 0,
    tableData: []
  }),

  methods: {
    async refresh() {
      try {
        const { data } = await http.get('/users')
        this.tableData = data
      } catch(err) {
        miniToastr.error('Unable to fetch table data.', err.message)
      }
    },
    toggleEdit(item) {
      if (!item.edit) {
        this.$set(item, 'edit')
        item.edit = false
      }
      item.edit = !item.edit
    },
    async addItem() {
      try {
        await http.post('/users', this.input)
        this.refresh()
        this.input.fname = this.input.lname = this.input.username = ''
      } catch(err) {
        miniToastr.error('Unable to save user.', err.message)
      }
    },
    async updateItem(item) {
      try {
        this.$delete(item, 'edit')
        await http.put(`/users/${item.id}`, item)
        this.refresh()
      } catch(err) {
        miniToastr.error('Unable to save user.', err.message)
      }
    },
    async deleteItem(id) {
      try {
        await http.delete(`/users/${id}`)
        this.refresh()
      } catch(err) {
        miniToastr.error('Unable to remove user.', err.message)
      }
    }
  },

  computed: {
    paginatedData () {
      return paginateRows(this.sortedData, this.pageNum)
    },
    sortedData () {
      return sortRows(this.filteredData, this.sortColumn)
    },
    filteredData () {
      return filterRows(this.tableData, this.searchText)
    },
    hasInput() {
      return this.input.fname.length > 0 || this.input.lname.length > 0 || this.input.username.length > 0
    }
  },

  mounted () {
    this.refresh()
  }

}
</script>

<style lang="css">
  .button-spacing {
    margin-left: 2px;
  }
</style>
