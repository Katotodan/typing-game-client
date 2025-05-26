import React, {useContext, useEffect} from "react"
import { ImageUrlContext } from "../../../Context"
import "./selectAvatar.css"
import avartarSrc from "./avatarSrc.json"

export const SelectAvatar = () =>{
    const {currentUserImg, setCurrentUserImg} = useContext(ImageUrlContext)
    useEffect(()=>{setCurrentUserImg(null)}, [])
    const selectImg = (url)=>{
        if(currentUserImg !== url){
            setCurrentUserImg(url)
        }else{
            setCurrentUserImg("")
        }
        
    }
       
    const images = avartarSrc.map((element, index) =>{
        return(
            <button className="avatart-btn img-container" key={index} onClick={() => selectImg(element.url)}>
                <img src={element.url} key={index} 
                className="avatar-img" alt="Avatar img"
                onLoad={(e) => e.target.parentElement.classList.add("loaded")}/>
                {currentUserImg === element.url && <span className="selected">✔</span>}
            </button>
        )
    })    
    return (
        <div className="avatar-container">
            <h3>Select your Avatar</h3>
            <div className="avatar-img-container">{images}</div>
        </div>
    )
}