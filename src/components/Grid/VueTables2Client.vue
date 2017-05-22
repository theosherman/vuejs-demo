<template lang="pug">
div
  v-client-table(:data="tableData", :columns="columns", :options="options")
</template>

<script>
import http from 'src/http'
import _ from 'lodash'
import miniToastr from 'mini-toastr'

export default {

  data: () => ({
    columns: ['id', 'fname', 'lname', 'username'],
    tableData: [],
    options: {}
  }),

  methods: {
    async refresh() {
      try {
        const { data } = await http.get('/users')
        this.tableData = data
      } catch(err) {
        miniToastr.error('Unable to fetch table data.', err.message)
      }
    }
  },

  mounted() {
    this.refresh()
  }

}
</script>
