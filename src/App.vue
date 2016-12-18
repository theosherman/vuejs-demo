<template lang="pug">
div
  .container
    h1 Vue.JS Demo
  hr
  .container
    .row
      .col-md-3
        side-nav
      .col-md-9
        router-view
</template>

<script>
import router from './router'

export default {
  router,
  name: 'app',
  components: {
    'side-nav': require('./components/SideNav.vue')
  }
}
</script>

<style lang="less">
@import "~bootstrap/less/bootstrap";

@gray-base:             #000;
@gray-darker:           lighten(@gray-base, 13.5%); // #222
@gray-dark:             lighten(@gray-base, 20%);   // #333
@gray:                  lighten(@gray-base, 33.5%); // #555
@gray-light:            lighten(@gray-base, 46.7%); // #777
@gray-lighter:          lighten(@gray-base, 93.5%); // #eee

@brand-primary:         darken(#428bca, 6.5%); // #337ab7
@brand-success:         #5cb85c;
@brand-info:            #5bc0de;
@brand-warning:         #f0ad4e;
@brand-danger:          #d9534f;

@state-success-text:    #3c763d;
@state-success-bg:      #dff0d8;

@state-info-text:       #31708f;
@state-info-bg:         #d9edf7;

@state-warning-text:    #8a6d3b;
@state-warning-bg:      #fcf8e3;

@state-danger-text:     #a94442;
@state-danger-bg:       #f2dede;
</style>
