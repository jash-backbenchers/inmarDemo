<template>
  <div class="login-backdrop is-loaded">
    <div class="login-container" style="text-align: center">
      <h1 style="font-size: 28px;text-align:center;border-bottom: 0;" class="margin-bottom-40">
        <b style="color: white; font-weight: normal">Inmar Demo | </b>
        <b style="color: #41a9ff; background: #121212;padding: 5px 10px;">Login</b>
      </h1>
      <div class="margin-bottom-20">
        <a-input size="large" placeholder="Username" v-model="username" @keyup.enter="login" v-bind:disabled="is_loading">
          <a-icon slot="prefix" type='user' style="font-size: 18px;color:#41a9ff" />
        </a-input>
      </div>
      <div class="margin-bottom-20">
        <a-input type="password" size="large" placeholder="your strong password" v-model="password" @keyup.enter="login"
          v-bind:disabled="is_loading">
          <a-icon slot="prefix" type='lock' style="font-size: 18px;color:#41a9ff" />
        </a-input>
      </div>
      <div class="">
        <a-button type="primary" :loading="is_loading" size="large" v-on:click="login" class="margin-bottom-20">
          Login &nbsp;&nbsp;&nbsp;
          <a-icon type="login" />
        </a-button>
      </div>
    </div>
  </div>
</template>

<script src="./Authentication-js.js"></script>
<style src="./Authentication-style.styl" lang="stylus" scoped></style>