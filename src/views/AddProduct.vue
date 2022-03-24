<template>
<div class="section">
<div class="container" style="padding-top:10%;">
    <!--Grid row-->
    <div class="row d-flex justify-content-center">
      <!--Grid column-->
      <div class="col-md-6">
        <div>
            <h2 style="text-align: center;">Add Product</h2>
        </div>
        <!--Section: Content-->
        <section class="mt-4 mb-5">
          <div v-if="success" class="alert alert-success" role="alert">
            Added Product Successfully
          </div>
          
          <form @submit="addProduct" enctype="multipart/form-data">
            <div class="md-form md-outline mt-0">
              <input type="text" id="name" v-model="state.name" class="form-control" />
              <span v-if="v$.name.$error" style="color: red">Name is required</span>
              <label data-error="wrong" data-success="right" for="name" >Product Name</label >
            </div>
            <div class="md-form md-outline mt-0">
              <input type="number" id="price" v-model="state.price" class="form-control" />
              <span v-if="v$.price.$error" style="color: red">price is required</span>
              <label data-error="wrong" data-success="right" for="price" >Product Price</label >
            </div>
            <div class="md-form md-outline mt-0">
              <input type="number" id="discount" class="form-control" v-model="state.discount"/>
              <span v-if="v$.discount.$error" style="color: red">{{ v$.discount.$errors[0].$message }}</span>
              <label data-error="wrong" data-success="right" for="discount" >Product discount</label >
            </div>
            <div class="md-form md-outline mt-0">
              <textarea class="form-control" name="" id="description" cols="30" rows="3" v-model="state.description"></textarea>
              <span v-if="v$.description.$error" style="color: red">{{ v$.description.$errors[0].$message }}</span>
              <label data-error="wrong" data-success="right" for="description" >Product Description</label >
            </div> 
            <div class="md-form md-outline mt-0" hidden>
                <label for="formFile" class="form-label"></label>
                <input class="form-control" type="file" id="formFile" @change="onFileSelected">
            </div>
            <div class="text-center mb-2">
              <button type="submit" class="btn btn-primary mb-4 waves-effect waves-light" >
                Add Product
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
import { required,between,minLength } from "@vuelidate/validators";
import axios from 'axios';
import Swal from 'sweetalert2'


export default {
  name: "AddProduct",
  components: {},
  setup() {
    const errors = [];
    const emailError = '';
    const state = reactive({
      name: "",
      price: "",
      discount: "",
      description:"",
      selectedFile:"null"
    });
    const rules = computed(() => {
      return {
        name: {
          required,
           minLength: minLength(3),
        },
        description:{
          required,
           minLength: minLength(3),
        },
        price: {
          required,
        },
        discount: {
          required,
        },
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
    async addProduct(e) {
      e.preventDefault();
      this.v$.$validate();
      if (!this.v$.$error) {
        const formData = {
          name: this.state.name,
          price: this.state.price,
          discount: this.state.discount,
          description: this.state.description,
          imageurl:  this.state.selectedFile,
        };
        const headers= {
            "Content-type": "Application/json",
            Authorization: `Bearer ${this.state.token}`,
        };
      try {
          const response1 = await axios.post(`${this.$store.state.api_url}api/isProductExist`, { name: this.state.name });       
         
           if(!response1.data.status) {
            Swal.fire({
                text: 'Product name already exist',
                confirmButtonText: 'Ok'
              })
            }
          else if(this.state.price < this.state.discount){
             Swal.fire({
                text: 'Discount should be less than price',
                confirmButtonText: 'Ok'
              })
           }
            else if(!this.state.selectedFile){
             Swal.fire({
                text: 'Please uplaod image',
                confirmButtonText: 'Ok'
              })
           }
          else{
            const response = await axios.post(`${this.$store.state.api_url}api/add-product`, formData,headers);
            if(response.data.status) {
              Swal.fire({
                text: 'Product added successfully',
              })
              this.name = '';
              this.price = '';
              this.discount='';
              this.description='';
              this.$router.push("/");
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
    onFileSelected(event){
      this.state.selectedFile = event.target.files[0];
    }
  },
  
};
</script>