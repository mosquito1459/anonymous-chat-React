import React,{ useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { toggleWindow } from "../store/WindowApp";
import { ChangeChatRoom } from "../store/ChatStore";


const JoinRoom = () => {

    const [ chatRoom,setChatRoom ]    = useState(null)
    const [ button,setButton]       = useState(false)

    const ChatStore = useSelector((state) => state.Chat)
    const dispatch      = useDispatch()

    const CloseDisplay = () => {
        dispatch(toggleWindow({Window: "JoinRoom" , data: false}))
    }

    const submitDisplay = (e) => {
        if(!chatRoom || chatRoom.length <= 3 || chatRoom.length >= 15) {
            return false
        }
        let _Room = JSON.parse(localStorage.getItem("ChatRoom")) || []
        _Room.push({name: chatRoom})
        localStorage.setItem("ChatRoom",JSON.stringify(_Room))
        dispatch(toggleWindow({Window: "JoinRoom", data: false}))
    }

    return (
        <div className="Window">
            <div className="application">

                <div className="close" onClick={() => CloseDisplay()}>
                    <i className="fa-solid fa-xmark"></i>
                </div>

                <div className="header">
                    Join Room
                </div>
                <div className="input">
                    <input type="text" placeholder="พิมพ์ตรงนี้" onChange={(e) => {
                        setChatRoom(e.target.value)
                        if(e.target.value.length <= 3 || e.target.value.length >= 15) {
                            setButton(false)
                        }else{
                            setButton(true)
                        }
                        }} />
                </div>
                <div className="item-center">
                    <button className={`btn-submit ${ !button && "disabled"}`} onClick={(e) => submitDisplay(e)}>
                        <i className="fa-duotone fa-right-to-bracket"></i> เข้าร่วม
                    </button>
                </div>
            </div>
        </div>
    )
}

export default JoinRoom