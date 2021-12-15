import React, { useContext } from 'react';

import Login from './components/Login/login';
import Header from './components/header';
import Posts from './components/Post/posts';
import Form from './components/Form/Form';
import Profile from './components/profile/profile';
import { userContext } from './context/userContext';
import Navbar from './components/navbar/navbar';

const App = () => {
    const { loggedIn, tab } = useContext(userContext);

    return (
        <div >{ !loggedIn ? (
            <Login />
        )
        : (
            <>
          {tab === "home" && (
              <>
              <Header />
              <Posts />
              </>
          )}
          {tab === "form" && (
            <Form />
          )}
          {
              tab === "profile" && (
                  <Profile />
              )
          }
                    <Navbar />
        </>)}

        </div>
    )
}

export default App
