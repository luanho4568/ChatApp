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
        user.password = undefined;
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

const loginService = async (data) => {
    try {
        const { username, password } = data;
        const user = await User.findOne({ username });
        if (!user) {
            return {
                msg: "Incorrect username or password",
                status: false,
            };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                msg: "Incorrect username or password",
                status: false,
            };
        }
        user.password = undefined;
        return {
            msg: "User login successfully",
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
export { registerService, loginService };
