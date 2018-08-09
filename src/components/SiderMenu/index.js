import { mapState } from 'vuex'
import './index.less'

export default {
  name: 'SiderMenu',
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      collapsed: state => {
        return state.app.collapsed
      }
    })
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
      console.log(key)
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
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          on-select={this.selectHandle}
        >
          {this.getNavMenuItems(this.menuData)}
        </a-menu>
      </a-layout-sider>
    )
  }
}
