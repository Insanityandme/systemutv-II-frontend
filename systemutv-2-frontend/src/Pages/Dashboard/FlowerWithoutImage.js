import { useState } from "react";

export const FlowerWithoutImage = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [dateValue, setDateValue] = useState(new Date().toISOString().slice(0, 10));
    
    const toggleModal = () => setShowModal(!showModal);

    return (
        <div className="flower">
            <div className="flower-left-side">
                <p>{props.nickname !== null ? props.nickname : 'N/A'}</p>
            </div>
            <p>{props.lastWatered}</p>
            <div className="flower-actions">
                {!props.isSearching && (
                    <>
                        <input type="date" className="date-picker" value={dateValue} onChange={(e) => setDateValue(e.target.value)}/>
                        <button className="water-button" onClick={() => props.waterSinglePlant(props.id, dateValue)}>Water</button>
                    </>
                )}
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

export default FlowerWithoutImage;