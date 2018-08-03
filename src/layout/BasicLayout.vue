<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        class="el-menu-vertical-demo"
        @select="selectHandle"
      >
        <el-submenu v-for="item in menuList" :key="item.path" :index="item.path">
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
      <el-header style="text-align: right; font-size: 12px">
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

export default {
  name: 'BaseLayout',
  data() {
    return {
      menuList: getMenuData()
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

<style>
</style>
