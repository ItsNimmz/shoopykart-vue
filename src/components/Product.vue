<template>
<div class="wrapper">
    <div class="col-md-4 bg-white my-3">
        <div class="card" style="width: 20rem;" >
        <div class="card-body">
          <img class="img-fluid w-100" :src="BASE_URL + product.imageurl" alt="Sample" @click="showDetails(product.imageurl,product.name,product.description)" />
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">{{ product.description }}</p>
          <p class="card-text"><strong>$ {{ product.price - product.discount }} </strong><del> $ {{ product.price }}</del></p>
         <button  @click="addToCart()" class="btn btn-primary waves-effect waves-light">Add to cart</button>
        </div>
      </div>
    </div>
  </div> 
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Swal from 'sweetalert2'
export default {
  name: "Product",
  props: ["product"],
  setup(props) {
    const store = useStore();
    const BASE_URL = `${store.state.api_url}images/`;

    let cart = computed(() => {
      return store.state.cart;
    });

     let itemAlreadyInCart = computed(() => {
      let inCart = false;
      cart.value.forEach((item) => {
        if (item.id === props.product.id) {
          inCart = true;
        }
      });
      return inCart;
    });
    function showDetails(image,name,description){
      Swal.fire({
        title: name,
        text: description,
        imageUrl: BASE_URL+image,
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: 'Product image',
        showCloseButton: true,
        showConfirmButton: false,
        width:500
      })    
}

    function addToCart() {
        if (!itemAlreadyInCart.value) {
        store.commit("addToCart", props.product);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Item added to cart',
          showConfirmButton: false,
          timer: 1500,
          width:250
        })
      } else {
        Swal.fire({
            text: 'Item already added to Cart',
            confirmButtonText: 'Ok'
          })
      }
    }

    return {
      cart,
      addToCart,
      BASE_URL,
      itemAlreadyInCart,
      showDetails
    };
  },
};
</script>

<style scoped>
.card:hover{
     transform: scale(1.09);
     box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}
.card-img-top {
  object-fit: cover;
  width: 100px;
  height: 100px;
}

</style>