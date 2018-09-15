<template>
   <a-layout class="main-container">
    <SiderMenu
      :logo="logo"
      :width="256"
      :menuData="menuData"
    />

    <a-layout>
      <GlobalHeader />

      <a-layout-content class="container-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import SiderMenu from '../components/SiderMenu/index'
import GlobalHeader from '../components/GlobalHeader/index.vue'
import logo from '../assets/logo.svg'

export default {
  name: 'BaseLayout',
  data() {
    return {
      logo
    }
  },
  computed: {
    menuData() {
      return this.$store.getters.menuData
    }
  },
  methods: {
  },
  components: {
    SiderMenu,
    GlobalHeader
  },
  created() {
  }
}
</script>

<style lang="less">
@import './BasicLayout.less';

</style>
