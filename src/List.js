import React, { Component } from 'react';

class List extends Component {

  render() {
    const places = this.props.places.nearby_restaurants;
    console.log("list:", places)
    return(
      <div className="list">
        <form className="form">
          <input type="text" name="fname" className="input-field"/>
          <input type="submit" value="Filter" className="submit-button" />
        </form>
        <ul id="lista">
          
        </ul>
      </div>
    )
  }
}
export default List;
