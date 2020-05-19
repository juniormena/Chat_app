import React from 'react';
import ReactEmoji from 'react-emoji';
import './Message.css';

const Message = ({message:{user,text},name})=> {
    let isSentByCurrentUser = false;
    const trinnedName = name.trim().toLowerCase();

    if(user=== trinnedName){
        isSentByCurrentUser=true
    }
    return (
        isSentByCurrentUser ?(
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{trinnedName}</p>
                <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        ):(
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                <p className="messageText colorDark">{text}</p>
            </div>
            <p className="sentText pl-10">{user}</p>
            </div>
        )
    )
}

export default Message;