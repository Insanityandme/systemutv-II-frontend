import {useState} from "react";

export const Flower = (image, commonName, scientificName, info) => {
    const [showInfo, setShowInfo] = useState(false);

    const handleInfo = () => {
        setShowInfo(!showInfo);
    }

    return (
        <div className={"flower"}>
            {/*
            <img alt={"flower"} className={"flower-image"} src={image}/>
            <p>{commonName}</p>
            <p>{scientificName}</p>
            <p>{info}</p>
            */}
            <div className={"flower-left-side"}>
                <div className={"flower-image"}></div>
                <p>commonName</p>
            </div>
            <p>scientificName</p>
            <div className={"flower-info"}>
                <div className={"flower-info-expand"}>
                    <button onClick={handleInfo}>info</button>
                    {showInfo ?
                        <p className={"info"}>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat.
                            Duis aute irure dolor in.
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