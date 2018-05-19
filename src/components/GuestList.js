import React from "react";
import PropTypes from "prop-types";
import Guest from "./Guest";
import PendingGuest from "./PendingGuest"

const GuestList = props =>
    <ul>
        <PendingGuest name={props.pendingGuest}/>
        {
            props.guests
            .filter( guest => !props.isFiltered || guest.isConfirmed)
            .map( (guest) => 
                <Guest 
                    key={guest.id} name={guest.name} isConfirmed={guest.isConfirmed}
                    handleConfirmation={event => props.toggleConfirmationAt(guest.id)}
                    handleEditing={ e => props.toggleEditingAt(guest.id)}
                    isEditing={guest.isEditing}
                    setName={ text => props.setNameAt(text, guest.id)}
                    removeGuest={() => props.removeGuestAt(guest.id) }
                />)
        }
    </ul>


GuestList.propTypes = {
    isEditing: PropTypes.bool.isRequired,
    isFiltered:PropTypes.bool.isRequired,
    guests: PropTypes.array.isRequired,
    toggleConfirmationAt: PropTypes.func.isRequired,
    toggleEditingAt: PropTypes.func.isRequired,
    setNameAt: PropTypes.func.isRequired,
    removeGuestAt: PropTypes.func.isRequired,
    pendingGuest: PropTypes.string.isRequired
}
export default GuestList;
