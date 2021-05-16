<template>
  <MDCForm 
    v-model="frm" 
    #default="{ isValid }" 
  >
    <div class="login-container">
      <div class="box">
        <div class="box__msg mdc-typography--headline5">Please login!</div>
        <div class="box__user">
          <MDCTextField
            id="username"
            v-model="frm.username" 
            required
          />
        </div>
        <div class="box__pass">
          <MDCTextField
            id="password"
            type="password"
            autocomplete="on"
            v-model="frm.password" 
            required
          />
        </div>
        <button :disabled="!isValid" @click.prevent="login()" class="box__btn mdc-button mdc-button--raised">
          <div class="mdc-button__ripple"></div>
          <span class="mdc-button__label">Login</span>
        </button>
        <div class="box__others">
          <a :href="githubLogin">Sign-in with Github</a>
        </div>
      </div>
    </div>
  </MDCForm>
      <MDCSnackbar
        ref="snackRef"
        :label="store.state.auth.status_msg"
      />
</template>

<script>
  import { onMounted, ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { 
    MDCTextField,
    MDCForm,
    MDCSnackbar
  } from '@/components/forms';
  import useAuth  from '@/use/useAuth';
  export default {
    name: "Login",
    components: {
      MDCTextField,
      MDCForm,
      MDCSnackbar
    },
    setup() { 
      const store = useStore();
      const auth = useAuth();
      const router = useRouter();
      const githubLogin = computed(() => import.meta.env.VITE_GITHUB_LOGIN_URL);
      const frm = ref({
        username: '',
        password: '',
      })
      const snackRef = ref(null)

      onMounted(() => {
        mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));
      })

      const login = async () => {
        let formData = new FormData();
        formData.append('username', frm.value.username);
        formData.append('password', frm.value.password);

        await auth.login(formData);
        const { status } =  await auth.getUser();
        if (status === 200) {
          router.push({ name: 'myapi-list' });
        } else {
          snackRef.value.open();
        }
      }

      return {
        login,
        frm,
        store,
        githubLogin,
        snackRef
      }

    }
  }
</script>

<style lang="scss" scoped>

.login-container {
  display: grid;
  height: 100vh;
  align-items: center;
}

.box {
  display: grid;
  background-color: white ;
  justify-self: center;
  align-self: center;
  padding-left: 2rem;
  padding-right: 2rem;
  height: 400px;
  width: 260px;
  grid-template-areas: "msg"
                       "user"
                       "pass"
                       "btn"
                       "others";

  &__msg {
    grid-area: msg;
    width: 100%;
    display: grid;
    align-items: center;
  }

  &__user {
    grid-area: user;
    width: 100%;
  }

  &__pass {
    grid-area: pass;
    width: 100%;
  }

  &__btn {
    grid-area: btn;
    width: 40%;
  }

  &__others {
    grid-area: others;
  }
}

</style>