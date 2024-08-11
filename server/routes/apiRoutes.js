import express from "express";
import {
    getAllUsersController,
    loginController,
    registerController,
    setAvatarController,
} from "../controllers/userController.js";
import { addMessageController, getAllMessageController } from "../controllers/messageController.js";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/");

    // user
    router.post("/api/auth/register", registerController);
    router.post("/api/auth/login", loginController);
    router.post("/api/auth/setAvatar/:id", setAvatarController);
    router.get("/api/auth/all-users/:id", getAllUsersController);

    // message
    router.post("/api/message/addmsg", addMessageController);
    router.post("/api/message/getmsg", getAllMessageController);

    return app.use("/", router);
};

export default initWebRoutes;
