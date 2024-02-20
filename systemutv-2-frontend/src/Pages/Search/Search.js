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
            console.log(data)
            setFlowers(data.data);
        } catch (error) {
            console.error("Error fetching flowers:", error);
            setFlowers([]);
        }
    };

    // Render flowers in the search result panel
    const renderFlowers = () => {
        return (
            <div className="flowers-grid">
        {flowers.map((flower, index) => (
            <Flower
                key={index}
                image={flower.image_url}
                commonName={flower.common_name}
                scientificName={flower.scientific_name}
                info={
                    <>
                        <span className="info-title">Genus: </span>{flower.genus}<br />
                        <span className="info-title">Scientific Name: </span>{flower.scientific_name}<br />
                        <span className="info-title">Family Common Name: </span>{flower.family}
                    </>
                }
            />
        ))}
            </div>
        );
    };


    return (
        <div className="search">
            <Navbar />
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

                <div className="search-result-panel">
                    {flowers.length > 0 ? renderFlowers() : <p>No results to display</p>}
                </div>
            </div>
        </div>
    );


}
export default Search;