<template>
  <navbar :show-navbar="showNavbar">
    <div class="navbar-wrapper">
      <div class="navbar-minimize">
        <button
          id="minimizeSidebar"
          class="btn btn-icon btn-success btn-round btn-xl"
          @click="minimizeSidebar">
          <img src="../../../../public/static/img/ellipsis-dot.svg" alt="collapse-icon"/>
        </button>
      </div>
      <div class="navbar-toggle">
        <navbar-toggle-button @click.native="toggleSidebar"></navbar-toggle-button>
      </div>
      <span class="navbar-brand">{{mainMenuTitle}}</span>
      <div class="search-field justify-content-end">
        <fg-input placeholder="Search..." addon-right-icon="fa fa-search"></fg-input>
      </div>
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
      };
    }, computed: {
      mainMenuTitle() {
          console.log('Split', this.$route.path.split('/') );
        if (this.$route.path.split('/').slice(-1)[0] == "workflow") {
          return "Work flow";

        } else if (this.$route.path.split('/').slice(-1)[0] == "search") {
          return "Search";

        }
          else if (this.$route.path.split('/').slice(-1)[0] == "ipg") {
            return "Reporting";
        }
        else if (this.$route.path.split('/').slice(-1)[0] == "kyc-mainpage") {
          return "KYC Main Page";

        } else if (this.$route.path.split('/').slice(-1)[0] === 'product-config') {
          return "Product Config";
        } else if (this.$route.path.split('/')[2] === 'poa-action') {
          return "POA Action";
        } else if (this.$route.path.split('/')[2] === 'poa-view') {
          return "POA View";
        }
        else if (this.$route.path.split('/')[1] === 'client') {
          return "Client View";
        }
        else if (this.$route.path.split('/')[1] === 'reseller') {
          if (this.$route.path.split('/')[2] === 'create') {
            return "Create Reseller Corporate";
          } else if (this.$route.path.split('/')[2] === 'view') {
            return "View Reseller Corporate";
          }
          return "Edit Reseller Corporate";
        } else if (this.$route.path.split('/')[2] === 'approved-emoney-account') {
          return "Approved for E-money account";
        } else if (this.$route.path.split('/')[2] === 'review-edit-account') {
          return "Review and Edit Account Creation";
        } else if (this.$route.path.split('/')[2] === 'review-edit-card') {
          return "Review and Edit Card Creation";
        } else if (this.$route.path === '/card-program/card/new') {
          return 'Card program'
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
        this.$oAuth.logout()
        /*.then(isSuccess => {
          this.$router.push({path: "/login"});
        })*/
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
<style lang="scss">

  .navbar{
    .navbar-brand {
      text-transform: capitalize !important;
    }
    &.navbar-transparent{
     border-bottom: 0 !important;
   }
   .navbar-wrapper{
     flex:0 0 100%;
   }
  }
  .navbar-brand {
    color: #2ed684;
    font-weight: bold;
    font-size: 40px !important;
    margin: 0;
    margin-right: 32px;
  }

  .search-field{
    width: 326px;

    .input-group{
      height:70px;
      input{
        font-size: 16px;
        padding-left:1rem;
      }
    }

    i {
      color: #C2C7CE;
      &:before{
        font-size: 20px;
      }
    }
    .form-group .form-control {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      border-color: #8D8D8D !important;
    }
    .input-group-append .input-group-text, .input-group-prepend .input-group-text {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      padding-right:1rem !important;
      border-color: #8D8D8D !important;
    }
  }

</style>
