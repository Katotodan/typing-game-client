import React, {useState, useContext, useEffect} from "react";
import { SelectAvatar } from "../../Components/Welcomes/SelectAvatar/SelectAvatar";
import { UserInfo } from "../../Components/Welcomes/UserInfo/UserInfo";
import { Navigate } from "react-router-dom";
import { UserNameContext, ImageUrlContext } from "../../Context";
import { socket } from "../../socket";
import "./welcome.css"
import axios from "axios";


export const Welcome = () =>{
    const [displayOnlineUsers, setDisplayOnlineUsers] = useState(false)
    const [displayMessage, setDisplayMessage] = useState(false)
    // Context
    const {currentUser} = useContext(UserNameContext)
    const {currentUserImg} = useContext(ImageUrlContext)
    const [isServerAwake, setIsServerAwake] = useState(false);

    // Wake the server up
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/wake-up`)
          .then(response => {
            setIsServerAwake(true);
          })
          .catch(error => {
            console.error('Error waking up the server:', error);
            setIsServerAwake(false);
          });
        
    }, []);

    const goOnline = () =>{
        if(currentUser && currentUserImg){
            // Go online too
            socket.connect()
            socket.emit("addUser" , {
                "username": currentUser,
                "userImg" : currentUserImg
            }, (response) => {
                if (response.status === "ok") {
                    setDisplayOnlineUsers(true) 
                } else {
                  console.error("Error from server:", response);
                }
              })
               
        }else{
            setDisplayMessage(true)
            setTimeout(() => {
                setDisplayMessage(false)
            }, 2000);
        }    
    }

    return(
        <div className="welcome-container">
            <h2>Welcome to Arcadia typing game</h2>
            <p>In a world where typing speed is power...</p>
            <UserInfo/>
            <SelectAvatar/>
            <div className="msgContainer">
                {displayMessage && <p className="msg">
                    {/* Are the username and avatar missing? */}
                    {(!currentUser && !currentUserImg) ? "Add username and select your avatar please!!!"
                    : !currentUser ? "Add username please!!!"
                    : !currentUserImg ? "Select your avatar please!!!"
                    : ""
                    }
                    
                </p>}
                {!isServerAwake && <p className="msg">Waking up the server, please wait...</p>}
            </div>
            
            <button type="button" onClick={goOnline} className="goOnline-btn">
                See online combetitors
            </button>
            {displayOnlineUsers && <Navigate to="/request"/>}   
        </div>
    )
}