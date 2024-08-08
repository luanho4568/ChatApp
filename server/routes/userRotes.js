import express from "express";
import { registerController } from "../controllers/useController.js";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/");
    router.post("/api/auth/register", registerController);

    return app.use("/", router);
};

export default initWebRoutes;
