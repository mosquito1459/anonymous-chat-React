// import logo from './logo.svg';
// eslint-disable-next-line
import './App.css';
import './chat.css'

import Sidebar          from './components/sidebar';
import Chat             from './components/chat';
import DisplayChange    from './components/displayChange';
import JoinRoom         from './components/JoinRoom';

import React, { useState, useEffect, useContext, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { UpdateUser , Connect } from './store/UserStore';
import { toggleWindow } from './store/WindowApp';
import { SetRoomData } from "./store/ChatStore"

import { CSSTransition } from 'react-transition-group';


// สร้าง Context สำหรับ WebSocket
const WebSocketContext = createContext();

// สร้าง custom hook สำหรับใช้งาน WebSocket
const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const store         = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    const connection = new WebSocket(url);

    connection.onopen = () => {
      console.log("Connected to WebSocket");
      connection.send(JSON.stringify({
        type : 'appChatConnect',
        uuid : localStorage.getItem("TOKEN") || null
      }))
    };

    connection.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      const userDisplay   = store.User.userDisplay

      if(data.type === "promiseResource") {
        
        dispatch(Connect({isConnect : true}))
        
        if(data.uuid){
          localStorage.setItem("TOKEN",data.uuid)
        }
        if(!userDisplay) {
          
          dispatch(toggleWindow({Window: "DisplayChange" , data: true}))
        }
        dispatch(UpdateUser({userUUID : (data.uuid || localStorage.getItem("TOKEN"))}))
      }else if(data.type === "chatMessageSend") {
        dispatch(SetRoomData({room: data.data.room,message : data.data.message}))
      }else if(data.type === "chatGetData") {
        dispatch(SetRoomData({room: data.data.room,message : data.data.message}))
      }
      
    };

    connection.onerror = (error) => {
      console.error("WebSocket Error", error);
    };

    connection.onclose = () => {
      console.log("WebSocket Connection Closed");
    };

    setSocket(connection);

    return () => {
      connection.close();
    };
  }, [url]);

  const send = (data) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
    }
  };

  return { socket, send };
}

// สร้าง component ที่ให้บริการ WebSocket ผ่าน Context
export const WebSocketProvider = ({ url, children }) => {
  const webSocket = useWebSocket(url);
  return (
    <WebSocketContext.Provider value={webSocket}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Hook สำหรับ components ที่ต้องการใช้ WebSocket
export const useWebSocketContext = () => {
  return useContext(WebSocketContext);
};


const App = () => {
  const store         = useSelector((state) => state)

  return (
    <WebSocketProvider url="">

      { store.Window.DisplayChange &&
        <DisplayChange/>
      }
      { store.Window.JoinRoom &&
        <JoinRoom/>
      }

      <CSSTransition nodeRef={null} in={store.User.isConnect} timeout={500} classNames="fadeIn">
        <div className='app' data-wait="fading">
          <Sidebar/>
          <Chat/>
        </div>
      </CSSTransition>
    </WebSocketProvider>
  );

}

export default App;
