<template>
  <div>
    我是detail
    <button @click="clickHandle">去404</button>
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
