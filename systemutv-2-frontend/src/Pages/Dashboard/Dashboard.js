import './Dashboard.css';
import Navbar from "../../Navbar";
import {useState} from "react";

const Dashboard = () => {

    const [selectedOption, setSelectedOption] = useState('option1');

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className={"dashboard"}>
            <Navbar/>
            <div className={"main-panel-dashboard"}>

                <div className={"inner-dashboard-panel"}>

                    <div className={"my-plant"}>

                        <div className={"dashboard-buttons"}>
                            <button>Water all plants</button>
                            <button>Expand all</button>
                            <button>Collapse all</button>
                            <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
                                <option value="default">All plants</option>
                                <option value="Watered">Watered</option>
                                <option value="NotWatered">Not watered</option>
                            </select>
                        </div>
                        <div className={"my-plant-panel"}>
                            <p>here will be my plants</p>
                        </div>
                    </div>

                    <div className={"side-panel"}>
                        <h2>Notifications</h2>
                        <div className={"notification-panel"}>
                            <p>You need to water plants!</p>
                            <p>I'm not joking</p>
                            <p>Man, fr</p>
                            <p>Man, please</p>
                            <p>Man, they will die</p>
                            <p>Mf, do it now!</p>
                            <p>Last chance!</p>
                            <p>I call the police</p>
                            <p>They coming</p>
                            <p>I farted under your pillow</p>
                            <p>I ate taco as well</p>

                        </div>
                        <h2>Did you know that?</h2>
                        <div className={"fun-fact-panel"}>
                            <p>Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default Dashboard;