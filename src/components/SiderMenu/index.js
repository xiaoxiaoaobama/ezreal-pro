import { mapState } from 'vuex'
import pathToRegexp from 'path-to-regexp'
import { urlToList } from '../../utils/index'
import './index.less'

/**
 * 获取所有层级下菜单path
 */
export const getFlatMenuKeys = (menuData) => {
  return menuData.reduce((keys, item) => {
    keys.push(item.path)
    if (item.children && item.children.length > 0) {
      return keys.concat(getFlatMenuKeys(item.children))
    }
    return keys
  }, [])
}

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) => {
  return paths.reduce(
    (matchKeys, path) =>
      matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
    []
  )
}

export default {
  name: 'SiderMenu',
  data() {
    return {
      openKeys: []
    }
  },
  computed: {
    ...mapState({
      collapsed: state => {
        return state.app.collapsed
      }
    }),
    selectedKeys() {
      const { path } = this.$route
      return this.getSelectedMenuKeys(this.flatMenuKeys, urlToList(path))
    }
  },
  watch: {
    $route() {
      this.openKeys = this.getDefaultCollapsedSubMenus()
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
    /**
     * TODO: 在线icon待测试，返回jsx需要写在methods中？
     * icon: 'setting',
     * icon: 'http://demo.com/icon.png',
     * icon: <Icon type="setting" />,
     */
    getIcon(icon) {
      if (typeof icon === 'string') {
        if (icon.indexOf('http') === 0) {
          return <img src={icon} alt="icon" />
        }
        return <a-icon type={icon} />
      }
      return icon
    },
    /**
     * 判断是否是http链接.返回 Link 或 a
     * Judge whether it is http link.return a or Link
     * @memberof SiderMenu
     */
    getMenuItemPath(item) {
      const { path, name, icon } = item
      const itemIcon = this.getIcon(icon)
      const itemPath = this.conversionPath(path)
      if (/^https?:\/\//.test(itemPath)) {
        return (
          <a href={itemPath}>
            {itemIcon}
            <span>{name}</span>
          </a>
        )
      } else {
        return (
          <router-link to={itemPath}>
            {itemIcon}
            <span>{name}</span>
          </router-link>
        )
      }
    },
    /**
     * 转换路径
     */
    conversionPath(path) {
      if (path && path.indexOf('http') === 0) {
        return path
      } else {
        return `/${path || ''}`.replace(/\/+/g, '/')
      }
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
            {this.getMenuItemPath(menu)}
          </a-menu-item>
        )
      }
    },
    getSelectedMenuKeys(flatMenuKeys, paths) { // 获取选中的菜单key
      return paths.filter(path => {
        return flatMenuKeys.filter(item => pathToRegexp(item).test(path))
      })
    },
    getDefaultCollapsedSubMenus() {
      const { path } = this.$route
      return getMenuMatchKeys(this.flatMenuKeys, urlToList(path))
    },
    isMainMenu(key) {
      return this.menuData.some(item => key && (item.key === key || item.path === key))
    },
    handleOpenChange(openKeys) {
      const lastOpenKey = openKeys[openKeys.length - 1]
      const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1
      this.openKeys = moreThanOne ? [lastOpenKey] : [...openKeys]
    }
  },
  created() {
    this.flatMenuKeys = getFlatMenuKeys(this.menuData)
    this.openKeys = this.getDefaultCollapsedSubMenus()
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
          on-openChange={this.handleOpenChange}
        >
          {this.getNavMenuItems(this.menuData)}
        </a-menu>
      </a-layout-sider>
    )
  }
}
