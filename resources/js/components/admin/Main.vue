<template>
    <div class="row">
        <div
            class="col-md-4 product-box d-flex align-content-center justify-content-center flex-wrap big-text"
        >
            <button>Orders ({{ ordersCount }})</button>
        </div>
        <hr />
        <div
            class="col-md-4 product-box d-flex align-content-center justify-content-center flex-wrap big-text"
        >
            <button>Products ({{ productsCount }})</button>
        </div>
        <div
            class="col-md-4 product-box d-flex align-content-center justify-content-center flex-wrap big-text"
        >
            <button>Users ({{ usersCount }})</button>
        </div>
    </div>
</template>

<script>
import axiosInstanceWithToken from "../../apis/Api";

export default {
    data() {
        return {
            ordersCount: 0,
            productsCount: 0,
            usersCount: 0
        };
    },
    mounted() {
        axiosInstanceWithToken()
            .get("/users")
            .then(response => (this.usersCount = response.data.total));
        axiosInstanceWithToken()
            .get("/products")
            .then(response => (this.productsCount = response.data.total));
        axiosInstanceWithToken()
            .get("/orders")
            .then(response => (this.ordersCount = response.data.total));
    }
};
</script>

<style scoped>
.big-text {
    font-size: 28px;
}

.product-box {
    border: 1px solid #cccccc;
    padding: 10px 15px;
    height: 20vh;
}
</style>
