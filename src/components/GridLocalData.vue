<template lang="pug">
div

  .row
    .col-xs-8.col-sm-4
      input.form-control.input-sm(type='text', v-on:keyup='search', placeholder='Search')
    .col-xs-4.col-sm-8
      div.pull-right
        button.btn.btn-default.btn-sm(@click="edit = !edit")
          i.fa.fa-pencil

  table.table
    thead
      tr
        th(@click="sortBy('id')") ID {{ sortValue('id') }}
        th(@click="sortBy('fname')") First Name {{ sortValue('fname')}}
        th(@click="sortBy('lname')") Last Name {{ sortValue('lname')}}
        th(@click="sortBy('username')") Username {{ sortValue('username')}}
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
            button.btn.btn-xs.btn-warning.button-spacing(@click="cancelEdit(x)", v-if="x.edit")
              i.fa.fa-ban
            button.btn.btn-xs.btn-success.button-spacing(@click="updateItem(x)", v-if="x.edit")
              i.fa.fa-save
            button.btn.btn-xs.btn-danger.button-spacing(@click="deleteItem(x.id)", v-if="!x.edit")
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

  nav.pull-right
    ul.pagination
      li
        a(@click="decrementPage") &laquo;
      li(v-for="i in pages", :class="{'active': pageNum === i}")
        a(@click="pageNum = i") {{ i }}
      li
        a(@click="incrementPage") &raquo;
</template>

<script>
import http from '../http'
import _ from 'lodash'
import miniToastr from 'mini-toastr'

export default {

  data: () => ({
    searchText: '',
    sortColumn: 'fname',
    sortDirection: 'asc',
    edit: false,
    input: {
      fname: '',
      lname: '',
      username: ''
    },
    pageNum: 1,
    perPage: 3,
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

    search: _.debounce(function(e) {
        this.searchText = e.target.value
    }, 300),

    sortBy(column) {
      if (this.sortColumn === column)
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      else
        this.sortColumn = column
    },

    sortValue(column) {
      if (this.sortColumn === column)
        return this.sortDirection === 'asc' ? "↓" : "↑"
      return ""
    },

    incrementPage() {
      if (this.pageNum < this.pages)
        this.pageNum++
    },

    decrementPage() {
      if (this.pageNum > 1)
        this.pageNum--
    },

    toggleEdit(item) {
      if (!item.edit) {
        this.$set(item, 'edit')
        item.edit = false
      }
      item.edit = !item.edit
    },

    async cancelEdit(item) {
      await this.refresh()
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
    filteredData () {
      if (this.searchText === "")
        return this.tableData

      return _.filter(this.tableData, (item) => {
          const searchText = _.toLower(this.searchText)
          let match = false
          _.forOwn(item, (value) => {
            if (_.isString(value) && _.toLower(value).indexOf(searchText) !== -1)
              match = true
            if (_.isNumber(value) && value === Number(searchText))
              match = true
            if (match)
              return
          })
          return match
      })
    },

    sortedData () {
      return _.orderBy(this.filteredData, this.sortColumn, this.sortDirection)
    },

    paginatedData () {
	    const start = (this.pageNum - 1) * this.perPage
      const end = start + this.perPage
	    return _.slice(this.sortedData, start, end)
    },

    hasInput() {
      return this.input.fname.length > 0 || this.input.lname.length > 0 || this.input.username.length > 0
    },

    pages() {
      return _.ceil(this.filteredData.length / this.perPage)
    }
  },

  mounted () {
    this.refresh()
  }

}
</script>

<style lang="css" scoped>
  .button-spacing {
    margin-left: 2px;
  }

  th, .pagination li a {
    cursor: pointer;
  }
</style>
