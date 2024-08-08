import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, min: 3, max: 20, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6 },
    isAvatarImageSet: { type: Boolean, default: false },
    avatarImage: { type: String, default: "" },
});
const User = mongoose.model("Users", userSchema);
export default User;
