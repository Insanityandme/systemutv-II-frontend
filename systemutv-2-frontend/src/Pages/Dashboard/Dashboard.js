import './Dashboard.css';
import Navbar from "../../Navbar";
import Flower from "./Flower";
import {useNavigate} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Notification from "../../Notification";

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('option1');
    const [flowers, setFlowers] = useState([]);
    const [fact, setFact] = useState();
    const [errorText, setErrorText] = useState('');

    // create a function that takes in a date and returns the number of days since that date
    const daysSince = (date) => {
        const now = new Date();
        const then = new Date(date);
        const diff = now - then;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    const fetchPlants = async () => {
        let userId;
        try {
            userId = sessionStorage.getItem('userId');
        } catch (e) {
            console.error("User ID not found in sessionStorage");
            return;
        }

        try {
            const response = await fetch(`http://localhost:7002/v1/users/${userId}/plants`);

            if (!response.ok) {
                const errorText = await response.text();
                console.log(errorText);
                // for future notifications
                // setErrorText(errorText);
            }
            const data = await response.json();
            // console.log(data);
            setFlowers(data);
        } catch (e) {
            // setErrorText(e.message);
            // console.log(e.statusMessage);
        }
    };

    const fetchFact = async () => {
        const funFactId = Math.floor(Math.random() * 42) + 1;
        const response = await fetch(`http://localhost:7002/v1/facts/${funFactId}`);
        const data = await response.json();
        setFact(data);
    };

    // Fetch all plants for the user
    useEffect(() => {
        fetchPlants().then(r => {
            // console.log("done fetching plants");
        });
        fetchFact().then(r => {
            // console.log("done fetching fact");
        });

        // console.log('i fire once if strictmode is false in index.js');
    }, []);

    // update all plants by watering them using fetch
    const waterAllPlants = async() => {
        const userId = sessionStorage.getItem('userId');
        const url = `http://localhost:7002/v1/users/${userId}/plants`;
        const date = new Date().toISOString().slice(0, 10);

        const response = fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastWatered: date
            })
        });

        response.then((e) => {
            if (e.ok) {
                const nextFlowers = flowers.map((flower) => {
                    flower.lastWatered = date;
                    return(flower)
                })
                setFlowers(nextFlowers);
            }
            else {
                console.log(e.statusMessage);
                console.log(e.text())
                // setErrorText(e.statusMessage);
            }
        })
    }

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
                 const errorText = await response.text();
                 setErrorText(errorText);
            }

            setFlowers(flowers.filter(flower => flower.id !== plantId)); // Needs to be fixed
        } catch (error) {
            setErrorText(error.message);
        }
    };

    return (
        <div className={"dashboard"}>
            { errorText ?
              <Notification
                text={errorText}
              />
              :
              null
            }
            <Navbar/>
            <div className={"main-panel-dashboard"}>

                <div className={"inner-dashboard-panel"}>

                    <div className={"my-plant"}>

                        <div className={"dashboard-buttons"}>
                            <button onClick={waterAllPlants}>Water all plants</button>
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
                                    <button style={{marginLeft: '35%'}} onClick={toSearch}>Go to search</button>
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
                                        <p>Placeholder notification!</p>
                                        <p>Placeholder notification 2</p>
                                        <p>Placeholder notification 3!</p>
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