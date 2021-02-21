import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    state: {
        baseAPIURL: "http://localhost:8000/api",
        token: localStorage.getItem("token") || null,
        admin: localStorage.getItem("admin") || false,
    },

    getters: {
        isLoggedIn(state) {
            return state.token !== null;
        },

        isAdmin(state) {
            return state.admin !== null && state.admin != false;
        },
    },

    mutations: {
        LOGIN(state) {
            state.token = localStorage.getItem("token");
        },

        ADMIN(state) {
            state.admin = localStorage.getItem("admin");
        },

        clearToken(state) {
            state.token = null;
        },

        clearAdmin(state) {
            state.admin = null;
        },
    },

    actions: {
        getAllProducts(context) {
            return new Promise((resolve, reject) => {
                axios
                    .get(context.state.baseAPIURL + "/products")
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        getOneProduct(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get(context.state.baseAPIURL + "/products/" + payload.id)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        getAllCategories(context) {
            return new Promise((resolve, reject) => {
                axios
                    .get(context.state.baseAPIURL + "/categories")
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        getOneCategory(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get(
                        context.state.baseAPIURL +
                            "/categories/" +
                            payload.category
                    )
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        getUserCart(context) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + context.state.token;
                axios
                    .get(context.state.baseAPIURL + "/cart")
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        addToCart(context, payload) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + context.state.token;
                axios
                    .post(context.state.baseAPIURL + "/cart", {
                        product_id: payload.product_id,
                        quantity: payload.quantity,
                        size: payload.size,
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        deleteFromCart(context, payload) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + context.state.token;
                axios
                    .delete(context.state.baseAPIURL + "/cart/" + payload.id)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        getUserWishlist(context) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + context.state.token;
                axios
                    .get(context.state.baseAPIURL + "/wishlist")
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        addToWishlist(context, payload) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + context.state.token;
                axios
                    .post(context.state.baseAPIURL + "/wishlist", {
                        product_id: payload.product_id,
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        deleteFromWishlist(context, payload) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + context.state.token;
                axios
                    .delete(
                        context.state.baseAPIURL + "/wishlist/" + payload.id
                    )
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        register(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(
                        context.state.baseAPIURL + "/register",
                        payload.credentials
                    )
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        login(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(
                        context.state.baseAPIURL + "/login",
                        payload.credentials
                    )
                    .then((response) => {
                        localStorage.setItem("token", response.data);
                        context.commit("LOGIN");
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        isAdmin(context) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + context.state.token;
                axios
                    .get(context.state.baseAPIURL + "/user")
                    .then((response) => {
                        if (response.data.is_admin === 1) {
                            localStorage.setItem("admin", true);
                            context.commit("ADMIN");
                        }
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        logout(context) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + context.state.token;
                axios
                    .post(context.state.baseAPIURL + "/logout")
                    .then((response) => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("admin");
                        context.commit("clearToken");
                        context.commit("clearAdmin");
                        resolve(response);
                    })
                    .catch((error) => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("admin");
                        context.commit("clearToken");
                        context.commit("clearAdmin");
                        reject(error);
                    });
            });
        },

        sendResetEmail(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(context.state.baseAPIURL + "/forgot", payload.email)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
    },
});
