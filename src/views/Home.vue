<template>
<div class="banner">
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
        <div class="hero-body has-text-centered mt-5">
            <h3 class="title mb-6">
                Welcome to ShoopyKart
            </h3>
            <p class="subtitle">
                For some, shopping is an art; for others, it's a sport.
            </p>
        </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12 mt-5">
        <router-link v-if="!isLoggedIn" tag="button"  class="btn btn-primary btn-block waves-effect waves-light" to="/signup" >SignUp</router-link>
      </div>
      <div class="column is-12 mt-5">
          <h3 class="is-size-2 has-text-centered">New Arrivals</h3>
      </div>
  </div>
</div>

  </div>
  <div class="container">
    <div class="row">
     <div class="row">
          <Product v-for="product in products" :product="product" :key="product.id" />
        </div>
        </div>
    </div>      
</template>

<script>
import Product from "../components/Product";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {
    Product,
  },
  setup() {
    const store = useStore();
   
    let products = computed(() => {
      return store.state.latestProducts;
    });

    return {
      products, 
      isLoggedIn: computed(() => store.getters.isLoggedIn),
    };
    
  },
  mounted() {
    this.$store.dispatch("getLatestProducts");
  }
};
</script>
<style scoped>
.banner {
    background: url("../assets/images/banner.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}


</style>
