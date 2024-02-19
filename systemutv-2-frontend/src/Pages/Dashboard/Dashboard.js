import './Dashboard.css';
import Navbar from "../../Navbar";
import {useState} from "react";
import Flower from "./Flower";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState('option1');
    const [flowers, setFlowers] = useState([]);


    flowers.push({
        image: "",
        commonName: "Flower",
        scientificName: "Flos",
        info: "A flower, also known as a bloom or blossom, " +
            "is the reproductive structure found in flowering plants " +
            "(plants of the division Angiospermae). " +
            "Flowers consist of a combination of vegetative organs – " +
            "sepals that enclose and protect the developing flower, petals " +
            "that attract pollinators, and reproductive organs that produce gametophytes, " +
            "which in flowering plants produce gametes. The male gametophytes, which produce sperm, " +
            "are enclosed within pollen grains produced in the anthers. The female gametophytes are " +
            "contained within the ovules produced in the carpels."
    });



    const showFlowers = () => {
       return flowers.map((flower) => {
            return (
                <div className={"pot"}>
                    <Flower
                        image ={flower.image}
                        commonName ={flower.commonName}
                        scientificName = {flower.scientificName}
                        info = {flower.info}
                    />
                </div>
            );

        })
    }

    const toSearch = () =>{
        navigate('/search');
    }

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

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