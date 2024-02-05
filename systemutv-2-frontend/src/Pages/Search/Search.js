import './Search.css';
import Navbar from "../../Navbar";
import {useState} from "react";

const Search = () => {

    const [filter, setFilter] = useState('');

    const handleSelectChange = (e) => {
        setFilter(e.target.value);
    }

    return (
        <div className={"search"}>
            <Navbar/>
            <div className={"main-panel-search"}>
                <div className={"search-buttons"}>
                    <input placeholder={"Search text here"}/>
                    <button>Search</button>
                    <select id="dropdown" value={filter} onChange={handleSelectChange}>
                        <option value="common">Common name</option>
                        <option value="scientific">Scientific name</option>
                    </select>
                </div>

                <div className={"search-result-panel"}>
                    <h2>I am flower</h2>
                </div>

            </div>
        </div>
    );
}
export default Search;