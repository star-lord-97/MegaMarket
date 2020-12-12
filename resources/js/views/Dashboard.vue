<template>
    <div>
        <div
            class="container-fluid hero-section d-flex align-content-center justify-content-center flex-wrap ml-auto"
        >
            <h2 class="title">All your orders</h2>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <br />
                    <div class="row">
                        <div
                            class="col-md-4 product-box"
                            v-for="(order, index) in orders"
                            @key="index"
                        >
                            <img
                                :src="order.product.image"
                                :alt="order.product.name"
                            />
                            <h5>
                                <span v-html="order.product.name"></span><br />
                                <span class="small-text text-muted"
                                    >$ {{ order.product.price }}</span
                                >
                            </h5>
                            <hr />
                            <span class="small-text text-muted"
                                >Quantity: {{ order.quantity }}
                                <span class="float-right">{{
                                    order.is_delivered == 1
                                        ? "shipped!"
                                        : "not shipped"
                                }}</span>
                            </span>
                            <br />
                            <span class="small-text text-muted"
                                >Total price: $
                                {{ order.product.price * order.quantity }}
                            </span>
                            <br /><br />
                            <p>
                                <strong>Delivery address:</strong> <br />{{
                                    order.address
                                }}
                            </p>
                            <router-link
                                :to="{
                                    path: '/edit_order?order_id=' + order.id
                                }"
                                class="col-md-4 btn btn-sm btn-primary float-right"
                                >Edit Order</router-link
                            >
                        </div>
                        <div class="w-full justify-center my-10">
                            <pagination
                                :data="this.orders_pagination"
                                @pagination-change-page="getResults"
                                align="center"
                            ></pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import User from "../apis/User";
import { mapState } from "vuex";
import axios from "axios";
import axiosInstanceWithToken from "../apis/Api";

export default {
    data() {
        return {
            orders: [],
            orders_pagination: {}
        };
    },

    computed: {
        ...mapState({
            user: state => state.auth.user
        })
    },

    mounted() {
        this.getResults();
    },

    methods: {
        getResults(page = 1) {
            User.auth().then(response => {
                this.$store.commit("AUTH_USER", response.data);
                if (localStorage.getItem("isAdmin") === true) {
                    this.$store.commit("ADMIN", true);
                } else {
                    this.$store.commit("ADMIN", false);
                }
                axiosInstanceWithToken()
                    .get(`/users/${this.user.id}/orders?page=` + page)
                    .then(response => {
                        this.orders = response.data.data;
                        this.orders_pagination = response.data;
                    });
            });
        }
    }
};
</script>

<style scoped>
.small-text {
    font-size: 14px;
}
.product-box {
    border: 1px solid #cccccc;
    padding: 10px 15px;
}
.hero-section {
    background: #ababab;
    height: 20vh;
    align-items: center;
    margin-bottom: 20px;
}

.title {
    font-size: 60px;
    color: #ffffff;
}
</style>
