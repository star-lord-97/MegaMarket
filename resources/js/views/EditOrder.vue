<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="order-box">
                    <img :src="this.product.image" :alt="this.product.name" />
                    <h2 class="title">{{ this.product.name }}</h2>
                    <p class="small-text text-muted float-left">
                        $ {{ this.updatedOrder.quantity * this.product.price }}
                    </p>
                    <p class="small-text text-muted float-right">
                        Available Units:
                        {{
                            this.product.units +
                                this.oldOrder.quantity -
                                this.updatedOrder.quantity
                        }}
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
                            v-model="updatedOrder.quantity"
                    /></label>
                </div>
                <br />
                <div>
                    <div>
                        <div class="row">
                            <label for="address" class="col-md-3 col-form-label"
                                >Delivery Address</label
                            >
                            <div class="col-md-9">
                                <input
                                    id="address"
                                    type="text"
                                    class="form-control"
                                    v-model="updatedOrder.address"
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
                            class="mb-4 mr-4 col-md-4 btn btn-sm btn-primary float-right"
                            @click="updateOrder"
                        >
                            Continue
                        </button>
                        <button
                            class="mb-4 ml-4 col-md-4 btn btn-sm btn-danger float-left"
                            @click="deleteOrder"
                        >
                            Delete order
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
    props: ["order_id"],

    data() {
        return {
            oldOrder: {},
            product: {},
            updatedOrder: {
                quantity: 1,
                address: ""
            },
            errors: []
        };
    },

    beforeMount() {
        axiosInstanceWithToken()
            .get(`/orders/${this.order_id}`)
            .then(response => {
                this.oldOrder = response.data;
                this.updatedOrder.quantity = response.data.quantity;
                this.updatedOrder.address = response.data.address;
                this.product = response.data.product;
            });
    },

    methods: {
        updateOrder() {
            axiosInstanceWithToken()
                .patch(`/orders/${this.order_id}`, this.updatedOrder)
                .then(response => this.$router.push("/confirmation"))
                .catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        },

        deleteOrder() {
            axiosInstanceWithToken()
                .delete(`/orders/${this.order_id}`)
                .then(response => this.$router.push("/dashboard"));
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
