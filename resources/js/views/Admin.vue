<template>
    <div>
        <div
            class="container-fluid hero-section d-flex align-content-center justify-content-center flex-wrap ml-auto"
        >
            <h2 class="title">Admin Dashboard</h2>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-2">
                    <ul style="list-style-type:none">
                        <li class="active">
                            <button class="btn" @click="setComponent('main')">
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button class="btn" @click="setComponent('orders')">
                                Orders
                            </button>
                        </li>
                        <li>
                            <button class="btn" @click="setComponent('users')">
                                Users
                            </button>
                        </li>
                        <li>
                            <button
                                class="btn"
                                @click="setComponent('products')"
                            >
                                Products
                            </button>
                        </li>
                        <li>
                            <button
                                class="btn"
                                @click="setComponent('addProduct')"
                            >
                                Add product
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="col-md-10">
                    <component :is="activeComponent"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Main from "../components/admin/Main";
import Users from "../components/admin/Users";
import Products from "../components/admin/Products";
import AddProduct from "../components/admin/AddProduct";
import Orders from "../components/admin/Orders";
import User from "../apis/User";

export default {
    components: {
        Main,
        Users,
        Products,
        AddProduct,
        Orders
    },

    data() {
        return {
            user: null,
            activeComponent: null
        };
    },

    mounted() {
        User.auth().then(response => {
            this.$store.commit("AUTH_USER", response.data);
            if (localStorage.getItem("isAdmin") === "1") {
                this.$store.commit("ADMIN", true);
            } else {
                this.$store.commit("ADMIN", false);
            }
        });
        this.setComponent(this.$route.params.page);
    },

    methods: {
        setComponent(componentName) {
            switch (componentName) {
                case "users":
                    this.activeComponent = Users;
                    this.$router
                        .push({
                            name: "admin_pages",
                            params: { page: "users" }
                        })
                        .catch(() => {});
                    break;
                case "orders":
                    this.activeComponent = Orders;
                    this.$router
                        .push({
                            name: "admin_pages",
                            params: { page: "orders" }
                        })
                        .catch(() => {});
                    break;
                case "products":
                    this.activeComponent = Products;
                    this.$router
                        .push({
                            name: "admin_pages",
                            params: { page: "products" }
                        })
                        .catch(() => {});
                    break;
                case "addProduct":
                    this.activeComponent = AddProduct;
                    this.$router
                        .push({
                            name: "admin_pages",
                            params: { page: "addProduct" }
                        })
                        .catch(() => {});
                    break;
                default:
                    this.activeComponent = Main;
                    this.$router.push("/admin").catch(() => {});
                    break;
            }
        }
    }
};
</script>

<style scoped>
.hero-section {
    height: 20vh;
    background: #ababab;
    align-items: center;
    margin-bottom: 20px;
}

.title {
    font-size: 60px;
    color: #ffffff;
}
</style>
