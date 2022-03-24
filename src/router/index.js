import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Shop from '../views/Shop.vue'
import Order from '../views/Order.vue'
import Cart from '../views/Cart.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Checkout from '../views/Checkout.vue'
import OrderSummary from '../views/OrderSummary'
import AddProduct from '../views/AddProduct.vue'
import store from '../store';


const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },

    {
        path: '/shop',
        name: 'shop',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Shop.vue')
    },
    {
        path: '/order',
        name: 'Order',
        component: Order,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
    },
    {
        path: "/order-summary",
        name: "OrderSummary",
        component: OrderSummary,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/add-products',
        name: 'AddProduct',
        component: AddProduct
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.token) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router