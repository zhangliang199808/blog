<template>
  <div id="app" class="app clearfix">
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view :key="key"></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style >
   @import './sass/stylesheets/SocialPublic.css'
</style>