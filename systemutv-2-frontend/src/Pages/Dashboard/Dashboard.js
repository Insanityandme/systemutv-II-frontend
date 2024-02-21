import './Dashboard.css';
import Navbar from "../../Navbar";
import Flower from "./Flower";
import {useNavigate} from "react-router-dom";
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('option1');
    const [flowers, setFlowers] = useState([]);

    // Fetch all plants for the user
    useEffect(() => {
        const fetchPlants = async () => {
            const userId = sessionStorage.getItem('userId');
            if (!userId) {
                console.error("User ID not found in sessionStorage");
                return;
            }
            try {
                const response = await fetch(`http://localhost:7002/v1/users/${userId}/plants`);

                if (!response.ok) {
                     new Error(`Error fetching plants: ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data);
                setFlowers(data);
            } catch (error) {
                console.error("Failed to fetch plants:", error);
            }
        };

        fetchPlants();
    }, []);

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const showFlowers = () => {
        return (
            <div className="flowers-grid">
                {flowers.map((flower, index) => (
                    <Flower
                        id={flower.id}
                        key={index}
                        image={flower.imageURL}
                        commonName={flower.commonName}
                        scientificName={flower.scientificName}
                        info={
                            <>
                                <span className="info-title">Genus: </span>{flower.genus}<br/>
                                <span className="info-title">Scientific Name: </span>{flower.scientificName}<br/>
                                <span className="info-title">Family Common Name: </span>{flower.commonName}
                            </>
                        }
                    />
                ))}
            </div>
        );
    };

    const toSearch = () =>{
        navigate('/search');
    }


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
                            {flowers.length === 0 ?
                                <div className={"pot"}>
                                    <button style={{marginLeft: '35%'}} onClick={toSearch}>press me</button>
                                </div>
                                :
                                showFlowers()
                            }
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