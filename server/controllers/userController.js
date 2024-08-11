import User from "../models/userModel.js";
import { getAllUserService, loginService, registerService } from "../services/userService.js";

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

const loginController = async (req, res) => {
    try {
        const data = req.body;
        const userData = await loginService(data);
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

const setAvatarController = async (req, res) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;

        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage,
            },
            { new: true }
        );
        return res.status(200).json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error server controller response",
        });
    }
};

const getAllUsersController = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = await getAllUserService(userId);
        return res.status(200).json({
            msg: userData.msg,
            users: userData.users,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error server controller response",
        });
    }
};
export { registerController, loginController, setAvatarController, getAllUsersController };
