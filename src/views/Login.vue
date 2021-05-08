<template>
  <form method="post" @submit.prevent="login()">
    <div class="login-container">
      <div class="box">
            <h3 class="box__msg">Pls login!</h3>
            <div class="box__user mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" type="text" id="id_username" name="username" v-model="frm.username">
              <label class="mdl-textfield__label" for="id_username">Username..</label>
            </div>
            <div class="box__pass mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" type="password" id="id_password" name="password" v-model="frm.password">
              <label class="mdl-textfield__label" for="id_password">Password..</label>
            </div>
            <button class="box__btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
                Login
            </button>
            <div class="box__others">
              <a href="">Sign-in with Github</a>
            </div>
      </div>
    </div>
  </form>
</template>

<script>
  import { onMounted, ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import useAuth  from '@/use/useAuth';
  export default {
    name: "Login",
    setup() { 
      const store = useStore();
      const auth = useAuth();
      const router = useRouter();
      const frm = ref({
        username: '',
        password: '',
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
        store
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