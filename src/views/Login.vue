<template>
  <div class="container shadow-none">
    <div class="card">
      <h1 class="card-title">Login</h1>
        <div class="alert alert-danger error-message" role="alert" v-if="errors">
         {{errors[0]}}
        </div>
        <div class="form-group md-form md-outline">
          <label for="exampleInputEmail1">Email address</label>
          <input type="text" name="email" id="email" class="form-control" v-model="email" >
        </div>
        <div class="form-group md-form md-outline">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" name="password" id="password" class="form-control" v-model="password" >         
        </div>
        <button class="btn btn-primary waves-effect waves-light" v-on:click="login">Login</button>
      <p class="text-center">Don't have an account? <span class="signup-link"><router-link to="/signup">Signup.</router-link></span></p>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: "Login",
  components: {},
  data() {
    return{
      email: "",
      password: "",
      errors:null
    }
  },
  methods: {
        ...mapMutations(["setUser", "setToken"]),
    async login() {
      this.errors = null;
      if (true) {
        const res = await fetch(`${this.$store.state.api_url}api/login`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });
        const data = await res.json();
        if (data.status) {
          this.setUser(data.user);
          this.setToken(data.token);
          this.$router.push("/");
        }else{
          this.errors = ['Invalid username or password'];
        }
      }
      setTimeout(function() {
        $(".error-message").hide()
    }, 1000);
    },
  },
};
</script>

<style scoped src="../assets/css/form.css"></style>