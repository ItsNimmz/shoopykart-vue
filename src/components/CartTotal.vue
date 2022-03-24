<template>
  <div class="col-lg-4">
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="mb-3">Price Details</h5>

        <ul class="list-group list-group-flush">
          <li class=" list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
            Price ({{totalItem}} items)
            <span>${{ total }}</span>
          </li>
           <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
            Discount
            <span>- ${{ discount }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
            Delivery Charges
            <span>${{ shipping }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-3">
            <div>
              <strong>Total Amount</strong>
            </div>
            <span><strong>${{ total + shipping }}</strong></span>
          </li>
           <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-0">
            <p class="" style="color:green">You will save ${{discount}}  on this order</p>
          </li>
        </ul> 
         
        <button v-if="checkoutPage()" tag="button"  class="btn btn-primary btn-block waves-effect waves-light" @click="checkout()" >{{title}}</button>
        <button v-else @click="$emit('place-order')" type="button" class="btn btn-primary btn-block waves-effect waves-light">Make purchase</button>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import Swal from 'sweetalert2'

export default {
  name: "CartTotal",
  props: {
    total: Number,
    discount: Number,
    shipping: Number,
    totalItem:Number,
    title:String,
    page:String
  },
  components: {},
  setup(props) {
     const store = useStore();
    const prop = {...props};
    function checkoutPage() {
      if(prop.page==='cart'){
        return true
      }else{
        return false
      }
    }
    function checkout() {
      if(!store.state.token){
       Swal.fire({
            text: 'Please login to checkout',
            confirmButtonText: 'Ok'
        });
         setTimeout(function() {
            window.location.href = 'login';
         }, 1000);
      }
      else{
        window.location.href = 'checkout';
      }
    }
    return {
      checkoutPage,
      checkout
    };
  },
};
</script>
<style scoped>
.card:hover{
     transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}
</style>