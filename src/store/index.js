import { createStore } from 'vuex'
import axios from "axios";
import VuexPersist from "vuex-persist";
const vuexPersist = new VuexPersist({
    key: "ecom-store",
    storage: window.localStorage,
});

export default createStore({
    plugins: [vuexPersist.plugin],
    state: {
        user: null,
        token: null,
        products: [],
        latestProducts: [],
        cart: [],
        orderdata: [],
        orders: [],
        shippingCharge: 40,
        api_url: "http://localhost:3000/"
    },
    getters: {
        isLoggedIn(state) {
            return state.token
        },
        isAdmin(state) {
            if (state.user) {
                if (state.user.user_role == 'admin') {
                    return true;
                }
                return false;
            }
            return false;
        },
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user;
        },
        LogOut(state) {
            state.user = null;
            state.orderdata = [];
            state.token = null;
        },
        clearCart(state) {
            state.cart = [];
        },
        addToCart(state, item) {
            item.quantity = 1;
            state.cart.push(item)
        },
        updateCartItem(state, updatedItem) {
            state.cart = state.cart.map((cartItem) => {
                if (cartItem.id == updatedItem.id) {
                    return updatedItem;
                }
                return cartItem;
            });
        },
        removeCartItem(state, item) {
            state.cart = state.cart.filter((cartItem) => {
                return cartItem.id != item.id;
            });
        },
        setProducts(state, products) {
            state.products = products;
        },
        setLatestProducts(state, products) {
            state.latestProducts = products;
        },
        setCart(state, products) {
            state.cart = products;
        },
        setOrderDetails(state, order) {
            state.orderdata = order;
        },
        setOrders(state, orders) {
            state.orders = orders;
        },
    },
    actions: {
        getProducts({ commit }) {
            axios.get(`${this.state.api_url}api/home`).then((response) => {
                commit("setProducts", response.data.data);
            });
        },
        getLatestProducts({ commit }) {
            axios.get(`${this.state.api_url}api/latestProducts`).then((response) => {
                commit("setLatestProducts", response.data.data);
            });
        },
        async LogOut({ commit }) {
            let user = null;
            commit("LogOut", user);
        },
        getOrders({ commit }) {
            let url;
            url = 'my-order';
            if (this.state.user.user_role == 'admin') {
                url = 'orders';
            }
            axios.get(`${this.state.api_url}api/` + url, {
                    headers: {
                        "Content-type": "Application/json",
                        Authorization: `Bearer ${this.state.token}`,
                    },
                })
                .then((response) => {
                    commit("setOrders", response.data.data);
                });
        },
    },
    modules: {}
})
