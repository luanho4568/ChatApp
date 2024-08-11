import Message from "../models/messageModel.js";
import { addMessageService, getAllMessageService } from "../services/messageService.js";

const addMessageController = async (req, res) => {
    try {
        const data = req.body;
        const messData = await addMessageService(data);
        return res.status(200).json({
            msg: messData.msg,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error server controller response",
        });
    }
};
const getAllMessageController = async (req, res) => {
    try {
        const data = req.body;
        const messData = await getAllMessageService(data);
        return res.status(200).json({
            projectedMessages: messData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error server controller response",
        });
    }
};
export { addMessageController, getAllMessageController };
