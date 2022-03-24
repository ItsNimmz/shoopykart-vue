<template>
  <main>
    <div class="container pt-5">
      <section class="mt-5 mb-4">
        <div class="row">
          <div class="col-lg-8 mb-4">

            <div class="card wish-list pb-1">
              <div class="card-body">
                <h5 class="mb-2">Shipping details</h5>

                <div class="row">
                  <div class="col-lg-6">
                    <div class="md-form md-outline mb-0 mb-lg-4">
                      <input type="text" id="firstName" class="form-control mb-0 mb-lg-2" v-model="state.firstName" />
                      <span v-if="v$.firstName.$error" style="color: red">{{
                        v$.firstName.$errors[0].$message
                      }}</span>
                      <label for="firstName">First name</label>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="md-form md-outline">
                      <input type="text" id="lastName" class="form-control" v-model="state.lastName" />
                      <span v-if="v$.lastName.$error" style="color: red">{{
                        v$.lastName.$errors[0].$message
                      }}</span>

                      <label for="lastName">Last name</label>
                    </div>
                  </div>
                </div>

                <div class="md-form md-outline">
                  <input type="number" id="phone" class="form-control" v-model="state.phone" />
                  <span v-if="v$.phone.$error" style="color: red">{{
                    v$.phone.$errors[0].$message
                  }}</span>
                  <label for="phone">Phone</label>
                </div>

                <div class="md-form md-outline">
                  <input type="email" id="email" class="form-control" v-model="state.email" />
                  <span v-if="v$.email.$error" style="color: red">{{
                    v$.email.$errors[0].$message
                  }}</span>
                  <label for="email">Email address</label>
                </div>

                <div class="md-form md-outline mt-0">
                  <input type="text" id="address" placeholder="House number and street name" class="form-control" v-model="state.address" />
                  <span v-if="v$.address.$error" style="color: red">{{ v$.address.$errors[0].$message }}</span>
                  <label for="address" class="active">Address</label>
                </div>

                <div class="md-form md-outline">
                  <input type="text" id="zip" class="form-control" v-model="state.pinCode"  />
                  <span v-if="v$.pinCode.$error" style="color: red">{{ v$.pinCode.$errors[0].$message }}</span>
                  <label for="zip">Postcode / ZIP</label>
                </div>

                <div class="md-form md-outline">
                  <input type="text" id="town" class="form-control" v-model="state.town" />
                  <span v-if="v$.town.$error" style="color: red">{{
                    v$.town.$errors[0].$message
                  }}</span>
                  <label for="town">Town / City</label>
                </div>
                <div class="md-form md-outline pb-4">
                  <div class="form-check"> 
                    <input class="form-check-input" type="radio" name="payment" id="payment2" checked>
                    <label class="form-check-label" for="payment2">
                      Cash on delivery
                    </label>                  
                  </div>
                  <span v-if="v$.town.$error" style="color: red">{{
                    v$.town.$errors[0].$message
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <CartTotal :total="totalPrice" :discount="totalDiscount" :shipping="shippingCharge"  title="Place Order" page="checkout" @place-order="placeOrder" />
        </div>
      </section>
    </div>
  </main>
</template>
<script>
import CartTotal from "../components/CartTotal";
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email ,minLength} from "@vuelidate/validators";
import axios from "axios";
import Swal from 'sweetalert2'


export default {
  name: "Checkout",
  components: {
    CartTotal,
  },
  setup() {
    const state = reactive({
      firstName: "",
      lastName: "",
      address: "",
      pinCode: "",
      town: "",
      phone: "",
      email: "",
      payment:null
    });
    const rules = computed(() => {
      return {
        firstName: {
          required,
        },
        lastName: {
          required,
        },
        address: {
          required,
        },
        pinCode: {
          required,
        },
        town: {
          required,
        },
        phone: {
          required,
           minLength: minLength(10)
        },
        email: {
          required,
          email,
        },
       
      };
    });
    const v$ = useVuelidate(rules, state);
    const store = useStore();

    let cart = computed(function () {
      return store.state.cart;
    });

    let shippingCharge = computed(function () {
      return store.state.shippingCharge;
    });

    let totalPrice = computed(function () {
      return cart.value.reduce((total, next) => {
        return total + next.quantity * next.price;
      }, 0);
    });
    let totalDiscount = computed(function () {
      return cart.value.reduce((discount, next) => {
        return discount + next.quantity * next.discount;
      }, 0);
    });
    return {
      state,
      v$,
      shippingCharge,
      totalPrice,
      totalDiscount
    };
  },
  methods: {
    async placeOrder() {
      this.v$.$validate();
     
      if (!this.v$.$error) {
       
        const res = await axios.post(`${this.$store.state.api_url}api/place-order`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.$store.state.token}`,
          },
          body: {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            address: this.state.address,
            town: this.state.town,
            phone: this.state.phone,
            pinCode: this.state.pinCode,
            email: this.state.email,
            order_details: this.$store.state.cart,
            grand_total: this.totalPrice + this.shippingCharge,
            shipping_rate: this.shippingCharge,
          },
        });

      if (res.status) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Order placed successfully',
          showConfirmButton: false,
          timer: 1500
        })
          this.firstName = "";
          this.lastName = "";
          this.town = "";
          this.phone = "";
          this.pinCode = "";
          this.email = "";
          this.address = "";
          this.$store.commit("setOrderDetails", res.data);
          this.$store.commit("clearCart");
          this.$router.push("/order-summary");
        } else {
          alert("Order processing failed");
        }
      }
    },
  },
};
</script>

<style scoped>
.card:hover{
     transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}
</style>