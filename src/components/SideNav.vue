<template lang="pug">
.list-group
  router-link.list-group-item(to="/" exact) Home
  router-link.list-group-item(to="/databinding") Data Binding
  router-link.list-group-item(to="/grid/localdata") Grid
  router-link.list-group-item(to="/form/basicform") Form
  router-link.list-group-item(to="/statemanagement") State Management
  router-link.list-group-item(to="/jquery") JQuery Integration
  router-link.list-group-item(to="/modal") Modal
  router-link.list-group-item(to="/secureroute") Secure Route
  router-link.list-group-item(to="/lazyroute") Lazy Route
</template>
