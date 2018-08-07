<template>
  <div>
    我是list
    <a-button @click="clickHandle">跳转到详情页</a-button>
  </div>
</template>

<script>
export default {
  name: 'search',
  methods: {
    clickHandle() {
      this.$router.push('detail')
    }
  }
}
</script>

<style>
</style>
