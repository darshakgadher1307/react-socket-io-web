import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({socket,userName,room}) => {

    const [currentmsg,setCurrentmsg] = useState("");
    const [msglist,setMsglist] = useState([]);



    const sendMessage = async() => {
        if(currentmsg){
            const msgData = {
                room: room,
                author: userName,
                message: currentmsg,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            setMsglist((old)=>{
                return [...old,msgData]
            })
            await socket.emit("send_message",msgData);
            setCurrentmsg("");
        }
    }

    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            setMsglist((old)=>{
                return [...old,data]
            })
        })
    },[socket])
    return(
        <>
            <div className="chat-window">
                <div className="chat-header">
                    <p>Live Chat</p>
                </div>
                <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {msglist.map((msg)=>{
                        return (
                            <div className="message" id={userName === msg.author ? "other" : "you"}>
                                <div>
                                    <div className="message-content">
                                        <p>{msg.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p>{msg.time}</p>
                                        <p>{msg.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    </ScrollToBottom>
                </div>
                <div className="chat-footer">
                    <input type="text" placeholder="Hey..." value={currentmsg} onChange={(e)=>{setCurrentmsg(e.target.value)}} onKeyPress={(e)=>{e.key === "Enter" && sendMessage()}}/>
                    <button onClick={sendMessage}>&#9658;</button>
                </div>

            </div>
        </>
    );
}

export default Chat;