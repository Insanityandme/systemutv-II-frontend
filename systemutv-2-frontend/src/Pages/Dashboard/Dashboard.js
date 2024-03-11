import './Dashboard.css';
import Navbar from "../../Navbar";
import Flower from "./Flower";
import FlowerWithoutImage from "./FlowerWithoutImage";
import {useNavigate} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Notification from "../../Notification";

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('option1');
    const [originalFlowers, setOriginalFlowers] = useState([]);
    const [flowers, setFlowers] = useState([]);
    const [fact, setFact] = useState();
    const [errorText, setErrorText] = useState('');
    const [areImagesHidden, setAreImagesHidden] = useState(false);

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
            setOriginalFlowers(data);
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

    const waterPlant = (id, date) => {
        setFlowers(prevFlowers => prevFlowers.map(flower => 
            flower.id === id ? { ...flower, lastWatered: date } : flower
        ));
        setOriginalFlowers(prevOriginalFlowers => prevOriginalFlowers.map(flower => 
            flower.id === id ? { ...flower, lastWatered: date } : flower
        ));
    };

    // update all plants by watering them using fetch
    const waterAllPlants = async() => {
        const userId = sessionStorage.getItem('userId');
        const url = `http://localhost:7002/v1/users/${userId}/plants`;
        const date = new Date().toISOString().slice(0, 10);
    
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lastWatered: date
                })
            });
    
            if (response.ok) {
                flowers.forEach(flower => waterPlant(flower.id, date));
            } else {
                console.log(response.statusMessage);
                console.log(await response.text())
                // setErrorText(response.statusMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // water a single plant
    // Requirement F.UI.12
    const waterSinglePlant = async (plantId, date) => {
        const selectedDate = new Date(date);
        const currentDate = new Date();
    
        selectedDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
    
        // check to see that the user doesn't pick a date in the future
        if (selectedDate > currentDate) {
            alert("The selected date is in the future. Please select a valid date.");
            return;
        }
    
        const userId = sessionStorage.getItem('userId');
        const url = `http://localhost:7002/v1/users/${userId}/plants/${plantId}`;
    
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastWatered: date
            }) 
        });
    
        if (response.ok) {
            waterPlant(plantId, date);
        } else {
            console.log(response.statusMessage);
            console.log(await response.text());
            // setErrorText(response.statusMessage);
        }  
    }

    // Requirement F.UI.14
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    
        if (e.target.value === "Watered") {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 8);
    
            setFlowers(originalFlowers.filter(flower => {
                const lastWatered = new Date(flower.lastWatered);
                return lastWatered >= oneWeekAgo;
            }));
        } else if (e.target.value === "NotWatered") {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 8);
    
            setFlowers(originalFlowers.filter(flower => {
                const lastWatered = new Date(flower.lastWatered);
                return lastWatered < oneWeekAgo;
            }));
        } else {
            setFlowers(originalFlowers);
        }
    };

    const showFlowers = () => {
        return (
            <div className="flowers-grid">
                {flowers.map((flower, index) => {
                    if (areImagesHidden) {
                        return (
                            <FlowerWithoutImage
                                id={flower.id}
                                key={index}
                                nickname={
                                  <>
                                    <b>Name:</b> {flower.nickname}
                                  </>
                                }
                                lastWatered={
                                    <>
                                        <b>Last watered</b> {flower.lastWatered} {daysSince(flower.lastWatered)} days ago
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
                                waterSinglePlant={(plantId, dateValue) => waterSinglePlant(plantId, dateValue)}
                                showDeleteButton={true}
                            />
                        );
                    } else {
                        return (
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
                                    <>
                                        <b>Last watered</b><br/>
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
                                waterSinglePlant={(plantId, dateValue) => waterSinglePlant(plantId, dateValue)}
                                showDeleteButton={true}
                            />
                        );
                    }
                })}
            </div>
        );
    };

    const toSearch = () =>{
        navigate('/search');
    }

    const getUnwateredPlants = () => {
        const eightDaysAgo = new Date();
        eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);
    
        return flowers.filter(plant => new Date(plant.lastWatered) < eightDaysAgo);
    };

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
                            <button onClick={() => setAreImagesHidden(false)}>Expand all</button>
                            <button onClick={() => setAreImagesHidden(true)}>Collapse all</button>
                            <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
                                <option value="Default">All plants</option>
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
                                        {getUnwateredPlants().map((plant, index) => (
                                            <p key={index}>{plant.nickname} needs water!</p>
                                        ))}
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