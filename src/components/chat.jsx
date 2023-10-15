import React, { useState,useRef,useEffect } from "react"
import { useWebSocketContext } from "../App"

import { useSelector } from 'react-redux'


const Chat = () => {

    const ChatStore     = useSelector((state) => state.Chat)
    const storeUser     = useSelector((state) => state.User)
    const chatBoxRef = useRef(null);
    
    const { send } = useWebSocketContext();

    const [message , setMessage] = useState("")
    const [inputKey, setInputKey] = useState(Math.random().toString());

    const sendMessage = () => {

        if(message.length === 0) {
            return false
        }
        console.log("SEND MESSAGE "+message);
        setMessage("")
        setInputKey(Math.random().toString());
        send({
            type : "appChatSendMessage",
            message : message,
            user : storeUser.userDisplay,
            room : ChatStore.ChatRoom
        })

    }


    const ChatList = (message) => {
        
        const convertStringToRGB = (str) => {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {

              hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }

            const r = (hash & 0xFF0000) >> 16;
            const g = (hash & 0x00FF00) >> 8;
            const b = hash & 0x0000FF;

            return `rgb(${r}, ${g}, ${b})`;
        }

        let listItems = null
        if(message) {
            listItems = message.map(message =>
                {
                    if(message.uuid === storeUser.userUUID) {
                        return (
                            <>
                                <div className="chat right" key={message.id}>
                                    <div className="message">
                                        <div className="name">{message.user}</div>
                                        <div className="inMessage">{message.message}</div>
                                    </div>
                                    <div className="profile">
                                        <div className="picture" style={{backgroundColor : convertStringToRGB(message.user)}} >
                                            {(message.user[0]).toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </>
                            
                        )
                    }else{
                        return (
                            <>
                                <div className="chat left" key={message.id}>
                                    <div className="profile">
                                        <div className="picture" style={{backgroundColor : convertStringToRGB(message.user)}}>
                                            {(message.user[0]).toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="message">
                                        <div className="name">{message.user}</div>
                                        <div className="inMessage">{message.message}</div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                }
            );
        }
        return (
            <>
                <div className="chatBox">
                    {listItems}
                    <div ref={chatBoxRef}></div>
                </div>
                <div className="chatInput">
                    <input type="text" name="chat" placeholder="พิมพ์ตรงนี้" key={inputKey} onChange={e => {setMessage(e.target.value)}} onKeyDown={event => {
                        if (event.key === 'Enter') {
                            sendMessage()
                        }
                    }}></input>
                    <button className="sendMessage" onClick={() => sendMessage()}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </>
            
        )
    }

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollIntoView({ behavior: 'instant', block: "end", inline: "nearest" });
        }
    }, [ChatList]);


    return (
        <div className="Chat">
            <div className="header">
                {ChatStore.ChatRoom}
            </div>
            <div className="body">
                { ChatStore.ChatRoom && ChatList(ChatStore.ChatData[ChatStore.ChatRoom])}
            </div>
        </div>
    )
}

export default Chat