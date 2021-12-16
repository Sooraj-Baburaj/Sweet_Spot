import React, {useContext} from 'react';
import {userContext} from '../context/userContext'

const Header = () => {
    const { notification } = useContext(userContext);
    return (
        <div className="header">
            <span className="material-icons">
            join_right
            </span>
            <div>
            Sweet Spot
            </div>
            <div className="notification" style={{opacity: !notification ? '0' : '1', left: !notification ? '-95%' : '0'}}><span className="material-icons">report</span>{notification}</div>
        </div>
    )
}

export default Header;
