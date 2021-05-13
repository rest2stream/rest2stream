<template>
  <form method="post" @submit.prevent="login()">
    <div class="login-container">
      <div class="box">
            <h4 class="box__msg">{{store.state.auth.status_msg || 'Please login!'}}</h4>
            <div class="box__user mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <label class="mdc-text-field mdc-text-field--filled">
                <span class="mdc-text-field__ripple"></span>
                <span class="mdc-floating-label" id="my-label-id">Username</span>
                <input class="mdc-text-field__input" type="text" aria-labelledby="my-label-id" v-model="frm.username">
                <span class="mdc-line-ripple"></span>
              </label>
            </div>
            <div class="box__pass mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <label class="mdc-text-field mdc-text-field--filled">
                <span class="mdc-text-field__ripple"></span>
                <span class="mdc-floating-label" id="my-label-id">Password</span>
                <input class="mdc-text-field__input" type="password" aria-labelledby="my-label-id" v-model="frm.password" autocomplete="on">
                <span class="mdc-line-ripple"></span>
              </label>
            </div>
            <button class="box__btn mdc-button mdc-button--raised foo-button">
              <div class="mdc-button__ripple"></div>
              <span class="mdc-button__label">Login</span>
            </button>
            <div class="box__others">
              <a :href="githubLogin">Sign-in with Github</a>
            </div>
      </div>
    </div>
  </form>
</template>

<script>
  import { onMounted, ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import useAuth  from '@/use/useAuth';
  import useMDC  from '@/use/useMDC';
  export default {
    name: "Login",
    setup() { 
      const store = useStore();
      const auth = useAuth();
      const router = useRouter();
      const mdc1 = useMDC();
      const githubLogin = computed(() => import.meta.env.VITE_GITHUB_LOGIN_URL);
      const frm = ref({
        username: '',
        password: '',
      })

      onMounted(() => {
        mdc1.textFieldInit();
        mdc1.buttonInit();
      })

      const login = async () => {
        let formData = new FormData();
        formData.append('username', frm.value.username);
        formData.append('password', frm.value.password);

        await auth.login(formData);
        await auth.getUser();
        router.push({ name: 'myapi-list' });
      }

      return {
        login,
        frm,
        store,
        githubLogin
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