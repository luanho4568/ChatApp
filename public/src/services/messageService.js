import axios from "../setup/axios";

const sendMessageService = async (data) => {
    return await axios.post("api/message/addmsg", data);
};

const getAllMessageService = async (data) => {
    return await axios.post("api/message/getmsg", data);
};
export { sendMessageService ,getAllMessageService};
