// Components/NavBar.js
import { NavLink } from 'react-router-dom';
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Search from "./Pages/Search/Search";
import Settings from "./Pages/Settings/Settings";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </li>

                <li>
                    <NavLink to="/search">Search</NavLink>
                </li>

                <li>
                    <NavLink to="/settings">Settings</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;