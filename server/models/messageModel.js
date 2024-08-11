import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        message: {
            text: { type: String, required: true },
        },
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const Message = mongoose.model("Messages", MessageSchema);
export default Message;
