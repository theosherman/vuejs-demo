<template lang="pug">
div
	h1 Grid

	input.form-control(type='text', v-model='searchText', placeholder='Search')

	table.table
		thead
			tr
				th First Name
				th Last Name
				th Username
				th
		tbody

			tr(v-for='x in paginatedData')
				td {{ x.fname }}
				td {{ x.lname }}
				td {{ x.username }}
				td
					button.btn.btn-xs.btn-danger
						i.fa.fa-trash

			tr(v-if='input.fname.length > 0 || input.lname.length > 0 || input.username.length > 0')
				td {{ input.fname }}
				td {{ input.lname }}
				td {{ input.username }}

			tr
				td
					input.form-control(type='text', v-model='input.fname', placeholder='First Name')
				td
					input.form-control(type='text', v-model='input.lname', placeholder='Last Name')
				td
					input.form-control(type='text', v-model='input.username', placeholder='Username')
				td
					button.btn.btn-default(@click='addItem') Add
</template>

<script>
import http from '../http'

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
		input: {
			fname: '',
			lname: '',
			username: ''
		},
    pageNum: 0,
    tableData: []
  }),
	methods: {
		addItem() {
			http.post('/users', this.input).then((response) => {
				http.get('/users').then((response) => {
		      this.tableData = response.data
		    }).catch((err) => {
		      console.log(err)
		    })
				this.input.fname = ''
				this.input.lname = ''
				this.input.username = ''
			})
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
    }
  },
  mounted () {
    http.get('/users').then((response) => {
      this.tableData = response.data
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
