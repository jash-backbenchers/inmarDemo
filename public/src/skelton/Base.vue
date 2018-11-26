<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider collapsible v-model="collapsed">
      <div class="logo">
        <span>I<span v-show="!collapsed">nmar</span>D<span v-show="!collapsed">emo</span></span>
      </div>
      <a-menu theme="dark" :defaultSelectedKeys="[$route.name]" mode="inline">
        
        <a-menu-item key="Departments" v-on:click="$router.push('/departments/')">
          <a-icon type="switcher" style="font-size: 20px"/>
          <span>Departments</span>
        </a-menu-item>
        <a-menu-item key="Products" v-on:click="$router.push('/products/null')">
          <a-icon type="dropbox" style="font-size: 20px"/>
          <span>Products</span>
        </a-menu-item>
        <a-menu-item key="Account" v-on:click="$router.push('/account/')">
          <a-icon type="user" style="font-size: 20px"/>
          <span>Account</span>
        </a-menu-item>
        <a-menu-item key="Hierarchy" v-on:click="$router.push('/hierarchy/')">
          <a-icon type="fork" style="font-size: 20px"/>
          <span>Hierarchy</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <!-- content body -->
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0px 20px;line-height: 50px!important;height: auto!important;border-bottom: 1px solid #ddd;">
        <a-row>
          <a-col :span="12">
            <a-breadcrumb style="margin: 16px 0">
              <a-breadcrumb-item>Home</a-breadcrumb-item>
              <a-breadcrumb-item>{{$route.name}}</a-breadcrumb-item>
            </a-breadcrumb>
          </a-col>
          <a-col :span="12">
            <span style="float: right;">
              <a-icon type="logout" v-on:click="logout" style="color:red;margin-left:10px;font-size: 20px;cursor: pointer;" />
            </span>
            <span style="float: right;cursor: pointer;" v-on:click="$router.push('/profile/')">
              <a-icon type="user" style="cursor: pointer;"/> 
              <span v-if="profile">{{ profile.first_name }}</span>
              <span v-if="!profile">Loading...</span>
            </span>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content style="background: #f0f2f4;padding: 15px 15px 0px;">
        
        <a-row>
          <a-col :span="24">
            <div style="max-width: 100%;overflow-x: hidden;" :style="{ padding: '15px', minHeight: '360px', maxHeight: 'calc(100vh - 70px)', overflowY: 'auto', background: 'white'}">
            <router-view />
          </div>
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
  import router from '@/router'

  export default {
    data() {
      return {
        profile: false,
        collapse_option: false,
        options: ['list', 'of', 'options'],
        collapsed: false,
        permission: false,
      };
    },
    created() {
      // this.getProfile();
      this.checkPermission();
    },
    methods: {
      checkPermission() {
        if (localStorage.getItem('profile')) {
          this.profile = JSON.parse(localStorage.getItem('profile'))
        }
      },
      logout() {
        this.$Services.auth.logout();
        this.$Services.noty.success('Logging out...', 'Logout');
        setTimeout(() => {
          router.push({
            path: '/login/'
          });
        }, 2000);
      },
    },
  };
</script>

<style>
  #components-layout-demo-side .logo {
    color: #fff;
    text-align: left;
    font-size: 24px;
    margin: 16px;
    margin-left: 25px;
  }
</style>
