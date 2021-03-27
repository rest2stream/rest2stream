<template>
  <!-- Always shows a header, even in smaller screens. -->
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-drawer">
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <!-- Title -->
      <span class="mdl-layout-title">Rest API to Stream Data</span>
      <!-- Add spacer, to align navigation to the right -->
      <div class="mdl-layout-spacer"></div>
      <!-- Navigation. We hide it in small screens. -->
      <nav class="mdl-navigation mdl-layout--large-screen-only">
        <a class="mdl-navigation__link" href=""><strong>Welcome user1!</strong></a>
        <a class="mdl-navigation__link" href="">Logout</a>
      </nav>
    </div>
  </header>
  <div class="mdl-layout__drawer">
    <span class="mdl-layout-title">Rats</span>
    <nav class="mdl-navigation">
      <router-link class="mdl-navigation__link" :to="{ name: 'Myapi' }">My APIs</router-link> 
      <router-link class="mdl-navigation__link" :to="{ name: 'Settings' }">Settings</router-link>
      <router-link class="mdl-navigation__link" :to="{ name: 'Account' }">Account</router-link>
    </nav>
  </div>
  <main class="mdl-layout__content">
    <div class="page-content">
        <!-- Your content goes here -->
      <div class="mdl-typography--display-1"> <!-- header -->
        {{pageHeader}}
      </div>

      <router-view />
    </div>
  </main>
</div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {
    const store = useStore();
    const pageHeader = computed(() => store.state.site.page_header)
    return {
      pageHeader
    }
  }
}
</script>

<style lang="scss">

  .page-content {
    padding: 2rem;
  }

</style>