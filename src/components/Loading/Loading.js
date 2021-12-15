import React, {useContext, useState, useEffect} from 'react';
import './loading.css';
import { userContext } from "../../context/userContext"

const Loading = () => {
    const { currentUser } = useContext(userContext);
    const [ greet, setGreet] = useState('')
   
    useEffect(() => {
        const d = new Date();
    
        const now = d.getHours();
        if(now <= 11) {
            setGreet("Good Morning")
        } else if(now > 11 && now <= 16) {
            setGreet("Good Afternoon")
        } else if(now > 16 && now <= 19) {
            setGreet("Good Evening")
        } else {
            setGreet("Good Night")
        }
    },[])

    return (
        <div className="loading">
            <p>{greet} <span>{currentUser.userName}!</span></p>
            <p>Please wait while we are fetching your feeds...</p>
            <div className="Anim"></div>
        </div>
    )
}

export default Loading
