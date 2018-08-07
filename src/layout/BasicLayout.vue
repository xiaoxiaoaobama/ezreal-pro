<template>
   <a-layout class="main-container">
    <SiderMenu
      :logo="logo"
      :collapsed="collapsed"
      :width="256"
    />

    <a-layout>
      <GlobalHeader v-model="collapsed"/>

      <a-layout-content class="container-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import SiderMenu from '../components/SiderMenu/index.vue'
import GlobalHeader from '../components/GlobalHeader/index.vue'
import logo from '../assets/logo.svg'

export default {
  name: 'BaseLayout',
  data() {
    return {
      logo,
      collapsed: false
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
