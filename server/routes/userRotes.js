import express from "express";
import { loginController, registerController } from "../controllers/useController.js";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/");
    router.post("/api/auth/register", registerController);
    router.post("/api/auth/login", loginController);

    return app.use("/", router);
};

export default initWebRoutes;
