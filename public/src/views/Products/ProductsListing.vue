<template>
  <div class="products">
    <div class="content">
      <a-row :gutter="10" type="flex" justify="space-between">
        <a-col :span="8">
        </a-col>
        <a-col>
          <a-button shape="circle" style="margin-right:8px" v-on:click="$router.push('/products/create/')" icon="plus" />
          <a-button shape="circle" @click="showDrawer" icon="filter" />
        </a-col>
      </a-row>
      <br>
      <a-row :gutter="16">
        <a-col :span="6" v-for="(product,index) in data" :key="index" style="margin-bottom:16px">
          <a-card hoverable style="width: 100%;">
            <img :alt="product.name" :src="require(`@/assets/${product.department}.png`)" slot="cover" />
            <template class="ant-card-actions" slot="actions">
              <a-icon type="eye" @click="showModal(product)" />
              <a-icon type="edit" @click="showEditModal(product,product._id,'edit')" />
              <a-icon type="delete" @click="showDeleteConfirm(product._id)" />
            </template>
            <a-card-meta :title="product.name">
              <template slot="description">
                <p class="des">{{product.department}}/{{product.category}}</p>
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
      <!-- <p>products listing</p> -->
      <div style="display:flex;justify-content:center">
        <a-pagination showSizeChanger :pageSize.sync="pagination.pageSize" @change="onChange" :total="pagination.total"
          v-model="pagination.current" />
      </div>
    </div>
    <div>
      <a-modal v-if="payload.name" :title="payload.name" :visible="visible" @ok="handleOk" :confirmLoading="confirmLoading"
        @cancel="handleCancel">
        <a-row>
          <a-col :span="12">
            <img style="width:200px" :alt="payload.name" :src="require(`@/assets/${payload.department}.png`)" />

          </a-col>
          <a-col :span="12">
            <h2>{{payload.name}}</h2>
            <p class="des">{{payload.category}} / {{payload.subcategory}}</p>
            <p>
              <a-icon type="switcher" style="padding-right:8px" />{{payload.department}}
            </p>
            <p>
              <a-icon type="environment" style="padding-right:8px" />{{payload.location}}
            </p>
            {{payload._id}}
          </a-col>
        </a-row>
      </a-modal>
      <a-modal v-if="editpayload.name" :width="720" :title="payload.name" :visible="editvisible" @ok="updateproduct(editpayload)"
        :confirmLoading="editLoading" @cancel="handleEditCancel">
        <a-row>
          <a-col :span="8">
            <img style="width:200px" :alt="editpayload.name" :src="require(`@/assets/${editpayload.department}.png`)" />

          </a-col>
          <a-col :span="16">
            <a-form v-if="settings.category.length">
              <a-row type="flex" justify="start">
                <a-col :span="24">
                  <a-form-item label='SKU' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="sku"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please enter SKU of the product!' }]}">
                    <a-input v-model="editpayload.sku" />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-col :span="24">
                  <a-form-item label='Name' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="name"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please enter product name!' }]}">
                    <a-input v-model="editpayload.name" />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-col :span="24">
                  <a-form-item label='Location' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="location"
                    :fieldDecoratorOptions="{rules: [{ required: false, message: 'Please enter location!' }]}" v-model="editpayload.location">

                    <a-select :defaultValue="editpayload.location" style="width: 100%" @change="handleLocationChange"
                      placeholder='Select location'>
                      <a-select-option v-for="location in settings.location" :key="location">{{location}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24">
                  <a-form-item label='Department' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="department"
                    :fieldDecoratorOptions="{rules: [{ required: false, message: 'Please enter department!' }]}"
                    v-model="editpayload.department">

                    <a-select :defaultValue="editpayload.department" style="width: 100%" @change="handleDepartmentChange"
                      placeholder='Select department'>
                      <a-select-option v-for="department in settings.department" :key="department">{{department}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24">
                  <a-form-item label='Category' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="category"
                    :fieldDecoratorOptions="{rules: [{ required: false, message: 'Please enter category!' }]}" v-model="editpayload.category">

                    <a-select :defaultValue="editpayload.category" style="width: 100%" @change="handleCategoryChange"
                      placeholder='Select category'>
                      <a-select-option v-for="category in settings.category" :key="category">{{category}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24">
                  <a-form-item label='Sub category' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="subcategory"
                    :fieldDecoratorOptions="{rules: [{ required: false, message: 'Please enter subcategory!' }]}"
                    v-model="editpayload.subcategory">

                    <a-select :defaultValue="editpayload.subcategory" style="width: 100%" @change="handleSubCategoryChange"
                      placeholder='Select subcategory'>
                      <a-select-option v-for="subcategory in settings.subcategory" :key="subcategory">{{subcategory}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-col>
        </a-row>
      </a-modal>

      <a-drawer width=720 placement="right" :closable="false" @close="onCloseDrawer" :visible="drawervisible"
        style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
        <template slot="title">
          
          <div style="display:flex;justify-content:space-between">
            <p>Search</p>
          <a-button style="margin-left:8px" @click="onSearchReset" type="primary">Reeset</a-button>
          </div>
        </template>
        <a-form layout="vertical" hideRequiredMark>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label='Location' fieldDecoratorId="location" :fieldDecoratorOptions="{rules: [{ required: false, message: 'Please enter location!' }]}"
                v-model="search.location">

                <a-select style="width: 100%" @change="handleSearchLocationChange" placeholder='Select location'>
                  <a-select-option v-for="location in settings.location" :key="location">{{location}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label='Department' fieldDecoratorId="department" :fieldDecoratorOptions="{rules: [{ required: false, message: 'Please enter department!' }]}"
                v-model="search.department">

                <a-select style="width: 100%" @change="handleSearchDepartmentChange" placeholder='Select department'>
                  <a-select-option v-for="department in settings.department" :key="department">{{department}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label='Category' fieldDecoratorId="category" :fieldDecoratorOptions="{rules: [{ required: false, message: 'Please enter category!' }]}"
                v-model="search.category">

                <a-select style="width: 100%" @change="handleSearchCategoryChange" placeholder='Select category'>
                  <a-select-option v-for="category in settings.category" :key="category">{{category}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label='Sub category' fieldDecoratorId="subcategory" :fieldDecoratorOptions="{rules: [{ required: false, message: 'Please enter subcategory!' }]}"
                v-model="search.subcategory">

                <a-select style="width: 100%" @change="handleSearchSubCategoryChange" placeholder='Select subcategory'>
                  <a-select-option v-for="subcategory in settings.subcategory" :key="subcategory">{{subcategory}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }">
          <a-button :style="{
            marginRight: 8,
          }" @click="onCloseDrawer">
            Cancel
          </a-button>
          <a-button style="margin-left:8px" @click="onSearch" type="primary">Search</a-button>
        </div>
      </a-drawer>
    </div>
  </div>
</template>

<script src="./ProductsListing-js.js"></script>
<style src="./ProductsListing-style.styl" lang="stylus" scoped></style>