<template>
  <main>

    <div class="container">
      <section>
        <h4 class="text-center mt-4 mb-5">
          <strong>All Orders</strong>
        </h4>

      <div class="row">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Address</th>
              <th scope="col">Order Status</th>
              <th scope="col">Payment Status</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in orders" :key="item.id">
                <th scope="row">{{item.id}}</th>
                <td>{{item.first_name}}</td>
                <td>{{item.last_name}}</td>
                <td>{{item.address}}</td>
                <td>{{item.order_status}}</td>
                <td>{{item.payment_status}}</td>
                <td>{{item.grand_total}}</td>
                <td>{{item.createdAt}}</td>
              </tr> 
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </main>
</template>
<script>

import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Orders",
  props: {
    title: String,
  },
  components: {
   
  },
  setup() {
    const store = useStore();
    let orders = computed(() => {
      console.log(store.state.orders);
      return store.state.orders;
    });
    return {
      orders,
    };
  },
   mounted() {
    this.$store.dispatch("getOrders");
  }
};
</script>