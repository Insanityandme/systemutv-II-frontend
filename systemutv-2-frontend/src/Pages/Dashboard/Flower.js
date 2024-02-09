import {useState} from "react";

export const Flower = (props) => {
    const [showInfo, setShowInfo] = useState(false);

    const handleInfo = () => {
        setShowInfo(!showInfo);
    }

    return (
        <div className={"flower"}>
            <div className={"flower-left-side"}>
                <img alt={"flower"} className={"flower-image"} src={props.image}/>
                <p>{props.commonName}</p>
            </div>
            <p>{props.scientificName}</p>
            <div className={"flower-info"}>
                <div className={"flower-info-expand"}>
                    <button onClick={handleInfo}>info</button>
                    {showInfo ?
                        <p className={"info"}>
                            {props.info}
                        </p>
                        :
                        <div></div>
                    }
                </div>
                <button>Water</button>
            </div>
        </div>
    );
}
export default Flower;