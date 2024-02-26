import './Dashboard.css';
import Navbar from "../../Navbar";
import Flower from "./Flower";
import {useNavigate} from "react-router-dom";
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('option1');
    const [flowers, setFlowers] = useState([]);
    const [fact, setFact] = useState();

    // create a function that takes in a date and returns the number of days since that date
    const daysSince = (date) => {
        const now = new Date();
        const then = new Date(date);
        const diff = now - then;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

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
                        nickname={
                          <>
                            <b>Name</b><br/>
                            {flower.nickname}
                          </>
                        }
                        lastWatered={
                          <><b>Last watered</b><br/>
                            {flower.lastWatered}<br/>
                            {daysSince(flower.lastWatered)} days ago
                            </>
                        }
                        info={
                            <>
                                <span className="info-title">Genus: </span>{flower.genus}<br/>
                                <span className="info-title">Family</span>{flower.family}<br/>
                                <span className="info-title">Scientific Name: </span>{flower.scientificName}<br/>
                                <span className="info-title">Family Common Name: </span>{flower.commonName}
                            </>
                        }
                        deletePlant={deletePlant}
                        showDeleteButton={true}
                    />
                ))}
            </div>
        );
    };

    const toSearch = () =>{
        navigate('/search');
    }

    const deletePlant = async (plantId) => {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
            console.error("User ID not found in sessionStorage");
            return;
        }
        try {
            const response = await fetch(`http://localhost:7002/v1/users/${userId}/plants/${plantId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                 new Error(`Error deleting plant: ${response.statusText}`);
            }

            setFlowers(flowers.filter(flower => flower.id !== plantId)); // Needs to be fixed
        } catch (error) {
            console.error("Failed to delete plant:", error);
        }
    };

    useEffect(() => {
        const fetchFact = async () => {
            const funFactId = Math.floor(Math.random() * 42) + 1;
            const response = await fetch(`http://localhost:7002/v1/facts/${funFactId}`);
            const data = await response.json();
            setFact(data);
        };

        fetchFact();
    }, []);

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

                    {sessionStorage.getItem('notifications') === "false" &&
                      sessionStorage.getItem('funFacts') === "false" ? null :
                      <>
                          <div className={"side-panel"}>
                              {sessionStorage.getItem('notifications') === "true" ?
                                <>
                                    <h2>Notifications</h2>
                                    <div className={"notification-panel"}>
                                        <p>You need to water plants!</p>
                                        <p>Man, they will die</p>
                                        <p>Last chance!</p>
                                    </div>
                                </>
                                :
                                null
                              }
                              {sessionStorage.getItem('funFacts') === "true" ?
                                <>
                                    <h2>Did you know that?</h2>
                                    <div className={"fun-fact-panel"}>
                                        <p>{fact}</p>
                                    </div>
                                </>
                                :
                                null
                              }
                          </div>
                      </>
                    }
                </div>
            </div>
        </div>
);
}
export default Dashboard;