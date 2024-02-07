import './Settings.css';
import Navbar from "../../Navbar";
import {useState} from "react";

const Settings = () => {

    const [notifications, setNotifications] = useState(false);
    const [facts, setFacts] = useState(false);
    const [deleteAcc, setDeleteAcc] = useState(false);

    const handleNot = (e) => {
        setNotifications(!notifications);
    }
    const handleFun = (e) => {
        setFacts(!facts);
    }
    const handleDel = (e) => {
        setDeleteAcc(!deleteAcc);
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
                        <button>Log out</button>
                    </div>

                    <div className={"settings-buttons"}>
                        <button onClick={handleNot}>{notifications ? "Notifications on" : "Notifications off"}</button>
                        <button onClick={handleFun}>{facts ? "Facts on" : "Facts off"}</button>
                        <button className={"delete-acc-button"} onClick={handleDel}>Delete account</button>
                        {deleteAcc ?
                            <div className={"delete-notification"}>
                                <h1>Man are you sure?</h1>
                                <input type={"password"} placeholder={"Write you password down for confirm"}/>
                                <button className={"delete-acc-button"}>Delete this shit</button>
                                <h2>Or you can close if you changed your mind</h2>
                                <button onClick={handleDel}>Yeah, you right</button>
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
}
export default Settings;