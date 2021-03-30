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
      <div class="app">
        <div class="app__header mdl-typography--headline"> <!-- header -->
          {{pageHeader}}
        </div>
        <div class="app__main">
          <router-view />
        </div>
        <div class="app__footer">
            footer?
        </div>
      </div>

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

  *, *:before, *:after {
      box-sizing: border-box;
  }

  html, body {
    margin:0;
    padding:0;
    color: #4a4a4a;
    background-color:#ecebeb;
  }

  .app {
    padding: 1rem 2rem; /*top/bottom 1rem, left/right 2rem
    display: grid;
    height: 84vh;
    gap: 1rem;
    grid-template-rows: 60px auto 50px;
    grid-template-areas: "header"
                         "main"
                         "footer";

    &__header {
      grid-area: header;
      padding:1rem;
    }

    &__main {
      grid-area: main;
      padding:1rem;
      background-color:white;
    }

    &__footer {
      grid-area: footer;
      padding:1rem;
    }

  }

</style>