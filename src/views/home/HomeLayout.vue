<template>
  <div class="home-manager" :class="isMobile ? 'mobile' : 'pc'">
    <header class="layout add-index">
      <home-header />
      <!--<home-menu />-->
    </header>
    <main class="layout" :class="'route-' + route">
      <router-view/>
    </main>
    <footer class=" layoutadd-index">
      <home-footer />
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import HomeHeader from "./components/HomeHeader";
  import HomeMenu from "./components/HomeMenu";
  import HomeFooter from "./components/HomeFooter";
  export default {
    name: "HomeLayout",
    components: {HomeFooter, HomeMenu, HomeHeader},
    data() {
      return {
        route: ''
      }
    },
    computed:{
      isMobile(){
        return this.$store.getters.getIsMobile;
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.route = to.name;
      });
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home-manager {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--gray-dark);
  .layout{
    padding: 0 10%;
  }
  > header{
    background: var(--skin);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1501;
  }
  > main{
    flex: 1;
    margin-top: 80px;
    margin-bottom: 40px;
  }
}

.home-manager.mobile{
  .layout{
    padding: 0 3%;
  }
}
</style>
