import './Search.css';
import Flower from "../Dashboard/Flower";
import Navbar from "../../Navbar";
import {useState} from "react";


const Search = () => {

    const [filter, setFilter] = useState('common');
    const [searchTerm, setSearchTerm] = useState('');
    const [flowers, setFlowers] = useState([]);

    const handleSelectChange = (e) => {
        setFilter(e.target.value);
    }

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const fetchFlowers = async () => {
        try {
            const response = await fetch(`http://localhost:7002/v1/plants/search?plant=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch flowers');
            }
            const data = await response.json();
            setFlowers(data.data);
        } catch (error) {
            console.error("Error fetching flowers:", error);
            setFlowers([]);
        }
    };

    // Render flowers in the search result panel
    const renderFlowers = () => {
        return flowers.map((flower, index) => (
            <Flower
                key={index}
                image={flower.image_url}
                commonName={flower.common_name}
                scientificName={flower.scientific_name}
                info={flower.synonyms}
            />
        ));
    };


    return (
        <div className="search">
            <Navbar />
            <div className="main-panel-search">
                <div className="search-buttons">
                    <input
                        placeholder="Search text here"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <button onClick={fetchFlowers}>Search</button>
                    <select id="dropdown" value={filter} onChange={handleSelectChange}>
                        <option value="common">Common name</option>
                        <option value="scientific">Scientific name</option>
                    </select>
                </div>

                <div className="search-result-panel">
                    {flowers.length > 0 ? renderFlowers() : <p>No results to display</p>}
                </div>

                <div className="search-result-panel">
                    {flowers.length > 0 ? (
                        flowers.map((flower, index) => (
                            <div key={index} className="flower-result">
                                <img src={flower.imageURL} alt={flower.commonName}
                                     style={{width: "100px", height: "100px"}}/>
                                <h3>{flower.commonName}</h3>
                                <p>{flower.scientificName}</p>
                            </div>
                        ))
                    ) : (
                        <p>No results to display</p>
                    )}
                </div>
            </div>
        </div>
    );


}
export default Search;