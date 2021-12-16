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
   const [newUserProfile, setNewUserProfile] = useState('');
   const [notification, setNotification] = useState('');

   useEffect(() => {
       if(loggedIn) {
       setNotification('Double-tap to like post');
       setTimeout(() => {
           setNotification('')
       },3000)
       }
   },[loggedIn])

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
   useEffect(() => {
    let pics = [
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80',
        'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80',
        'https://images.unsplash.com/photo-1635977725886-0aab77b701c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80'
    ];
    let num = Math.floor(Math.random() * 3);
    setNewUserProfile(pics[num]);
   },[])


   return (
       <userContext.Provider value={{
           currentUser,
           setCurrentUser,
           loggedIn,
           newUserProfile,
           tab,
           setTab,
           notification,
           setNotification,
           anotherUser,
           setAnotherUser,
           userProfile,
           setUserProfile
       }}>
           {children}
       </userContext.Provider>
   )
};

