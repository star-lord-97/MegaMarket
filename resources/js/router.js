import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home";
import Categories from "./views/Categories";
import Product from "./views/Product";
import Cart from "./views/Cart";
import Wishlist from "./views/Wishlist";
import Login from "./views/Login";
import Register from "./views/Register";

const routes = [
    {
        path: "/",
        component: Home,
    },

    {
        path: "/product/:id",
        component: Product,
    },

    {
        path: "/category/:category",
        component: Categories,
    },

    {
        path: "/cart",
        component: Cart,
    },

    {
        path: "/wishlist",
        component: Wishlist,
    },

    {
        path: "/login",
        component: Login,
    },

    {
        path: "/register",
        component: Register,
    },
];
const router = createRouter({ history: createWebHistory(), routes });

export default router;
