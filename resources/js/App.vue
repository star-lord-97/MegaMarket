<template>
    <div id="appVue" class="container mx-auto">
        <Navbar></Navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
    components: {
        Navbar
    },

    mounted() {
        this.$store.commit("LOGIN", !!localStorage.getItem("token"));
    }
};
</script>

<style>
#appVue {
    font-family: "Work Sans", sans-serif;
}
</style>
