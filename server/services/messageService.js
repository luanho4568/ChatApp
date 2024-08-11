import Message from "../models/messageModel.js";

const addMessageService = async (data) => {
    try {
        const { from, to, message } = data;
        const messData = await Message.create({
            message: { text: message },
            users: [from, to], // từ user - đến user
            sender: from, // ng gữi
        });
        if (!messData) {
            return {
                msg: "Failed to add message",
            };
        }
        return {
            msg: "Message added successfully",
        };
    } catch (error) {
        console.log(error);
        return {
            msg: "Error register service",
        };
    }
};

const getAllMessageService = async (data) => {
    try {
        const { from, to } = data;
        const messData = await Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });
        const projectedMessages = messData.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        return projectedMessages;
    } catch (error) {
        console.log(error);
        return {
            msg: "Error register service",
        };
    }
};
export { addMessageService, getAllMessageService };
