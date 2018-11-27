<template>
  <div class="content">
    <a-row :gutter="10" type="flex" justify="space-between">
      <a-col>
        <a-button v-on:click="$router.push('/products/null')">
          <a-icon type="left" />Go back
        </a-button>
      </a-col>
      <a-col>
      </a-col>
    </a-row>
    <br />
    <div>
      <a-tabs defaultActiveKey="1" tabPosition="left">
        <a-tab-pane tab="Product Info" key="1">
          <a-form v-if="settings.category.length">
            <a-row type="flex" justify="start">
              <a-col :span="10">
                <a-form-item label='SKU' :labelCol="{ span: 6 }" :wrapperCol="{ span: 16 }" fieldDecoratorId="sku"
                  :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please enter SKU of the product!' }]}">
                  <a-input v-model="payload.sku" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row>
              <a-col :span="10">
                <a-form-item label='Name' :labelCol="{ span: 6 }" :wrapperCol="{ span: 16 }" fieldDecoratorId="name"
                  :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please enter product name!' }]}">
                  <a-input v-model="payload.name" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row>
              <a-col :span="10">
                <a-form-item label='Location' :labelCol="{ span: 6 }" :wrapperCol="{ span: 16 }" fieldDecoratorId="location"
                  :fieldDecoratorOptions="{rules: [{ required: false, message: 'Please enter location!' }]}" v-model="payload.location">

                  <a-select style="width: 100%" @change="handleLocationChange" placeholder='Select location'>
                    <a-select-option v-for="location in settings.location" :key="location">{{location}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col style="padding-top:3px" :span="4">
                <a-input placeholder="Add to dropdown" v-model="newsetting.location">
                  <a-icon slot="prefix" type="plus" />
                </a-input>
              </a-col>
              <a-col style="padding-top:3px" :span="3">
                <a-button type="primary" style="margin-left:8px"
                @click="settings.location.push(newsetting.location);newsetting.location=null">Add</a-button>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="10">
                <a-form-item label='Department' :labelCol="{ span: 6 }" :wrapperCol="{ span: 16 }" fieldDecoratorId="department"
                  :fieldDecoratorOptions="{rules: [{ required: false, message: 'Please enter department!' }]}" v-model="payload.department">

                  <a-select style="width: 100%" @change="handleDepartmentChange" placeholder='Select department'>
                    <a-select-option v-for="department in settings.department" :key="department">{{department}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col style="padding-top:3px" :span="4">
                <a-input placeholder="Add to dropdown" v-model="newsetting.department">
                  <a-icon slot="prefix" type="plus" />
                </a-input>
              </a-col>
              <a-col style="padding-top:3px" :span="3">
                <a-button type="primary" style="margin-left:8px"
                @click="settings.department.push(newsetting.department);newsetting.department=null">Add</a-button>
              </a-col>
            </a-row>
            <a-row >
              <a-col :span="10">
                <a-form-item label='Category' :labelCol="{ span: 6 }" :wrapperCol="{ span: 16 }" fieldDecoratorId="category"
                  :fieldDecoratorOptions="{rules: [{ required: false, message: 'Please enter category!' }]}" v-model="payload.category">

                  <a-select style="width: 100%" @change="handleCategoryChange" placeholder='Select category'>
                    <a-select-option v-for="category in settings.category" :key="category">{{category}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col style="padding-top:3px" :span="4">
                <a-input placeholder="Add to dropdown" v-model="newsetting.category">
                  <a-icon slot="prefix" type="plus" />
                </a-input>
              </a-col>
              <a-col style="padding-top:3px" :span="3">
                <a-button type="primary" style="margin-left:8px"
                @click="settings.category.push(newsetting.category);newsetting.category=null">Add</a-button>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="10">
                <a-form-item label='Sub category' :labelCol="{ span: 6 }" :wrapperCol="{ span: 16 }" fieldDecoratorId="subcategory"
                  :fieldDecoratorOptions="{rules: [{ required: false, message: 'Please enter subcategory!' }]}" v-model="payload.subcategory">

                  <a-select style="width: 100%" @change="handleSubCategoryChange" placeholder='Select subcategory'>
                    <a-select-option v-for="subcategory in settings.subcategory" :key="subcategory">{{subcategory}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col style="padding-top:3px" :span="4">
                <a-input placeholder="Add to dropdown" v-model="newsetting.subcategory">
                  <a-icon slot="prefix" type="plus" />
                </a-input>
              </a-col>
              <a-col style="padding-top:3px" :span="3">
                <a-button type="primary" style="margin-left:8px"
                @click="settings.subcategory.push(newsetting.subcategory);newsetting.subcategory=null">Add</a-button>
              </a-col>
            </a-row>
            <a-row :span="10">
              <a-col :span="10" :offset="6">
                <a-button type="danger" v-on:click="$router.push('/products/null')">Cancel</a-button>
                <a-button type="primary" :loading="saving_product" style="margin-left: 8px" @click="saveProduct">Save</a-button>
              </a-col>
            </a-row>

          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script src="./CreateProduct-js.js"></script>
<style scoped>

</style>