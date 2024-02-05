import './Search.css';
import Navbar from "../../Navbar";
import {useState} from "react";

const Search = () => {

    const [filter, setFilter] = useState('No filter');

    const handleSelectChange = (e) => {
        setFilter()
    }

    return (
        <div className={"search"}>
            <Navbar/>
            <div className={"main-panel-search"}>
                <input/>
                <button>Search</button>
                <select id="dropdown" value={filter} onChange={handleSelectChange}>
                    <option value="default">All plants</option>
                    <option value="Watered">Watered</option>
                    <option value="NotWatered">Not watered</option>
                </select>

            </div>
        </div>
    );
}
export default Search;