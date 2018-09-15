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
import { queryCurrent } from '../services/user'
import { getTotalMenu } from '../menu/menu'
import SiderMenu from '../components/SiderMenu/index'
import GlobalHeader from '../components/GlobalHeader/index.vue'
import logo from '../assets/logo.svg'

export default {
  name: 'BaseLayout',
  data() {
    return {
      logo,
      menuData: getTotalMenu()
    }
  },
  methods: {
    async queryCurrent() {
      const data = await queryCurrent()
      console.log(23)
      console.log(data)
    }
  },
  components: {
    SiderMenu,
    GlobalHeader
  },
  created() {
    this.queryCurrent()
  }
}
</script>

<style lang="less">
@import './BasicLayout.less';

</style>
