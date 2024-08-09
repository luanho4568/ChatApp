import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginService } from "../services/userService";

const Login = (props) => {
    const navigate = useNavigate();
    const toastOptions = {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const defaultValues = {
        username: "",
        password: "",
    };
    const [values, setValues] = useState(defaultValues);

    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate("/");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = handleValidation();
        if (isValid) {
            const { username, password } = values;
            const { data } = await loginService({
                username,
                password,
            });
            console.log(data);

            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate("/");
            }
        }
    };
    const handleValidation = () => {
        const { username, password } = values;
        if (password === "") {
            toast.error("Email and password is required.", toastOptions);
            return false;
        } else if (username.length === "") {
            toast.error("Email and password is required.", toastOptions);
            return false;
        }
        return true;
    };
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    return (
        <>
            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="brand">
                        <h1>Login</h1>
                    </div>
                    <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
                    <button type="submit">Login</button>
                    <span>
                        Don't have an account ? <Link to="/register">Register.</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
};

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #3a346f;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #222;
        border-radius: 2rem;
        padding: 3rem 5rem;
    }
    input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
            border: 0.1rem solid #997af0;
            outline: none;
        }
    }
    button {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
            background-color: #4e0eff;
        }
    }
    span {
        color: white;
        text-transform: uppercase;
        a {
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold;
        }
    }
`;
export default Login;
