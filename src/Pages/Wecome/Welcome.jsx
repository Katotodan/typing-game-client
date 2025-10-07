import {useState, useContext, useEffect} from "react";
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
    const [isBtnClickable, setIsBtnClickable] = useState(true)

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

    const checkUsernameAndAvatar = (e) =>{
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
        // Make the button clickable again
        setIsBtnClickable(true)
    }

    const goOnline = async (e) =>{
        // Make the button not clickable
        setIsBtnClickable(false)
        // Is server awake?     
        if(!isServerAwake){
            setDisplayMessage(true)
            setTimeout(() => {
                setDisplayMessage(false)
                checkUsernameAndAvatar(e)
            }, 2000);
        }else{
            checkUsernameAndAvatar(e)
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
                    {!isServerAwake ? "Waking up the server, please wait..." :(
                        <>
                            {/* Are the username and avatar missing? */}
                            {
                                (!currentUser && !currentUserImg) ? "Add username and select your avatar please!!!"
                                : !currentUser ? "Add username please!!!"
                                : !currentUserImg ? "Select your avatar please!!!"
                                : ""
                            }
                        </>
                    )} 
                </p>}   
            </div>
            
            
            <button type="button" onClick={goOnline} className="goOnline-btn" disabled={!isBtnClickable}>
                {isBtnClickable ? 'See online combetitors' : 'Loading...'}
            </button>
            {displayOnlineUsers && <Navigate to="/request"/>}   
        </div>
    )
}