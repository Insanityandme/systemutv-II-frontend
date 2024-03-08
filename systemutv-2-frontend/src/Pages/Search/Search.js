import './Search.css';
import Flower from "../Dashboard/Flower";
import Navbar from "../../Navbar";
import React, {useState} from "react";
import Notification from "../../Notification";


const Search = () => {
    const [filter, setFilter] = useState('common');
    const [searchTerm, setSearchTerm] = useState('');
    const [flowers, setFlowers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFlower, setSelectedFlower] = useState(null);
    const [operationMessage, setOperationMessage] = useState('');
    const [isOperationSuccess, setIsOperationSuccess] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleSelectChange = (e) => {
        setFilter(e.target.value);
    }

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const NicknameModal = ({ isOpen, onClose, onSubmit }) => {
        const [nickname, setNickname] = useState('');

        if (!isOpen) return null;

        return (
            <div className="modal-backdrop">
                <div className="nickname-modal">
                    <h1>Enter a Nickname</h1>
                    <input
                        type="text"
                        placeholder="Nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <button onClick={() => onSubmit(nickname)}>Submit</button> {/* Use nickname from state */}
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        );
    };

        const fetchFlowers = async () => {
            const trimmedSearchTerm = searchTerm.trim();
            if (!trimmedSearchTerm) {
                setOperationMessage("Please enter a plant name.");
                return;
            }

            try {
                const response = await fetch(`http://localhost:7002/v1/plants?plant=${encodeURIComponent(searchTerm)}`);
                if (!response.ok) {
                    const errorText = await response.text();
                    setErrorText(errorText);
                }
                const data = await response.json();
                setFlowers(data.data);
                setOperationMessage('');
            } catch (error) {
                setFlowers([]);
                setErrorText(error.message);
            }
        };

    const handleAddClick = (flower) => {
        setSelectedFlower(flower);
        setIsModalOpen(true);
    };

    // New function to add a plant to a user
    const addPlantToUser = async (nickname) => {
        let userId;

        try {
            userId = sessionStorage.getItem('userId');
        } catch (error) {
            setErrorText(error.message);
            console.error("User ID is not available");
        }

        if (!selectedFlower) {
            console.error("No flower selected to add");
            setErrorText("No flower selected to add");
            return;
        }
        // Format current date as yyyy-MM-dd
        const today = new Date();
        const lastWatered = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        const payload = {
         //   ...selectedFlower,
            id: selectedFlower.id, // Needs to be fixed
            commonName: selectedFlower.common_name || "N/A",
            scientificName: selectedFlower.scientific_name || "N/A",
            family: selectedFlower.family || "N/A",
            imageURL: selectedFlower.image_url || "N/A",
            nickname: nickname,
            lastWatered: lastWatered,
            waterFrequency: 0,
            genus: selectedFlower.genus || "N/A",
            light: 0,
        };

        // console.log("Sending payload to server:", payload);

        try {
            const response = await fetch(`http://localhost:7002/v1/users/${userId}/plants`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setOperationMessage("Plant added successfully!");
                setIsOperationSuccess(true);
            } else if (response.status === 409) {
                setOperationMessage("A plant with that nickname already exists.");
                setIsOperationSuccess(false);

                const errorText = await response.text();
                setErrorText(errorText);
            } else {
                setOperationMessage("Failed to add plant due to an unexpected error.");
                setIsOperationSuccess(false);
            }
        } catch (error) {
            setErrorText(error.message);
        }
    };

        // Render flowers in the search result panel
        const renderFlowers = () => {
            return (
                <div className="flowers-grid">
                    {flowers.map((flower, index) => (
                        <Flower
                            id={flower.id}
                            key={index}
                            image={flower.image_url}
                            nickname={flower.common_name}
                            lastWatered={flower.scientific_name}
                            info={
                                <>
                                    <span className="info-title">Genus: </span>{flower.genus}<br/>
                                    <span className="info-title">Scientific Name: </span>{flower.scientific_name}<br/>
                                    <span className="info-title">Family Common Name: </span>{flower.family}
                                </>
                            }
                            addPlantToUser={() => handleAddClick(flower)}
                            isSearching={true}
                        />
                    ))}
                </div>
            );
        };

        return (
            <div className="search">
                { errorText ?
                  <Notification
                    text={errorText}
                  />
                  :
                  null
                }
                <Navbar/>
                <div className="main-panel-search">
                    <div className="search-buttons">
                        <input
                            placeholder="Search plant here"
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                        <button onClick={fetchFlowers}>Search</button>
                        <select id="dropdown" value={filter} onChange={handleSelectChange}>
                            <option value="common">Common name</option>
                            <option value="scientific">Scientific name</option>
                        </select>
                    </div>

                    <div className="operation-message" style={{color: isOperationSuccess ? 'green' : 'red'}}>
                        {operationMessage}
                    </div>


                    <div className="search-result-panel">
                        {flowers.length > 0 ? renderFlowers() : <p>No results to display</p>}
                    </div>
                </div>
                <NicknameModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={(nickname) => {
                        addPlantToUser(nickname);
                        setIsModalOpen(false);
                    }}
                />
            </div>

        );

}
export default Search;