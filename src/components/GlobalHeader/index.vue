<template>
  <a-layout-header class="global-header">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="toggleHandle"
    />
  </a-layout-header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'GlobalHeader',
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      collapsed: state => state.app.collapsed
    })
  },
  props: {
    logo: String,
    width: String
  },
  methods: {
    ...mapMutations({
      toggleHandle: 'TOGGLE_COLLAPSED'
    })
  },
  created() {
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
