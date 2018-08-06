<template>
  <el-container>

    <el-aside class="aside" width="256px">
      <div class="logo" key="logo">
        <router-link to="/">
          <img :src="logo" alt="logo" />
          <h1>Ezreal Pro</h1>
        </router-link>
      </div>

      <el-menu
        class="el-menu-vertical-demo"
        @select="selectHandle"
        :collapse="isCollapse"
      >
        <el-menu-item v-for="item in menuList" v-if="!item.children" :key="item.path" :index="item.path">{{item.label}}</el-menu-item>

        <el-submenu v-for="item in menuList" v-if="item.children" :key="item.path" :index="item.path">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.label}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
            <i class="el-icon-menu"></i>
            <span slot="title">{{child.label}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        我是头部
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenuData } from '../menu/menu'
import logo from '../assets/logo.svg'

export default {
  name: 'BaseLayout',
  data() {
    return {
      menuList: getMenuData(),
      isCollapse: false,
      logo
    }
  },
  methods: {
    selectHandle(path) {
      console.log(path)
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss">
@import './BasicLayout.scss';

</style>
