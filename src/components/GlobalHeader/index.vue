<template>
  <a-layout-header class="global-header">
    <a-icon
      class="trigger"
      :type="value ? 'menu-unfold' : 'menu-fold'"
      @click="toggleHandle"
    />
  </a-layout-header>
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

<style lang="less">
@import './index.less';
</style>
