import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
const Welcome = ({ currentUser }) => {
    return (
        <Container>
            <img src={Robot} alt="" />
            <h1>
                Welcome, <span>{currentUser.username}!</span>
            </h1>

            <h3>Please select a chat to Start messaging.</h3>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    width: 100%;
    img {
        height: 20rem;
    }
    span {
        color: #4e0eff;
    }
`;
export default Welcome;
