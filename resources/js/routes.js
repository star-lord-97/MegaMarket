import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home";
import Product from "./views/Product";
import Login from "./views/Login";
import SocialLogin from "./views/SocialLogin";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import Admin from "./views/Admin";
import Checkout from "./views/Checkout";
import EditOrder from "./views/EditOrder";
import EditProfile from "./views/EditProfile";
import EditProduct from "./components/admin/EditProduct";
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
        props: route => ({
            code: route.query.code
        }),
        meta: { requiresGuest: true }
    },

    {
        path: "/auth/:provider/callback",
        component: SocialLogin,
        meta: { requiresGuest: true }
    },

    {
        path: "/forgot_password",
        component: ForgotPassword,
        meta: { requiresGuest: true }
    },

    {
        path: "/reset_password",
        component: ResetPassword,
        props: route => ({
            token: route.query.token,
            email: route.query.email
        }),
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

    {
        path: "/admin/:page",
        component: Admin,
        name: "admin_pages",
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },

    {
        path: "/edit_product",
        component: EditProduct,
        props: route => ({ product_id: route.query.product_id }),
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },

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
        path: "/edit_profile",
        component: EditProfile,
        props: route => ({ user_id: route.query.profile_id }),
        meta: {
            requiresAuth: true
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
    if (localStorage.getItem("isAdmin") === "true") {
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
