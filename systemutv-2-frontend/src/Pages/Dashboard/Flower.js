import { useState } from "react";
import "./Flower.css";

export const Flower = (props) => {
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);

    return (
        <div className="flower">
            <div className="flower-left-side">
                <img alt="flower" className="flower-image" src={props.image}/>
                <p>{props.nickname !== null ? props.nickname : 'N/A'}</p>
            </div>
            <p>{props.lastWatered}</p>
            <div className="flower-actions">
                <button className="info-button" onClick={toggleModal}>Info</button>
                {props.showDeleteButton ? (
                    <button className="delete-button" onClick={() => props.deletePlant(props.id)}>Delete</button>
                ) : (
                    <button className="add-button" onClick={props.addPlantToUser}>+ Add</button>
                )}
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
