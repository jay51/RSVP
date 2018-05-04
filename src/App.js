import React, { Component } from 'react';
import './App.css';
// components
import Header from "./components/Header";
import Table from './components/Table';
import GuestList from './components/GuestList';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      guests:[
        {
          name:"joe",
          isConfirmed:true,
          isEditing:false

        },
        {
          name:"adam",
          isConfirmed:false,
          isEditing:false
        }
      ]
    }
    // this.toggleConfirmationAt = this.toggleConfirmationAt.bind(this);
  }

  // take an index and change the isConfirmed property of the object at the given index.
  // obj={some:"some", other:"other"} =:> obj["some"]
  togglePropertyAt = (property, indexToChange) =>(
    this.setState({
      guests:this.state.guests.map((guest, index) => {
        return index === indexToChange ? {
          ...guest, 
          [property]: !guest[property],
        } : guest
      })
    })
  );

  // change the state for the checkbox
  toggleConfirmationAt = index => this.togglePropertyAt("isConfirmed", index);
  // change the state for the editing
  toggleEditingAt = index => this.togglePropertyAt("isEditing", index);

  // handle name edits in guestname
  setNameAt = (name, indexToChange) =>
    this.setState({
      guests:this.state.guests.map((guest, index) => {
        return index === indexToChange ? {
          ...guest, 
          name
        } : guest
      })
    });
  



  render() {
    return (
      <div className="App">

        <Header/>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input type="checkbox"/> Hide those who haven't responded
            </label>
          </div>
          <Table/>
          <GuestList 
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleEditingAt={this.toggleEditingAt}
            isEditing={this.state.isEditing}
            guests={this.state.guests}
            setNameAt={this.setNameAt}
          />
        </div>

      </div>

    );
  }
}

export default App;

