<template>
  <div class="global-header">
    <el-button @click="toggleHandle">点击缩放</el-button>
  </div>
</template>

<script>
export default {
  name: 'GlobalHeader',
  data() {
    return {

    }
  },
  props: {
    logo: String,
    width: String,
    value: Boolean
  },
  methods: {
    toggleHandle() {
      this.$emit('input', !this.value)
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
