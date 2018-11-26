
<template>
  <div class="users">
    <div class="content" style="width:100%;height:140vh">
      <tree v-if="data.children" :data="data" node-text="name" :radius=5 :marginX=20 :marginY=20 :duration=100>
      </tree>
    </div>
  </div>
</template>

<script src="./Hierarchy-js.js"></script>
<style src="./Hierarchy-style.styl" lang="stylus" scoped></style>