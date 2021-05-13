<template>
 <aside class="mdc-drawer mdc-drawer--dismissible">
    <div class="mdc-drawer__content">
      <nav class="mdc-list">
        <router-link :to="{ name: 'myapi'}" class="mdc-list-item mdc-list-item--activated" href="#" aria-current="page">
          <span class="mdc-list-item__ripple"></span>
          <span class="mdc-list-item__text">MyApi's</span>
        </router-link>
        <router-link :to="{ name: 'account' }" class="mdc-list-item" href="#">
          <span class="mdc-list-item__ripple"></span>
          <span class="mdc-list-item__text">Accounts</span>
        </router-link>
        <router-link :to="{ name: 'settings' }" class="mdc-list-item" href="#">
          <span class="mdc-list-item__ripple"></span>
          <span class="mdc-list-item__text">Settings</span>
        </router-link>
      </nav>
    </div>
  </aside>

  <div class="mdc-drawer-app-content">
    <header class="mdc-top-app-bar app-bar mdc-top-app-bar--fixed" id="app-bar">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">menu</button>
          <span class="mdc-top-app-bar__title">Rest API to Stream Data</span>
        </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
          <button 
            v-if="user.username" 
            :title="`Welcome ${user.username}!`" 
            class="material-icons mdc-top-app-bar__action-item mdc-icon-button" 
            aria-label="Account Circle">face
          </button>
          <button 
            v-if="user.username" 
            @click="logout()" 
            title="Logout" 
            class="material-icons mdc-top-app-bar__action-item mdc-icon-button" 
            aria-label="Open menu">logout
          </button>
          <router-link 
            v-if="!user.username" 
            :to="{ name: 'login'}" 
            tag="button" 
            title="Please Login!" 
            class="material-icons mdc-top-app-bar__action-item mdc-icon-button" >login
          </router-link>
        </section>
      </div>
    </header>

    <main class="main-content" id="main-content">
      <div class="app mdc-top-app-bar--fixed-adjust">
        <div class="app__header mdc-typography--headline4"> <!-- header -->
          {{pageHeader}}
        </div>
        <div class="app__main">
          <Suspense>
            <template #default><router-view/></template>
            <template #fallback>Loading...</template>
          </Suspense>
        </div>
        <div class="app__footer">
            footer?
        </div>
      </div>
    </main>
  </div>

</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import useAuth from '@/use/useAuth';
import useMDC from '@/use/useMDC';
export default {
  name: 'Layout',
  setup() {
    const store = useStore();
    const auth = useAuth();
    const router = useRouter();
    const mdc1 = useMDC();
    const pageHeader = computed(() => store.state.site.page_header)
    const user = computed(() => store.state.auth.user)

    onMounted(() => {
      mdc1.drawerInit();
      console.log(mdc);
    })

    const logout = () => {
      auth.logout();
      router.push({ name: 'login' });
    }

    return {
      pageHeader,
      store,
      logout,
      user
    }
  }
}
</script>

<style lang="scss" scoped>

  .app {
    padding: 5rem 2rem; /*top/bottom 5rem, left/right 2rem*/
    display: grid;
    height: 98vh;
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

  .mdc-drawer-app-content {
  flex: auto;
  overflow: auto;
  position: relative;
}

.main-content {
  overflow: auto;
  height: 100%;
}

.app-bar {
  position: absolute;
}

// Only apply this style if below top app bar.
.mdc-top-app-bar {
  z-index: 7;
}

</style>
