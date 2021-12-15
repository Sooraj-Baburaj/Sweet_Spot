import React, {useState, createContext, useEffect} from "react";
import { getUser } from "../api/userApi";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [tab,setTab] = useState("home");

   const [currentUser, setCurrentUser] = useState({});

   const [loggedIn,setIsLoggedIn] = useState(false);

   const [anotherUser, setAnotherUser] = useState(false);

   const [userProfile,setUserProfile] = useState({
       following: [],
       followers: []
   });

   useEffect(() => {
       if(localStorage.getItem("user") != null) {
           const data = localStorage.getItem("user");
           const user = JSON.parse(data);
           const getCurrUser = async() => {
               await getUser(user._id)
               .then(res => setCurrentUser(res.data))
           }
           getCurrUser()
           setIsLoggedIn(true)
       }
   }, []);


   return (
       <userContext.Provider value={{
           currentUser,
           setCurrentUser,
           loggedIn,
           tab,
           setTab,
           anotherUser,
           setAnotherUser,
           userProfile,
           setUserProfile
       }}>
           {children}
       </userContext.Provider>
   )
};

