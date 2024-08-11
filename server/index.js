import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import initWebRoutes from "./routes/apiRoutes.js";
import { Server } from "socket.io";

const app = express();

// use CORS
app.use(cors());

// convert to js type
app.use(express.json());

// init routes
initWebRoutes(app);

// connect db mg
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB connection successful !!!");
    })
    .catch((err) => console.log(err));

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT ${process.env.PORT}`);
});

const io = new Server(server, {
    // Sử dụng `new Server()` thay vì `socket()`
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
});
