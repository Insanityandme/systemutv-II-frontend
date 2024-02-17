import './Search.css';
import Navbar from "../../Navbar";
import {useState} from "react";
import Flower from "../Dashboard/Flower";

const Search = () => {
  const [filter, setFilter] = useState('');
  const [plant, setPlant] = useState('');
  const [plants, setPlants] = useState([]);

  const handleValue = (e) => {
    setPlant(e.target.value);
  }

  const getPlants = () => {
    // create a fetch request based on the value and filter
    console.log(plant);
    fetch(`http://localhost:7002/v1/plants/search?plant=${plant}`,
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed');
    }).then(data => {
      console.log(data);
      setPlants(data);
      plants.push(data);
    });

  };

  const showFlowers = () => {
    return plants.map((plant) => {
      return (
        <div className={"pot"}>
          <Flower
            image={plant.image}
            commonName={plant.commonName}
            scientificName={plant.scientificName}
            info={plant.info}
          />
        </div>
      );

    })
  }
  const handleSelectChange = (e) => {
    setFilter(e.target.value);
  }

  return (
    <div className={"search"}>
      <Navbar/>
      <div className={"main-panel-search"}>
        <div className={"search-buttons"}>
          <input onChange={handleValue} placeholder={"Search text here"}/>
          <button onClick={getPlants}>Search</button>
          <select id="dropdown" value={filter} onChange={handleSelectChange}>
            <option value="common">Common name</option>
            <option value="scientific">Scientific name</option>
          </select>
        </div>
        <div className={"search-result-panel"}>
          <p>Hi</p>
        </div>
      </div>
    </div>
  );
}
export default Search;