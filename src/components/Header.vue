<template>
  <header>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-md navbar-dark fixed-top scrolling-navbar navbar-dark">
      <h2>ShoopyKart</h2>
      <div class="container-fluid">
        <!-- Collapse button -->
        <button class="navbar-toggler-light" type="button" data-toggle="collapse" data-target="#example" aria-controls="example" aria-expanded="false" aria-label="Toggle navigation" hidden>
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Links -->
        <div class="collapse navbar-collapse" id="example">
          <!-- Right -->
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link waves-effect" to="/">
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link waves-effect" to="/shop">
                Shop
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link waves-effect" to="/order">
                Orders
              </router-link>
            </li>
            <li class="nav-item" v-if="isAdmin">
              <router-link class="nav-link waves-effect" to="/add-products">
               Add Products
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link navbar-link-2 waves-effect" to="/cart">
                <span class="badge badge-pill red">{{cart.length}}</span>
                <i class="fas fa-shopping-cart pl-0"></i>
              </router-link>
            </li>
            <li v-if="isLoggedIn" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-55" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" >
                <img src="../assets/images/avtar.png" class="rounded-circle" style="height: 34px" alt="avatar image" />
              </a>
              <div class="dropdown-menu dropdown-menu-lg-right" aria-labelledby="navbarDropdownMenuLink-55">
                <a class="dropdown-item" @click="logout" href="#!">Logout</a>
              </div>
            </li>
            <li v-else class="nav-item">
              <router-link class="nav-link waves-effect" to="/login">
                Login
              </router-link>
            </li>
          </ul>
        </div>
        <!-- Links -->
      </div>
    </nav>
  </header>

    <!-- Navbar -->
    <div class="conatiner">
      <section section class="section">
        
      </section>
    </div>
  
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: 'Header',
  setup() {
    const store = useStore();
    let cart = computed(() => {
      return store.state.cart;
    });
    function isLoginPage() {
      if (this.$route.path === "/login") {
        return true;
      } else {
        return false;
      }
    }
    return {
      cart,
      isLoggedIn: computed(() => store.getters.isLoggedIn),
      isAdmin: computed(() => store.getters.isAdmin),
      isLoginPage,
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
    
  },
};
</script>
