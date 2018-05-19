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
      guests:[]
    }
  }

  // take an index and change the isConfirmed property of the object at the given index.
  // obj={some:"some", other:"other"} =:> obj["some"]
  togglePropertyAt = (property, id) =>(
    this.setState({
      guests:this.state.guests.map( guest => {
        return guest.id === id ? {
          ...guest, 
          [property]: !guest[property],
        } : guest
      })
    })
  );

  // remove user
  removeGuestAt = id => this.setState({
    guests:[
      ...this.state.guests.filter( guest => id !== guest.id )
    ]
  });

  // new user input 
  handleNameInput = e => this.setState({ pendingGuest: e.target.value }); 

  // change the state for the checkbox
  toggleConfirmationAt = id => this.togglePropertyAt("isConfirmed", id);
  // change the state for the editing
  toggleEditingAt = id => this.togglePropertyAt("isEditing", id);

  // handle name edits in guestname
  setNameAt = (name, id) =>
    this.setState({
      guests:this.state.guests.map( guest => {
        return guest.id === id ? {
          ...guest, 
          name
        } : guest
      })
    });

    // set Id
    lastGuestId = 0;
    newGuestId = () =>{
      const id = this.lastGuestId++;
      return id;
    }

    
    // form submitions
    handleSubmit = e => {
      const id = this.newGuestId();
      this.setState({
        guests:[{
            name:this.state.pendingGuest,
            isConfirmed:false,
            isEditing:false,
            id
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

