<template>
<div class="section">
<div class="container" style="padding-top:10%;">
    <!--Grid row-->
    <div class="row d-flex justify-content-center">
      <!--Grid column-->
      <div class="col-md-6">
        <div>
            <h2 style="text-align: center;">SignUp</h2>
        </div>
        <!--Section: Content-->
        <section class="mt-4 mb-5">
          <div v-if="success" class="alert alert-success" role="alert">
            User Register Successfully
          </div>
          
          <form @submit="register">
            <div class="md-form md-outline mt-0">
              <input type="text" id="name" v-model="state.name" class="form-control" />
              <span v-if="v$.name.$error" style="color: red">Name is required</span>
              <label data-error="wrong" data-success="right" for="name" >Name</label >
            </div>
            <div class="md-form md-outline mt-0">
              <input type="text" id="username" v-model="state.username" class="form-control" />
              <span v-if="v$.username.$error" style="color: red">Username is required</span>
              <label data-error="wrong" data-success="right" for="username" >Username</label >
            </div>
            <div class="md-form md-outline mt-0">
              <input type="email" id="email" class="form-control" v-model="state.email" @blur="checkEmailAvailable"/>
              <span v-if="v$.email.$error" style="color: red">{{ v$.email.$errors[0].$message }}</span>
              <label data-error="wrong" data-success="right" for="email" >Your email</label >
            </div>
            <div class="md-form md-outline mt-0">
              <input type="password" id="psw" v-model="state.password" class="form-control" />
              <span v-if="v$.password.$error" style="color: red">Password is required</span>
             
              <label data-error="wrong" data-success="right" for="psw" >Your password</label >
            </div> 
            <!-- <div class="md-form md-outline mt-0">
              <input type="password" id="cpsw" v-model="state.cpassword" class="form-control" />
              <span v-if="v$.cpassword.$error" style="color: red">Password should match</span>
              <label data-error="wrong" data-success="right" for="cpsw" >Confirm password</label >
            </div>       -->

            <div class="text-center mb-2">
              <button type="submit" class="btn btn-primary mb-4 waves-effect waves-light" >
                Sign Up
              </button>
            </div>
          </form>
        </section>
        <!--Section: Content-->
      </div>
      <!--Grid column-->
    </div>
    <!--Grid row-->
  </div>
</div>
  
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { computed, reactive } from "vue";
import { required,sameAs,minLength } from "@vuelidate/validators";
import axios from 'axios';
import Swal from 'sweetalert2'


export default {
  name: "Register",
  components: {},
  setup() {
    const errors = [];
    const emailError = '';
    const state = reactive({
      username: "",
      email: "",
      password: "",
     // cpassword: "",
       name:""
    });
    const rules = computed(() => {
      return {
        username: {
          required,
           minLength: minLength(3),
        },
        name:{
          required,
           minLength: minLength(3),
        },
        email: {
          required,
        },
        password: {
          required,
          minLength: minLength(3),
        },
        // cpassword: {
        //   cpassword: sameAs("password")
        // },
      };
    });
    const v$ = useVuelidate(rules, state);
    return {
      state,
      v$,
      errors,
      emailError
    };
  },
  methods: {
    async register(e) {
      e.preventDefault();
      this.v$.$validate();
      if (!this.v$.$error) {
        const formData = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
      };
      try {
          const response1 = await axios.post(`${this.$store.state.api_url}api/isEmailAvailable`, { email: this.state.email });       
           if(!response1.data.status) {
            Swal.fire({
                text: 'Email not available',
                confirmButtonText: 'Ok'
              })
            }
          else{
            const response = await axios.post(`${this.$store.state.api_url}api/signup`, formData);
            if(response.data.status) {
              Swal.fire({
                text: 'Registartion completed successfully',
              })
              this.name = '';
              this.username = '';
              this.password='';
              this.cpassword='';
              this.phone='';
              this.email='';
              this.$router.push("/login");
            } else{
              Swal.fire({
              text: 'error',
            })  
          }
        }
        } catch (error) {
          this.successMsg = null;
          this.errors = error.response.data.payload;
        }
      }
    },
     async checkEmailAvailable() {
      try {
        const response = await axios.post(`${this.$store.state.api_url}api/isEmailAvailable`, { email: this.state.email });       

       if(!response.data.status) {
         Swal.fire({
            text: 'Email not available',
            confirmButtonText: 'Ok'
          })
        } 
        
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
</script>