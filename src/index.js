import React from 'react';
import ReactDOM from 'react-dom';
import  App from './App';
import './index.css';
import { UserProvider } from "./context/userContext";
import { PostProvider } from './context/postContext';


ReactDOM.render(<React.StrictMode>
                    <UserProvider>
                        <PostProvider>
                            <App />
                        </PostProvider>
                    </UserProvider>
                </React.StrictMode>, document.getElementById('root'));