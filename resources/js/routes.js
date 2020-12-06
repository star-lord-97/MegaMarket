import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home";
import Product from "./views/Product";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import Admin from "./views/Admin";
import Checkout from "./views/Checkout";
import EditOrder from "./views/EditOrder";
import Confirmation from "./views/Confirmation";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Home
    },

    {
        path: "/products/:id",
        component: Product,
        name: "product"
    },

    {
        path: "/login",
        component: Login,
        meta: { requiresGuest: true }
    },

    {
        path: "/register",
        component: Register,
        meta: { requiresGuest: true }
    },

    {
        path: "/dashboard",
        component: Dashboard,
        meta: {
            requiresAuth: true,
            requiresUser: true
        }
    },

    // {
    //     path: "/admin/:page",
    //     component: Admin,
    //     meta: {
    //         requiresAuth: true,
    //         requiresAdmin: true
    //     }
    // },

    {
        path: "/admin",
        component: Admin,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },

    {
        path: "/checkout",
        component: Checkout,
        props: route => ({ product_id: route.query.product_id }),
        meta: {
            requiresAuth: true,
            requiresUser: true
        }
    },

    {
        path: "/edit_order",
        component: EditOrder,
        props: route => ({ order_id: route.query.order_id }),
        meta: {
            requiresAuth: true,
            requiresUser: true
        }
    },

    {
        path: "/confirmation",
        component: Confirmation,
        meta: {
            requiresAuth: true,
            requiresUser: true
        }
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

function isLoggedIn() {
    return localStorage.getItem("token");
}

function isAdmin() {
    if (localStorage.getItem("isAdmin") === "1") {
        return true;
    }

    return false;
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLoggedIn()) {
            next({
                path: "/login",
                query: { redirect: to.fullPath }
            });
        } else if (to.matched.some(record => record.meta.requiresAdmin)) {
            if (!isAdmin()) {
                next({
                    path: "/dashboard",
                    query: { redirect: to.fullPath }
                });
            } else {
                next();
            }
        } else if (to.matched.some(record => record.meta.requiresUser)) {
            if (isAdmin()) {
                next({
                    path: "/admin",
                    query: { redirect: to.fullPath }
                });
            } else {
                next();
            }
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        if (isLoggedIn()) {
            next({
                path: isAdmin() ? "/admin" : "/dashboard",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
