import React from "react";
import PropTypes from "prop-types";
import Guest from "./Guest";

const GuestList = props =>
    <ul>
        {
            props.guests.map( (guest, index) => 
            <Guest 
                key={index} name={guest.name} isConfirmed={guest.isConfirmed}
                handleConfirmation={event => props.toggleConfirmationAt(index)}
                handleEditing={ e => props.toggleEditingAt(index)}
                isEditing={guest.isEditing}
                setName={ text => props.setNameAt(text, index)}
            />)
        }
    </ul>


PropTypes.GuestList = {
    isEditing: PropTypes.bool.isRequired,    
    guests: PropTypes.array.isRequired,
    toggleConfirmationAt: PropTypes.func.isRequired,
    toggleEditingAt: PropTypes.func.isRequired,
    setNameAt: PropTypes.func.isRequired,
}
export default GuestList;
