<template>
    <a-layout-sider
      class="aside"
      :width="width"
      :collapsedWidth="80"
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <div class="logo" key="logo">
        <router-link to="/">
          <img :src="logo" alt="logo" />
          <h1>Ezreal Pro</h1>
        </router-link>
      </div>

      <a-menu
        mode="inline"
        theme="dark"
        :defaultSelectedKeys="['1']"
        :defaultOpenKeys="['sub1']"
        @select="selectHandle"
      >
        <a-menu-item v-for="item in menuList" v-if="!item.children" :key="item.path">
          <a-icon :type="item.icon" />
          <span>{{item.label}}</span>
        </a-menu-item>

        <a-sub-menu v-for="item in menuList" v-if="item.children" :key="item.path">
          <span slot="title"><a-icon :type="item.icon" /><span>{{item.label}}</span></span>
          <a-menu-item v-for="child in item.children" :key="child.path">{{child.label}}</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
</template>

<script>
import { getMenuData } from '../../menu/menu'

export default {
  name: 'SiderMenu',
  data() {
    return {
      menuList: getMenuData()
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
  methods: {
    selectHandle({key}) {
      console.log(key)
      this.$router.push(key)
    }
  },
  created() {
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
