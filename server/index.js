import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import initWebRoutes from "./routes/userRotes.js";

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
