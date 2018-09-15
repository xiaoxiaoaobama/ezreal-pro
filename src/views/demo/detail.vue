<template>
  <div>
    我是detail
  </div>
</template>

<script>
export default {
  name: 'search',
  methods: {
    clickHandle() {
      console.log(23)
      this.$router.push({
        name: '404'
      })
    }
  }
}
</script>

<style>
</style>
