<template>
  <navbar :show-navbar="showNavbar">
    <div class="navbar-wrapper">
      <div class="navbar-minimize">
        <button
          id="minimizeSidebar"
          class="btn btn-icon btn-success btn-round btn-xl"
          @click="minimizeSidebar"
        >
          <img src="../../../../public/static/img/ellipsis-dot.svg" alt="collapse-icon" />
          <!-- <i class="text-center fa fa-ellipsis-v visible-on-sidebar-mini"></i>
          <i class="text-center fa fa-ellipsis-v visible-on-sidebar-regular"></i> -->
        </button>
      </div>
      <div class="navbar-toggle">
        <navbar-toggle-button @click.native="toggleSidebar"></navbar-toggle-button>
      </div>
      <span class="navbar-brand">{{mainMenuTitle}}</span>
      <div class="search-field">
        <fg-input placeholder="Search..." addon-right-icon="fa fa-search"></fg-input>
      </div>
    </div>
    <!--    <template slot="navbar-menu">
          <form>
            <div class="input-group no-border">
              <input type="text" value class="form-control" placeholder="Search...">
              <div class="input-group-append">
                <div class="input-group-text">
                  <i class="nc-icon nc-zoom-split"></i>
                </div>
              </div>
            </div>
          </form>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link btn-magnify" href="#pablo">
                <i class="nc-icon nc-layout-11"></i>
                <p>
                  <span class="d-lg-none d-md-block">Stats</span>
                </p>
              </a>
            </li>
            <drop-down
              icon="nc-icon nc-bell-55"
              tag="li"
              position="right"
              direction="none"
              class="nav-item btn-rotate dropdown"
            >
              <a
                slot="title"
                slot-scope="{isOpen}"
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                :aria-expanded="isOpen"
              >
                <i class="nc-icon nc-bell-55"></i>
                <p>
                  <span class="d-lg-none d-md-block">Some Actions</span>
                </p>
              </a>
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </drop-down>
            <li class="nav-item">
              <a class="nav-link btn-rotate" href="#pablo">
                <i class="nc-icon nc-settings-gear-65"></i>
                <p>
                  <span class="d-lg-none d-md-block">Account</span>
                </p>
              </a>
            </li>
          </ul>-->
    <!--   </template>-->
    <div class="w-100 d-flex" v-if="showLogoutBtn">
      <p-button class="ml-auto" @click="logout" type="danger">{{ $t('common.top_navbar.logout') }}</p-button>
    </div>
  </navbar>
</template>
<script>
  import {Navbar, NavbarToggleButton} from "src/components/UIComponents";
  import PButton from "../../UIComponents/Button";

  export default {
    components: {
      PButton,
      Navbar,
      NavbarToggleButton
    },
    data() {
      return {
        activeNotifications: false,
        showNavbar: false,
        showLogoutBtn: true
      };
    }, computed: {
      mainMenuTitle() {
        if (this.$route.path.split('/').slice(-1)[0] == "workflow") {
          this.showLogoutBtn = false;
          return "Work flow";
        } else if (this.$route.path.split('/').slice(-1)[0] == "search") {
          this.showLogoutBtn = false;
          return "Search";
        } else {
          return this.$route.path.split('/')[2].replace(/-/g, ' ');
        }
      }
    },
    methods: {
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      logout() {
        this.$oAuth
          .logout()
          .then(isSuccess => {
            this.$router.push({path: "/login"});
          })
          .catch(e => {
            console.error(e.message);
          });
      },
      toggleNotificationDropDown() {
        this.activeNotifications = !this.activeNotifications;
      },
      closeDropDown() {
        this.activeNotifications = false;
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      minimizeSidebar() {
        this.$sidebar.toggleMinimize();
      },
      toggleNavbar() {
        this.showNavbar = !this.showNavbar;
      }
    }, mounted() {
    }
  };
</script>
<style>
  .navbar-brand {
    color: #2ed684;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    text-transform: capitalize;
    font-size: 40px!important;
    margin: 0;
    margin-right: 57px;
  }

  .search-field {
    width: 326px;
  }

  .search-field i {
    color: #C2C7CE;
  }

  .search-field /deep/ .form-group .form-control{
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-color: #8D8D8D !important;
  }
  .search-field /deep/ .input-group-append .input-group-text, .input-group-prepend .input-group-text {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-color: #8D8D8D !important;
}

</style>
