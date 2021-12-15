import React , {useContext} from 'react';
import "./navbar.css";
import { userContext } from '../../context/userContext';

const Navbar = () => {

    const { tab, setTab } = useContext(userContext);

    return (
        <div className="navbar">
            <div className="tab" onClick={() => setTab('home')} ><span className={tab === "home" ? "material-icons" : "material-icons-outlined"}>home</span></div>
            <div className="tab" onClick={() => setTab('form')} ><span className={tab ==="form" ? "material-icons" : "material-icons-outlined"}>add_box</span></div>
            <div className="tab" onClick={() => setTab('profile')} ><span className={tab === "profile" ? "material-icons" : "material-icons-outlined"}>person</span></div>
        </div>
    )
}

export default Navbar;
