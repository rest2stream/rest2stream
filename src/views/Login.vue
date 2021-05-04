<template>
  <div class="login">
    <div class="login--box">
      <form method="post">
        <h3>Pls login!</h3>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="id_username" name="username">
            <label class="mdl-textfield__label" for="id_username">Username..</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="password" id="id_password" name="password">
            <label class="mdl-textfield__label" for="id_password">Password..</label>
          </div>
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
              Login
          </button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    setup() {

    }
  }
</script>

<style lang="scss" >

  .login {
    display: grid;
    height: 100vh;
    align-items: center;
  }

  .login--box {
    background-color: white ;
    justify-self: center;
    padding:2rem;
    height: 350px;
    width: 270px;
  }

</style>