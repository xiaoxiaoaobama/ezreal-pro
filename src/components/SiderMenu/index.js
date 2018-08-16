import { mapState } from 'vuex'
import pathToRegexp from 'path-to-regexp'
import { urlToList } from '../../utils/index'
import './index.less'

export default {
  name: 'SiderMenu',
  data() {
    return {
      openKeys: this.getDefaultCollapsedSubMenus()
    }
  },
  computed: {
    ...mapState({
      collapsed: state => {
        return state.app.collapsed
      }
    }),
    selectedKeys() {
      const flatMenuKeys = this.getFlatMenuKeys(this.menuData)
      // console.log(flatMenuKeys)
      // console.log(this.$route.path)
      const aa = this.getSelectedMenuKeys(flatMenuKeys, urlToList(this.$route.path))
      // console.log(aa)
      return aa
    }
  },
  props: {
    logo: String,
    width: Number,
    menuData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectHandle({key}) {
      this.$router.push(key)
    },
    getNavMenuItems(menuData) {
      if (!menuData) {
        return []
      }
      return menuData
        .filter(item => !item.hideInMenu)
        .map(item => this.getSubMenuOrItem(item))
    },
    getSubMenuOrItem(menu) {
      if (menu.children && menu.children.length > 0) {
        return (
          <a-sub-menu key={menu.path}>
            <span slot="title">
              {menu.icon ? <a-icon type={menu.icon} /> : null}
              <span>{menu.name}</span>
            </span>
            {this.getNavMenuItems(menu.children)}
          </a-sub-menu>
        )
      } else { // 不存在
        return (
          <a-menu-item key={menu.path}>
            {menu.icon ? <a-icon type={menu.icon} />: null}
            <span>{menu.name}</span>
          </a-menu-item>
        )
      }
    },
    getSelectedMenuKeys(flatMenuKeys, paths) { // 获取选中的菜单key
      return paths.filter(path => {
        // return flatMenuKeys.indexOf(path) > -1
        return flatMenuKeys.filter(item => pathToRegexp(item).test(path))
      })
    },
    getFlatMenuKeys(menuData) {
      return menuData.reduce((keys, item) => {
        keys.push(item.path)
        if (item.children && item.children.length > 0) {
          return keys.concat(this.getFlatMenuKeys(item.children))
        }
        return keys
      }, [])
    },
    getDefaultCollapsedSubMenus() {
      const flatMenuKeys = this.getFlatMenuKeys(this.menuData)
      return this.getSelectedMenuKeys(flatMenuKeys, urlToList(this.$route.path))
    },
    handleOpenChange(openKeys) {
      console.log(111)
      console.log(openKeys)
      const lastKey = openKeys[openKeys.length - 1]
      this.openKeys = [lastKey]
    }
  },
  created() {
    // console.log(this.$store);
    // console.log(this.collapsed);
  },
  render() {
    return (
      <a-layout-sider
        class="aside"
        width={this.width}
        collapsedWidth={80}
        trigger={null}
        collapsible
        collapsed={this.collapsed}
      >
        <div class="logo" key="logo">
          <router-link to="/">
            <img src={this.logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </router-link>
        </div>

        <a-menu
          mode="inline"
          theme="dark"
          openKeys={this.openKeys}
          selectedKeys={this.selectedKeys}
          on-select={this.selectHandle}
          on-openChange={this.handleOpenChange}
        >
          {this.getNavMenuItems(this.menuData)}
        </a-menu>
      </a-layout-sider>
    )
  }
}
