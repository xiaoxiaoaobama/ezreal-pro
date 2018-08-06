<template>
  <!-- <div class="aside-wrapper"> -->
    <el-aside class="aside" :width="asideWidth">
      <div class="logo" key="logo">
        <router-link to="/">
          <img :src="logo" alt="logo" />
          <h1>Ezreal Pro</h1>
        </router-link>
      </div>

      <el-menu
        :style="{'width': asideWidth}"
        @select="selectHandle"
        :collapse="collapsed"
        :collapse-transition="false"
        background-color="#001529"
        text-color="rgba(255, 255, 255, 0.65)"
        active-text-color="#fff"
      >
        <el-menu-item v-for="item in menuList" v-if="!item.children" :key="item.path" :index="item.path">
          <i class="el-icon-location"></i>
          <span>{{item.label}}</span>
        </el-menu-item>

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
  <!-- </div> -->
</template>

<script>
import { getMenuData } from '../../menu/menu'

export default {
  name: 'SiderMenu',
  data() {
    return {
      menuList: getMenuData(),
      collapsedWidth: 64
    }
  },
  props: {
    logo: String,
    width: Number,
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    asideWidth() {
      const calWidth = this.collapsed ? this.collapsedWidth : this.width
      return calWidth + 'px'
    }
  },
  methods: {
    selectHandle(path) {
      console.log(path)
      this.$router.push(path)
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
