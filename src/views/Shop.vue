<template>
<div class="banner">
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
        <div class="hero-body has-text-centered mt-5">
        </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
          <h2 class="is-size-2 has-text-centered">All Products</h2>
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
      return store.state.products;
    });

    return {
      products, 
      isLoggedIn: computed(() => store.getters.isLoggedIn),
    };
    
  },
  mounted() {
    this.$store.dispatch("getProducts");
  }
};
</script>
<style scoped>
.banner {   
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
</style>
