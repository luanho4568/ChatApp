import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const registerService = async (data) => {
    try {
        const { username, email, password } = data;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return {
                msg: "Username already used",
                status: false,
            };
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return {
                msg: "Email already used",
                status: false,
            };
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashPassword,
        });
        delete user.password;
        console.log(user);

        return {
            msg: "User registered successfully",
            status: true,
            user,
        };
    } catch (error) {
        console.log(error);
        return {
            msg: "Error register service",
        };
    }
};

export { registerService };
