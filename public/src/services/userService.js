import axios from "../setup/axios";

const registerService = (data) => {
    return axios.post("api/auth/register", data);
};
const loginService = (data) => {
    return axios.post("api/auth/login", data);
};
export { registerService ,loginService};
