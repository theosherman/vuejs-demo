<template lang="pug">
div
	h1 Grid

	input.form-control(type="text", v-model="searchText", class="pull-right col-md-3", placeholder="Search")

	table.table
		thead
			tr
				th First Name
				th Last Name
				th Username
		tbody
			tr(v-for="x in paginatedData")
				td {{ x.fname }}
				td {{ x.lname }}
				td {{ x.username }}
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
    pageNum: 0,
    tableData: []
  }),
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
