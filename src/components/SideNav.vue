<template lang="pug">

.list-group
  router-link.list-group-item(to="/" exact) Home
  router-link.list-group-item(to="/grid") Grid

</template>

<script>
export default {
  name: 'SideNav'
}
</script>
