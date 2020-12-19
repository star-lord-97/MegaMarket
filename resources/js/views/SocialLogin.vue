<template>
    <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Logging with {{ this.$route.params.provider }}, please wait :^]
        </h2>
    </div>
</template>

<script>
import axios from "axios";
import User from "../apis/User";

export default {
    data() {
        return {};
    },

    mounted() {
        axios
            .get(
                "https://megamarket0.herokuapp.com/api/auth/" +
                    this.$route.params.provider +
                    "/callback?code=" +
                    this.$route.query.code
            )
            .then(response => {
                this.$store.commit("LOGIN", true);
                localStorage.setItem("token", response.data);
                User.auth().then(res => {
                    localStorage.setItem("isAdmin", res.data.is_admin);
                    if (localStorage.getItem("isAdmin") === "true") {
                        this.$store.commit("ADMIN", true);
                        this.$router.push("/admin");
                    } else {
                        this.$store.commit("ADMIN", false);
                        this.$router.push("/dashboard");
                    }
                });
            });
    }
};
</script>
