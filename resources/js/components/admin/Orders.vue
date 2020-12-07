<template>
    <div>
        <table class="table table-responsive table-striped">
            <thead>
                <tr>
                    <td></td>
                    <td>Product</td>
                    <td>Quantity</td>
                    <td>Cost</td>
                    <td>Delivery Address</td>
                    <td>is Delivered?</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-if="orders"
                    v-for="(order, index) in orders"
                    :key="order.id"
                >
                    <td>{{ ++index }}</td>
                    <td>{{ order.product.name }}</td>
                    <td>{{ order.quantity }}</td>
                    <td>
                        {{ order.quantity * order.product.price }}
                    </td>
                    <td>{{ order.address }}</td>
                    <td>
                        {{ order.is_delivered == 1 ? "Yes" : "No" }}
                    </td>
                    <td v-if="order.is_delivered == 0">
                        <button
                            :key="componentKey"
                            class="btn btn-success"
                            @click="deliver(order.id)"
                            @delivered="handleDelivered()"
                        >
                            Deliver
                        </button>
                    </td>
                    <td v-else="order.is_delivered == 1">
                        <button class="btn btn-success" disabled>
                            Delivered
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <pagination
            v-if="orders_pagination"
            :data="this.orders_pagination"
            @pagination-change-page="getResults"
            align="center"
        ></pagination>
    </div>
</template>

<script>
import axiosInstanceWithToken from "../../apis/Api";

export default {
    data() {
        return {
            orders: null,
            orders_pagination: null,
            componentKey: 0
        };
    },

    mounted() {
        this.getResults();
    },

    methods: {
        getResults(page = 1) {
            axiosInstanceWithToken()
                .get("/orders?page=" + page)
                .then(response => {
                    this.orders = response.data.data;
                    this.orders_pagination = response.data;
                });
        },

        deliver(order_id) {
            axiosInstanceWithToken()
                .patch(`/orders/${order_id}/deliver`)
                .then(this.$emit("delivered"));
        },

        handleDelivered() {
            this.componentKey += 1;
        }
    }
};
</script>
