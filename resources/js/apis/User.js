import axiosInstanceWithToken from "./Api";

export default {
    register(credentials) {
        return axiosInstanceWithToken().post("/register", credentials);
    },

    login(credentials) {
        return axiosInstanceWithToken().post("/login", credentials);
    },

    auth() {
        return axiosInstanceWithToken().get("/user");
    },

    logout() {
        return axiosInstanceWithToken().post("/logout");
    }
};
