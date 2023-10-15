import React from "react"

import { useSelector, useDispatch } from 'react-redux'
import { toggleWindow } from '../store/WindowApp';
import { UpdateUser } from '../store/UserStore';
import { ChangeChatRoom,ChatRoomCreate,SetRoomData } from "../store/ChatStore"
import { useWebSocketContext } from "../App"

import JoinRoom from "./JoinRoom";
import '../chat.css'


const Sidebar = () => {
    const storeUser             = useSelector((state) => state.User)
    const ChatStore             = useSelector((state) => state.Chat)
    const { socket, send }      = useWebSocketContext();
    const dispatch              = useDispatch()
    const ClickUpdateName       = () => {
        dispatch(toggleWindow({Window: "DisplayChange", data: true}))
        dispatch(UpdateUser({userDisplay: localStorage.getItem("userDisplay")}))
    }
    const ListChatRoom = () => {
        let chatList = JSON.parse(localStorage.getItem("ChatRoom")) || null
        let listItem = null
        if(chatList) {
            listItem = chatList.map(Chat => {
                return (

                    <div className='chat' onClick={() => JoinRoom(Chat.name)} data-room={Chat.name} key={Chat.name}>
                        <div className='header'>
                        </div>
                        <div className='name'>
                            {Chat.name}
                        </div>
                    </div>

                )
            }) 
        }

        return (
            <>
                {listItem}
            </>
        )
    }
    const CreateRoom = () => {
        dispatch(toggleWindow({Window: "JoinRoom", data: true}))
    }

    const JoinRoom = (room) => {
        dispatch(ChangeChatRoom({ChatRoom : room}))
        if(!ChatStore.ChatData[room]) {
            dispatch(ChatRoomCreate({room}))
            send({
                type : "appChatJoinRoom",
                user : storeUser.userDisplay,
                room
            })
        }
    }

    return (
        <div className='sidebar'>
            <div className='userAnonymusInfo' onClick={() => ClickUpdateName()}>
                <div className='picture'>
                    <img src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Detective.png' alt='Anonymous'></img>
                </div>
                <div className='name'>
                    {storeUser.userDisplay || "???"}
                </div>
            </div>
            <div className='chatRoom'>
                <div className='createRoom' onClick={() => CreateRoom()}>
                    <i className="fa-duotone fa-circle-plus"></i> <span>สร้างห้อง / เข้าร่วม</span>
                </div>
                <div className='list'>
                    {ListChatRoom()}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;