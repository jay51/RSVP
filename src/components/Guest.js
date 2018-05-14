import React from "react";
import PropTypes from "prop-types";
import GuestName from "./GuestName";

const Guest = props =>
    <li>
        <GuestName 
        isEditing={props.isEditing}
        handleNameEdits={e => props.setName(e.target.value)}
        >
        {props.name}
        </GuestName>
        <label>
            <input type="checkbox" 
            onChange={props.handleConfirmation} 
            checked={props.isConfirmed}/> Confirmed
        </label>
        <button onClick={props.handleEditing}> {props.isEditing ? "save": "edit"}</button>
        <button onClick={props.removeGuest}>remove</button>
    </li>

PropTypes.Guest = {
    isConfirmed: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,    
    name: PropTypes.string.isRequired,
    handleConfirmation: PropTypes.func.isRequired,
    setName: PropTypes.func.isRequired,
    removeGuest: PropTypes.func.isRequired
}

export default Guest;
