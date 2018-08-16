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
// import { getMenuData } from '../menu/menu'
import { getTotalMenu } from '../menu/menu'
import SiderMenu from '../components/SiderMenu/index'
import GlobalHeader from '../components/GlobalHeader/index.vue'
import logo from '../assets/logo.svg'
// console.log(getTotalMenu())

export default {
  name: 'BaseLayout',
  data() {
    return {
      logo,
      menuData: getTotalMenu()
    }
  },
  methods: {
  },
  components: {
    SiderMenu,
    GlobalHeader
  }
}
</script>

<style lang="less">
@import './BasicLayout.less';

</style>
