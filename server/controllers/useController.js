import { registerService } from "../services/userService.js";

const registerController = async (req, res) => {
    try {
        const data = req.body;
        const userData = await registerService(data);
        return res.status(200).json({
            msg: userData.msg,
            status: userData.status,
            user: userData.user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error server controller response",
        });
    }
};

export { registerController };
