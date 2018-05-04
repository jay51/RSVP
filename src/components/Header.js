import  React from 'react'

const Header = props => {
  
    return (
      <div>
          <header>
            <h1>RSVP</h1>
            <p>A Treehouse App</p>
            <form>
                <input type="text" value="Safia" placeholder="Invite Someone"/>
                <button type="submit" name="submit" value="submit">Submit</button>
            </form>
        </header>  
      </div>
    );
}
export default Header;
