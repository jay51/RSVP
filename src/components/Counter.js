import  React from 'react';
import PropTypes from "prop-types";

const Counter = props =>
    <table className="counter">
        <tbody>
        <tr>
            <td>Attending:</td>
            <td>{props.Attending}</td>
        </tr>
        <tr>
            <td>Unconfirmed:</td>
            <td>{props.Unconfirmed}</td>
        </tr>
        <tr>
            <td>Total:</td>
            <td>{props.Total}</td>
        </tr>
        </tbody>
    </table>

    

Counter.propTypes = {
    Attending:PropTypes.number,
    Unconfirmed:PropTypes.number,
    Total:PropTypes.number
}
export default Counter;
