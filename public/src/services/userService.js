import axios from "../setup/axios";

const registerService = async (data) => {
    return await axios.post("api/auth/register", data);
};
const loginService = async (data) => {
    return await axios.post("api/auth/login", data);
};
const setAvatarService = async (user_id, image) => {
    return await axios.post(`api/auth/setAvatar/${user_id}`, image);
};
const avatarRandomService = async () => {
    const api = `https://api.multiavatar.com/${Math.round(Math.random() * Math.random())}`;
    return await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
};

const allUserService = async (userId) => {
    return await axios.get(`api/auth/all-users/${userId}`);
};
export { registerService, loginService, setAvatarService, avatarRandomService, allUserService };
