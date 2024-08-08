import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: "http://localhost:8080/",
});

export default instance;
