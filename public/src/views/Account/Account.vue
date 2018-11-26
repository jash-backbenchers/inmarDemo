<template>
  <div class="content">
    <a-tabs defaultActiveKey="2" tabPosition="left" style="min-height:80vh">

      <a-tab-pane tab="Account details" key="2">
        <a-row justify="start" style="padding-top:30px;">
          <a-col>
            <a-row type="flex" justify="start">
              <a-col :span="24">
                <a-form-item label='First Name' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="fname"
                  :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please enter first name!' }]}">
                  <a-input v-model="payload.user.first_name" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-form-item label='Last Name' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="lname"
                  :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please enter last name!' }]}">
                  <a-input v-model="payload.user.last_name" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-form-item label='Mobile' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="mobile"
                  :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please enter Mobile!' }]}">
                  <a-input v-model="payload.user.mobile" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-form-item label='Email' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="email"
                  :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please enter Email!' }]}">
                  <a-input v-model="payload.user.email" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row>
              <a-col :span="24">
                <a-form-item label='Username' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="username"
                  :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please enter your Username!' }]}">
                  <a-input v-model="payload.user.username" />
                </a-form-item>
              </a-col>
            </a-row>

          </a-col>
          <a-row>
            <a-col :span="24">

              <a-form-item label=' ' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
                <a-button type="primary" @click="saveUser">
                  Update
                </a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-row>
      </a-tab-pane>

    </a-tabs>

  </div>
</template>
<script src="./Account-js.js"></script>
<style scoped>

</style>