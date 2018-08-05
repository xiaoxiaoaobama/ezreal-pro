<template>
  <div>
    我是list
    <el-button @click="clickHandle">跳转到详情页</el-button>
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
