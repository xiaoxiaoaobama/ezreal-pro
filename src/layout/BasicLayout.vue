<template>
  <el-container class="main-container">
    <SiderMenu
      :logo="logo"
      :collapsed="collapsed"
      :width="256"
    />

    <el-container>
      <el-header height="64px">
        <GlobalHeader v-model="collapsed" />
      </el-header>

      <el-main class="container-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
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

<style lang="scss">
@import './BasicLayout.scss';
.main-container {
  .el-header {

  }
}
</style>
