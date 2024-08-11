import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUserService } from "../services/userService";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
import { host } from "../utils/APIRoutes";

const Chat = () => {
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const socket = useRef();
    useEffect(() => {
        const checkUser = async () => {
            const user = sessionStorage.getItem("chat-app-user");
            if (!user) {
                navigate("/login");
            } else {
                setCurrentUser(JSON.parse(user));
                setIsLoaded(true);
            }
        };

        checkUser();
    }, [navigate]);
    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);
    useEffect(() => {
        const fetchCurrentUser = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const data = await allUserService(currentUser._id);
                    setContacts(data.data.users);
                } else {
                    navigate("/setAvatar");
                }
            }
        };
        fetchCurrentUser();
    }, [currentUser, navigate]);
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };
    return (
        <>
            <Container>
                <div className="container">
                    <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                    {isLoaded && currentChat === undefined ? (
                        <Welcome currentUser={currentUser} />
                    ) : (
                        <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}  />
                    )}
                </div>
            </Container>
        </>
    );
};

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`;
export default Chat;
