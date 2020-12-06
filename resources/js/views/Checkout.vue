<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="order-box">
                    <img :src="this.product.image" :alt="this.product.name" />
                    <h2 class="title">{{ this.product.name }}</h2>
                    <p class="small-text text-muted float-left">
                        $ {{ this.product.price * this.order.quantity }}
                    </p>
                    <p class="small-text text-muted float-right">
                        Available Units:
                        {{ this.product.units - this.order.quantity }}
                    </p>
                    <br />
                    <hr />
                    <label class="row"
                        ><span class="col-md-2 float-left">Quantity: </span
                        ><input
                            type="number"
                            name="units"
                            min="1"
                            :max="this.product.units"
                            class="col-md-2 float-left"
                            v-model="order.quantity"
                    /></label>
                </div>
                <br />
                <div>
                    <div v-if="!this.isLoggedIn">
                        <h2>You need to login to continue</h2>
                        <button
                            class="col-md-4 btn btn-primary float-left"
                            @click="login"
                        >
                            Login
                        </button>
                        <button
                            class="col-md-4 btn btn-danger float-right"
                            @click="register"
                        >
                            Create an account
                        </button>
                    </div>
                    <div v-if="this.isLoggedIn">
                        <div class="row">
                            <label for="address" class="col-md-3 col-form-label"
                                >Delivery Address</label
                            >
                            <div class="col-md-9">
                                <input
                                    id="address"
                                    type="text"
                                    class="form-control"
                                    v-model="order.address"
                                    required
                                />
                                <div class="text-center">
                                    <span
                                        class="text-red-700 font-bold"
                                        v-if="errors.address"
                                        >{{ errors.address[0] }}</span
                                    >
                                </div>
                            </div>
                        </div>
                        <br />
                        <button
                            class="col-md-4 btn btn-sm btn-success float-right"
                            v-if="isLoggedIn"
                            @click="placeOrder"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import axiosInstanceWithToken from "../apis/Api";
import { mapGetters } from "vuex";

export default {
    props: ["product_id"],

    data() {
        return {
            order: {
                address: "",
                quantity: 1,
                product_id: this.product_id
            },
            product: {},
            errors: []
        };
    },

    computed: {
        ...mapGetters(["isLoggedIn"])
    },

    mounted() {
        axios
            .get(`/api/products/${this.product_id}`)
            .then(response => (this.product = response.data));
    },

    methods: {
        login() {
            this.$router.push("/login");
        },

        register() {
            this.$router.push("/register");
        },

        placeOrder() {
            axiosInstanceWithToken()
                .post("/orders", this.order)
                .then(response => this.$router.push("/confirmation"))
                .catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        }
    }
};
</script>

<style scoped>
.small-text {
    font-size: 18px;
}
.order-box {
    border: 1px solid #cccccc;
    padding: 10px 15px;
}
.title {
    font-size: 36px;
}
</style>
