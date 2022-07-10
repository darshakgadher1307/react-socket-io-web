import React, { useState } from "react";
import { io } from "socket.io-client";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Chat from "./Chat";

const socket = io.connect("http://localhost:5000");


const App = () =>{

    const [userName,setUsername] = useState("");
    const [room,setRoom] = useState("");
    const [showChat, setShowchat] = useState(false);

    const joinRoom = () => {
        if(userName !== "" && room !== ""){
            socket.emit("join_room",room);
            setShowchat(true);
        }
    }
    return(
        <>
            {!showChat ?        
            <div className="joinChatContainer">
                <h3>Join Chat</h3>
                <div class="form-group">
                    <input type="text" placeholder="Join..." onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Room ID...." onChange={(e)=>{setRoom(e.target.value)}}/>
                </div>
                <button type="button" onClick={joinRoom}>Join A Room</button>
            </div>
            :
            <Chat socket={socket} userName={userName} room={room}/>
            }
        </>
    );
}

export default App;