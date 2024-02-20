import './Settings.css';
import Navbar from "../../Navbar";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
const Settings = () => {

    const [notifications, setNotifications] = useState(false);
    const [facts, setFacts] = useState(false);
    const [deleteAcc, setDeleteAcc] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleNot = (e) => {
        setNotifications(!notifications);
    }
    const handleFun = (e) => {
        setFacts(!facts);
    }
    const handleDel = (e) => {
        setDeleteAcc(!deleteAcc);
    }
    const handleLogOut = (e) => {
        navigate('/');
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const deleteUserById = async () => {
        const userId = sessionStorage.getItem('userId');
        const url = `http://localhost:7002/v1/users/${userId}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Sending password for verification, ensure backend supports this!
                body: JSON.stringify({ password: password }),
            });

            if (response.status === 204) {
                alert("Account successfully deleted.");
                navigate('/');
            } else {
                alert("Error deleting account.");
            }
        } catch (error) {
            alert("Network error: " + error.message);
        }
    };


    return (
        <div className={"profile"}>
            <Navbar/>
            <div className={"main-panel-profile"}>
                <div className={"profile-container"}>
                    <div className={"profile-info"}>
                        <div className={"profile-picture"}>Profile picture</div>
                        {/*with click on profile picture it can be changed*/}
                        <h2>Your name</h2>
                        <button onClick={handleLogOut}>Log out</button>
                    </div>

                    <div className={"settings-buttons"}>
                        <button onClick={handleNot}>{notifications ? "Notifications on" : "Notifications off"}</button>
                        <button onClick={handleFun}>{facts ? "Facts on" : "Facts off"}</button>
                        <button className={"delete-acc-button"} onClick={handleDel}>Delete account</button>
                        {deleteAcc ?
                            <div className={"delete-notification"}>
                                <h1>Are you sure?</h1>
                                <input type={"password"} placeholder={"Enter your password to confirm"} onChange={handlePasswordChange}/>
                                <button className={"delete-acc-button"} onClick={deleteUserById}>Delete Account</button>
                                <h2>Changed your mind?</h2>
                                <button onClick={handleDel}>Close</button>
                            </div>
                            :
                            <div>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};
export default Settings;