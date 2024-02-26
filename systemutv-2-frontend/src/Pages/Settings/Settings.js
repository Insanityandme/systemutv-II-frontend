import './Settings.css';
import Navbar from "../../Navbar";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
const Settings = () => {
    // get the current state of notifications and fun facts from fetching the user data by id
    const getUserData = async () => {
        const userId = sessionStorage.getItem('userId');
        const url = `http://localhost:7002/v1/users/${userId}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('notifications', data.isNotificationsActivated);
                sessionStorage.setItem('funFacts', data.funFactsActivated);
            } else {
                alert("Error fetching user data.");
            }
        } catch (error) {
            alert("Network error: " + error.message);
        }
    }

    getUserData();
    const isNotificationsActive = sessionStorage.getItem('notifications');
    const isFunFactsActivated = sessionStorage.getItem('funFacts');

    const [notifications, setNotifications] = useState(isNotificationsActive);
    const [facts, setFacts] = useState(isFunFactsActivated);
    const [deleteAcc, setDeleteAcc] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleNot = async() => {
        const userId = sessionStorage.getItem('userId');
        const url = `http://localhost:7002/v1/users/${userId}`;

        if (notifications === "true") {
            setNotifications("false");
        } else if (notifications === "false") {
            setNotifications("true");
        }

        console.log(notifications);

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    notificationsActivated: notifications,
                }),
            });

            if (response.ok) {
                alert("Notifications updated successfully.");
            } else {
                alert("Error updating notifications.");
            }
        } catch (error) {
            alert("Network error: " + error.message);
        }

    }
    const handleFun = (e) => {
        setFacts(facts);
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

    const updateNotifications = async (isActive) => {
        const userId = sessionStorage.getItem('userId');
        const url = `http://localhost:7002/v1/users/${userId}`;
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    notificationsActivated: isActive,
                }),
            });

            if (response.ok) {
                alert("Notifications updated successfully.");
            } else {
                alert("Error updating notifications.");
            }
        } catch (error) {
            alert("Network error: " + error.message);
        }
    }


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
                        <button onClick={handleNot}>{notifications ? "Notifications off" : "Notifications on"}</button>
                        <button onClick={handleFun}>{facts ? "Facts off" : "Facts on"}</button>
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