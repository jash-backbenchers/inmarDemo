<template>
  <div class="users">
    <div class="content">
      <a-row :gutter="10" type="flex" justify="space-between">
        <a-col :span="8">
          <!-- <h5>Departments</h5> -->
        </a-col>
      </a-row>
      <br>     
      <a-row :gutter="16">
      <a-col :span="6" v-for="(department,index) in departmentsdata" :key="index" style="margin-bottom:16px">
        <a-card hoverable style="width: 100%;" v-on:click="$router.push('/products/'+department._id)" >
        <img :alt="department._id" :src="require(`@/assets/${department._id}.png`)" slot="cover" />
        <a-card-meta :title="department._id">
          <template slot="description">Total products: {{department.count}}</template>
        </a-card-meta>
      </a-card>
      </a-col>
      </a-row>
    </div>
  </div>
</template>

<script src="./Departments-js.js"></script>
<style src="./Departments-style.styl" lang="stylus" scoped></style>