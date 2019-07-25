<template>
  <div class="sidebar" :data-color="backgroundColor" :data-active-color="activeColor">
    <div class="logo__container">
      <router-link to="/" class="logo">
        <img :src="logo" alt="cevoo" class="img-responsive cevoo-image">
      </router-link>
    </div>
    <div class="sidebar-wrapper" ref="sidebarScrollArea">
      <slot></slot>
      <ul class="nav">
        <slot name="links">
          <template v-for="(link, index) in sidebarLinks">
            <!--<sidebar-item v-show="hasPermission(link.permission) || isAllowResellerToView(link.isAllowResellerToView)" -->
            <sidebar-item :key="link.name + index"
                          :link="link">
              <sidebar-item v-for="(subLink, index) in link.children"
                            :key="subLink.name + index"
                            :link="subLink">
                <!--v-show="hasPermission(subLink.permission) || isAllowResellerToView(subLink.isAllowResellerToView)">-->
              </sidebar-item>
            </sidebar-item>
          </template>
        </slot>
        <li @click="handleLogout()">
          <a href="#">
            <div class="pull-left sidebar__IconWrapper">
              <img src="/static/img/dashboard_icons/ic_logout_line_white.png" alt="" class="img-responsive ic-logout">
            </div>
            <p class="btn-text">Logout</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import "perfect-scrollbar/dist/css/perfect-scrollbar.css";
  import {permissionMixin} from '@/mixins/permission'

  export default {
    mixins: [permissionMixin],
    props: {
      title: {
        type: String,
        default: "Vue PDP Pro",
        description: "Sidebar title"
      },
      backgroundColor: {
        type: String,
        default: "black",
        validator: value => {
          let acceptedValues = ["white", "brown", "black"];
          return acceptedValues.indexOf(value) !== -1;
        },
        description: "Sidebar background color (white|brown|black)"
      },
      activeColor: {
        type: String,
        default: "success",
        validator: value => {
          let acceptedValues = [
            "primary",
            "info",
            "success",
            "warning",
            "danger"
          ];
          return acceptedValues.indexOf(value) !== -1;
        },
        description:
          "Sidebar active text color (primary|info|success|warning|danger)"
      },
      logo: {
        type: String,
        default: "/static/img/logo/ceevo.png",
        description: "Sidebar Logo"
      },
      sidebarLinks: {
        type: Array,
        default: () => [],
        description:
          "Sidebar links. Can be also provided as children components (sidebar-item)"
      },
      autoClose: {
        type: Boolean,
        default: true
      }
    },
    provide() {
      return {
        autoClose: this.autoClose
      };
    },
    methods: {
      async initScrollBarAsync() {
        const PerfectScroll = await import("perfect-scrollbar");
        PerfectScroll.initialize(this.$refs.sidebarScrollArea, {
          suppressScrollX: true
        });
      },
      handleLogout() {
        this.$oAuth.logout()
      },
    },
    mounted() {
      this.initScrollBarAsync();
    },
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    }
  };
</script>
<style>
  .logo {
    display: flex !important;
    align-items: center;
    justify-content: center;
    padding: 0;
    min-height: 70px;
    padding: 0;
  }

  .cevoo-image {
    max-height: 100%;
    width: 100px;
    position: relative;
    top: -4px;
  }

  .sidebar-mini .cevoo-image {
    max-width: 70% !important;
    transition: all 0.3s ease;
    padding: 0;
  }

  .ic-logout{
    width: 30px;
    height: 30px;
  }

  .btn-text {
    padding-left: 40px;
  }


  @media (min-width: 992px) {
    .navbar-search-form-mobile,
    .nav-mobile-menu {
      display: none;
    }
  }
</style>
