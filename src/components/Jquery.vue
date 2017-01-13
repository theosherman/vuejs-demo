<template lang="pug">
div
  h1 JQuery Integration
  hr
  h3 Select a language:
  
  select.form-control(id="control")
    option(value="cpp") C++
    option(value="js") Javascript
    option(value="go") Go
    option(value="basic") Basic
    option(value="Pascal") Pascal

  h3 Selection: {{ selection }}
</template>

<script>
import $ from 'jquery'
import 'select2'

export default {

  data: () => ({
    selection: ''
  }),

  mounted() {
    const control = $('#control');
    control.select2();
    control.on("change", (e) => {
      this.selection = e.target.value;
    })
    this.selection = control[0].value;
  }
  
}
</script>

<style lang="less">
  @import "~select2/dist/css/select2.css";
</style>