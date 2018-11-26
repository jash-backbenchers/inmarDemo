import Vue from 'vue'
import Router from 'vue-router'
import Base from './skelton/Base.vue'
import Services from './services/Services.vue'

import Authentication from './views/Authentication/Authentication.vue'
import Account from './views/Account/Account.vue'


import Departments from './views/Departments/Departments.vue'

import CreateProduct from './views/Products/CreateProduct.vue'
import ProductListing from './views/Products/ProductsListing.vue'

import Hierarchy from './views/Hierarchy/Hierarchy.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login/',
      name: 'Authentication',
      component: Authentication
    },
    {
      path: '',
      name: 'Base',
      component:Base,
      beforeEnter: Services.auth.isAuthenticated,
      children: [
        {
          path: '',
          redirect: '/departments',
        },
        {
          path: '/departments',
          name: 'Departments',
          component: Departments
        },
        {
          path: '/products/create',
          name: 'products',
          component: CreateProduct
        },
        {
          path: '/products/:id',
          name: 'Products',
          component: ProductListing,
          // component: CreateProduct,
          props: true,
        },
        {
          path: 'account/',
          name: 'Account',
          component: Account
        },
        {
          path: 'hierarchy/',
          name: 'Hierarchy',
          component: Hierarchy
        } ,
        {
          path: '*',
          redirect: '/departments',
        },
      ]
    }
  ]
})
