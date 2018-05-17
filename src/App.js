import React, { Component } from 'react';
import './App.css';
// components
import Counter from './components/Counter';
import GuestList from './components/GuestList';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      pendingGuest:"",
      isFiltered:false,
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

  // remove user
  removeGuestAt = index => this.setState({
    guests:[
      ...this.state.guests.filter( (element, idx) => index !== idx)  
    ]
  });

  // new user input 
  handleNameInput = e => this.setState({ pendingGuest: e.target.value }); 

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

    // form submitions
    handleSubmit = e => {
      this.setState({
        guests:[{
            name:this.state.pendingGuest,
            isConfirmed:false,
            isEditing:false,
          },
          ...this.state.guests
        ],
        pendingGuest:""
      });
      e.preventDefault();
    }
  
    // change the state of filter
    toggleFilter = ()=> this.setState({ isFiltered: !this.state.isFiltered });

    // guest statistics 
    guestNumbers = {
      TotalInvited:() => this.state.guests.length,
      Attending: () => this.state.guests.reduce((total, guest) => guest.isConfirmed ? total+1 : total, 0 ),
    }

  render() {
    const Unconfirmed = this.guestNumbers.TotalInvited() - this.guestNumbers.Attending();

    return (
      <div className="App">

        <header>
            <h1>RSVP</h1>
            <p>A Treehouse App</p>
            <form onSubmit={this.handleSubmit}>
                <input 
                type="text"
                onChange={this.handleNameInput} 
                value={this.state.pendingGuest} 
                placeholder="Invite Someone"
                />
                <button type="submit" name="submit" value="submit">Submit</button>
            </form>
        </header>  
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input type="checkbox"
                onChange={ this.toggleFilter}
                checked={ this.state.isFiltered }
              /> Hide those who haven't responded
            </label>
          </div>
          <Counter 
            Total = {this.guestNumbers.TotalInvited()}
            Attending = {this.guestNumbers.Attending()}
            Unconfirmed = {Unconfirmed}
          />
          <GuestList 
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleEditingAt={this.toggleEditingAt}
            isEditing={this.state.isEditing}
            guests={this.state.guests}
            setNameAt={this.setNameAt}
            isFiltered={this.state.isFiltered}
            removeGuestAt={this.removeGuestAt}
            pendingGuest={this.state.pendingGuest}
          />
        </div>

      </div>

    );
  }
}

export default App;

