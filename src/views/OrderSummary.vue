<template>
  <main>
    <div class="container pt-5">
      <section class="mt-5 mb-4 ">
        <!--Grid row-->
        <div class="row">
          <!--Grid column-->
          <div class="col-lg-12">
               <div class="col-md-12 text-center">
                    <h3 class="events">Order Summary</h3>
                </div>
            <!-- Card -->
            <div class="card mb-4">
              <div class="card-body">
    
                <ul v-for="order in orderDetails.order_details" :key="order.id" class="list-group list-group-flush">
                  <li class=" list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Product: {{order.name}} ({{order.quantity}}) 
                    <span>${{order.price * order.quantity}}</span>
                  </li>
                </ul>
                <ul class="list-group list-group-flush">
                  <li class=" list-group-item d-flex justify-content-between align-items-center border-0 px-0 ">
                    <div>
                      <strong>Total</strong>
                      <strong>
                        <p class="mb-0">(including Shipping)</p>
                      </strong>
                    </div>
                    <span><strong>${{orderDetails.grand_total}}</strong></span>
                  </li>
                </ul>
                <ul class="list-group list-group-flush">
                  <li class=" list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      Payment method
                    </div>
                    <span>Cash on delivery</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--Grid column-->
          <div class="col-4"></div>
          <div class="col-4">
            <router-link class="btn btn-primary btn-block waves-effect waves-light" to="/shop" tag="button" >Go to Shop</router-link>
          </div>
        </div>
        <!--Grid row-->
      </section>
    </div>
  </main>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "OrderSuccess",
  components: {},
  setup() {
    const store = useStore();
    let orderDetails = computed(() => {
      return store.state.orderdata.data;
    });
    return {
      orderDetails,
    };
  },
};
</script>
<style scoped>
ul{
    margin-left: 20%;
    margin-right: 20%;
}
.card:hover{
     transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}
</style>