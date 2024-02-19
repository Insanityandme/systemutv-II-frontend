import { useState } from "react";
import "./Flower.css";

export const Flower = (props) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);

    return (
        <div className="flower">
            <div className="flower-left-side">
                <img alt="flower" className="flower-image" src={props.image}/>
                <p>{props.commonName !== null ? props.commonName : 'N/A' }</p>
            </div>
            <p>{props.scientificName}</p>
            <div className="flower-info">
                <button onClick={toggleModal}>Info</button>
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={toggleModal}>&times;</span>
                            <p>{props.info}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Flower;
